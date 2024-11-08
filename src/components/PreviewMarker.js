export const PreviewMarker = {
  init: function() {
    this.audioController = this.el.components['audio-controller'];
    this.xSlider = document.getElementById('x-distance');
    this.ySlider = document.getElementById('y-distance');
    this.zSlider = document.getElementById('z-distance');
    this.coordinates = document.getElementById('coordinates');
    
    if (this.xSlider) this.xSlider.addEventListener('input', () => this.updateFromSliders());
    if (this.ySlider) this.ySlider.addEventListener('input', () => this.updateFromSliders());
    if (this.zSlider) this.zSlider.addEventListener('input', () => this.updateFromSliders());
    
    // Set initial camera position
    this.updateFromSliders();
  },

  updateFromSliders: function() {
    if (!this.xSlider || !this.ySlider || !this.zSlider) return;

    const x = parseFloat(this.xSlider.value);
    const y = parseFloat(this.ySlider.value);
    const z = parseFloat(this.zSlider.value);

    // Update camera position
    const camera = document.getElementById('camera');
    if (camera) {
      camera.setAttribute('position', { x, y, z });
      camera.setAttribute('look-at', '0 0.05 0');
    }

    // Calculate horizontal distance for volume (using only x and z)
    const horizontalDistance = Math.sqrt(x * x + z * z);

    // Calculate frequency based on height (y)
    // C above middle C is 523.25 Hz
    // At y=0, frequency should be 432 Hz
    const baseFreq = 432; // A4 note
    const semitoneRatio = Math.pow(2, 1/12);
    const semitonesFromA4toC5 = 3; // Distance from A4 to C5
    const C5 = baseFreq * Math.pow(semitoneRatio, semitonesFromA4toC5);
    const freq = C5 * Math.pow(2, y);

    // Update display
    if (this.coordinates) {
      this.coordinates.innerHTML = `Distance: x: ${x.toFixed(2)}m, y: ${y.toFixed(2)}m, z: ${z.toFixed(2)}m<br>` +
                                 `Ground Distance: ${horizontalDistance.toFixed(2)}m<br>` +
                                 `Frequency: ${freq.toFixed(1)}Hz`;
    }

    // Update audio
    console.log("Audio controller")
    if (this.audioController) {
      this.audioController.updateFrequency(freq);
      this.audioController.updateDistanceVolume(horizontalDistance);
    }
  },

  remove: function() {
    if (this.xSlider) this.xSlider.removeEventListener('input', this.updateFromSliders);
    if (this.ySlider) this.ySlider.removeEventListener('input', this.updateFromSliders);
    if (this.zSlider) this.zSlider.removeEventListener('input', this.updateFromSliders);
  }
};