const ARMode = {
  schema: {},
  
  init: function() {
    this.markerVisible = false;
    this.messageEl = null;
    this.setupMessageDisplay();
    
    // Wait for scene to load before accessing AR system
    this.el.sceneEl.addEventListener('loaded', () => {
      this.showMessage();
    });
  },

  setupMessageDisplay: function() {
    this.messageEl = document.createElement('div');
    this.messageEl.className = 'ar-message';
    this.messageEl.textContent = "Looking for Hiro marker...";
    document.body.appendChild(this.messageEl);
    this.hideMessage(); // Initially hidden
  },

  showMessage: function() {
    if (this.messageEl) {
      this.messageEl.style.display = 'block';
    }
  },

  hideMessage: function() {
    if (this.messageEl) {
      this.messageEl.style.display = 'none';
    }
  },

  tick: function() {
    const marker = this.el.closest('a-marker');
    if (!marker) return;

    const newVisibility = marker.object3D.visible;
    if (newVisibility !== this.markerVisible) {
      this.markerVisible = newVisibility;
      if (this.markerVisible) {
        this.hideMessage();
      } else {
        this.showMessage();
      }
    }
  },

  remove: function() {
    if (this.messageEl && this.messageEl.parentNode) {
      this.messageEl.parentNode.removeChild(this.messageEl);
    }
  }
};

// Register the component with A-Frame
AFRAME.registerComponent('ar-mode', ARMode);