/**
 * Kovai Legal Associates — Appointment Scheduler backend.
 *
 * This script receives appointment requests from the website form
 * and appends each one as a new row in a Google Sheet.
 *
 * SETUP: see SETUP-INSTRUCTIONS.md for the full step-by-step guide.
 */

const SHEET_NAME = "Appointments";

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data["Submitted At"] || new Date(),
    data["Full Name"] || "",
    data["Phone"] || "",
    data["Email"] || "",
    data["Preferred Date"] || "",
    data["Preferred Time"] || "",
    data["Consultation Type"] || "",
    data["Matter Type"] || "",
    data["Note"] || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Submitted At",
      "Full Name",
      "Phone",
      "Email",
      "Preferred Date",
      "Preferred Time",
      "Consultation Type",
      "Matter Type",
      "Note"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}
