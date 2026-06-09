"use client";
import { useState, useMemo } from "react";

const EVENTS = [
  // ΔΩΡΕΑΝ
  { id: "E501", title: "STEGI.RADIO: Live from the Park", cat: "Φεστιβάλ", date: "2026-06-12", end: "2026-06-14", time: "18:00", venue: "Πεδίον του Άρεως", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Δωρεάν μουσικό φεστιβάλ με DJs και live sets, ζωντανά από το μεγαλύτερο πάρκο της Αθήνας.", url: "https://onassis.org" },
  { id: "E502", title: "Bazaar Βιβλίων Εκδόσεων Άγρα", cat: "Πολιτισμός", date: "2026-06-12", end: "2026-06-14", time: "10:00", venue: "Δημοτική Αγορά Κυψέλης", area: "Κυψέλη", price: "Δωρεάν", free: true, desc: "Τριήμερο θερινό bazaar με τίτλους από τον κατάλογο των εκδόσεων Άγρα.", url: "https://agra.gr" },
  { id: "E503", title: "Metamorphosis — Σχολή Χορού ΕΛΣ", cat: "Θέατρο", date: "2026-06-13", end: "2026-06-14", time: "20:00", venue: "Εναλλακτική Σκηνή ΕΛΣ", area: "Καλλιθέα", price: "Δωρεάν", free: true, desc: "Παράσταση της Ανώτερης Επαγγελματικής Σχολής Χορού της Εθνικής Λυρικής Σκηνής.", url: "https://nationalopera.gr" },
  { id: "E504", title: "MARE NOSTRUM — Συναυλία στο Σπίτι της Κύπρου", cat: "Μουσική", date: "2026-06-09", end: "2026-06-09", time: "20:00", venue: "Σπίτι της Κύπρου", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Μουσικό ταξίδι στις ακτές και τα τραγούδια της Μεσογείου με ελεύθερη είσοδο.", url: "https://culturenow.gr" },
  { id: "E505", title: "ΠΙΟΠ — Παγκόσμια Ημέρα Αρχείων", cat: "Πολιτισμός", date: "2026-06-09", end: "2026-06-09", time: "18:00", venue: "Πολιτιστικό Ίδρυμα Ομίλου Πειραιώς", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Επιστημονική συνάντηση και θεατρική παράσταση εμπνευσμένη από αρχειακό υλικό.", url: "https://piop.gr" },
  { id: "E506", title: "«Κάφκα και Κινηματογράφος» — Συζήτηση βιβλίου", cat: "Πολιτισμός", date: "2026-06-08", end: "2026-06-08", time: "19:00", venue: "Ινστιτούτο Γκαίτε", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Συζήτηση για τον Κάφκα πέρα από τα στερεότυπα: λογοτεχνία, σινεμά και τέχνη.", url: "https://goethe.de" },
  { id: "E507", title: "Le Passage — Μαρίνα Καρέλλα", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-07-04", time: "11:00", venue: "Γκαλερί Ζουμπουλάκη", area: "Κολωνάκι", price: "Δωρεάν", free: true, desc: "Νέα ενότητα έργων της Μαρίνας Καρέλλα σε ατομική έκθεση.", url: "https://zoumboulakis.gr" },
  { id: "E508", title: "Περιτονία — Δημήτρης Αντωνίτσης", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-07-18", time: "11:00", venue: "Κέντρο Σύγχρονης Τέχνης Ιλεάνα Τούντα", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Ατομική έκθεση του Δημήτρη Αντωνίτση.", url: "https://art-tounta.gr" },
  { id: "E509", title: "Σιωπηλές Χαράξεις — Νικολέττα Τζάννε", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-06-27", time: "11:00", venue: "Genesis Gallery", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Η ύλη αναπτύσσεται ως αποτύπωμα μιας διαρκούς επεξεργασίας.", url: "https://genesis-gallery.gr" },
  { id: "E510", title: "Χρήστος Μποκόρος — Ο ίσκιος του Παπαδιαμάντη", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-08-31", time: "09:00", venue: "Εθνική Βιβλιοθήκη", area: "ΚΠΙΣΝ", price: "Δωρεάν", free: true, desc: "23 προσωπογραφίες του Παπαδιαμάντη βασισμένες σε ιστορική φωτογραφία.", url: "https://nlg.gr" },
  { id: "E511", title: "Barbara Kruger — Νέα Έργα", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-11-01", time: "10:00", venue: "ΚΠΙΣΝ", area: "Καλλιθέα", price: "Δωρεάν", free: true, desc: "13 νέα έργα που σχολιάζουν τον δημόσιο χώρο και κοινωνικοπολιτικά ζητήματα.", url: "https://snfcc.org" },
  // ΜΟΥΣΙΚΗ
  { id: "E512", title: "JMSN live", cat: "Μουσική", date: "2026-06-08", end: "2026-06-08", time: "21:00", venue: "Gazarte", area: "Γκάζι", price: "25-30€", free: false, desc: "Ο πολυσχιδής και ατμοσφαιρικός JMSN επιστρέφει στην Αθήνα για μια καθηλωτική εμφάνιση.", url: "https://more.com" },
  { id: "E513", title: "Limp Bizkit — Release Athens 2026", cat: "Μουσική", date: "2026-06-15", end: "2026-06-15", time: "20:00", venue: "Πλατεία Νερού", area: "Φάληρο", price: "55-75€", free: false, desc: "Οι Limp Bizkit στην Αθήνα μετά από δεκαετίες προσμονής.", url: "https://releaseathens.gr" },
  { id: "E514", title: "Σωκράτης Σινόπουλος – Yann Keerim — Τόπος", cat: "Μουσική", date: "2026-06-13", end: "2026-06-13", time: "21:00", venue: "Πειραιώς 260", area: "Ταύρος", price: "12-18€", free: false, desc: "Στο AΦTER της Πειραιώς 260, στο πλαίσιο του Φεστιβάλ Αθηνών.", url: "https://aefestival.gr" },
  { id: "E515", title: "Λαϊκές Ιστορίες με Άρωμα Ρεμπέτικο", cat: "Μουσική", date: "2026-06-12", end: "2026-06-12", time: "22:00", venue: "1002 Νύχτες", area: "Γκάζι", price: "15€", free: false, desc: "Σοφία Εμφιετζή & Νίκος Τατασόπουλος σε μια ρεμπέτικη βραδιά.", url: "https://more.com" },
  // ΘΕΑΤΡΟ / ΦΕΣΤΙΒΑΛ
  { id: "E516", title: "Μήδεια — Λουίτζι Κερουμπίνι (ΕΛΣ)", cat: "Θέατρο", date: "2026-06-12", end: "2026-06-14", time: "21:00", venue: "Ωδείο Ηρώδου Αττικού", area: "Ακρόπολη", price: "20-60€", free: false, desc: "Η όπερα Μήδεια από την ΕΛΣ στο Φεστιβάλ Αθηνών Επιδαύρου 2026.", url: "https://aefestival.gr" },
  { id: "E517", title: "Tilda Swinton — Κινηματογραφικό Αφιέρωμα", cat: "Πολιτισμός", date: "2026-06-08", end: "2026-06-27", time: "20:00", venue: "Εθνικό Μουσείο Σύγχρονης Τέχνης (ΕΜΣΤ)", area: "Κέντρο", price: "5-8€", free: false, desc: "Αφιέρωμα στο έργο της Tilda Swinton με προβολές και συνεργασίες σκηνοθετών.", url: "https://emst.gr" },
  // ΕΚΘΕΣΕΙΣ (επί πληρωμή)
  { id: "E518", title: "Aleksandra Waliszewska — Η Εισβολή της Αρχαιότητας", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-09-30", time: "10:00", venue: "Μουσείο Μπενάκη", area: "Κέντρο", price: "9€", free: false, desc: "Ατμοσφαιρική έκθεση της Πολωνής εικαστικού στο Μουσείο Μπενάκη.", url: "https://benaki.org" },
  { id: "E519", title: "Έμπνευση: Αρχαία Ελληνική Τέχνη στην Ιταλία", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-10-31", time: "09:00", venue: "Μουσείο Ακρόπολης", area: "Ακρόπολη", price: "15€", free: false, desc: "Έκθεση για την επιρροή της αρχαίας ελληνικής τέχνης στην Ιταλία.", url: "https://theacropolismuseum.gr" },
  { id: "E520", title: "Ο Κόσμος της Πρωτοπορίας — Συλλογή Κωστάκη", cat: "Εκθέσεις", date: "2026-06-08", end: "2026-12-28", time: "10:00", venue: "Εθνική Πινακοθήκη", area: "Κέντρο", price: "10€", free: false, desc: "Έργα ρωσικής πρωτοπορίας από τη Συλλογή Κωστάκη.", url: "https://nationalgallery.gr" },
];

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Μουσική": { bg: "#FFF3E0", text: "#E65100", dot: "#FF9800" },
  "Θέατρο": { bg: "#F3E5F5", text: "#6A1B9A", dot: "#AB47BC" },
  "Εκθέσεις": { bg: "#E1F5FE", text: "#0277BD", dot: "#29B6F6" },
  "Workshop": { bg: "#E8F5E9", text: "#2E7D32", dot: "#66BB6A" },
  "Παιδικά": { bg: "#FFFDE7", text: "#F57F17", dot: "#FFEE58" },
  "Φεστιβάλ": { bg: "#FCE4EC", text: "#C62828", dot: "#EF5350" },
  "Αρχιτεκτονική": { bg: "#EFEBE9", text: "#4E342E", dot: "#8D6E63" },
  "Πολιτισμός": { bg: "#E0F2F1", text: "#00695C", dot: "#26A69A" },
};

const CATEGORIES = ["Όλα", ...Object.keys(CAT_COLORS)];

const formatDate = (d: string) => {
  const date = new Date(d + "T00:00:00");
  const days = ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"];
  const months = ["Ιαν", "Φεβ", "Μάρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ", "Νοέ", "Δεκ"];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
};

export default function Home() {
  const [activeCat, setActiveCat] = useState("Όλα");
  const [freeOnly, setFreeOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    return EVENTS
      .filter(e => activeCat === "Όλα" || e.cat === activeCat)
      .filter(e => !freeOnly || e.free)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [activeCat, freeOnly]);

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F0", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <header style={{ background: "#1A1A2E", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, borderBottom: "3px solid #FF6B4A" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
            <span style={{ fontWeight: 900, fontSize: 26, color: "#fff", letterSpacing: "-0.02em" }}>zise</span>
            <span style={{ fontWeight: 900, fontSize: 26, color: "#FF6B4A" }}>.</span>
            <span style={{ fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.4)", marginLeft: 2, letterSpacing: 1 }}>gr</span>
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>Αθήνα</span>
        </div>
      </header>
      <div style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2D2B45 100%)", padding: "48px 20px 40px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.01em" }}>Βρες τι γίνεται.</h1>
        <p style={{ color: "#FF6B4A", fontSize: 16, fontWeight: 400, margin: 0, letterSpacing: 0.5 }}>Ζήσε τη στιγμή.</p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 16 }}>{EVENTS.length} εκδηλώσεις · 8-14 Ιουνίου 2026 · Αθήνα</p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", fontSize: 13, fontWeight: activeCat === cat ? 700 : 500, background: activeCat === cat ? "#FF6B4A" : "#fff", color: activeCat === cat ? "#fff" : "#1A1A2E", cursor: "pointer", whiteSpace: "nowrap", boxShadow: activeCat === cat ? "0 2px 8px rgba(255,107,74,0.3)" : "0 1px 3px rgba(0,0,0,0.08)", flexShrink: 0 }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, marginBottom: 4 }}>
          <button onClick={() => setFreeOnly(!freeOnly)} style={{ padding: "6px 14px", borderRadius: 16, border: freeOnly ? "2px solid #06D6A0" : "2px solid #ddd", fontSize: 12, fontWeight: 600, background: freeOnly ? "#E8F5E9" : "transparent", color: freeOnly ? "#2E7D32" : "#6B6580", cursor: "pointer" }}>{freeOnly ? "✓ " : ""}Δωρεάν μόνο</button>
          <span style={{ fontSize: 12, color: "#6B6580", marginLeft: "auto" }}>{filtered.length} αποτελέσματα</span>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "8px 16px 32px" }}>
        {filtered.map(event => {
          const colors = CAT_COLORS[event.cat] || { bg: "#f5f5f5", text: "#333", dot: "#999" };
          const expanded = expandedId === event.id;
          return (
            <div key={event.id} onClick={() => setExpandedId(expanded ? null : event.id)} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, boxShadow: expanded ? "0 4px 20px rgba(26,26,46,0.1)" : "0 1px 4px rgba(26,26,46,0.06)", cursor: "pointer", border: expanded ? "1px solid rgba(255,107,74,0.2)" : "1px solid transparent" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ minWidth: 52, textAlign: "center", padding: "8px 4px", background: event.free ? "#E8F5E9" : colors.bg, borderRadius: 10, flexShrink: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: event.free ? "#2E7D32" : colors.text, lineHeight: 1 }}>{new Date(event.date + "T00:00:00").getDate()}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: event.free ? "#2E7D32" : colors.text, opacity: 0.7, marginTop: 2, textTransform: "uppercase" }}>{["Ιαν","Φεβ","Μάρ","Απρ","Μάι","Ιούν","Ιούλ","Αύγ","Σεπ","Οκτ","Νοέ","Δεκ"][new Date(event.date + "T00:00:00").getMonth()]}</div>
                  {event.free && <div style={{ fontSize: 8, fontWeight: 700, color: "#2E7D32", marginTop: 4, letterSpacing: 0.5 }}>FREE</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: colors.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: colors.text }}>{event.cat}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", margin: "0 0 6px", lineHeight: 1.3 }}>{event.title}</h3>
                  <div style={{ fontSize: 12, color: "#6B6580", display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
                    <span>📍 {event.venue}</span>
                    <span>🕐 {event.time}</span>
                    {!event.free && <span style={{ fontWeight: 600, color: "#1A1A2E" }}>{event.price}</span>}
                  </div>
                  {event.date !== event.end && <div style={{ fontSize: 11, color: "#6B6580", marginTop: 4 }}>{formatDate(event.date)} — {formatDate(event.end)}</div>}
                  {expanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
                      <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, margin: "0 0 12px" }}>{event.desc}</p>
                      <a href={event.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-block", padding: "8px 20px", borderRadius: 20, background: "#FF6B4A", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{event.free ? "Περισσότερα →" : "Εισιτήρια →"}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "#6B6580" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>Δεν βρέθηκαν εκδηλώσεις.</p>
            <button onClick={() => { setActiveCat("Όλα"); setFreeOnly(false); }} style={{ marginTop: 8, padding: "8px 20px", borderRadius: 20, border: "none", background: "#FF6B4A", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Δείξε τα όλα</button>
          </div>
        )}
      </div>
      <div style={{ background: "#1A1A2E", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Τι παίζει αυτή την εβδομάδα;</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>Κάθε Δευτέρα, τα highlights στο inbox σου.</p>
          {!subscribed ? (
            <div style={{ display: "flex", gap: 8, maxWidth: 340, margin: "0 auto" }}>
              <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, padding: "10px 16px", borderRadius: 10, border: "none", fontSize: 14, outline: "none", background: "rgba(255,255,255,0.1)", color: "#fff" }} />
              <button onClick={() => { if (email.includes("@")) setSubscribed(true); }} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "#FF6B4A", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Θέλω!</button>
            </div>
          ) : (
            <div style={{ color: "#06D6A0", fontWeight: 600, fontSize: 15 }}>✓ Ευχαριστούμε! Θα τα πούμε Δευτέρα.</div>
          )}
        </div>
      </div>
      <footer style={{ background: "#15152a", padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 0, marginBottom: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>zise</span>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#FF6B4A" }}>.</span>
          <span style={{ fontWeight: 300, fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>gr</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>Βρες τι γίνεται. Ζήσε τη στιγμή. · Αθήνα 2026</p>
      </footer>
    </div>
  );
}
