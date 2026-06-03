"use client";
import { useState, useMemo } from "react";

const EVENTS = [
  // ΔΩΡΕΑΝ
  { id: "E401", title: "Talking Heads' David Byrne — Who Is The Sky", cat: "Μουσική", date: "2026-06-21", end: "2026-06-21", time: "21:00", venue: "Ξέφωτο ΚΠΙΣΝ", area: "Καλλιθέα", price: "30-60€", free: false, desc: "Ο θρυλικός frontman των Talking Heads με τους Nation of Language.", url: "https://snfcc.org" },
  { id: "E402", title: "Χρήστος Μποκόρος — Ο ίσκιος του Παπαδιαμάντη", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-08-31", time: "09:00", venue: "Εθνική Βιβλιοθήκη", area: "ΚΠΙΣΝ", price: "Δωρεάν", free: true, desc: "23 προσωπογραφίες του Παπαδιαμάντη βασισμένες σε ιστορική φωτογραφία.", url: "https://nlg.gr" },
  { id: "E403", title: "Barbara Kruger — Νέα Έργα", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-11-01", time: "10:00", venue: "ΚΠΙΣΝ — Ίδρυμα Σταύρος Νιάρχος", area: "Καλλιθέα", price: "Δωρεάν", free: true, desc: "13 νέα έργα που σχολιάζουν τον δημόσιο χώρο και κοινωνικοπολιτικά ζητήματα.", url: "https://snfcc.org" },
  { id: "E404", title: "Γεννάδειος 100: Ένας Αιώνας Έμπνευσης", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-07-26", time: "09:00", venue: "Γεννάδειος Βιβλιοθήκη", area: "Κολωνάκι", price: "Δωρεάν", free: true, desc: "Επετειακή έκθεση 100 χρόνων Γενναδείου Βιβλιοθήκης.", url: "https://gennadius.gr" },
  { id: "E405", title: "Δήμητρα Σιατερλή — Χαρακτικά & Γλυπτά", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-06-21", time: "10:00", venue: "Πινακοθήκη Δ. Αθηναίων — Μεταξουργείο", area: "Μεταξουργείο", price: "Δωρεάν", free: true, desc: "Χαρακτικά, γλυπτά και εγκαταστάσεις για τη σύνδεση και την ανθεκτικότητα.", url: "https://pinakothiki-athinas.gr" },
  { id: "E406", title: "Σύγχρονη Ελληνική Κεραμική", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-06-22", time: "10:00", venue: "Ελληνοαμερικανική Ένωση", area: "Κολωνάκι", price: "Δωρεάν", free: true, desc: "Έκθεση κεραμικής με έμφαση στη μονοχρωμία του πηλού και τη γλυπτική φόρμα.", url: "https://hau.gr" },
  { id: "E407", title: "Γεωργία Μπλιάτσου — Θαλάσσιος Κόσμος", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-06-13", time: "11:00", venue: "Αίθουσα τέχνης Art Πρίσμα", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Ζωγραφικά έργα και λινοτυπίες εμπνευσμένα από τον θαλάσσιο κόσμο.", url: "https://artprisma.gr" },
  { id: "E408", title: "Watergas Project — Open Call Έκθεση", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-06-10", time: "11:00", venue: "Βιομηχανικό Μουσείο Φωταερίου", area: "Γκάζι", price: "Δωρεάν", free: true, desc: "Ομαδική έκθεση νέων εικαστικών 18-35 ετών στην Τεχνόπολη.", url: "https://athens-technopolis.gr" },
  { id: "E409", title: "Εικαστικά εργαστήρια για παιδιά", cat: "Παιδικά", date: "2026-06-01", end: "2026-06-30", time: "11:00", venue: "Βιομηχανικό Μουσείο Φωταερίου", area: "Γκάζι", price: "Δωρεάν", free: true, desc: "Εργαστήρια για παιδιά στην Τεχνόπολη Δήμου Αθηναίων.", url: "https://athens-technopolis.gr" },
  // ΜΟΥΣΙΚΗ
  { id: "E410", title: "Χρήστος Θηβαίος — 30 χρόνια", cat: "Μουσική", date: "2026-06-03", end: "2026-06-03", time: "21:00", venue: "Θέατρο Βράχων Μελίνα Μερκούρη", area: "Βύρωνας", price: "18-25€", free: false, desc: "Ο Χρήστος Θηβαίος γιορτάζει τα 30 χρόνια του στη δισκογραφία.", url: "https://more.com" },
  { id: "E411", title: "Κρατική Ορχήστρα Αθηνών — Fazil Say", cat: "Μουσική", date: "2026-06-04", end: "2026-06-04", time: "20:30", venue: "Μέγαρο Μουσικής", area: "Κέντρο", price: "15-45€", free: false, desc: "Η Τιανγί Λου και ο Fazil Say παρουσιάζουν το Κοντσέρτο Mother Earth.", url: "https://megaron.gr" },
  { id: "E412", title: "Ώπα Festival! powered by ΔΕΗ", cat: "Φεστιβάλ", date: "2026-06-04", end: "2026-06-04", time: "20:00", venue: "Τεχνόπολη", area: "Γκάζι", price: "15-20€", free: false, desc: "Μεγάλο μουσικό φεστιβάλ με πολλούς καλλιτέχνες.", url: "https://athens-technopolis.gr" },
  { id: "E413", title: "Island Riviera — Μουσικές Βραδιές", cat: "Μουσική", date: "2026-06-01", end: "2026-09-11", time: "21:00", venue: "Island Club Restaurant", area: "Βάρκιζα", price: "Είσοδος με κατανάλωση", free: false, desc: "Μουσικές βραδιές με διαφορετικά συγκροτήματα στην Αθηναϊκή Ριβιέρα.", url: "https://islandclubrestaurant.gr" },
  // ΘΕΑΤΡΟ / ΦΕΣΤΙΒΑΛ
  { id: "E414", title: "Slift live — Heavy Psych", cat: "Μουσική", date: "2026-06-05", end: "2026-06-05", time: "21:00", venue: "TBA", area: "Κέντρο", price: "22€", free: false, desc: "Το heavy psych τρίο Slift παρουσιάζει κομμάτια από όλη τη δισκογραφία του.", url: "https://more.com" },
  { id: "E415", title: "Φεστιβάλ Θεάτρου, Χορού & Performance", cat: "Φεστιβάλ", date: "2026-06-01", end: "2026-06-07", time: "Ποικίλο", venue: "Διάφοροι χώροι", area: "Κέντρο", price: "Ποικίλο", free: false, desc: "Πολυσυλλεκτικό φεστιβάλ με καλλιτέχνες από διάφορα πεδία.", url: "https://more.com" },
  { id: "E416", title: "Tilda Swinton — Κινηματογραφικό Αφιέρωμα", cat: "Πολιτισμός", date: "2026-06-01", end: "2026-06-27", time: "20:00", venue: "Εθνικό Μουσείο Σύγχρονης Τέχνης (ΕΜΣΤ)", area: "Κέντρο", price: "5-8€", free: false, desc: "Αφιέρωμα στο έργο της Tilda Swinton με προβολές και συνεργασίες σκηνοθετών.", url: "https://emst.gr" },
  // ΕΚΘΕΣΕΙΣ
  { id: "E417", title: "Ο Κόσμος της Πρωτοπορίας — Συλλογή Κωστάκη", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-12-28", time: "10:00", venue: "Εθνική Πινακοθήκη", area: "Κέντρο", price: "10€", free: false, desc: "Έργα ρωσικής πρωτοπορίας από τη Συλλογή Κωστάκη.", url: "https://nationalgallery.gr" },
  { id: "E418", title: "Βαρβάρα Μαυρακάκη — Έργα Χαρτοταινίας", cat: "Εκθέσεις", date: "2026-06-01", end: "2026-06-06", time: "11:00", venue: "Ekfrasi - Yianna Grammatopoulou", area: "Κέντρο", price: "Δωρεάν", free: true, desc: "Έργα χαρτοταινίας που διερευνούν τη μνήμη. Τελευταίες μέρες.", url: "https://ekfrasi-art.gr" },
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
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 16 }}>{EVENTS.length} εκδηλώσεις · 1-7 Ιουνίου 2026 · Αθήνα</p>
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
