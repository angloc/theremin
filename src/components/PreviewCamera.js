export const PreviewCamera = {
  init: function() {
    this.setupPreviewControls();
    
    // Set initial position
    this.updatePosition();
  },

  setupPreviewControls: function() {
    const xSlider = document.getElementById('x-distance');
    const ySlider = document.getElementById('y-distance');
    const zSlider = document.getElementById('z-distance');

    if (xSlider) xSlider.addEventListener('input', this.updatePosition.bind(this));
    if (ySlider) ySlider.addEventListener('input', this.updatePosition.bind(this));
    if (zSlider) zSlider.addEventListener('input', this.updatePosition.bind(this));
  },

  updatePosition: function() {
    const xSlider = document.getElementById('x-distance');
    const ySlider = document.getElementById('y-distance');
    const zSlider = document.getElementById('z-distance');

    if (!xSlider || !ySlider || !zSlider) return;

    const x = parseFloat(xSlider.value);
    const y = parseFloat(ySlider.value);
    const z = parseFloat(zSlider.value);

    this.el.setAttribute('position', { x, y, z });
    
    // Always look at the cube
    this.el.setAttribute('look-at', '0 0.05 0');
  }
};