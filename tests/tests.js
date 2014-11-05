// Test dependencies
chai = require('chai');
sinon = require("sinon");
AudioContext = require('web-audio-api').AudioContext;
XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;
require("native-promise-only");

// Kind of hack, may be a better solutions exist
window = global;

var static = require('node-static');

// Set up a static file server for testing purposes (response to XMLHttpRequest)
var fileServer = new static.Server('./tests');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);

Loader = require('../loaders.js').Loader;
AudioBufferLoader = require('../loaders.js').AudioBufferLoader;
SuperLoader = require('../loaders.js').SuperLoader;

var assert = chai.assert;
var audioContext = new AudioContext();
var synth = 'http://localhost:8080/synth.wav';
var synt = 'http://localhost:8080/synt.wav';
var json = 'http://localhost:8080/test.json';


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
  var validBuffer; // To have access to a valid buffer in tests

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done) {
    var progression = 0;

    function onProgress(val) {
      progression = val;
    }
    myBufferLoader.progressCallback = onProgress;
    myBufferLoader.fileLoadingRequest(synth).then(
      function(buffer) {
        // Should be sure it's the right buffer, well, we guess it is.
        validArrayBuffer = buffer;
        // We check that the progress event finally reached 1.
        assert.isTrue(progression > 0);
        done();
      });
  });

  it('Test fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', function(done) {
    myBufferLoader.fileLoadingRequest(synt).then(
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
        validBuffer = buffer;
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
        assert.isTrue(progress_steps[0] > 0);
        assert.isTrue(progress_steps[1] > 0);
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
    chai.expect(myBufferLoader.load).to.throw('Missing parameter');
    done();
  });

  it("Test load function for one url", function(done) {
    sinon.spy(myBufferLoader, 'loadOne');
    myBufferLoader.load('http://localhost:8080/synth.wav').then(
      function(buffer) {
        assert.isTrue(myBufferLoader.loadOne.calledOnce);
        done();
      }
    );
  });

  it("Test load function for more than one url", function(done) {
    sinon.spy(myBufferLoader, 'loadAll');
    myBufferLoader.load([synth, synth]).then(
      function(buffer) {
        assert.isTrue(myBufferLoader.loadAll.calledOnce);
        done();
      }
    );
  });

  it("Test emit xmlhttprequest event for each new request", function(done) {
    var xmlhttprequestCalls = 0;
    myBufferLoader.on('xmlhttprequest', function(request) {
      xmlhttprequestCalls += 1;
    });
    myBufferLoader.load([synth, synth]).then(function(buffer) {
      assert.equal(xmlhttprequestCalls, 2);
      done();
    });
  });

  it("Should wrap around extension correctly", function(done){
    var wrapAroundExtension = 1;
    myBufferLoader.options = {};
    myBufferLoader.options.wrapAroundExtension = wrapAroundExtension;
    var outputBuffer = myBufferLoader.__wrapAround(validBuffer);
    var initialLength = validBuffer.length;
    assert.equal(outputBuffer.length, initialLength+validBuffer.sampleRate * wrapAroundExtension);
    for(var ch = 0; ch<validBuffer.numberOfChannels; ch++){
      inChArray = validBuffer.getChannelData(ch);
      outChArray = outputBuffer.getChannelData(ch);
      for(var i=0; i<validBuffer.sampleRate * wrapAroundExtension; i++){
        assert.equal(outChArray[initialLength+i], inChArray[i]);
      }
    }
    done();
  });

});

describe("SuperLoader", function() {
  var polyLoader = new SuperLoader();
  it("Should load correctly audio files and json files", function(done) {
    polyLoader.load([json, synth, json, synth]).then(
      function(files) {
        assert.equal(files.length, 4);
        // should assert files are correct ...
        done();
      },
      function(error) {}
    );
  });
  it("Should load correctly one type of files (only jsons, or only audios)", function(done) {
    polyLoader.load([json, json]).then(
      function(files) {
        assert.equal(files.length, 2);
        done();
      },
      function(error) {}
    );
  });
});
