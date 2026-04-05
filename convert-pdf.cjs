const fs = require('fs');
const path = require('path');

// Use pdfjs-dist legacy build for Node.js (no canvas dependency)
async function convertPdf() {
  try {
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');
    console.log('pdfjs loaded');
  } catch(e) {
    console.log('pdfjs not available:', e.message);
  }
}

// Alternative: just copy the screenshot we already have
const src = path.join('C:\\Users\\MICRO-26\\.gemini\\antigravity\\brain\\3a2c4f83-d59f-4864-842c-35abdc7a62b0\\concert_ticket_pdf_screenshot_1775370276327.png');
const dest = path.join(__dirname, 'public', 'cultural-ticket.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Copied screenshot to public/cultural-ticket.png');
} else {
  console.log('Screenshot not found at:', src);
  // List what's available
  const dir = 'C:\\Users\\MICRO-26\\.gemini\\antigravity\\brain\\3a2c4f83-d59f-4864-842c-35abdc7a62b0';
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.includes('concert') || f.includes('ticket') || f.includes('pdf'));
    console.log('Available files:', files);
  }
}
