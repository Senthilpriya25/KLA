# Setting up Kovai Legal Associates website

You have three files:

- `index.html` — the whole website (one file, no build step)
- `assets/kovai-legal-associates-logo.png` — your logo, used in the header and footer
- `google-apps-script.gs` — the backend that writes form submissions into Google Sheets

## Part 1 — Connect the appointment form to Google Sheets

**1. Create the sheet**
Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet. Name it something like "Kovai Legal — Appointments."

**2. Open Apps Script**
In the sheet, go to **Extensions → Apps Script**. Delete any placeholder code in the editor.

**3. Paste the backend code**
Open `google-apps-script.gs` from this bundle, copy all of it, and paste it into the Apps Script editor. Save (Ctrl/Cmd + S).

**4. Deploy as a web app**
- Click **Deploy → New deployment**.
- Click the gear icon next to "Select type" and choose **Web app**.
- Set **Execute as**: "Me."
- Set **Who has access**: "Anyone."
- Click **Deploy**, and authorize the script when Google prompts you (click through the "unverified app" warning — this is expected for your own script).
- Copy the **Web app URL** it gives you. It looks like:
  `https://script.google.com/macros/s/XXXXXXXXXXXXXXXXX/exec`

**5. Paste the URL into the website**
Open `index.html`, find this line near the bottom (search for `GOOGLE_SCRIPT_URL`):

```js
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

Replace the placeholder text with the URL you copied, keeping the quotes:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXX/exec";
```

Save the file. Every submitted appointment request will now appear as a new row in an "Appointments" tab in your sheet, with a timestamp.

> If you ever edit `google-apps-script.gs` again later, you need to create a **new deployment** (or use "Manage deployments → Edit → New version") for the changes to take effect — editing the code alone doesn't update a live deployment.

## Part 2 — Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `kovai-legal-associates`).
2. Upload `index.html` to the root of the repository.
3. Create a folder named `assets` in the repository and upload `kovai-legal-associates-logo.png` into it, so the path is `assets/kovai-legal-associates-logo.png`.
4. Go to the repository's **Settings → Pages**.
5. Under "Build and deployment," set **Source** to "Deploy from a branch," choose the `main` branch and `/ (root)` folder, then save.
6. GitHub will give you a live URL shortly (usually `https://yourusername.github.io/kovai-legal-associates/`).

## Part 3 — Fill in your real details

Before publishing, search `index.html` for these placeholders and replace them with real information:

- `+91 XXXXX XXXXX` — office phone number (appears twice: `tel:` link and visible text)
- `contact@example.com` — office email (appears twice)
- The office address block in the **Contact** section, if you'd like a more specific address than "Coimbatore, Tamil Nadu"

## Notes

- The form intentionally does not collect confidential case details — this matches standard practice for a public-facing intake form and is stated to visitors.
- Because Google Apps Script doesn't return CORS headers, the site sends the form in "no-cors" mode. This means the browser can't confirm the exact server response, so the success message shows once the request is sent without a network error. If you want stronger delivery confirmation later, this can be upgraded to a small serverless function, but the Apps Script approach is reliable for a small firm's appointment volume at no cost.
