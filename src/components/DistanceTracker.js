export const DistanceTracker = {
  init: function() {
    this.camera = document.querySelector('[camera]');
    this.coordinates = document.getElementById('coordinates');
    this.marker = this.el.closest('a-marker');
    this.audioController = this.el.components['audio-controller'];
    
    if (!this.marker || !this.camera || !this.coordinates) {
      console.warn('Required elements not found');
      return;
    }
  },

  tick: function() {
    if (!this.marker || !this.marker.object3D.visible) return;

    const markerPosition = this.marker.object3D.position;
    const cameraPosition = this.camera.object3D.position;
    const markerRotation = this.marker.object3D.rotation;
    
    const relativePosition = new THREE.Vector3();
    relativePosition.subVectors(cameraPosition, markerPosition);
    
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationFromEuler(markerRotation);
    relativePosition.applyMatrix4(rotationMatrix);

    // Update coordinates display
    const x = relativePosition.x.toFixed(2);
    const y = relativePosition.y.toFixed(2);
    const z = relativePosition.z.toFixed(2);
    
    this.coordinates.innerHTML = `
      Distance:<br>
      x: ${x}m, y: ${y}m, z: ${z}m<br>
      Frequency: ${this.getFrequency(y).toFixed(1)}Hz<br>
      Volume: ${this.getVolume(relativePosition).toFixed(2)}
    `;

    // Update audio if available
    if (this.audioController) {
      this.audioController.updateFrequency(y);
    }
  },

  getFrequency: function(height) {
    const baseFrequency = 432; // A4 note
    const octaveMultiplier = Math.pow(2, height);
    return baseFrequency * octaveMultiplier;
  },

  getVolume: function(position) {
    const distance = position.length();
    return Math.max(0, 1 - (distance - 0.1) / 0.9);
  }
};