import type {
  Service,
  PricingPlan,
  Testimonial,
  GalleryItem,
  Lang,
} from "./types";

/** Helper: build a localized field. ro/de fall back to en when omitted. */
function L(bg: string, en: string, ro?: string, de?: string): Record<Lang, string> {
  return { bg, en, ro: ro ?? en, de: de ?? en };
}

// ---- Contact details (shared across the whole site) ------------
/** Display form: keeps the leading 0 for locals, shows +359 for abroad. */
export const PHONE_DISPLAY = "+359 89 687 7995";
/** E.164 form used in tel: links (leading 0 dropped, +359 prefix). */
export const PHONE_TEL = "+359896877995";
export const EMAIL = "avtokomfort@abv.bg";

// ---- Service categories ----------------------------------------
export const categories: Record<Lang, string>[] = [
  L("Автомивка", "Car Wash", "Spălătorie auto", "Autowäsche"),
  L("Машинно пране", "Carpet & Textile", "Covoare și textile", "Teppich & Textil"),
  L("Детайлинг", "Detailing", "Detailing", "Detailing"),
  L("Интериор", "Interior", "Interior", "Innenraum"),
  L("Двигател и масла", "Engine & Oils", "Motor și uleiuri", "Motor & Öle"),
  L("Автосервиз", "Service", "Service", "Werkstatt"),
  L("Гуми", "Tyres", "Anvelope", "Reifen"),
  L("Климатик", "A/C", "Climatizare", "Klimaanlage"),
  L("DPF филтри", "DPF Filters", "Filtre DPF", "DPF-Filter"),
];

// ---- Services (prices in EUR) ----------------------------------
export const services: Service[] = [
  {
    icon: "local_car_wash",
    cat: 0,
    name: L("Външно измиване", "Exterior Wash", "Spălare exterioară", "Außenwäsche"),
    desc: L(
      "Каросерия, джанти и гуми с професионални препарати и подсушаване на ръка.",
      "Bodywork, rims and tyres with professional products and hand drying.",
      "Caroserie, jante și anvelope cu produse profesionale și uscare manuală.",
      "Karosserie, Felgen und Reifen mit professionellen Produkten und Handtrocknung.",
    ),
    dur: L("20–30 мин", "20–30 min", "20–30 min", "20–30 Min"),
    price: "8",
  },
  {
    icon: "auto_awesome",
    cat: 0,
    name: L("Пълно VIP измиване", "Full VIP Wash", "Spălare VIP completă", "Komplette VIP-Wäsche"),
    desc: L(
      "Външно и вътрешно почистване, защитен восък, гуми лак и ароматизация.",
      "Inside and out, protective wax, tyre shine and fragrance.",
      "Interior și exterior, ceară protectoare, luciu pentru anvelope și parfumare.",
      "Innen und außen, Schutzwachs, Reifenglanz und Duft.",
    ),
    dur: L("60–90 мин", "60–90 min", "60–90 min", "60–90 Min"),
    price: "18",
  },
  {
    icon: "dry_cleaning",
    cat: 1,
    name: L("Машинно пране на килими", "Machine Carpet Wash", "Spălare mecanică a covoarelor", "Maschinelle Teppichwäsche"),
    desc: L(
      "Дълбоко изпиране, изсушаване и ароматизиране. Транспорт от вашия адрес.",
      "Deep wash, drying and fragrance. Pickup and delivery from your address.",
      "Spălare profundă, uscare și parfumare. Preluare și livrare de la adresa ta.",
      "Tiefenreinigung, Trocknung und Duft. Abholung und Lieferung an Ihre Adresse.",
    ),
    dur: L("до 24 ч", "up to 24h", "până la 24h", "bis 24h"),
    price: "3",
  },
  {
    icon: "weekend",
    cat: 1,
    name: L("Пране на тапицерия", "Upholstery Cleaning", "Curățarea tapițeriei", "Polsterreinigung"),
    desc: L(
      "Екстракторно пране на седалки, мокети и таван на купето.",
      "Extraction cleaning of seats, carpets and headliner.",
      "Curățare prin extracție a scaunelor, mochetelor și plafonului.",
      "Extraktionsreinigung von Sitzen, Teppichen und Dachhimmel.",
    ),
    dur: L("2–3 ч", "2–3 h", "2–3 h", "2–3 Std"),
    price: "45",
  },
  {
    icon: "auto_fix_high",
    cat: 2,
    name: L("Полиране на боя", "Paint Polishing", "Polishare vopsea", "Lackpolitur"),
    desc: L(
      "Премахване на драскотини и възстановяване на дълбокия блясък.",
      "Swirl removal and restoration of deep gloss.",
      "Îndepărtarea zgârieturilor fine și refacerea luciului profund.",
      "Entfernung von Swirls und Wiederherstellung des tiefen Glanzes.",
    ),
    dur: L("3–5 ч", "3–5 h", "3–5 h", "3–5 Std"),
    price: "75",
  },
  {
    icon: "shield",
    cat: 2,
    name: L("Керамично покритие", "Ceramic Coating", "Tratament ceramic", "Keramikversiegelung"),
    desc: L(
      "Дълготрайна защита и дълбок блясък за години напред.",
      "Long-lasting protection and deep gloss for years to come.",
      "Protecție de durată și luciu profund pentru anii următori.",
      "Langanhaltender Schutz und tiefer Glanz für Jahre.",
    ),
    dur: L("1–2 дни", "1–2 days", "1–2 zile", "1–2 Tage"),
    price: "255",
  },
  {
    icon: "security",
    cat: 2,
    name: L("Защита на боята (PPF)", "Paint Protection (PPF)", "Protecția vopselei (PPF)", "Lackschutz (PPF)"),
    desc: L(
      "Прозрачно фолио срещу камъчета, надрасквания и износване.",
      "Clear film against stone chips, scratches and wear.",
      "Folie transparentă împotriva loviturilor de pietre, zgârieturilor și uzurii.",
      "Klare Folie gegen Steinschläge, Kratzer und Verschleiß.",
    ),
    dur: L("2–3 дни", "2–3 days", "2–3 zile", "2–3 Tage"),
    price: "460",
  },
  {
    icon: "cleaning_services",
    cat: 3,
    name: L("Цялостно почистване на салон", "Full Interior Detail", "Detailing interior complet", "Komplettes Innenraum-Detailing"),
    desc: L(
      "Пране, пластмаси, стъкла и дезинфекция на целия интериор.",
      "Shampoo, plastics, glass and sanitising of the whole cabin.",
      "Șampon, plastice, geamuri și dezinfectarea întregului habitaclu.",
      "Shampoonierung, Kunststoffe, Glas und Desinfektion des gesamten Innenraums.",
    ),
    dur: L("2–3 ч", "2–3 h", "2–3 h", "2–3 Std"),
    price: "50",
  },
  {
    icon: "oil_barrel",
    cat: 4,
    name: L("Машинна смяна на масло", "Machine Oil Change", "Schimb mecanic de ulei", "Maschineller Ölwechsel"),
    desc: L(
      "Бърза и чиста машинна смяна на масло и филтри.",
      "Fast and clean machine oil and filter change.",
      "Schimb rapid și curat al uleiului și filtrelor.",
      "Schneller und sauberer Öl- und Filterwechsel.",
    ),
    dur: L("30–45 мин", "30–45 min", "30–45 min", "30–45 Min"),
    price: "25",
  },
  {
    icon: "settings_suggest",
    cat: 4,
    name: L("Смяна масло на авт. кутия", "Auto Gearbox Oil", "Ulei cutie automată", "Automatikgetriebeöl"),
    desc: L(
      "100% смяна на маслото на автоматична скоростна кутия.",
      "Full 100% automatic transmission oil exchange.",
      "Schimb complet 100% al uleiului de transmisie automată.",
      "Vollständiger 100%iger Ölwechsel des Automatikgetriebes.",
    ),
    dur: L("60–90 мин", "60–90 min", "60–90 min", "60–90 Min"),
    price: "100",
  },
  {
    icon: "align_horizontal_center",
    cat: 5,
    name: L("3D реглаж на ходовата", "3D Wheel Alignment", "Geometrie roți 3D", "3D-Achsvermessung"),
    desc: L(
      "Прецизен реглаж на преден и заден мост на 3D стенд.",
      "Precise front and rear alignment on a 3D rig.",
      "Reglaj precis față și spate pe un stand 3D.",
      "Präzise Vorder- und Hinterachsvermessung auf einem 3D-Stand.",
    ),
    dur: L("45–60 мин", "45–60 min", "45–60 min", "45–60 Min"),
    price: "30",
  },
  {
    icon: "settings",
    cat: 5,
    name: L("Спирачна система", "Brake Service", "Sistem de frânare", "Bremsenservice"),
    desc: L(
      "Проверка и смяна на накладки, дискове и спирачна течност.",
      "Inspection and replacement of pads, discs and fluid.",
      "Verificarea și înlocuirea plăcuțelor, discurilor și lichidului.",
      "Prüfung und Austausch von Belägen, Scheiben und Bremsflüssigkeit.",
    ),
    dur: L("60 мин", "60 min", "60 min", "60 Min"),
    price: "40",
  },
  {
    icon: "manage_search",
    cat: 5,
    name: L("Компютърна диагностика", "Computer Diagnostics", "Diagnoză computerizată", "Computerdiagnose"),
    desc: L(
      "Разчитане на грешки и пълна проверка на системите.",
      "Fault-code reading and full systems check.",
      "Citirea codurilor de eroare și verificarea completă a sistemelor.",
      "Auslesen der Fehlercodes und vollständige Systemprüfung.",
    ),
    dur: L("30 мин", "30 min", "30 min", "30 Min"),
    price: "20",
  },
  {
    icon: "tire_repair",
    cat: 6,
    name: L("Смяна и баланс на гуми", "Tyre Change & Balance", "Schimb și echilibrare anvelope", "Reifenwechsel & Auswuchten"),
    desc: L(
      "Гумодемонтаж, монтаж и прецизно балансиране.",
      "Demount, mount and precise balancing.",
      "Demontare, montare și echilibrare precisă.",
      "Demontage, Montage und präzises Auswuchten.",
    ),
    dur: L("30 мин", "30 min", "30 min", "30 Min"),
    price: "15",
  },
  {
    icon: "ac_unit",
    cat: 7,
    name: L("Зареждане на климатик", "A/C Recharge", "Încărcare climatizare", "Klimaanlagen-Befüllung"),
    desc: L(
      "Проверка, ремонт и дозареждане с фреон на климатика.",
      "Check, repair and refrigerant top-up.",
      "Verificare, reparație și completare cu agent frigorific.",
      "Prüfung, Reparatur und Kältemittel-Nachfüllung.",
    ),
    dur: L("45 мин", "45 min", "45 min", "45 Min"),
    price: "35",
  },
  {
    icon: "filter_alt",
    cat: 8,
    name: L("Машинно почистване DPF", "Machine DPF Cleaning", "Curățare mecanică DPF", "Maschinelle DPF-Reinigung"),
    desc: L(
      "Цялостно почистване на DPF/FAP филтри за частици.",
      "Thorough cleaning of DPF/FAP particulate filters.",
      "Curățarea temeinică a filtrelor de particule DPF/FAP.",
      "Gründliche Reinigung von DPF/FAP-Partikelfiltern.",
    ),
    dur: L("2–6 ч", "2–6 h", "2–6 h", "2–6 Std"),
    price: "100",
  },
];

export const featuredIdx = [1, 5, 8, 2, 10, 14];
export const whyIcons = [
  "workspace_premium",
  "payments",
  "precision_manufacturing",
  "bolt",
];

// ---- Testimonials ----------------------------------------------
export const testimonials: Testimonial[] = [
  {
    name: "Георги Петров",
    role: L("Редовен клиент", "Regular customer", "Client fidel", "Stammkunde"),
    text: L(
      "Перфектно измиване и страхотно отношение. Колата изглежда като нова всеки път.",
      "Perfect wash and a great attitude. The car looks brand new every time.",
      "Spălare perfectă și o atitudine excelentă. Mașina arată ca nouă de fiecare dată.",
      "Perfekte Wäsche und eine tolle Einstellung. Das Auto sieht jedes Mal wie neu aus.",
    ),
  },
  {
    name: "Мария Иванова",
    role: L("Клиент", "Customer", "Clientă", "Kundin"),
    text: L(
      "Дадох килимите за пране и ги прибрах като нови и прекрасно ароматизирани. Препоръчвам!",
      "Dropped my carpets for cleaning and got them back like new and beautifully scented. Highly recommend!",
      "Am dat covoarele la curățat și le-am primit ca noi și frumos parfumate. Recomand cu căldură!",
      "Ich habe meine Teppiche zur Reinigung gegeben und sie wie neu und herrlich duftend zurückbekommen. Sehr zu empfehlen!",
    ),
  },
  {
    name: "Стоян Димитров",
    role: L("Клиент", "Customer", "Client", "Kunde"),
    text: L(
      "Машинна смяна на масло на автоматика — бързо, чисто и наистина професионално.",
      "Machine oil change on my automatic — fast, clean and truly professional.",
      "Schimb de ulei la cutia automată — rapid, curat și cu adevărat profesionist.",
      "Maschineller Ölwechsel bei meinem Automatikgetriebe — schnell, sauber und wirklich professionell.",
    ),
  },
];

// ---- Gallery ----------------------------------------------------
export const gallery: GalleryItem[] = [
  // The first six items also feed the Home-page preview, so the strongest
  // photos lead and cover a spread of services.
  {
    cat: "exterior",
    tall: true,
    label: L("Външно измиване", "Exterior wash", "Spălare exterioară", "Außenwäsche"),
    grad: "linear-gradient(135deg,#0b0c0f,#22323a 70%,#0891b2)",
    img: "/media/car-wash2.jpg",
  },
  {
    cat: "workshop",
    tall: false,
    label: L("Компютърна диагностика", "Computer diagnostics", "Diagnoză computerizată", "Computerdiagnose"),
    grad: "linear-gradient(135deg,#1b1e24,#33383f)",
    img: "/media/whole-check.jpg",
  },
  {
    cat: "exterior",
    tall: true,
    label: L("Смяна на гуми", "Tyre change", "Schimb anvelope", "Reifenwechsel"),
    grad: "linear-gradient(135deg,#15181d,#2b3138)",
    img: "/media/tyre-change.jpg",
  },
  {
    cat: "workshop",
    tall: false,
    label: L("Смяна на масло", "Oil change", "Schimb de ulei", "Ölwechsel"),
    grad: "linear-gradient(135deg,#10130f,#243027 60%,#3a5a32)",
    img: "/media/oil-change.jpg",
  },
  {
    cat: "carpets",
    tall: false,
    label: L("Машинно пране на килими", "Machine carpet wash", "Spălare mecanică covoare", "Maschinelle Teppichwäsche"),
    grad: "linear-gradient(135deg,#0e1418,#0e7490)",
    video: "/media/carpet.mp4",
    poster: "/media/carpet-poster.jpg",
  },
  {
    cat: "exterior",
    tall: false,
    label: L("Активна пяна", "Snow-foam wash", "Spumă activă", "Aktivschaum-Wäsche"),
    grad: "linear-gradient(135deg,#0b0c0f,#22323a 70%,#0891b2)",
    img: "/media/car-wash.jpg",
  },
  // ---- remaining gallery-only tiles ----
  {
    cat: "workshop",
    tall: false,
    label: L("Зареждане на климатик", "A/C recharge", "Încărcare climatizare", "Klimaanlagen-Befüllung"),
    grad: "linear-gradient(135deg,#0b0f14,#16323f 60%,#0e7490)",
    img: "/media/ac-recharge.jpg",
  },
  {
    cat: "workshop",
    tall: false,
    label: L("Сервиз и ремонт", "Service & repair", "Service și reparații", "Service & Reparatur"),
    grad: "linear-gradient(135deg,#1b1e24,#33383f)",
    img: "/media/car-chaning.jpg",
  },
  {
    cat: "carpets",
    tall: false,
    label: L("Машина за килими", "Carpet machine", "Mașină de covoare", "Teppichmaschine"),
    grad: "linear-gradient(135deg,#0e1418,#0e7490)",
    img: "/media/cleaning-carpet-machine2.jpg",
  },
  {
    cat: "workshop",
    tall: false,
    label: L("Водородно почистване", "Hydrogen engine clean", "Curățare cu hidrogen", "Wasserstoff-Motorreinigung"),
    grad: "linear-gradient(135deg,#191c22,#2a2f37)",
    img: "/media/hydrogen-cleaning.jpg",
  },
  {
    cat: "workshop",
    tall: false,
    label: L("Почистване на DPF", "DPF cleaning", "Curățare DPF", "DPF-Reinigung"),
    grad: "linear-gradient(135deg,#0f1115,#2b3138)",
    img: "/media/dpf-filter-cleaning.jpg",
  },
  {
    cat: "exterior",
    tall: false,
    label: L("Готови за път", "Ready to roll", "Gata de drum", "Startklar"),
    grad: "linear-gradient(135deg,#0b0c0f,#22323a 70%,#0891b2)",
    img: "/media/car-done.jpg",
  },
  {
    cat: "exterior",
    tall: false,
    label: L("Подсушаване на ръка", "Hand drying", "Uscare manuală", "Handtrocknung"),
    grad: "linear-gradient(135deg,#15181d,#2b3138)",
    img: "/media/car-drying.jpg",
  },
  {
    cat: "carpets",
    tall: true,
    label: L("Вземане и доставка", "Pickup & delivery", "Preluare și livrare", "Abholung & Lieferung"),
    grad: "linear-gradient(135deg,#0e1418,#0e7490)",
    img: "/media/carpet-bus.jpg",
  },
];

// ---- Pricing (EUR) ---------------------------------------------
export const pricing: PricingPlan[] = [
  {
    name: L("Базово измиване", "Basic Wash", "Spălare de bază", "Basis-Wäsche"),
    price: "8",
    popular: false,
    features: [
      L("Външно измиване", "Exterior wash", "Spălare exterioară", "Außenwäsche"),
      L("Джанти и гуми", "Rims & tyres", "Jante și anvelope", "Felgen & Reifen"),
      L("Подсушаване на ръка", "Hand drying", "Uscare manuală", "Handtrocknung"),
      L("Стъкла отвън", "Exterior glass", "Geamuri exterioare", "Außenscheiben"),
    ],
  },
  {
    name: L("Премиум измиване", "Premium Wash", "Spălare premium", "Premium-Wäsche"),
    price: "18",
    popular: true,
    features: [
      L("Външно + интериор", "Inside & out", "Exterior + interior", "Innen & außen"),
      L("Прахосмукачка", "Vacuuming", "Aspirare", "Aussaugen"),
      L("Защитен восък", "Protective wax", "Ceară protectoare", "Schutzwachs"),
      L("Гуми лак", "Tyre shine", "Luciu anvelope", "Reifenglanz"),
      L("Ароматизация", "Fragrance", "Parfumare", "Duft"),
    ],
  },
  {
    name: L("Пълен детайлинг", "Full Detailing", "Detailing complet", "Komplettes Detailing"),
    price: "100",
    popular: false,
    features: [
      L("Дълбоко почистване", "Deep clean", "Curățare profundă", "Tiefenreinigung"),
      L("Полиране на боя", "Paint polishing", "Polishare vopsea", "Lackpolitur"),
      L("Защитно покритие", "Sealant coat", "Strat protector", "Versiegelung"),
      L("Интериор детайлинг", "Interior detail", "Detailing interior", "Innenraum-Detailing"),
      L("Двигателно отделение", "Engine bay", "Compartiment motor", "Motorraum"),
    ],
  },
  {
    name: L("Почистване на интериор", "Interior Clean", "Curățare interior", "Innenraumreinigung"),
    price: "45",
    popular: false,
    features: [
      L("Пране на тапицерия", "Upholstery shampoo", "Spălare tapițerie", "Polster-Shampoonierung"),
      L("Пластмаси и кожа", "Plastics & leather", "Plastice și piele", "Kunststoffe & Leder"),
      L("Стъкла отвътре", "Interior glass", "Geamuri interioare", "Innenscheiben"),
      L("Озониране", "Ozone treatment", "Tratament cu ozon", "Ozonbehandlung"),
    ],
  },
  {
    name: L("Поддръжка", "Maintenance", "Întreținere", "Wartung"),
    price: "25",
    popular: false,
    features: [
      L("Смяна на масло", "Oil change", "Schimb de ulei", "Ölwechsel"),
      L("Диагностика", "Diagnostics", "Diagnoză", "Diagnose"),
      L("3D реглаж", "3D alignment", "Geometrie 3D", "3D-Vermessung"),
      L("Проверка на системи", "Systems check", "Verificarea sistemelor", "Systemprüfung"),
    ],
  },
];

export const brands = [
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Volkswagen",
  "Toyota",
  "Renault",
  "Ford",
  "Opel",
];
