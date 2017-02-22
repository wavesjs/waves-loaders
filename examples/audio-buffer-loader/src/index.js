import * as loaders from '../../../dist/index';

var myAudioBufferLoader = new loaders.AudioBufferLoader();

myAudioBufferLoader.onProgress((val) => console.log(val));

myAudioBufferLoader.load('assets/test.wav').then((buffer) => {
  console.log(buffer);
}).catch((error) => console.log(error));
