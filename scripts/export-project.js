import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { join } from 'path';

// Create a file to stream archive data to
const output = createWriteStream('ar-distance-tracker-backup.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`Archive created! Total size: ${archive.pointer()} bytes`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    'dist/**',
    '*.zip',
    '.git/**'
  ]
});

// Finalize the archive
archive.finalize();