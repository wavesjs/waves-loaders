var chai = require('chai');
var assert = require('assert');
var sinon = require("sinon");
var audioContext = new AudioContext();

var Loader = require('../es6/loader');
var AudioBufferLoader = require('../es6/audio-buffer-loader');
var SuperLoader = require('../es6/super-loader');
// var Loader = require('../waves-loaders').Loader;
// var AudioBufferLoader = require('../waves-loaders').AudioBufferLoader;
// var SuperLoader = require('../waves-loaders').SuperLoader;

// Some urls with available - or not - files (json, wav)

var synth = 'http://upload.wikimedia.org/wikipedia/commons/4/4d/Continuity_proof.ogg';
var json = 'https://rawgit.com/Ircam-RnD/loaders/master/tests/test.json';
var synt = 'synt.wav';

// Create a valid buffer for testing purposes
var bufferSize = 2 * audioContext.sampleRate;
var validBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
var output = validBuffer.getChannelData(0);
for (var i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}

describe("Loader", function() {
  var loader = new Loader('json');
  it("Should load json file with a Promise", function(done) {
    loader.load(json).then(function(json) {
      assert.equal(json.foo, 'bar');
      done();
    }, function(error) {});
  });
});

describe("AudioBufferLoader", function() {
  var myBufferLoader = new AudioBufferLoader();
  var validArrayBuffer; // To have access to a valid arraybuffer in tests

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done) {
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
        done();
      });
  });

  it('Test fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', function(done) {
    myBufferLoader.fileLoadingRequest(synt).then(
      function(buffer) {},
      function(error) {
        //assert.equal(error.message, 'Not Found');
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

  it('Test loadOne function with valid url', function(done) {
    myBufferLoader.loadOne(synth).then(
      function(buffer) {
        done();
      },
      function(error) {}
    );
  });

  it('Test loadOne function with invalid url', function(done) {
    myBufferLoader.loadOne(synt).then(
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
    myBufferLoader.loadAll([synth, synth]).then(
      function(buffer) {
        // Check that all the progress events is not 0.
        assert.equal(progress_steps[0] > 0, true);
        assert.equal(progress_steps[1] > 0, true);
        done();
      },
      function(error) {});
  });

  it('Test loadAll function with invalid url', function(done) {
    myBufferLoader.loadAll([synth, synt]).then(
      function(buffer) {},
      function(error) {
        done();
      });
  });

  it("Test load function without any parameters", function(done) {
    //chai.expect(myBufferLoader.load).to.throw('Missing parameter');
    assert.throws(function() {
      myBufferLoader.load();
    }, Error);
    done();
  });

  it("Test load function for one url", function(done) {
    sinon.spy(myBufferLoader, 'loadOne');
    myBufferLoader.load(synth).then(
      function(buffer) {
        assert.equal(myBufferLoader.loadOne.calledOnce, true);
        done();
      }
    );
  });

  it("Test load function for more than one url", function(done) {
    sinon.spy(myBufferLoader, 'loadAll');
    myBufferLoader.load([synth, synth]).then(
      function(buffer) {
        assert.equal(myBufferLoader.loadAll.calledOnce, true);
        done();
      }
    );
  });

  // it("Test emit xmlhttprequest event for each new request", function(done) {
  //   var xmlhttprequestCalls = 0;
  //   myBufferLoader.on('xmlhttprequest', function(request) {
  //     xmlhttprequestCalls += 1;
  //   });
  //   myBufferLoader.load([synth, synth]).then(function(buffer) {
  //     assert.equal(xmlhttprequestCalls, 2);
  //     done();
  //   });
  // });

  it("Should wrap around extension correctly", function(done) {
    //
    var wrapAroundExtension = 1;
    myBufferLoader.options = {};
    myBufferLoader.options.wrapAroundExtension = wrapAroundExtension;
    var outputBuffer = myBufferLoader.__wrapAround(validBuffer);
    var initialLength = validBuffer.length;
    assert.equal(outputBuffer.length, initialLength + validBuffer.sampleRate * wrapAroundExtension);
    for (var ch = 0; ch < validBuffer.numberOfChannels; ch++) {
      var inChArray = validBuffer.getChannelData(ch);
      var outChArray = outputBuffer.getChannelData(ch);
      for (var i = 0; i < validBuffer.sampleRate * wrapAroundExtension; i++) {
        assert.equal(outChArray[initialLength + i], inChArray[i]);
      }
    }
    done();
  });

});

describe("SuperLoader", function() {
  var polyLoader = new SuperLoader();
  it("Should load correctly one single file", function(done){
    function onProgress(obj) {
      // Here we could test total loaded values
      //console.log(obj)
    }
    polyLoader.progressCallback = onProgress;
    polyLoader.load(json).then(
      function(file){
        // should assert files are correct ...
        done();
      }
    );
  });
  it("Should load correctly audio files and json files", function(done) {
    function onProgress(obj) {
      // Here we could test total loaded values
      //console.log(obj)
    }
    polyLoader.progressCallback = onProgress;
    polyLoader.load([json, synth, json, synth]).then(
      function(files) {
        assert.equal(files.length, 4);
        // should assert files are correct ...
        done();
      },
      function(error) {
        console.log(error);
      }
    );
  });
  it("Should load correctly one type of files (only jsons, or only audios)", function(done) {
    var filesToLoad = [json, json];
    function onProgress(obj) {
      // Here we could test total loaded values
      //console.log(obj)
    }
    polyLoader.progressCallback = onProgress;
    polyLoader.load(filesToLoad).then(
      function(files) {
        assert.equal(files.length, 2);
        done();
      },
      function(error) {
        console.log(error);
      }
    );
  });
});
