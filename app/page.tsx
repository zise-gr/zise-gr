"use client";
import { useState, useMemo } from "react";

/* ===================== DATA ===================== */

type Ev = {
  id: string; title: string; cat: string; date: string; end: string;
  time: string; venue: string; area: string; price: string; free: boolean;
  desc: string; url: string; img?: string;
};

const EVENTS: Ev[] = [
  // ===== 29 ΙΟΥΝΙΟΥ - 5 ΙΟΥΛΙΟΥ =====
  { id: "E801", title: "John Legend — πρώτη φορά στην Ελλάδα", cat: "Μουσική", date: "2026-06-30", end: "2026-06-30", time: "21:00", venue: "Ωδείο Ηρώδου Αττικού", area: "Ακρόπολη", price: "55-120€", free: false, desc: "Ο πολυβραβευμένος John Legend έρχεται για πρώτη φορά στην Ελλάδα, για μια μοναδική εμφάνιση στο Ηρώδειο.", url: "https://more.com" },
  { id: "E802", title: "Μαρία Παπαγεωργίου — Φ Hill Sessions", cat: "Μουσική", date: "2026-06-29", end: "2026-06-29", time: "21:00", venue: "Θέατρο Δόρα Στράτου", area: "Φιλοπάππου", price: "15-20€", free: false, desc: "Η Μαρία Παπαγεωργίου ανεβαίνει στη σκηνή του Δόρα Στράτου στο πλαίσιο των Φ Hill Sessions.", url: "https://more.com" },
  { id: "E803", title: "«Το Σποτ» — Ζήσης Ρούμπος", cat: "Θέατρο", date: "2026-06-29", end: "2026-06-29", time: "21:00", venue: "Θέατρο Άλσος", area: "Πεδίον Άρεως", price: "14-18€", free: false, desc: "Το νέο έργο του Ζήση Ρούμπου σε σκηνοθεσία της Σοφίας Πάσχου, για πρεμιέρα στο Θέατρο Άλσος.", url: "https://more.com" },
  { id: "E804", title: "Beat the Room — ΤΗΛΕΚΟΝΤΡΟΛ Edition", cat: "Μουσική", date: "2026-06-30", end: "2026-06-30", time: "21:00", venue: "Gazarte Roof Stage", area: "Γκάζι", price: "12-15€", free: false, desc: "Πρεμιέρα του Beat the Room με ΤΗΛΕΚΟΝΤΡΟΛ edition και παρουσιάστρια τη Σοφία Κουρτίδου.", url: "https://gazarte.gr" },
  { id: "E805", title: "Stand-up Comedy στις γειτονιές", cat: "Πολιτισμός", date: "2026-06-30", end: "2026-06-30", time: "21:00", venue: "Γήπεδο Μπάσκετ Σεπολίων", area: "Σεπόλια", price: "Δωρεάν", free: true, desc: "Οι Στέλιος Ανατολίτης, Παναγιώτης Κούδας και Ειρήνη Ξυγκάκη σε μια δωρεάν παράσταση γεμάτη γέλιο.", url: "https://festival.opanda.gr" },
  { id: "E806", title: "«Δημόσιο Σαλόνι: Μια εκτροπή»", cat: "Θέατρο", date: "2026-07-04", end: "2026-07-04", time: "20:00", venue: "Πλατεία Αυδή", area: "Μεταξουργείο", price: "Δωρεάν", free: true, desc: "Ένας οικιακός χώρος «εισβάλλει» σε μια πλατεία — ένα ανοιχτό εργαστήριο συλλογικής μνήμης.", url: "https://festival.opanda.gr" },
  { id: "E807", title: "Γκαλά Όπερας — Κρατική Ορχήστρα Αθηνών", cat: "Μουσική", date: "2026-06-29", end: "2026-06-29", time: "21:00", venue: "Δημοτικό Θέατρο Λυκαβηττού", area: "Λυκαβηττός", price: "10-25€", free: false, desc: "Μεγάλο γκαλά όπερας από την Κρατική Ορχήστρα Αθηνών στο θέατρο του Λυκαβηττού.", url: "https://more.com" },
  { id: "E808", title: "Κρατική Ορχήστρα — Αφιέρωμα στον Ελύτη", cat: "Μουσική", date: "2026-07-02", end: "2026-07-02", time: "21:00", venue: "Ρωμαϊκή Αγορά", area: "Πλάκα", price: "Δωρεάν", free: true, desc: "Αφιέρωμα στον Οδυσσέα Ελύτη με τη μουσική του Γιώργου Κουρουπού, στη Ρωμαϊκή Αγορά.", url: "https://festival.opanda.gr" },
  { id: "E809", title: "Καραγκιόζης στις Γειτονιές", cat: "Παιδικά", date: "2026-07-01", end: "2026-07-01", time: "20:30", venue: "Πλατεία Κολιάτσου", area: "Πατήσια", price: "Δωρεάν", free: true, desc: "Ο θίασος Θεάτρου Σκιών του Σωτήρη Χαρίδημου παρουσιάζει μια παράσταση για όλη την οικογένεια.", url: "https://festival.opanda.gr" },
  { id: "E810", title: "Ιφιγένεια η εν Αυλίδι — Ευριπίδης", cat: "Θέατρο", date: "2026-07-03", end: "2026-07-03", time: "21:00", venue: "Πάρκο Αντ. Τρίτση", area: "Ίλιον", price: "12€", free: false, desc: "Η τραγωδία του Ευριπίδη σε σκηνοθεσία Σάββα Στρούμπου, σε καλοκαιρινή περιοδεία.", url: "https://more.com" },
  // ===== ΣΕ ΕΞΕΛΙΞΗ =====
  { id: "E811", title: "Καλοκαίρι στην Αθήνα 2026 — Φεστιβάλ", cat: "Φεστιβάλ", date: "2026-06-20", end: "2026-07-20", time: "Ποικίλο", venue: "50 σημεία της πόλης", area: "Όλη η πόλη", price: "Δωρεάν", free: true, desc: "63 δωρεάν εκδηλώσεις, για 31 ημέρες, σε 50 σημεία. Η Αθήνα γίνεται ανοιχτή σκηνή πολιτισμού.", url: "https://festival.opanda.gr" },
  { id: "E812", title: "Χρήστος Μποκόρος — Ο ίσκιος του Παπαδιαμάντη", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-08-31", time: "09:00", venue: "Εθνική Βιβλιοθήκη", area: "ΚΠΙΣΝ", price: "Δωρεάν", free: true, desc: "23 προσωπογραφίες του Παπαδιαμάντη βασισμένες σε ιστορική φωτογραφία.", url: "https://nlg.gr" },
  { id: "E813", title: "Barbara Kruger — Νέα Έργα", cat: "Εκθέσεις", date: "2026-05-25", end: "2026-11-01", time: "10:00", venue: "ΚΠΙΣΝ", area: "Καλλιθέα", price: "Δωρεάν", free: true, desc: "13 νέα έργα που σχολιάζουν τον δημόσιο χώρο και κοινωνικοπολιτικά ζητήματα.", url: "https://snfcc.org" },
  { id: "E814", title: "Le Passage — Μαρίνα Καρέλλα", cat: "Εκθέσεις", date: "2026-06-04", end: "2026-07-04", time: "11:00", venue: "Γκαλερί Ζουμπουλάκη", area: "Κολωνάκι", price: "Δωρεάν", free: true, desc: "Νέα ενότητα έργων της Μαρίνας Καρέλλα. Τελευταίες μέρες.", url: "https://zoumboulakis.gr" },
  { id: "E815", title: "Aleksandra Waliszewska — Η Εισβολή της Αρχαιότητας", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-09-30", time: "10:00", venue: "Μουσείο Μπενάκη", area: "Κέντρο", price: "9€", free: false, desc: "Ατμοσφαιρική έκθεση της Πολωνής εικαστικού στο Μουσείο Μπενάκη.", url: "https://benaki.org" },
  { id: "E816", title: "Έμπνευση: Αρχαία Ελληνική Τέχνη στην Ιταλία", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-10-31", time: "09:00", venue: "Μουσείο Ακρόπολης", area: "Ακρόπολη", price: "15€", free: false, desc: "Έκθεση για την επιρροή της αρχαίας ελληνικής τέχνης στην Ιταλία.", url: "https://theacropolismuseum.gr" },
  { id: "E817", title: "Ο Κόσμος της Πρωτοπορίας — Συλλογή Κωστάκη", cat: "Εκθέσεις", date: "2026-04-15", end: "2026-12-28", time: "10:00", venue: "Εθνική Πινακοθήκη", area: "Κέντρο", price: "10€", free: false, desc: "Έργα ρωσικής πρωτοπορίας από τη Συλλογή Κωστάκη.", url: "https://nationalgallery.gr" },
];

const FEATURED_ID = "E801";

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

/* Share text builder */
const shareText = (e: Ev) =>
  `${e.title} — ${niceDate(e.date)}, ${e.venue}${e.free ? " (Δωρεάν)" : ""} | Βρες το στο zise.gr`;

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
  const [shareFor, setShareFor] = useState<Ev | null>(null);
  const [copied, setCopied] = useState(false);

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

  const doCopy = (e: Ev) => {
    const text = shareText(e) + " — https://zise.gr";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const Card = ({ e, ongoing }: { e: Ev; ongoing?: boolean }) => {
    const refD = ongoing ? parse(e.end) : parse(e.date);
    return (
      <div className="card">
        <div className="card-img" style={{ backgroundImage: evBg(e) }} onClick={() => window.open(e.url, "_blank")}>
          <div className="dateblock">
            {ongoing && <span className="upto">ΕΩΣ</span>}
            <b>{refD.getDate()}</b>
            <span>{MON_SHORT[refD.getMonth()]}</span>
          </div>
          {e.free && <span className="free-flag">ΔΩΡΕΑΝ</span>}
          <span className="cat-flag">{CAT_EMOJI[e.cat] || "✨"} {e.cat.toUpperCase()}</span>
        </div>
        <div className="card-body">
          <h4 onClick={() => window.open(e.url, "_blank")} style={{ cursor: "pointer" }}>{e.title}</h4>
          <div className="meta">
            📅 {ongoing ? `έως ${niceDate(e.end)}` : niceDate(e.date)} · 🕐 {e.time}<br />
            📍 {e.venue}{!e.free && <> · <span className="price">{e.price}</span></>}
          </div>
          <div className="card-actions">
            <button
              className={"act share" }
              onClick={ev => { ev.stopPropagation(); setShareFor(e); setCopied(false); }}
              aria-label="Κοινοποίηση"
            >↗ Μοιράσου</button>
            <button
              className={"act heart" + (liked[e.id] ? " liked" : "")}
              onClick={ev => { ev.stopPropagation(); setLiked(s => ({ ...s, [e.id]: !s[e.id] })); }}
              aria-label="Αποθήκευση"
            >{liked[e.id] ? "♥" : "♡"}</button>
          </div>
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
        .card{background:var(--card);border-radius:18px;overflow:hidden;box-shadow:0 2px 10px rgba(26,26,46,.06);border:1px solid transparent;transition:.22s;position:relative}
        .card:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(26,26,46,.14);border-color:rgba(255,107,74,.25)}
        .card-img{position:relative;height:150px;background-size:cover;background-position:center;cursor:pointer}
        .card-img::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(26,26,46,.55) 100%)}
        .dateblock{position:absolute;top:12px;left:12px;z-index:2;background:rgba(255,248,240,.96);backdrop-filter:blur(4px);border-radius:12px;padding:8px 13px;text-align:center;min-width:54px}
        .dateblock .upto{display:block;font-size:8px;font-weight:700;letter-spacing:1px;color:var(--coral)}
        .dateblock b{display:block;font-family:'Syne';font-weight:800;font-size:21px;line-height:1.05;color:var(--midnight)}
        .dateblock span{font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gray)}
        .free-flag{position:absolute;top:12px;right:12px;z-index:2;background:#2E7D32;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:5px 11px;border-radius:12px}
        .cat-flag{position:absolute;bottom:10px;left:12px;z-index:2;color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;text-shadow:0 1px 6px rgba(0,0,0,.5)}
        .card-body{padding:14px 16px 16px;position:relative}
        .card-body h4{font-size:15px;font-weight:700;line-height:1.32;color:var(--midnight);margin-bottom:7px}
        .card-body .meta{font-size:12.5px;color:var(--gray);line-height:1.75}
        .card-body .price{font-weight:700;color:var(--midnight)}
        .card-actions{display:flex;gap:8px;margin-top:12px}
        .act{font-family:'DM Sans';font-weight:700;font-size:12.5px;border-radius:20px;cursor:pointer;transition:.18s;border:1px solid var(--line);background:#fff}
        .act.share{flex:1;color:var(--coral);padding:8px 12px}
        .act.share:hover{background:var(--coral);color:#fff;border-color:var(--coral)}
        .act.heart{width:38px;color:#C9C4D4;font-size:15px;display:grid;place-items:center}
        .act.heart:hover,.act.heart.liked{color:var(--coral);border-color:var(--coral)}
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
        .share-grid{display:flex;flex-direction:column;gap:10px;padding:4px 0}
        .share-btn{display:flex;align-items:center;gap:12px;padding:13px 18px;border-radius:14px;font-family:'DM Sans';font-weight:700;font-size:14px;text-decoration:none;border:none;cursor:pointer;transition:.15s;width:100%}
        .share-btn:hover{transform:translateY(-1px)}
        .sb-wa{background:#25D366;color:#fff}
        .sb-vi{background:#7360F2;color:#fff}
        .sb-fb{background:#1877F2;color:#fff}
        .sb-cp{background:#F0EFF4;color:var(--ink)}
        .sb-ico{font-size:18px}
        .news{margin-top:60px;background:radial-gradient(700px 360px at 80% 0%, rgba(255,107,74,.25), transparent 60%),var(--midnight);padding:56px 20px;border-radius:28px 28px 0 0}
        .news-inner{max-width:520px;margin:0 auto;text-align:center}
        .news h2{font-family:'Syne';font-weight:800;color:#fff;font-size:26px}
        .news p{color:rgba(255,255,255,.55);font-size:14px;margin:10px 0 22px}
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

      {/* DICE MODAL */}
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

      {/* SHARE MODAL */}
      {shareFor && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget) setShareFor(null); }}>
          <div className="pick">
            <div className="pick-head" style={{ background: "linear-gradient(135deg,#FF6B4A,#E84E2C)" }}>
              <div className="em">↗</div>
              <h3 style={{ color: "#fff" }}>Μοιράσου το event</h3>
            </div>
            <div className="pick-body">
              <h4 style={{ fontSize: 17, marginBottom: 16 }}>{shareFor.title}</h4>
              <div className="share-grid">
                <a className="share-btn sb-wa" href={`https://wa.me/?text=${encodeURIComponent(shareText(shareFor) + " https://zise.gr")}`} target="_blank" rel="noopener noreferrer">
                  <span className="sb-ico">💬</span> WhatsApp
                </a>
                <a className="share-btn sb-vi" href={`viber://forward?text=${encodeURIComponent(shareText(shareFor) + " https://zise.gr")}`}>
                  <span className="sb-ico">📲</span> Viber
                </a>
                <a className="share-btn sb-fb" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://zise.gr")}`} target="_blank" rel="noopener noreferrer">
                  <span className="sb-ico">👍</span> Facebook
                </a>
                <button className="share-btn sb-cp" onClick={() => doCopy(shareFor)}>
                  <span className="sb-ico">{copied ? "✓" : "🔗"}</span> {copied ? "Αντιγράφηκε!" : "Αντιγραφή link"}
                </button>
              </div>
              <button className="btn-ghost" style={{ marginTop: 16 }} onClick={() => setShareFor(null)}>Κλείσιμο</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
