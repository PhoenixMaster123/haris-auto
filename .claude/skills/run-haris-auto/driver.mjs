// Agent driver for the Haris Auto site: starts the Vite dev server,
// drives the real UI headlessly and drops screenshots into shots/.
//
//   node .claude/skills/run-haris-auto/driver.mjs [smoke|pages] [--url URL] [--theme light|dark]
//
//   smoke  (default) asset checks + navbar light/dark + footer + mobile menu + EN language probe
//   pages            full-page screenshot of every page (home, services, gallery, pricing, about, contact)
//   --url            reuse an already-running server instead of spawning `npm run dev`
//
// Requires the `playwright` package (npm i --no-save playwright). If its
// pinned browser build is missing, falls back to any Chromium found in
// %LOCALAPPDATA%\ms-playwright.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SHOTS = path.join(ROOT, ".claude", "skills", "run-haris-auto", "shots");
const PAGES = ["home", "services", "gallery", "pricing", "about", "contact"];
// ESC[…m color codes in vite's output (built without a control char in source)
const ANSI_COLORS = new RegExp(String.fromCharCode(27) + "\\[[0-9;]*m", "g");

const args = process.argv.slice(2);
const mode = args.find((a) => !a.startsWith("--")) ?? "smoke";
const argOf = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const theme = argOf("--theme") ?? "light";
let baseUrl = argOf("--url");

mkdirSync(SHOTS, { recursive: true });
const problems = [];
let devServer;

// ---------- dev server ----------
async function startDevServer() {
  devServer = spawn("npm", ["run", "dev"], { cwd: ROOT, shell: true, windowsHide: true });
  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("vite did not print a URL within 30s")), 30_000);
    devServer.stdout.on("data", (buf) => {
      const m = buf.toString().replace(ANSI_COLORS, "").match(/Local:\s+(http:\/\/localhost:\d+\/)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
    devServer.on("exit", (code) => reject(new Error(`vite exited early (code ${code})`)));
  });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(url)).ok) return url;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("dev server never became reachable");
}

function stopDevServer() {
  if (!devServer) return;
  if (process.platform === "win32") {
    // devServer.pid is the wrapping shell; /T takes the whole tree (incl. vite) down
    spawnSync("taskkill", ["/pid", String(devServer.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    devServer.kill("SIGTERM");
  }
}

// ---------- browser ----------
async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch (err) {
    if (!/Executable doesn't exist/.test(String(err))) throw err;
    // playwright's pinned build is missing - use whatever ms-playwright has
    const store = path.join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
    const rev = readdirSync(store)
      .filter((d) => /^chromium-\d+$/.test(d) && existsSync(path.join(store, d, "chrome-win64", "chrome.exe")))
      .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]))[0];
    if (!rev) throw new Error(`no Chromium in ${store}; run: npx playwright install chromium`);
    console.log(`   (pinned browser missing, using ${rev})`);
    return chromium.launch({ executablePath: path.join(store, rev, "chrome-win64", "chrome.exe") });
  }
}

let browser;
async function newPage(themeName, viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`console.error: ${m.text()}`);
  });
  page.on("requestfailed", (r) => {
    const url = r.url();
    if (/\.(mp4|webm)$/.test(url)) {
      console.log(`   (media request aborted - expected headless autoplay noise: ${path.basename(url)})`);
    } else {
      problems.push(`request failed: ${url}`);
    }
  });
  await page.addInitScript((t) => localStorage.setItem("theme", t), themeName);
  return { ctx, page };
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

const shot = (name) => path.join(SHOTS, name);
const done = (name) => console.log(`   -> shots/${name}`);

// "load" can hang on the hero <video> against the dev server; wait for the
// rendered DOM instead.
async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("footer").waitFor({ state: "attached", timeout: 15_000 });
  await page.waitForTimeout(600);
}

// ---------- flows ----------
async function smoke() {
  console.log("2. asset availability");
  const ctx = await browser.newContext();
  for (const a of ["favicon.png", "logo/haris-mark.png", "logo/haris-lockup.png", "logo/haris-logo-dark-cropped.png"]) {
    const res = await ctx.request.get(baseUrl + a);
    console.log(`   ${res.status() === 200 ? "OK " : "!! "}${a} ${res.status()}`);
    if (res.status() !== 200) problems.push(`asset ${a} -> HTTP ${res.status()}`);
  }
  await ctx.close();

  console.log("3. navbar, light + dark (desktop 1440px)");
  for (const t of ["light", "dark"]) {
    const { ctx, page } = await newPage(t, { width: 1440, height: 900 });
    await gotoReady(page, baseUrl);
    await page.screenshot({ path: shot(`01-navbar-${t}.png`), clip: { x: 0, y: 0, width: 1440, height: 220 } });
    done(`01-navbar-${t}.png`);
    if (t === "light") {
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.locator("footer").screenshot({ path: shot("02-footer.png") });
      done("02-footer.png");

      console.log("4. language probe: BG -> EN (navbar subtitle must translate)");
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByRole("button", { name: /BG/i }).first().click();
      await page
        .getByRole("menuitem", { name: /English/i })
        .click()
        .catch(() => page.getByText("English", { exact: false }).first().click());
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: shot("03-navbar-en.png"), clip: { x: 0, y: 0, width: 1440, height: 220 } });
      done("03-navbar-en.png");
    }
    await ctx.close();
  }

  console.log("5. mobile burger menu (390px)");
  const { ctx: mctx, page: mpage } = await newPage("light", { width: 390, height: 844 });
  await gotoReady(mpage, baseUrl);
  await mpage.locator('button[aria-label="Menu"]').click();
  await mpage.waitForTimeout(400);
  await mpage.screenshot({ path: shot("04-mobile-menu.png") });
  done("04-mobile-menu.png");
  await mctx.close();
}

async function pages() {
  console.log(`2. full-page shots of every page (theme: ${theme})`);
  for (const p of PAGES) {
    const { ctx, page } = await newPage(theme, { width: 1440, height: 900 });
    await gotoReady(page, `${baseUrl}#${p}`);
    await autoScroll(page);
    await page.screenshot({ path: shot(`page-${p}-${theme}.png`), fullPage: true });
    done(`page-${p}-${theme}.png`);
    await ctx.close();
  }
}

// ---------- main ----------
try {
  if (!baseUrl) {
    console.log("1. starting dev server (npm run dev)");
    baseUrl = await startDevServer();
    console.log(`   ${baseUrl}`);
  } else {
    console.log(`1. using running server ${baseUrl}`);
  }
  browser = await launchBrowser();

  if (mode === "smoke") await smoke();
  else if (mode === "pages") await pages();
  else throw new Error(`unknown mode "${mode}" (use: smoke | pages)`);

  console.log(problems.length ? `\nPROBLEMS:\n- ${problems.join("\n- ")}` : "\nno console errors, no failed requests");
  process.exitCode = problems.length ? 1 : 0;
} finally {
  await browser?.close();
  stopDevServer();
}
