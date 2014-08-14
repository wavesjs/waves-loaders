// Test dependencies
chai = require('chai');
sinon = require("sinon");
AudioContext = require('web-audio-api').AudioContext;
XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;
require("native-promise-only");

// Kind of hacks, may be a better solutions exist
window = global;

require('./static-server.js');
BufferLoader = require('../index.js');

var assert = chai.assert;
var audioContext = new AudioContext();


describe("Load some sounds", function() {
  var myBufferLoader = new BufferLoader();
  var validArrayBuffer; // To have access to a valid buffer in tests

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done) {
    var progression = 0;

    function onProgress(val) {
      progression = val;
    }
    myBufferLoader.progressCallback = onProgress;
    myBufferLoader.fileLoadingRequest('http://localhost:8080/synth.wav').then(
      function(buffer) {
        // Should be sure it's the right buffer, well, we guess it is.
        validArrayBuffer = buffer;
        // We check that the progress event finally reached 1.
        assert.isTrue(progression > 0);
        done();
      });
  });

  it('Test fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', function(done) {
    myBufferLoader.fileLoadingRequest('http://localhost:8080/synt.wav').then(
      function(buffer) {},
      function(error) {
        assert.equal(error.message, 'Not Found');
        done();
      }
    );
  });

  it('Test decodeAudioData function with valid arraybuffer', function(done) {
    validArrayBuffer.numBuffers = 2;
    myBufferLoader.decodeAudioData(validArrayBuffer).then(
      function(buffer) {
        done();
      },
      function(error) {}
    );
  });

  it('Test decodeAudioData function with invalid arraybuffer', function(done) {
    myBufferLoader.decodeAudioData(new ArrayBuffer(0)).then(
      function(buffer) {},
      function(error) {
        done();
      }
    );
  });

  it('Test loadBuffer function with valid url', function(done) {
    myBufferLoader.loadBuffer('http://localhost:8080/synth.wav').then(
      function(buffer) {
        done();
      },
      function(error) {}
    );
  });

  it('Test loadBuffer function with invalid url', function(done) {
    myBufferLoader.loadBuffer('http://localhost:8080/synh.wav').then(
      function(buffer) {},
      function(error) {
        done();
      }
    );
  });

  it('Test loadAll function with valid url', function(done) {
    var progress_steps = [];

    function onProgress(val) {
      progress_steps[val.index] = val.value;
    }
    myBufferLoader.progressCallback = onProgress;
    myBufferLoader.loadAll(['http://localhost:8080/synth.wav', 'http://localhost:8080/synth.wav']).then(
      function(buffer) {
        // Check that all the progress events is not 0.
        assert.isTrue(progress_steps[0] > 0);
        assert.isTrue(progress_steps[1] > 0);
        done();
      },
      function(error) {});
  });

  it('Test loadAll function with invalid url', function(done) {
    myBufferLoader.loadAll(['http://localhost:8080/synth.wav', 'http://localhost:8080/synh.wav']).then(
      function(buffer) {},
      function(error) {
        done();
      });
  });

  it("Test load function for one url", function(done) {
    sinon.spy(myBufferLoader, 'loadBuffer');
    myBufferLoader.load('http://localhost:8080/synth.wav').then(
      function(buffer) {
        assert.isTrue(myBufferLoader.loadBuffer.calledOnce);
        done();
      }
    );
  });

  it("Test load function for more than one url", function(done) {
    sinon.spy(myBufferLoader, 'loadAll');
    myBufferLoader.load(['http://localhost:8080/synth.wav', 'http://localhost:8080/synth.wav']).then(
      function(buffer) {
        assert.isTrue(myBufferLoader.loadAll.calledOnce);
        done();
      }
    );
  });

});
