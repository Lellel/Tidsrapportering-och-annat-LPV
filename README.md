# ⏱️ Tidrapportering – "JAS 39 Gripen"

En extremt driftsäker, snabb och "offline-first" PWA (Progressive Web App) för fältpersonal. 

Projektet är byggt med filosofin att fältpersonal ska spendera minimal tid framför skärmen. Systemet ska vara blixtsnabbt, kräva så få klick som möjligt och framför allt – det ska fungera felfritt även djupt nere i källare eller ute i skogen där internetuppkoppling saknas.

## 🏗️ Systemarkitektur

För att hålla systemet snabbt, underhållsfritt och utan löpande licenskostnader använder vi en lättviktig stack:

* **Frontend:** Vanilla HTML5, CSS3 och JavaScript. Inga tunga ramverk.
* **Backend:** Google Apps Script (`Kod.gs`).
* **Databas:** Google Kalkylark (agerar master för användare, behörigheter och inkomna tidrapporter).
* **Hosting & CI/CD:** Källkoden hostas på GitHub och serveras via GitHub Pages. Uppdateringar görs i en separat `dev`-gren och pushas manuellt till produktion (`main`) via GitHub Actions.

## 🧠 Smarta lösningar & "Gotchas" (Läs detta innan du ändrar koden)

För att få systemet så robust som det är idag har vi implementerat ett par speciallösningar som är viktiga att förstå:

### 1. Outbox-motorn (Offline-first)
Appen skickar inte data direkt till servern. Istället läggs varje rapport och bild i webbläsarens `localStorage` (som en "Utkorg"). Appen bevakar sedan enhetens nätverksstatus. Så fort telefonen har internetuppkoppling (direkt, eller timmar senare) betar den av utkorgen i bakgrunden. Detta garanterar 100 % leveranssäkerhet.

### 2. Bildkomprimering på klientsidan
Eftersom kvoten för `localStorage` i mobila webbläsare ofta är begränsad (ca 5MB), och Apple-enheter tar stora foton, komprimeras alla bilder direkt i telefonen *innan* de hamnar i utkorgen. Vi använder HTML5 Canvas för att skala ner bilderna till max 1280px och ca 70% JPEG-kvalitet.

### 3. iOS/Safari-hacket (Dold iFrame)
För att undvika CORS-problem och förhindra att Google Apps Script tvingar fram en omdirigering (vilket raderar appens state), skickas all data iväg via en dold HTML `<iframe>`. Detta säkerställer en helt sömlös upplevelse i iOS utan sidladdningar.

### 4. Miljöhantering (`config.js`)
För att kunna utveckla utan att förstöra riktig faktureringsdata har vi separerat konfigurationen. Filen `config.js` styr vilken Google Apps Script-URL som appen pratar med, vilket gör det enkelt att växla mellan Test-miljö och Live-miljö.

## 🚀 Framtida Roadmap (Aktuellt)
* **Behörighetsstyrd Fakturadashboard:** En iPad/Landscape-vy där administratörer kan pricka av ofakturerade timmar (styrs via kryssrutor i Google-arket).
* **Magic Link Login:** Smidig, lösenordsfri inloggning via e-postlänk som verifierar och låser appen till rätt användare lokalt på enheten för att bevara offline-funktionaliteten.

---
*Dokumentationen uppdateras löpande i takt med att nya systemkritiska funktioner rullas ut.*
