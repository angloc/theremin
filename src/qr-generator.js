import qrcode from 'qrcode-generator';

// Generate QR code that links to the AR experience
const qr = qrcode(0, 'L');
const currentURL = window.location.href;
qr.addData(currentURL);
qr.make();

// Create a download link for the QR code
const downloadLink = document.createElement('a');
downloadLink.href = qr.createDataURL(10);
downloadLink.download = 'ar-tracker-qr.png';
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);