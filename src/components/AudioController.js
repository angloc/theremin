export const AudioController = {
  schema: {
    baseFrequency: { type: 'number', default: 432 },
    octaveRange: { type: 'number', default: 1 }
  },

  init: function() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.oscillator = null;
    this.isPlaying = false;
    this.maxVolume = 0.5;
    this.currentDistance = 1;
    
    // Initialize with base frequency (432Hz at y=0)
    const initialY = parseFloat(document.getElementById('y-distance')?.value || 0);
    this.currentFrequency = 432 * Math.pow(2, initialY);

    this.playButton = document.querySelector('.audio-control');
    this.volumeSlider = document.getElementById('volume');
    this.volumeValue = document.getElementById('volume-value');

    if (this.playButton) {
      this.playButton.addEventListener('click', () => this.toggleAudio());
    }
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', () => this.updateMaxVolume());
    }

    this.updateMaxVolume();
  },

  updateFrequency: function(frequency) {
    this.currentFrequency = frequency;
    if (!this.isPlaying || !this.oscillator) return;
    
    const now = this.audioContext.currentTime;
    this.oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(20, Math.min(20000, frequency)), 
      now + 0.1
    );
  },

  updateMaxVolume: function() {
    if (!this.volumeSlider) return;
    this.maxVolume = this.volumeSlider.value / 100;
    if (this.volumeValue) {
      this.volumeValue.textContent = `${Math.round(this.maxVolume * 100)}%`;
    }
    this.updateVolume();
  },

  updateDistanceVolume: function(distance) {
    this.currentDistance = distance;
    this.updateVolume();
  },

  updateVolume: function() {
    if (!this.gainNode || !this.isPlaying) return;
    
    const minDistance = 0.1;
    const maxDistance = 2;
    const volumeScale = Math.max(0, Math.min(1, 
      1 - (this.currentDistance - minDistance) / (maxDistance - minDistance)
    ));
    const volume = this.maxVolume * volumeScale;
    
    const now = this.audioContext.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
  },

  toggleAudio: function() {
    if (!this.isPlaying) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.connect(this.gainNode);
      
      this.oscillator.frequency.setValueAtTime(
        this.currentFrequency,
        this.audioContext.currentTime
      );
      
      this.oscillator.start();
      this.isPlaying = true;
      if (this.playButton) {
        this.playButton.textContent = 'Stop';
      }
      this.updateVolume();
    } else {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      this.isPlaying = false;
      if (this.playButton) {
        this.playButton.textContent = 'Play';
      }
    }
  },

  remove: function() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
};