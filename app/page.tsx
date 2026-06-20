"use client";
import { useState, useMemo } from "react";

/* ===================== DATA ===================== */

type Ev = {
  id: string; title: string; cat: string; date: string; end: string;
  time: string; venue: string; area: string; price: string; free: boolean;
  desc: string; url: string; img?: string;
};

const EVENTS: Ev[] = [
  // ===== 22-28 ΙΟΥΝΙΟΥ =====
  { id: "E701", title: "Gorillaz — πρώτη φορά στην Ελλάδα", cat: "Μουσική", date: "2026-06-25", end: "2026-06-25", time: "20:00", venue: "Πλατεία Νερού", area: "Φάληρο", price: "60-85€", free: false, desc: "Το πρωτοποριακό project του Damon Albarn έρχεται για πρώτη φορά στην Ελλάδα, στο πλαίσιο Release Athens.", url: "https://releaseathens.gr" },
  { id: "E702", title: "Σωκράτης Μάλαμας live", cat: "Μουσική", date: "2026-06-22", end: "2026-06-22", time: "21:00", venue: "Θέατρο Πέτρας", area: "Πετρούπολη", price: "18€", free: false, desc: "Ο Σωκράτης Μάλαμας με την Ιουλία Καραπατάκη και τον Γιάννη Μάλαμα, σε μια αναμενόμενη sold out βραδιά.", url: "https://more.com" },
  { id: "E703", title: "Ελεωνόρα Ζουγανέλη live", cat: "Μουσική", date: "2026-06-24", end: "2026-06-24", time: "21:00", venue: "Βεάκειο Θέατρο", area: "Πειραιάς", price: "20-28€", free: false, desc: "Η Ελεωνόρα Ζουγανέλη επιστρέφει στο Βεάκειο για μια ξεχωριστή καλοκαιρινή συναυλία.", url: "https://more.com" },
  { id: "E704", title: "Athens Summer Beat — Πάρκο Ελευθερίας", cat: "Φεστιβάλ", date: "2026-06-26", end: "2026-06-26", time: "20:00", venue: "Πάρκο Ελευθερίας", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Οι 95.2 Athens DeeJay και Best 92.6 μετατρέπουν το πάρκο σε ανοιχτό dancefloor. Είσοδος ελεύθερη!", url: "https://festival.opanda.gr" },
  { id: "E705", title: "Καντάδες με Άρωμα Ιονίου", cat: "Μουσική", date: "2026-06-26", end: "2026-06-26", time: "20:30", venue: "Πεζόδρομοι Πλάκας & Ψυρρή", area: "Πλάκα", price: "Δωρεάν", free: true, desc: "Μελωδικές καντάδες γεμίζουν τους πεζόδρομους, με συνάντηση όλων των σχημάτων στην Πλατεία Μοναστηρακίου.", url: "https://festival.opanda.gr" },
  { id: "E706", title: "«Εκείνη & Εκείνη» — Ίκαρη & Βουλγαράκη", cat: "Μουσική", date: "2026-06-28", end: "2026-06-28", time: "21:00", venue: "Πλατεία Σανταρόζα", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Η Βιολέτα Ίκαρη και η Παυλίνα Βουλγαράκη σε μια κοινή συναυλία. Δωρεάν, στο πλαίσιο «Καλοκαίρι στην Αθήνα».", url: "https://festival.opanda.gr" },
  { id: "E707", title: "Gorillaz — 2η ημέρα", cat: "Μουσική", date: "2026-06-27", end: "2026-06-27", time: "20:00", venue: "Πλατεία Νερού", area: "Φάληρο", price: "60-85€", free: false, desc: "Δεύτερη βραδιά για τους Gorillaz στο Release Athens, μετά το sold out της Πέμπτης.", url: "https://releaseathens.gr" },
  { id: "E708", title: "Χορευτικές Παραστάσεις — Δόρα Στράτου", cat: "Θέατρο", date: "2026-06-27", end: "2026-06-28", time: "21:30", venue: "Θέατρο Δόρα Στράτου", area: "Φιλοπάππου", price: "12-18€", free: false, desc: "Δύο μοναδικές χορευτικές παραστάσεις Σάββατο 27 και Κυριακή 28 Ιουνίου.", url: "https://more.com" },
  { id: "E709", title: "Hugel live — Electronic Show", cat: "Μουσική", date: "2026-06-26", end: "2026-06-26", time: "22:00", venue: "Πλατεία Νερού", area: "Φάληρο", price: "35-45€", free: false, desc: "Ένας από τους πιο επιδραστικούς DJs της παγκόσμιας electronic σκηνής σε μεγάλο καλοκαιρινό show.", url: "https://more.com" },
  { id: "E710", title: "Καλοκαιρινή Δημιουργική Απασχόληση", cat: "Παιδικά", date: "2026-06-22", end: "2026-06-26", time: "08:00", venue: "Κέντρα Δημιουργικής Μάθησης", area: "Διάφορες", price: "Δωρεάν", free: true, desc: "Δωρεάν δράσεις για παιδιά 6-12 ετών στα Κέντρα Δημιουργικής Μάθησης του Δήμου Αθηναίων.", url: "https://www.cityofathens.gr" },
  // ===== ΣΕ ΕΞΕΛΙΞΗ =====
  { id: "E711", title: "Καλοκαίρι στην Αθήνα 2026 — Φεστιβάλ", cat: "Φεστιβάλ", date: "2026-06-20", end: "2026-07-20", time: "Ποικίλο", venue: "50 σημεία της πόλης", area: "Όλη η πόλη", price: "Δωρεάν", free: true, desc: "63 δωρεάν εκδηλώσεις, για 31 ημέρες, σε 50 σημεία. Η Αθήνα γίνεται ανοιχτή σκηνή πολιτισμού.", url: "https://festival.opanda.gr" },
  { id: "E712", title: "Χρήστος Μποκόρος — Ο ίσκιος του Παπαδιαμάντη", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-08-31", time: "09:00", venue: "Εθνική Βιβλιοθήκη", area: "ΚΠΙΣΝ", price: "Δωρεάν", free: true, desc: "23 προσωπογραφίες του Παπαδιαμάντη βασισμένες σε ιστορική φωτογραφία.", url: "https://nlg.gr" },
  { id: "E713", title: "Barbara Kruger — Νέα Έργα", cat: "Εκθέσεις", date: "2026-05-25", end: "2026-11-01", time: "10:00", venue: "ΚΠΙΣΝ", area: "Καλλιθέα", price: "Δωρεάν", free: true, desc: "13 νέα έργα που σχολιάζουν τον δημόσιο χώρο και κοινωνικοπολιτικά ζητήματα.", url: "https://snfcc.org" },
  { id: "E714", title: "Le Passage — Μαρίνα Καρέλλα", cat: "Εκθέσεις", date: "2026-06-04", end: "2026-07-04", time: "11:00", venue: "Γκαλερί Ζουμπουλάκη", area: "Κολωνάκι", price: "Δωρεάν", free: true, desc: "Νέα ενότητα έργων της Μαρίνας Καρέλλα — ένα πραγματικό «πέρασμα» σε νέο εικαστικό ιδίωμα.", url: "https://zoumboulakis.gr" },
  { id: "E715", title: "Σιωπηλές Χαράξεις — Νικολέττα Τζάννε", cat: "Εκθέσεις", date: "2026-06-04", end: "2026-06-27", time: "11:00", venue: "Genesis Gallery", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Η ύλη αναπτύσσεται ως αποτύπωμα μιας διαρκούς επεξεργασίας. Τελευταίες μέρες.", url: "https://genesis-gallery.gr" },
  { id: "E716", title: "Tilda Swinton — Κινηματογραφικό Αφιέρωμα", cat: "Πολιτισμός", date: "2026-06-01", end: "2026-06-27", time: "20:00", venue: "ΕΜΣΤ", area: "Κέντρο", price: "5-8€", free: false, desc: "Αφιέρωμα στο έργο της Tilda Swinton με προβολές και συνεργασίες σκηνοθετών.", url: "https://emst.gr" },
  { id: "E717", title: "Aleksandra Waliszewska — Η Εισβολή της Αρχαιότητας", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-09-30", time: "10:00", venue: "Μουσείο Μπενάκη", area: "Κέντρο", price: "9€", free: false, desc: "Ατμοσφαιρική έκθεση της Πολωνής εικαστικού στο Μουσείο Μπενάκη.", url: "https://benaki.org" },
  { id: "E718", title: "Έμπνευση: Αρχαία Ελληνική Τέχνη στην Ιταλία", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-10-31", time: "09:00", venue: "Μουσείο Ακρόπολης", area: "Ακρόπολη", price: "15€", free: false, desc: "Έκθεση για την επιρροή της αρχαίας ελληνικής τέχνης στην Ιταλία.", url: "https://theacropolismuseum.gr" },
  { id: "E719", title: "Ο Κόσμος της Πρωτοπορίας — Συλλογή Κωστάκη", cat: "Εκθέσεις", date: "2026-04-15", end: "2026-12-28", time: "10:00", venue: "Εθνική Πινακοθήκη", area: "Κέντρο", price: "10€", free: false, desc: "Έργα ρωσικής πρωτοπορίας από τη Συλλογή Κωστάκη.", url: "https://nationalgallery.gr" },
];

const FEATURED_ID = "E701";

const CAT_FILE: Record<string, string> = {
  "Μουσική": "mousiki", "Θέατρο": "theatro", "Εκθέσεις": "ektheseis",
  "Φεστιβάλ": "festival", "Παιδικά": "paidika", "Πολιτισμός": "politismos",
  "Workshop": "workshop", "Αρχιτεκτονική": "arxitektoniki",
};
const catBg = (cat: string) => {
  const f = CAT_FILE[cat] || "politismos";
  return `url('/img/${f}.jpg'), url('https://picsum.photos/seed/zise-${f}/700/420')`;
};
const evBg = (e: Ev) => e.img ? `url('${e.img}'), ${catBg(e.cat)}` : catBg(e.cat);

const CAT_EMOJI: Record<string, string> = {
  "Μουσική": "🎵", "Θέατρο": "🎭", "Εκθέσεις": "🖼️", "Φεστιβάλ": "🎪",
  "Παιδικά": "👧", "Πολιτισμός": "📚", "Workshop": "🛠️", "Αρχιτεκτονική": "🏛️",
};

const CATS = ["Όλα", "Δωρεάν", ...Object.keys(CAT_EMOJI)];
const DAYS_EL = ["ΚΥΡΙΑΚΗ", "ΔΕΥΤΕΡΑ", "ΤΡΙΤΗ", "ΤΕΤΑΡΤΗ", "ΠΕΜΠΤΗ", "ΠΑΡΑΣΚΕΥΗ", "ΣΑΒΒΑΤΟ"];
const MONTHS_EL = ["ΙΑΝΟΥΑΡΙΟΥ","ΦΕΒΡΟΥΑΡΙΟΥ","ΜΑΡΤΙΟΥ","ΑΠΡΙΛΙΟΥ","ΜΑΪΟΥ","ΙΟΥΝΙΟΥ","ΙΟΥΛΙΟΥ","ΑΥΓΟΥΣΤΟΥ","ΣΕΠΤΕΜΒΡΙΟΥ","ΟΚΤΩΒΡΙΟΥ","ΝΟΕΜΒΡΙΟΥ","ΔΕΚΕΜΒΡΙΟΥ"];
const MON_SHORT = ["Ιαν","Φεβ","Μάρ","Απρ","Μάι","Ιούν","Ιούλ","Αύγ","Σεπ","Οκτ","Νοέ","Δεκ"];
const DAYS_SHORT = ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"];

/* ===================== HELPERS ===================== */

const iso = (d: Date) => d.toISOString().slice(0, 10);
const parse = (s: string) => new Date(s + "T00:00:00");

function getWeekendRange(today: Date): [string, string] {
  const d = new Date(today);
  const dow = d.getDay();
  const toSat = dow === 0 ? -1 : 6 - dow;
  const sat = new Date(d); sat.setDate(d.getDate() + toSat);
  const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
  return [iso(sat), iso(sun)];
}

const overlaps = (e: Ev, from: string, to: string) => e.date <= to && e.end >= from;
const niceDate = (s: string) => {
  const d = parse(s);
  return `${DAYS_SHORT[d.getDay()]} ${d.getDate()} ${MON_SHORT[d.getMonth()]}`;
};

/* ===================== PAGE ===================== */

export default function Home() {
  const todayD = new Date();
  const today = iso(todayD);
  const tomorrowD = new Date(todayD); tomorrowD.setDate(todayD.getDate() + 1);
  const tomorrow = iso(tomorrowD);
  const [satStr, sunStr] = getWeekendRange(todayD);

  const [when, setWhen] = useState<"today" | "tomorrow" | "weekend" | "all">("all");
  const [cat, setCat] = useState("Όλα");
  const [q, setQ] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [pick, setPick] = useState<Ev | null>(null);

  const live = useMemo(() => EVENTS.filter(e => e.end >= today), [today]);

  const filtered = useMemo(() => {
    let list = live;
    if (when === "today") list = list.filter(e => overlaps(e, today, today));
    if (when === "tomorrow") list = list.filter(e => overlaps(e, tomorrow, tomorrow));
    if (when === "weekend") list = list.filter(e => overlaps(e, satStr, sunStr));
    if (cat === "Δωρεάν") list = list.filter(e => e.free);
    else if (cat !== "Όλα") list = list.filter(e => e.cat === cat);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter(e => (e.title + " " + e.venue + " " + e.area).toLowerCase().includes(t));
    }
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
  }, [live, when, cat, q, today, tomorrow, satStr, sunStr]);

  const groups = useMemo(() => {
    const ongoing: Ev[] = [];
    const byDay = new Map<string, Ev[]>();
    for (const e of filtered) {
      if (e.date < today && e.end >= today) { ongoing.push(e); continue; }
      const k = e.date;
      if (!byDay.has(k)) byDay.set(k, []);
      byDay.get(k)!.push(e);
    }
    const dayKeys = [...byDay.keys()].sort();
    return { ongoing, byDay, dayKeys };
  }, [filtered, today]);

  const rollDice = () => {
    const pool = filtered.length ? filtered : live;
    if (!pool.length) return;
    let e = pool[Math.floor(Math.random() * pool.length)];
    if (pick && pool.length > 1) {
      while (e.id === pick.id) e = pool[Math.floor(Math.random() * pool.length)];
    }
    setPick(e);
  };

  const featured = live.find(e => e.id === FEATURED_ID);
  const freeCount = live.filter(e => e.free).length;
  const areaCount = new Set(live.map(e => e.area)).size;

  const dayLabel = (k: string) => {
    const d = parse(k);
    const wd = DAYS_EL[d.getDay()];
    const isWknd = d.getDay() === 0 || d.getDay() === 5 || d.getDay() === 6;
    return `${wd} ${d.getDate()} ${MONTHS_EL[d.getMonth()]}${isWknd ? " 🔥" : ""}`;
  };

  const Card = ({ e, ongoing }: { e: Ev; ongoing?: boolean }) => {
    const refD = ongoing ? parse(e.end) : parse(e.date);
    return (
      <div className="card" onClick={() => window.open(e.url, "_blank")}>
        <div className="card-img" style={{ backgroundImage: evBg(e) }}>
          <div className="dateblock">
            {ongoing && <span className="upto">ΕΩΣ</span>}
            <b>{refD.getDate()}</b>
            <span>{MON_SHORT[refD.getMonth()]}</span>
          </div>
          {e.free && <span className="free-flag">ΔΩΡΕΑΝ</span>}
          <span className="cat-flag">{CAT_EMOJI[e.cat] || "✨"} {e.cat.toUpperCase()}</span>
        </div>
        <div className="card-body">
          <h4>{e.title}</h4>
          <div className="meta">
            📅 {ongoing ? `έως ${niceDate(e.end)}` : niceDate(e.date)} · 🕐 {e.time}<br />
            📍 {e.venue}{!e.free && <> · <span className="price">{e.price}</span></>}
          </div>
          <button
            className={"heart" + (liked[e.id] ? " liked" : "")}
            onClick={ev => { ev.stopPropagation(); setLiked(s => ({ ...s, [e.id]: !s[e.id] })); }}
            aria-label="Αποθήκευση"
          >{liked[e.id] ? "♥" : "♡"}</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');
        :root{--coral:#FF6B4A;--coral-deep:#E84E2C;--midnight:#1A1A2E;--midnight-2:#232340;--cream:#FFF8F0;--ink:#211F33;--gray:#6B6580;--teal:#06D6A0;--honey:#FFD166;--card:#fff;--line:rgba(26,26,46,.08)}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',system-ui,sans-serif;background:var(--cream);color:var(--ink)}
        .hdr{position:sticky;top:0;z-index:200;background:rgba(26,26,46,.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.06)}
        .nav{max-width:1060px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:0 20px;height:60px}
        .logo{font-family:'Syne';font-weight:800;font-size:26px;color:#fff;letter-spacing:-.02em;text-decoration:none}
        .logo .dot{color:var(--coral)}
        .logo .gr{font-family:'DM Sans';font-weight:400;font-size:13px;color:rgba(255,255,255,.4);margin-left:2px}
        .search{flex:1;max-width:380px;margin-left:auto;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:7px 16px}
        .search input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:13px;font-family:'DM Sans'}
        .search input::placeholder{color:rgba(255,255,255,.5)}
        .city{font-size:12px;color:rgba(255,255,255,.55);white-space:nowrap}
        .hero{position:relative;padding:72px 20px 96px;overflow:hidden;background:var(--midnight)}
        .hero .bg{position:absolute;inset:0;background-image:url('/img/hero.jpg'),url('https://picsum.photos/seed/zise-athens/1600/900');background-size:cover;background-position:center 65%;opacity:.42;filter:saturate(.85)}
        .hero .veil{position:absolute;inset:0;background:linear-gradient(170deg,rgba(26,26,46,.55) 0%,rgba(26,26,46,.78) 55%,var(--midnight) 100%)}
        .hero .glow{position:absolute;inset:0;background:radial-gradient(800px 420px at 88% -5%, rgba(255,107,74,.32), transparent 60%)}
        .hero-inner{position:relative;max-width:1060px;margin:0 auto}
        .kicker{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--coral);font-weight:700;margin-bottom:14px}
        .hero h1{font-family:'Syne';font-weight:800;color:#fff;font-size:clamp(38px,6.5vw,68px);line-height:1.02;letter-spacing:-.02em}
        .hero h1 em{font-style:normal;color:var(--coral)}
        .hero .sub{color:rgba(255,255,255,.7);font-size:16px;margin-top:16px;max-width:46ch}
        .stats{display:flex;gap:28px;margin-top:24px;color:rgba(255,255,255,.55);font-size:13px}
        .stats b{display:block;font-family:'Syne';font-size:24px;color:#fff;font-weight:800}
        .when{display:flex;gap:10px;margin-top:32px;flex-wrap:wrap}
        .when button{font-family:'DM Sans';font-weight:700;font-size:14px;padding:12px 22px;border-radius:28px;border:1.5px solid rgba(255,255,255,.25);background:rgba(26,26,46,.35);backdrop-filter:blur(4px);color:#fff;cursor:pointer;transition:.2s}
        .when button:hover{border-color:var(--coral)}
        .when button.active{background:var(--coral);border-color:var(--coral);box-shadow:0 6px 24px rgba(255,107,74,.4)}
        .dice{background:linear-gradient(135deg,var(--honey),#FFB84A)!important;color:var(--midnight)!important;border:none!important}
        .section{max-width:1060px;margin:0 auto;padding:0 20px}
        .feat-wrap{margin-top:-52px;position:relative;z-index:5}
        .feat{display:grid;grid-template-columns:1.1fr .9fr;border-radius:22px;overflow:hidden;background:var(--card);box-shadow:0 18px 50px rgba(26,26,46,.18)}
        .feat-visual{position:relative;min-height:280px;background-image:url('/img/featured.jpg'),url('https://picsum.photos/seed/zise-featured/900/600');background-size:cover;background-position:center}
        .feat-visual::before{content:"";position:absolute;inset:0;background:linear-gradient(200deg,rgba(255,107,74,.15) 0%,rgba(26,26,46,.78) 100%)}
        .feat-visual .inner{position:absolute;inset:0;padding:30px;display:flex;flex-direction:column;justify-content:space-between}
        .feat-tag{align-self:flex-start;background:var(--coral);color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;padding:7px 15px;border-radius:16px;text-transform:uppercase}
        .feat-visual h3{font-family:'Syne';font-weight:800;color:#fff;font-size:clamp(24px,3.4vw,36px);line-height:1.06;text-shadow:0 2px 18px rgba(0,0,0,.4)}
        .feat-info{padding:32px;display:flex;flex-direction:column;gap:14px;justify-content:center}
        .feat-info .meta{display:flex;flex-wrap:wrap;gap:8px 18px;color:var(--gray);font-size:14px}
        .badge-free{display:inline-block;background:#E8F5E9;color:#2E7D32;font-weight:700;font-size:12px;padding:5px 12px;border-radius:14px;width:fit-content}
        .feat-info p{color:#444;font-size:14.5px;line-height:1.65}
        .btn{display:inline-flex;align-items:center;gap:8px;background:var(--midnight);color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:26px;text-decoration:none;width:fit-content;transition:.2s;border:none;cursor:pointer;font-family:'DM Sans'}
        .btn:hover{background:var(--coral)}
        .filters{display:flex;gap:8px;overflow-x:auto;padding:34px 0 6px;scrollbar-width:none}
        .filters::-webkit-scrollbar{display:none}
        .chip{flex-shrink:0;font-family:'DM Sans';font-size:13px;font-weight:600;padding:9px 18px;border-radius:20px;border:1.5px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;transition:.18s}
        .chip:hover{border-color:var(--coral);color:var(--coral)}
        .chip.on{background:var(--coral);border-color:var(--coral);color:#fff;box-shadow:0 3px 12px rgba(255,107,74,.3)}
        .results-line{display:flex;justify-content:space-between;padding:12px 0 6px;color:var(--gray);font-size:13px}
        .day-label{font-family:'Syne';font-weight:800;font-size:15px;color:var(--midnight);margin:26px 0 14px;display:flex;align-items:center;gap:12px;letter-spacing:.5px}
        .day-label::after{content:"";flex:1;height:1px;background:var(--line)}
        .day-label .today-b{background:var(--coral);color:#fff;font-family:'DM Sans';font-weight:700;font-size:10px;letter-spacing:1.5px;padding:4px 10px;border-radius:12px}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
        .card{background:var(--card);border-radius:18px;overflow:hidden;box-shadow:0 2px 10px rgba(26,26,46,.06);border:1px solid transparent;cursor:pointer;transition:.22s;position:relative}
        .card:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(26,26,46,.14);border-color:rgba(255,107,74,.25)}
        .card-img{position:relative;height:150px;background-size:cover;background-position:center}
        .card-img::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(26,26,46,.55) 100%)}
        .dateblock{position:absolute;top:12px;left:12px;z-index:2;background:rgba(255,248,240,.96);backdrop-filter:blur(4px);border-radius:12px;padding:8px 13px;text-align:center;min-width:54px}
        .dateblock .upto{display:block;font-size:8px;font-weight:700;letter-spacing:1px;color:var(--coral)}
        .dateblock b{display:block;font-family:'Syne';font-weight:800;font-size:21px;line-height:1.05;color:var(--midnight)}
        .dateblock span{font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gray)}
        .free-flag{position:absolute;top:12px;right:12px;z-index:2;background:#2E7D32;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:5px 11px;border-radius:12px}
        .cat-flag{position:absolute;bottom:10px;left:12px;z-index:2;color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;text-shadow:0 1px 6px rgba(0,0,0,.5)}
        .card-body{padding:14px 16px 16px;position:relative}
        .card-body h4{font-size:15px;font-weight:700;line-height:1.32;color:var(--midnight);margin-bottom:7px;padding-right:36px}
        .card-body .meta{font-size:12.5px;color:var(--gray);line-height:1.75;padding-right:36px}
        .card-body .price{font-weight:700;color:var(--midnight)}
        .heart{position:absolute;bottom:14px;right:14px;width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;color:#C9C4D4;cursor:pointer;font-size:15px;transition:.18s}
        .heart:hover,.heart.liked{color:var(--coral);border-color:var(--coral)}
        .empty{text-align:center;padding:54px 20px;color:var(--gray)}
        .overlay{position:fixed;inset:0;background:rgba(26,26,46,.7);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:300;padding:20px}
        .pick{background:#fff;border-radius:24px;max-width:420px;width:100%;overflow:hidden;animation:pop .35s cubic-bezier(.2,1.4,.4,1)}
        @keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
        .pick-head{background:linear-gradient(135deg,var(--honey),#FFB84A);padding:24px;text-align:center}
        .pick-head .em{font-size:36px}
        .pick-head h3{font-family:'Syne';font-weight:800;color:var(--midnight);font-size:19px;margin-top:6px}
        .pick-body{padding:24px;text-align:center}
        .pick-body h4{font-family:'Syne';font-weight:800;font-size:21px;color:var(--midnight);line-height:1.2}
        .pick-body .meta{color:var(--gray);font-size:14px;margin:12px 0 20px;line-height:1.8}
        .pick-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
        .btn-ghost{background:transparent;border:1.5px solid var(--line);color:var(--ink);font-family:'DM Sans';font-weight:700;font-size:14px;padding:12px 22px;border-radius:26px;cursor:pointer}
        .btn-coral{background:var(--coral);border:none;color:#fff;font-family:'DM Sans';font-weight:700;font-size:14px;padding:12px 24px;border-radius:26px;cursor:pointer;text-decoration:none;display:inline-block}
        .news{margin-top:60px;background:radial-gradient(700px 360px at 80% 0%, rgba(255,107,74,.25), transparent 60%),var(--midnight);padding:56px 20px;border-radius:28px 28px 0 0}
        .news-inner{max-width:520px;margin:0 auto;text-align:center}
        .news h2{font-family:'Syne';font-weight:800;color:#fff;font-size:26px}
        .news p{color:rgba(255,255,255,.55);font-size:14px;margin:10px 0 22px}
        .news .row{display:flex;gap:8px}
        .news input{flex:1;padding:13px 18px;border-radius:13px;border:none;background:rgba(255,255,255,.1);color:#fff;font-size:14px;outline:none;font-family:'DM Sans'}
        .news input::placeholder{color:rgba(255,255,255,.4)}
        .news .go{background:var(--coral);border:none;color:#fff;font-weight:700;font-size:14px;padding:13px 24px;border-radius:13px;cursor:pointer;font-family:'DM Sans'}
        .ok{color:var(--teal);font-weight:700;font-size:15px}
        .ftr{background:#15152A;padding:30px 20px;text-align:center}
        .ftr p{color:rgba(255,255,255,.3);font-size:12px;margin-top:8px}
        @media(max-width:760px){.feat{grid-template-columns:1fr}.search{display:none}.hero{padding:52px 20px 84px}}
      `}</style>

      <header className="hdr">
        <div className="nav">
          <a className="logo" href="/">zise<span className="dot">.</span><span className="gr">gr</span></a>
          <div className="search">
            <span>🔍</span>
            <input placeholder="Ψάξε event, χώρο, καλλιτέχνη…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <span className="city">📍 Αθήνα</span>
        </div>
      </header>

      <section className="hero">
        <div className="bg" /><div className="veil" /><div className="glow" />
        <div className="hero-inner">
          <div className="kicker">Οδηγος εκδηλωσεων · Αθηνα</div>
          <h1>Τι κάνουμε <em>απόψε;</em></h1>
          <p className="sub">Συναυλίες, εκθέσεις, θέατρο, φεστιβάλ και δωρεάν δράσεις — όλη η πόλη σε μία σελίδα, ανανεωμένη κάθε εβδομάδα.</p>
          <div className="stats">
            <div><b>{live.length}</b>events</div>
            <div><b>{freeCount}</b>δωρεάν</div>
            <div><b>{areaCount}</b>γειτονιές</div>
          </div>
          <div className="when">
            <button className={when === "today" ? "active" : ""} onClick={() => setWhen("today")}>Σήμερα</button>
            <button className={when === "tomorrow" ? "active" : ""} onClick={() => setWhen("tomorrow")}>Αύριο</button>
            <button className={when === "weekend" ? "active" : ""} onClick={() => setWhen("weekend")}>Το ΣΚ</button>
            <button className={when === "all" ? "active" : ""} onClick={() => setWhen("all")}>Όλα</button>
            <button className="dice" onClick={rollDice}>🎲 Διάλεξε για μένα</button>
          </div>
        </div>
      </section>

      {featured && (
        <div className="section feat-wrap">
          <div className="feat">
            <div className="feat-visual">
              <div className="inner">
                <span className="feat-tag">★ Επιλογη της εβδομαδας</span>
                <h3>{featured.title}</h3>
              </div>
            </div>
            <div className="feat-info">
              {featured.free && <span className="badge-free">ΔΩΡΕΑΝ</span>}
              <div className="meta">
                <span>📅 {niceDate(featured.date)}</span>
                <span>📍 {featured.venue}</span>
                <span>🕐 {featured.time}</span>
              </div>
              <p>{featured.desc}</p>
              <a className="btn" href={featured.url} target="_blank" rel="noopener noreferrer">Δες περισσότερα →</a>
            </div>
          </div>
        </div>
      )}

      <main className="section">
        <div className="filters">
          {CATS.map(c => (
            <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
              {c === "Δωρεάν" ? "🆓 " : CAT_EMOJI[c] ? CAT_EMOJI[c] + " " : ""}{c}
            </button>
          ))}
        </div>
        <div className="results-line">
          <span>{filtered.length} εκδηλώσεις</span>
          <span>Ημερομηνία ↓</span>
        </div>

        {groups.dayKeys.map(k => (
          <div key={k}>
            <div className="day-label">
              {dayLabel(k)}
              {k === today && <span className="today-b">ΣΗΜΕΡΑ</span>}
            </div>
            <div className="grid">{groups.byDay.get(k)!.map(e => <Card key={e.id} e={e} />)}</div>
          </div>
        ))}

        {groups.ongoing.length > 0 && (
          <>
            <div className="day-label">ΣΕ ΕΞΕΛΙΞΗ · ΕΚΘΕΣΕΙΣ & ΔΙΑΡΚΕΙΑΣ</div>
            <div className="grid">{groups.ongoing.map(e => <Card key={e.id} e={e} ongoing />)}</div>
          </>
        )}

        {filtered.length === 0 && (
          <div className="empty">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>Δεν βρέθηκαν εκδηλώσεις με αυτά τα φίλτρα.</p>
            <button className="btn" style={{ marginTop: 14 }} onClick={() => { setCat("Όλα"); setWhen("all"); setQ(""); }}>Καθάρισε φίλτρα</button>
          </div>
        )}

        <div className="news">
          <div className="news-inner">
            <h2>Τι παίζει αυτή την εβδομάδα;</h2>
            <p>Κάθε Δευτέρα πρωί, τα highlights της Αθήνας στο inbox σου. Χωρίς spam, μόνο πλάνα.</p>
            {/* MailerLite embedded form */}
            <div className="ml-embedded" data-form="oJTC5E"></div>
          </div>
        </div>
      </main>

      <footer className="ftr">
        <a className="logo" href="/" style={{ fontSize: 20 }}>zise<span className="dot">.</span><span className="gr">gr</span></a>
        <p>Βρες τι γίνεται. Ζήσε τη στιγμή. · Αθήνα 2026 · Instagram @zise.gr</p>
      </footer>

      {pick && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget) setPick(null); }}>
          <div className="pick">
            <div className="pick-head">
              <div className="em">🎲</div>
              <h3>Το πλάνο σου</h3>
            </div>
            <div className="pick-body">
              <h4>{pick.title}</h4>
              <div className="meta">
                📅 {pick.date < today ? `έως ${niceDate(pick.end)}` : niceDate(pick.date)} · 🕐 {pick.time}<br />
                📍 {pick.venue}, {pick.area}<br />
                {pick.free ? <b style={{ color: "#2E7D32" }}>ΔΩΡΕΑΝ</b> : pick.price}<br />
                {pick.desc}
              </div>
              <div className="pick-actions">
                <button className="btn-ghost" onClick={rollDice}>Άλλο ένα 🎲</button>
                <a className="btn-coral" href={pick.url} target="_blank" rel="noopener noreferrer">Πάμε! →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
