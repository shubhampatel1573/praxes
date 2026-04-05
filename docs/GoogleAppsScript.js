// ==========================================
// PRAXES 2K26-27 GOOGLE SHEETS WEBHOOK
// ==========================================
// Instructions for User:
// 1. Create a new Google Sheet inside your Google Drive.
// 2. Add these Headings to your columns (A to N):
//    Timestamp, Ticket ID, College Name, Event, Fee, Team Name,
//    Full Name, Department, Semester, Enrollment No, Contact No,
//    Email ID, Payment UPI, Payment Screenshot Link
// 3. Create a Folder in Google Drive named "PRAXES_RECEIPTS" (Ensure it's accessible).
// 4. Get the Folder ID from its URL (drive.google.com/drive/folders/YOUR_FOLDER_ID)
// 5. Get your Google Sheet ID from its URL (docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit)
// 6. Delete all code in your Apps Script and paste this entire file.
// 7. Replace "PUT_YOUR_SHEET_ID_HERE" with your actual Sheet ID!
// 8. Click "Deploy" -> "New deployment".
// 9. Choose "Web app", Execute as: "Me", Access: "Anyone".
// 10. Copy the "Web app URL" and place it in the `src/config.js` of your project!

var TARGET_FOLDER_ID = "1v89Kx5t1H9pDx1n6INyWytfP6lfm5umW";
var SHEET_ID = "1kUoAt0NsYzzaIK-6t6-r-tGrFLADEK30MJ4xX3SoiYc";

function doPost(e) {
  try {
    // We send payload as text/plain from React to bypass CORS preflight rules
    var data = JSON.parse(e.postData.contents);

    // Process the base64 image
    var fileUrl = "No file";
    if (data.paymentScreenshot && data.paymentScreenshot.includes('base64,')) {
      var base64Data = data.paymentScreenshot.split(",")[1];
      var contentType = data.paymentScreenshot.split(";")[0].split(":")[1];
      var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, data.ticketId + "_payment");

      var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // Open the Spreadsheet explicitly by ID
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    // Append the row mapping directly to data payload properties
    sheet.appendRow([
      new Date(),
      data.ticketId,
      data.collegeName,
      data.selectedEvent,
      data.eventFee,
      data.teamName || "N/A",
      data.fullName,
      data.department,
      data.semester,
      "'" + data.enrollmentNo, // Add quote to prevent rendering as scientific notation in Sheet
      "'" + data.contactNo,
      data.emailId,
      data.paymentUpiId,
      data.transactionId || "N/A"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "ticket": data.ticketId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

