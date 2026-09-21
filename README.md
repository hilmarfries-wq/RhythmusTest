# Rhythmus-Check EF

Interaktiver Multiple-Choice-Test für die Einführungsphase (EF) zu Metrum, Takt und Rhythmus. Enthalten sind Notenwerte, Punktierung, Triole, Synkope und Auftakt.

## Dateien

- `index.html` – Oberfläche
- `style.css` – responsives Design
- `script.js` – Fragen, Auswertung und Supabase-Anbindung
- `supabase.sql` – Tabelle + sichere RLS-Regeln
- `.nojekyll` – sorgt für unkompliziertes statisches Hosting auf GitHub Pages

## 1. Supabase einrichten

1. Neues Supabase-Projekt erstellen.
2. Im SQL Editor den Inhalt von `supabase.sql` ausführen.
3. In den Projekteinstellungen die **Project URL** und den **Publishable Key** (bzw. den für Browser vorgesehenen anon key) kopieren.
4. In `script.js` diese beiden Platzhalter ersetzen:

```js
const SUPABASE_URL = "DEINE_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "DEIN_SUPABASE_PUBLISHABLE_KEY";
```

**Wichtig:** Niemals den `service_role` Key in `script.js`, GitHub oder anderen Browser-Code eintragen.

Die mitgelieferten RLS-Regeln erlauben öffentlichen Besuchern nur das Eintragen eines Ergebnisses. Es gibt absichtlich keine öffentliche SELECT-, UPDATE- oder DELETE-Berechtigung. Die Ergebnisse siehst du im Supabase Dashboard.

## 2. Lokal testen

Du kannst `index.html` direkt öffnen. Für einen realistischeren Test empfiehlt sich ein kleiner lokaler HTTP-Server, z. B. über VS Code Live Server.

Ohne Supabase-Konfiguration funktioniert das Quiz ebenfalls; nur die Speicherung ist dann deaktiviert.

## 3. Auf GitHub Pages veröffentlichen

1. Neues GitHub-Repository anlegen, z. B. `musik-quiz-ef`.
2. Alle Dateien aus diesem Ordner in das Repository hochladen.
3. Repository → **Settings → Pages**.
4. Als Quelle den Branch `main` und den Root-Ordner `/` auswählen.
5. Speichern und die von GitHub angezeigte Pages-Adresse öffnen.

## Datenschutz / Schule

Das Namensfeld ist bewusst optional und kann auch nur mit einem Kürzel genutzt werden. Für schulische Nutzung solltest du festlegen, welche Daten wirklich benötigt werden, wie lange Ergebnisse gespeichert werden und wer Zugriff darauf hat. Wenn du gar keine personenbezogenen Daten brauchst, lass die Lernenden nur anonyme Kürzel verwenden oder entferne das Eingabefeld.

## Anpassungen

Die Fragen stehen in `script.js` im Array `questions`. Dort kannst du weitere Fragen ergänzen. Jede Frage hat ein Thema (`topic`), die Frage (`q`), vier Antworten (`a`), den Index der richtigen Antwort (`c`, beginnend bei 0) und eine Erklärung (`e`).

## Lehrerbereich mit Passwort

Der Lehrerbereich liegt unter `teacher.html`. Er verwendet **Supabase Auth (E-Mail + Passwort)**; das Passwort steht also nicht im GitHub-Code.

1. Führe die aktuelle `supabase.sql` im Supabase SQL Editor aus.
2. Öffne in Supabase **Authentication → Users** und lege dein Lehrerkonto mit E-Mail und Passwort an.
3. Kopiere die UUID des angelegten Users.
4. Führe im SQL Editor aus (UUID ersetzen):

```sql
insert into public.teacher_users (user_id)
values ('HIER-DIE-USER-UUID-EINTRAGEN')
on conflict (user_id) do nothing;
```

5. Trage in `teacher.js` dieselbe `SUPABASE_URL` und denselben Publishable/Anon Key wie in `script.js` ein.
6. Lass öffentliche Registrierung deaktiviert, wenn ausschließlich von dir angelegte Lehrerkonten verwendet werden sollen.

Der Lehrerbereich zeigt bis zu 500 aktuelle Testdurchgänge, Durchschnittswert, letzten Eintrag und die Themenauswertung. Die Datenbank-Regel (RLS) prüft serverseitig, ob die angemeldete User-ID in `teacher_users` steht. Ein bloßes Aufrufen von `teacher.html` reicht daher nicht zum Lesen der Ergebnisse.
