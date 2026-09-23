// ============================================================
// MUSIK-QUIZ EF
// Metrum, Takt und Rhythmus
// ============================================================


// ===== Supabase-Konfiguration =====
// Publishable Key darf im Browser verwendet werden.
// NIEMALS service_role / Secret Key hier eintragen.

const SUPABASE_URL =
  "https://owemgypenebvynskadgi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_iL0iy85bWf-vJmWkrjoTqg_x8BjFzG7";

const dbEnabled =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_");

let db = null;

if (dbEnabled && window.supabase) {
  db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}


// ============================================================
// FRAGEN
// ============================================================

const questions = [

  {
    topic: "Grundbegriffe",
    q: "Was bezeichnet das Metrum in der Musik?",
    a: [
      "Die regelmäßige Ordnung von betonten und unbetonten Grundschlägen",
      "Die genaue Abfolge verschieden langer Notenwerte",
      "Die Geschwindigkeit eines Musikstücks",
      "Die Tonhöhe einer Melodie"
    ],
    c: 0,
    e: "Das Metrum ist das regelmäßige metrische Grundraster aus betonten und unbetonten Schlägen."
  },

  {
    topic: "Takt",
    q: "Was gibt die obere Zahl einer Taktangabe wie 3/4 an?",
    a: [
      "Die Anzahl der Zähleinheiten im Takt",
      "Das Tempo des Stücks",
      "Die Anzahl aller Takte",
      "Die Anzahl verschiedener Tonhöhen"
    ],
    c: 0,
    e: "Die obere Zahl gibt an, wie viele Zähleinheiten ein Takt umfasst."
  },

  {
    topic: "Grundbegriffe",
    q: "Was beschreibt den Rhythmus am treffendsten?",
    a: [
      "Die zeitliche Abfolge von Tondauern und Pausen",
      "Nur die Geschwindigkeit des Grundschlags",
      "Die Abfolge hoher und tiefer Töne",
      "Nur die Lautstärke"
    ],
    c: 0,
    e: "Rhythmus organisiert Tondauern und Pausen in der Zeit."
  },

  {
    topic: "Notenwerte",
    q: "Eine Viertelnote wird in zwei gleich lange Notenwerte geteilt. Welche entstehen?",
    a: [
      "Zwei Achtelnoten",
      "Zwei halbe Noten",
      "Zwei Sechzehntelnoten",
      "Zwei ganze Noten"
    ],
    c: 0,
    e: "Zwei Achtelnoten haben zusammen genau den Zeitwert einer Viertelnote."
  },

  {
    topic: "Punktierung",
    q: "Welchen Zeitwert hat eine punktierte Viertelnote?",
    a: [
      "Viertelnote + Achtelnote",
      "Zwei Viertelnoten",
      "Viertelnote + Sechzehntelnote",
      "Nur eine Achtelnote"
    ],
    c: 0,
    e: "Der Punkt verlängert um die Hälfte des ursprünglichen Werts: 1/4 + 1/8."
  },

  {
    topic: "Triole",
    q: "Was geschieht bei einer Achteltriole, die den Zeitwert einer Viertelnote ausfüllt?",
    a: [
      "Drei gleich lange Noten teilen sich den Zeitwert einer Viertelnote",
      "Zwei gleich lange Noten teilen sich den Zeitwert einer Viertelnote",
      "Vier gleich lange Noten teilen sich den Zeitwert einer Viertelnote",
      "Drei Noten dauern jeweils eine Viertelnote"
    ],
    c: 0,
    e: "Bei dieser Triole wird der Zeitwert einer Viertelnote gleichmäßig auf drei Töne verteilt."
  },

  {
    topic: "Synkope",
    q: "Was ist eine Synkope?",
    a: [
      "Eine Verschiebung der Betonung auf normalerweise unbetonte Positionen",
      "Eine gleichmäßige Dreiteilung eines Notenwertes",
      "Ein unvollständiger Anfangstakt",
      "Eine Verlängerung um die Hälfte"
    ],
    c: 0,
    e: "Die Synkope durchbricht die erwartete metrische Betonungsordnung."
  },

  {
    topic: "Auftakt",
    q: "Was versteht man unter einem Auftakt?",
    a: [
      "Töne vor dem ersten vollständigen Takt bzw. vor der ersten regulären Hauptbetonung",
      "Die starke Betonung des letzten Taktes",
      "Eine Pause in der Taktmitte",
      "Eine Beschleunigung am Anfang"
    ],
    c: 0,
    e: "Ein Auftakt führt in den ersten vollständigen Takt bzw. zur ersten regulären Hauptbetonung hinein."
  },

  {
    topic: "Takt",
    q: "Welche Kombination füllt einen 4/4-Takt vollständig?",
    a: [
      "Eine halbe Note und zwei Viertelnoten",
      "Eine halbe Note und eine Viertelnote",
      "Zwei Achtelnoten und eine Viertelnote",
      "Eine punktierte Viertelnote und eine Achtelnote"
    ],
    c: 0,
    e: "2 Viertelwerte + 1 + 1 = 4 Viertelwerte."
  },

  {
    topic: "Grundbegriffe",
    q: "Welche Aussage unterscheidet Takt und Rhythmus korrekt?",
    a: [
      "Der Takt gliedert das Zeitraster; der Rhythmus gestaltet konkrete Dauern und Pausen darin",
      "Takt und Rhythmus bedeuten dasselbe",
      "Rhythmus bestimmt nur das Tempo; Takt die Tonhöhe",
      "Takt betrifft nur Pausen; Rhythmus nur Töne"
    ],
    c: 0,
    e: "Der Takt liefert eine metrische Gliederung; Rhythmus ist das konkrete zeitliche Muster."
  },

  {
    topic: "Notenwerte",
    q: "Wie viele Sechzehntelnoten entsprechen zusammen einer Viertelnote?",
    a: [
      "Vier",
      "Zwei",
      "Drei",
      "Acht"
    ],
    c: 0,
    e: "Eine Viertelnote entspricht zwei Achteln und damit vier Sechzehnteln."
  },

  {
    topic: "Takt",
    q: "Welche Aussage zum 3/4-Takt trifft zu?",
    a: [
      "Ein Takt umfasst drei Viertel-Zähleinheiten",
      "Ein Takt umfasst vier Drittel-Zähleinheiten",
      "Jeder Ton muss eine Viertelnote lang sein",
      "Der Takt muss immer schnell gespielt werden"
    ],
    c: 0,
    e: "3/4 bedeutet: drei Zähleinheiten mit dem Viertel als Bezugsnotenwert."
  },

  {
    topic: "Punktierung",
    q: "Eine punktierte halbe Note entspricht welchem Gesamtwert?",
    a: [
      "Drei Viertelnoten",
      "Zwei Viertelnoten",
      "Vier Viertelnoten",
      "Fünf Achtelnoten"
    ],
    c: 0,
    e: "Eine halbe Note entspricht zwei Vierteln; der Punkt ergänzt ein weiteres Viertel."
  },

  {
    topic: "Synkope",
    q: "Warum kann eine Synkope metrische Spannung erzeugen?",
    a: [
      "Weil eine erwartete Betonung verschoben oder unterlaufen wird",
      "Weil sie automatisch das Tempo verdoppelt",
      "Weil sie immer aus drei Tönen besteht",
      "Weil sie jeden Takt verkürzt"
    ],
    c: 0,
    e: "Die Spannung entsteht aus dem Gegensatz zwischen metrischer Erwartung und tatsächlicher Betonung."
  },

  {
    topic: "Auftakt",
    q: "Ein Stück im 4/4-Takt beginnt mit nur einer Viertelnote vor dem ersten vollständigen Takt. Wie nennt man diesen Beginn?",
    a: [
      "Auftakt",
      "Synkope",
      "Triole",
      "Punktierung"
    ],
    c: 0,
    e: "Der unvollständige Beginn vor dem ersten vollständigen Takt ist ein Auftakt."
  }

];


// ============================================================
// HILFSFUNKTIONEN
// ============================================================

const $ = id => document.getElementById(id);

const screens = [
  $("startScreen"),
  $("quizScreen"),
  $("resultScreen")
];

let quiz = [];
let idx = 0;
let score = 0;
let topicStats = {};
let locked = false;


function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}


function show(el) {

  screens.forEach(screen => {
    if (screen) {
      screen.classList.add("hidden");
    }
  });

  if (el) {
    el.classList.remove("hidden");
  }

}


// ============================================================
// TEST STARTEN
// ============================================================

function startQuiz() {

  quiz = shuffle(questions).slice(0, 12);

  idx = 0;
  score = 0;
  topicStats = {};
  locked = false;

  quiz.forEach(question => {

    if (!topicStats[question.topic]) {

      topicStats[question.topic] = {
        right: 0,
        total: 0
      };

    }

    topicStats[question.topic].total++;

  });

  show($("quizScreen"));

  renderQuestion();

}


// ============================================================
// FRAGE ANZEIGEN
// ============================================================

function renderQuestion() {

  locked = false;

  const item = quiz[idx];

  $("counter").textContent =
    `Frage ${idx + 1} / ${quiz.length}`;

  $("scoreLive").textContent =
    `${score} ${score === 1 ? "Punkt" : "Punkte"}`;

  $("progressBar").style.width =
    `${(idx / quiz.length) * 100}%`;

  $("topicBadge").textContent = item.topic;

  $("questionText").textContent = item.q;

  $("feedback").className =
    "feedback hidden";

  $("nextBtn").classList.add("hidden");

  const box = $("answers");

  box.innerHTML = "";

  const mapped = shuffle(
    item.a.map((label, original) => ({
      label,
      original
    }))
  );

  mapped.forEach(option => {

    const button =
      document.createElement("button");

    button.className = "answer";

    button.textContent =
      option.label;

    button.onclick = () =>
      answer(
        button,
        option.original,
        item
      );

    box.appendChild(button);

  });

}


// ============================================================
// ANTWORT
// ============================================================

function answer(btn, choice, item) {

  if (locked) return;

  locked = true;

  const correct =
    choice === item.c;

  if (correct) {

    score++;

    topicStats[item.topic].right++;

  }

  document
    .querySelectorAll(".answer")
    .forEach(button => {

      button.disabled = true;

      if (
        button.textContent ===
        item.a[item.c]
      ) {
        button.classList.add("correct");
      }

    });

  if (!correct) {
    btn.classList.add("wrong");
  }

  const feedback =
    $("feedback");

  feedback.textContent =
    (correct ? "Richtig. " : "Noch nicht. ") +
    item.e;

  feedback.className =
    `feedback ${correct ? "ok" : "bad"}`;

  $("scoreLive").textContent =
    `${score} ${score === 1 ? "Punkt" : "Punkte"}`;

  $("nextBtn").classList.remove("hidden");

}


// ============================================================
// NÄCHSTE FRAGE
// ============================================================

$("nextBtn").onclick = () => {

  idx++;

  if (idx < quiz.length) {

    renderQuestion();

  } else {

    finish();

  }

};


// ============================================================
// TEST BEENDEN + SUPABASE
// ============================================================

async function finish() {

  show($("resultScreen"));

  const pct =
    Math.round(
      (score / quiz.length) * 100
    );

  $("percent").textContent =
    `${pct}%`;

  $("resultRing").style.background =
    `conic-gradient(
      var(--accent) ${pct * 3.6}deg,
      #ececf3 0deg
    )`;


  // Ergebnistext

  const resultText =
    $("resultText");

  if (resultText) {

    resultText.textContent =
      `${score} von ${quiz.length} Fragen richtig beantwortet.`;

  }


  // Themenauswertung

  const topicBox =
    $("topicResults");

  if (topicBox) {

    topicBox.innerHTML = "";

    Object.entries(topicStats)
      .forEach(([topic, stats]) => {

        const row =
          document.createElement("div");

        row.className =
          "topic-result";

        row.textContent =
          `${topic}: ${stats.right} / ${stats.total}`;

        topicBox.appendChild(row);

      });

  }


  // ========================================================
  // SUPABASE SPEICHERN
  // ========================================================

  const saveStatus =
    $("saveStatus");

  if (!dbEnabled || !db) {

    if (saveStatus) {

      saveStatus.textContent =
        "Supabase ist nicht verbunden.";

    }

    return;

  }


  const studentNameElement =
    $("studentName");

  const name =
    studentNameElement
      ? studentNameElement.value
          .trim()
          .slice(0, 40) || "anonym"
      : "anonym";


  if (saveStatus) {

    saveStatus.textContent =
      "Ergebnis wird gespeichert …";

  }


  try {

    const { error } =
      await db
        .from("quiz_results")
        .insert({
          student_label: name,
          score: score,
          total: quiz.length,
          percentage: pct,
          topic_results: topicStats
        });


    if (error) {

      console.error(
        "Supabase-Fehler:",
        error
      );

      if (saveStatus) {

        saveStatus.textContent =
          "Supabase-Fehler: " +
          error.message;

      }

      return;

    }


    if (saveStatus) {

      saveStatus.textContent =
        "Ergebnis wurde gespeichert.";

    }

  } catch (error) {

    console.error(
      "Verbindungsfehler:",
      error
    );

    if (saveStatus) {

      saveStatus.textContent =
        "Verbindungsfehler: " +
        error.message;

    }

  }

}


// ============================================================
// START-BUTTON
// ============================================================

const startButton =
  $("startBtn");

if (startButton) {

  startButton.onclick =
    startQuiz;

}


// ============================================================
// NEU STARTEN
// ============================================================

const restartButton =
  $("restartBtn");

if (restartButton) {

  restartButton.onclick = () => {

    show($("startScreen"));

    const saveStatus =
      $("saveStatus");

    if (saveStatus) {
      saveStatus.textContent = "";
    }

  };

}
