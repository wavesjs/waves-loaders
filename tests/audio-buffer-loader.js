const test = require('tape');
const sinon = require('sinon');

import AudioBufferLoader from '../src/audio-buffer-loader';


var audioContext = new AudioContext();
var myBufferLoader = new AudioBufferLoader();
var validArrayBuffer; // To have access to a valid arraybuffer in tests

var synth = './tests/assets/guitar.wav';
var synt = 'synt.wav';

// Create a valid buffer for testing purposes
var bufferSize = 2 * audioContext.sampleRate;
var validBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
var output = validBuffer.getChannelData(0);
for (var i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}


test('AudioBufferLoader - fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', (assert) => {
  var progression = 0;

  function onProgress(obj) {
    progression = obj.value;
  }
  myBufferLoader.progressCallback = onProgress;
  myBufferLoader.fileLoadingRequest(synth).then(
    function(buffer) {
      // Should be sure it's the right buffer, well, we guess it is.
      validArrayBuffer = buffer;
      // We check that the progress event finally reached 1.
      assert.equal(progression > 0, true);
      assert.end();
    });
});

test('AudioBufferLoader - fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', (assert) => {
  myBufferLoader.fileLoadingRequest(synt).then(
    function(buffer) {},
    function(error) {
      //assert.equal(error.message, 'Not Found');
      assert.end();
    }
  );
});

test('AudioBufferLoader - decodeAudioData function with valid arraybuffer', (assert) => {
  validArrayBuffer.numBuffers = 2;
  myBufferLoader.decodeAudioData(validArrayBuffer).then(
    function(buffer) {
      assert.end();
    },
    function(error) {}
  );
});

test('AudioBufferLoader - decodeAudioData function with invalid arraybuffer', (assert) => {
  myBufferLoader.decodeAudioData(new ArrayBuffer(0)).then(
    function(buffer) {},
    function(error) {
      assert.end();
    }
  );
});

test('AudioBufferLoader - loadOne function with valid url', (assert) => {
  myBufferLoader.loadOne(synth).then(
    function(buffer) {
      assert.end();
    },
    function(error) {}
  );
});

test('AudioBufferLoader - loadOne function with invalid url', (assert) => {
  myBufferLoader.loadOne(synt).then(
    function(buffer) {},
    function(error) {
      assert.end();
    }
  );
});

test('AudioBufferLoader - loadAll function with valid url', (assert) => {
  var progress_steps = [];

  function onProgress(val) {
    progress_steps[val.index] = val.value;
  }
  myBufferLoader.progressCallback = onProgress;
  myBufferLoader.loadAll([synth, synth]).then(
    function(buffer) {
      // Check that all the progress events is not 0.
      assert.equal(progress_steps[0] > 0, true);
      assert.equal(progress_steps[1] > 0, true);
      assert.end();
    },
    function(error) {});
});

test('AudioBufferLoader - loadAll function with invalid url', (assert) => {
  myBufferLoader.loadAll([synth, synt]).then(
    function(buffer) {},
    function(error) {
      assert.end();
    });
});

test("AudioBufferLoader - load function without any parameters", (assert) => {
  //chai.expect(myBufferLoader.load).to.throw('Missing parameter');
  assert.throws(function() {
    myBufferLoader.load();
  }, Error);
  assert.end();
});

test("AudioBufferLoader - load function for one url", (assert) => {
  sinon.spy(myBufferLoader, 'loadOne');
  myBufferLoader.load(synth).then(
    function(buffer) {
      assert.equal(myBufferLoader.loadOne.calledOnce, true);
      assert.end();
    }
  );
});

test("AudioBufferLoader - load function for more than one url", (assert) => {
  sinon.spy(myBufferLoader, 'loadAll');
  myBufferLoader.load([synth, synth]).then(
    function(buffer) {
      assert.equal(myBufferLoader.loadAll.calledOnce, true);
      assert.end();
    }
  );
});

// test("AudioBufferLoader - emit xmlhttprequest event for each new request", function(done) {
//   var xmlhttprequestCalls = 0;
//   myBufferLoader.on('xmlhttprequest', function(request) {
//     xmlhttprequestCalls += 1;
//   });
//   myBufferLoader.load([synth, synth]).then(function(buffer) {
//     assert.equal(xmlhttprequestCalls, 2);
//     done();
//   });
// });

test("AudioBufferLoader - Should wrap around extension correctly", (assert) => {
  var bufferSize = 2 * audioContext.sampleRate;
  var noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  var output = noiseBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  //
  var wrapAroundExtension = 0.01;
  myBufferLoader.options = {};
  myBufferLoader.options.wrapAroundExtension = wrapAroundExtension;
  var outputBuffer = myBufferLoader.__wrapAround(noiseBuffer);
  var initialLength = noiseBuffer.length;
  assert.equal(outputBuffer.length, initialLength + noiseBuffer.sampleRate * wrapAroundExtension);
  for (var ch = 0; ch < noiseBuffer.numberOfChannels; ch++) {
    var inChArray = noiseBuffer.getChannelData(ch);
    var outChArray = outputBuffer.getChannelData(ch);
    for (var i = 0; i < noiseBuffer.sampleRate * wrapAroundExtension; i++) {
      assert.equal(outChArray[initialLength + i], inChArray[i]);
    }
  }
  assert.end();
});
