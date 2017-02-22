import * as loaders from '../../../dist/index';

var myAudioBufferLoader = new loaders.AudioBufferLoader();

myAudioBufferLoader.onProgress((val) => console.log(val));

// myAudioBufferLoader.load('assets/silent.wav').then((buffer) => {
//   console.log(buffer);
// }).catch((err) => console.error(err.stack));

myAudioBufferLoader.load('assets/test.ogg')
  .then((buffer) => {
    console.log(buffer);
  }).catch((err) => {
    console.error(err);
  });

myAudioBufferLoader.load('assets/test.aiff')
  .then((buffer) => {
    console.log(buffer);
  }).catch((err) => {
    console.error(err);
  });


// const worker = new Worker('dist/worker.js');

// fail should occur at the end
// myAudioBufferLoader.load().then((buffer) => {
//   console.log(buffer);
// }).catch((error) => console.log(error));

