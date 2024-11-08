import { PreviewCamera } from './components/PreviewCamera.js';
import { PreviewMarker } from './components/PreviewMarker.js';
import { AudioController } from './components/AudioController.js';

// Register all components before scene initialization
AFRAME.registerComponent('preview-camera', PreviewCamera);
AFRAME.registerComponent('preview-marker', PreviewMarker);
AFRAME.registerComponent('audio-controller', AudioController);