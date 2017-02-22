import * as loaders from '../../../dist/index';

console.log(loaders);

var myAudioBufferLoader = new loaders.SuperLoader();

myAudioBufferLoader.onProgress((val) => console.log(val));

myAudioBufferLoader.load(['assets/test.wav', 'assets/test.json'])
  .then((...data) => {
    console.log(...data);
  }).catch((err) => {
    console.error(err);
  });

