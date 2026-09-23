// ===== Supabase-Konfiguration =====
// Trage hier NUR deine Project URL und deinen PUBLISHABLE/ANON Key ein.
// Niemals den service_role Key in GitHub oder Browser-Code eintragen.
const SUPABASE_URL = "https://owemgypenebvynskadgi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iL0iy85bWf-vJmWkrjoTqg_x8BjFzG7";

const dbEnabled = SUPABASE_URL.startsWith("https://") && !SUPABASE_PUBLISHABLE_KEY.startsWith("DEIN_");
const db = dbEnabled ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

const questions = [
  {topic:"Grundbegriffe",q:"Was bezeichnet das Metrum in der Musik?",a:["Die regelmäßige Ordnung von betonten und unbetonten Grundschlägen","Die genaue Abfolge verschieden langer Notenwerte","Die Geschwindigkeit eines Musikstücks","Die Tonhöhe einer Melodie"],c:0,e:"Das Metrum ist das regelmäßige metrische Grundraster aus betonten und unbetonten Schlägen."},
  {topic:"Takt",q:"Was gibt die obere Zahl einer Taktangabe wie 3/4 an?",a:["Die Anzahl der Zähleinheiten im Takt","Das Tempo des Stücks","Die Anzahl aller Takte","Die Anzahl verschiedener Tonhöhen"],c:0,e:"Die obere Zahl gibt an, wie viele Zähleinheiten ein Takt umfasst."},
  {topic:"Grundbegriffe",q:"Was beschreibt den Rhythmus am treffendsten?",a:["Die zeitliche Abfolge von Tondauern und Pausen","Nur die Geschwindigkeit des Grundschlags","Die Abfolge hoher und tiefer Töne","Nur die Lautstärke"],c:0,e:"Rhythmus organisiert Tondauern und Pausen in der Zeit."},
  {topic:"Notenwerte",q:"Eine Viertelnote wird in zwei gleich lange Notenwerte geteilt. Welche entstehen?",a:["Zwei Achtelnoten","Zwei halbe Noten","Zwei Sechzehntelnoten","Zwei ganze Noten"],c:0,e:"Zwei Achtelnoten haben zusammen genau den Zeitwert einer Viertelnote."},
  {topic:"Punktierung",q:"Welchen Zeitwert hat eine punktierte Viertelnote?",a:["Viertelnote + Achtelnote","Zwei Viertelnoten","Viertelnote + Sechzehntelnote","Nur eine Achtelnote"],c:0,e:"Der Punkt verlängert um die Hälfte des ursprünglichen Werts: 1/4 + 1/8."},
  {topic:"Triole",q:"Was geschieht bei einer Achteltriole, die den Zeitwert einer Viertelnote ausfüllt?",a:["Drei gleich lange Noten teilen sich den Zeitwert einer Viertelnote","Zwei gleich lange Noten teilen sich den Zeitwert einer Viertelnote","Vier gleich lange Noten teilen sich den Zeitwert einer Viertelnote","Drei Noten dauern jeweils eine Viertelnote"],c:0,e:"Bei dieser Triole wird der Zeitwert einer Viertelnote gleichmäßig auf drei Töne verteilt."},
  {topic:"Synkope",q:"Was ist eine Synkope?",a:["Eine Verschiebung der Betonung auf normalerweise unbetonte Positionen","Eine gleichmäßige Dreiteilung eines Notenwertes","Ein unvollständiger Anfangstakt","Eine Verlängerung um die Hälfte"],c:0,e:"Die Synkope durchbricht die erwartete metrische Betonungsordnung."},
  {topic:"Auftakt",q:"Was versteht man unter einem Auftakt?",a:["Töne vor dem ersten vollständigen Takt bzw. vor der ersten regulären Hauptbetonung","Die starke Betonung des letzten Taktes","Eine Pause in der Taktmitte","Eine Beschleunigung am Anfang"],c:0,e:"Ein Auftakt führt in den ersten vollständigen Takt bzw. zur ersten regulären Hauptbetonung hinein."},
  {topic:"Takt",q:"Welche Kombination füllt einen 4/4-Takt vollständig?",a:["Eine halbe Note und zwei Viertelnoten","Eine halbe Note und eine Viertelnote","Zwei Achtelnoten und eine Viertelnote","Eine punktierte Viertelnote und eine Achtelnote"],c:0,e:"2 Viertelwerte + 1 + 1 = 4 Viertelwerte."},
  {topic:"Grundbegriffe",q:"Welche Aussage unterscheidet Takt und Rhythmus korrekt?",a:["Der Takt gliedert das Zeitraster; der Rhythmus gestaltet konkrete Dauern und Pausen darin","Takt und Rhythmus bedeuten dasselbe","Rhythmus bestimmt nur das Tempo; Takt die Tonhöhe","Takt betrifft nur Pausen; Rhythmus nur Töne"],c:0,e:"Der Takt liefert eine metrische Gliederung; Rhythmus ist das konkrete zeitliche Muster."},
  {topic:"Notenwerte",q:"Wie viele Sechzehntelnoten entsprechen zusammen einer Viertelnote?",a:["Vier","Zwei","Drei","Acht"],c:0,e:"Eine Viertelnote entspricht zwei Achteln und damit vier Sechzehnteln."},
  {topic:"Takt",q:"Welche Aussage zum 3/4-Takt trifft zu?",a:["Ein Takt umfasst drei Viertel-Zähleinheiten","Ein Takt umfasst vier Drittel-Zähleinheiten","Jeder Ton muss eine Viertelnote lang sein","Der Takt muss immer schnell gespielt werden"],c:0,e:"3/4 bedeutet: drei Zähleinheiten mit dem Viertel als Bezugsnotenwert."},
  {topic:"Punktierung",q:"Eine punktierte halbe Note entspricht welchem Gesamtwert?",a:["Drei Viertelnoten","Zwei Viertelnoten","Vier Viertelnoten","Fünf Achtelnoten"],c:0,e:"Eine halbe Note entspricht zwei Vierteln; der Punkt ergänzt ein weiteres Viertel."},
  {topic:"Synkope",q:"Warum kann eine Synkope metrische Spannung erzeugen?",a:["Weil eine erwartete Betonung verschoben oder unterlaufen wird","Weil sie automatisch das Tempo verdoppelt","Weil sie immer aus drei Tönen besteht","Weil sie jeden Takt verkürzt"],c:0,e:"Die Spannung entsteht aus dem Gegensatz zwischen metrischer Erwartung und tatsächlicher Betonung."},
  {topic:"Auftakt",q:"Ein Stück im 4/4-Takt beginnt mit nur einer Viertelnote vor dem ersten vollständigen Takt. Wie nennt man diesen Beginn?",a:["Auftakt","Synkope","Triole","Punktierung"],c:0,e:"Der unvollständige Beginn vor dem ersten vollständigen Takt ist ein Auftakt."}
];

const $ = id => document.getElementById(id);
const screens = [$("startScreen"),$("quizScreen"),$("resultScreen")];
let quiz=[], idx=0, score=0, topicStats={}, locked=false;

function shuffle(arr){return [...arr].sort(()=>Math.random()-.5)}
function show(el){screens.forEach(s=>s.classList.add("hidden"));el.classList.remove("hidden")}

function startQuiz(){
  quiz=shuffle(questions).slice(0,12); idx=0; score=0; topicStats={}; locked=false;
  quiz.forEach(x=>{if(!topicStats[x.topic]) topicStats[x.topic]={right:0,total:0}; topicStats[x.topic].total++});
  show($("quizScreen")); renderQuestion();
}

function renderQuestion(){
  locked=false; const item=quiz[idx];
  $("counter").textContent=`Frage ${idx+1} / ${quiz.length}`;
  $("scoreLive").textContent=`${score} ${score===1?"Punkt":"Punkte"}`;
  $("progressBar").style.width=`${(idx/quiz.length)*100}%`;
  $("topicBadge").textContent=item.topic; $("questionText").textContent=item.q;
  $("feedback").className="feedback hidden"; $("nextBtn").classList.add("hidden");
  const box=$("answers"); box.innerHTML="";
  const mapped=shuffle(item.a.map((label,original)=>({label,original})));
  mapped.forEach(opt=>{const b=document.createElement("button");b.className="answer";b.textContent=opt.label;b.onclick=()=>answer(b,opt.original,item);box.appendChild(b)});
}

function answer(btn,choice,item){
  if(locked)return; locked=true; const ok=choice===item.c;
  if(ok){score++;topicStats[item.topic].right++}
  [...document.querySelectorAll(".answer")].forEach(b=>{b.disabled=true;if(b.textContent===item.a[item.c])b.classList.add("correct")});
  if(!ok)btn.classList.add("wrong");
  const f=$("feedback"); f.textContent=(ok?"Richtig. ":"Noch nicht. ")+item.e; f.className=`feedback ${ok?"ok":"bad"}`;
  $("scoreLive").textContent=`${score} ${score===1?"Punkt":"Punkte"}`; $("nextBtn").classList.remove("hidden");
}

$("nextBtn").onclick=()=>{idx++; if(idx<quiz.length)renderQuestion(); else finish()};

async function finish(){
  show($("resultScreen")); const pct=Math.round(score/quiz.length*100);
  $("percent").textContent=`${pct}%`; $("resultRing").style.background=`conic-gradient(var(--accent) ${pct*3.6}deg,#ececf3 0deg)`;
  $("resultTitle").textContent=pct>=80?"Sehr sicher":pct>=60?"Gute Grundlage":"Weiter üben";
  $("resultText").textContent=`Du hast ${score} von ${quiz.length} Fragen richtig beantwortet.`;
  $("topicResults").innerHTML=Object.entries(topicStats).sort().map(([t,s])=>`<div class="topic-row"><span>${t}</span><span>${s.right}/${s.total}</span></div>`).join("");
  $("saveStatus").textContent=dbEnabled?"Ergebnis wird gespeichert …":"Lokaler Modus: Supabase ist noch nicht eingerichtet.";
  if(dbEnabled){
    const name=$("studentName").value.trim().slice(0,40)||"anonym";
    const {error}=await db.from("quiz_results").insert({student_label:name,score,total:quiz.length,percentage:pct,topic_results:topicStats});
    $("saveStatus").textContent=error?"Das Ergebnis konnte nicht gespeichert werden. Der Test selbst ist vollständig ausgewertet.":"Ergebnis wurde gespeichert.";
  }
}

$("startBtn").onclick=startQuiz;
$("restartBtn").onclick=()=>{show($("startScreen"));$("studentName").focus()};
