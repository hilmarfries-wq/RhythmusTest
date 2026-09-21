// Dieselben beiden Werte wie in script.js eintragen.
// Publishable/Anon Key ist für Browser-Apps gedacht. Niemals service_role verwenden.
const SUPABASE_URL = "DEINE_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "DEIN_SUPABASE_PUBLISHABLE_KEY";
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_PUBLISHABLE_KEY.startsWith("DEIN_");
const db = configured ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
const $ = id => document.getElementById(id);

function fmtTopics(value){
  if(!value || typeof value !== "object") return "–";
  return Object.entries(value).sort().map(([name,s]) => `${name}: ${s?.right ?? 0}/${s?.total ?? 0}`).join(" · ");
}
function fmtDate(value){ return new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}).format(new Date(value)); }
function esc(value){ const d=document.createElement("div"); d.textContent=String(value ?? ""); return d.innerHTML; }

async function loadResults(){
  $("loadStatus").textContent="Lade Ergebnisse …";
  const {data,error}=await db.from("quiz_results").select("created_at,student_label,score,total,percentage,topic_results").order("created_at",{ascending:false}).limit(500);
  if(error){ $("loadStatus").textContent="Ergebnisse konnten nicht geladen werden."; return; }
  $("attempts").textContent=data.length;
  $("average").textContent=data.length ? `${Math.round(data.reduce((a,r)=>a+r.percentage,0)/data.length)}%` : "–";
  $("latest").textContent=data.length ? fmtDate(data[0].created_at) : "–";
  $("resultsBody").innerHTML=data.length ? data.map(r=>`<tr><td>${esc(fmtDate(r.created_at))}</td><td>${esc(r.student_label)}</td><td>${r.score}/${r.total}</td><td>${r.percentage}%</td><td>${esc(fmtTopics(r.topic_results))}</td></tr>`).join("") : '<tr><td colspan="5">Noch keine Ergebnisse vorhanden.</td></tr>';
  $("loadStatus").textContent=`${data.length} Einträge geladen.`;
}
async function showSession(session){
  if(session){ $("loginCard").classList.add("hidden"); $("dashboard").classList.remove("hidden"); await loadResults(); }
  else { $("dashboard").classList.add("hidden"); $("loginCard").classList.remove("hidden"); }
}

$("loginBtn").onclick=async()=>{
  if(!configured){ $("loginError").textContent="Bitte zuerst Supabase URL und Publishable Key in teacher.js eintragen."; return; }
  $("loginError").textContent=""; $("loginBtn").disabled=true;
  const {data,error}=await db.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});
  $("loginBtn").disabled=false;
  if(error){ $("loginError").textContent="Anmeldung fehlgeschlagen. E-Mail oder Passwort prüfen."; return; }
  await showSession(data.session);
};
$("password").addEventListener("keydown",e=>{if(e.key==="Enter")$("loginBtn").click()});
$("logoutBtn").onclick=async()=>{await db.auth.signOut(); await showSession(null)};
$("refreshBtn").onclick=loadResults;

(async()=>{
  if(!configured){ $("loginError").textContent="Supabase ist noch nicht konfiguriert."; return; }
  const {data}=await db.auth.getSession(); await showSession(data.session);
  db.auth.onAuthStateChange((_event,session)=>{ if(!session) showSession(null); });
})();
