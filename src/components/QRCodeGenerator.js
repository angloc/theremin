import QRCode from 'qrcode';

export const QRCodeGenerator = {
  init: async function() {
    await this.generateQRCode();
  },

  generateQRCode: async function() {
    try {
      const currentURL = window.location.href;
      const qrcodeElement = document.getElementById('qrcode');
      qrcodeElement.innerHTML = '';
      
      const canvas = document.createElement('canvas');
      canvas.style.display = 'block'; // Ensure canvas is visible
      canvas.style.width = '128px';
      canvas.style.height = '128px';
      
      await QRCode.toCanvas(canvas, currentURL, {
        width: 128,
        height: 128,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      
      qrcodeElement.appendChild(canvas);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
};