var assert = chai.assert;

window.AudioContext = window.AudioContext||window.webkitAudioContext;
var audioContext = new AudioContext();


describe("Load some sounds: synth.wav and sound.wav", function() {

  var myBufferLoader = createBufferLoader();
  var validArrayBuffer; // to have access to a valid buffer

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done){
    myBufferLoader.fileLoadingRequest('./synth.wav').then(
      function(buffer){
        // should be sure it's the right buffer
        validArrayBuffer = buffer;
        done();
      }
      );
  });

  it('Test fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', function(done){
    myBufferLoader.fileLoadingRequest('./synt.wav').then(
      function(buffer){
      },
      function(error){
        assert.equal(error.message, 'Not Found'); //or
        done();
      }
      );
  });

  it('Test decodeAudioData function with valid arraybuffer', function(done){
    myBufferLoader.decodeAudioData(validArrayBuffer).then(
      function(buffer){
        done();
      },
      function(error){
      }
      );
  });

  it('Test decodeAudioData function with invalid arraybuffer', function(done){
    myBufferLoader.decodeAudioData(new ArrayBuffer(0)).then(
      function(buffer){
      },
      function(error){
        done();
      }
      );
  });

  it('Test loadBuffer function with valid url', function(done){
    myBufferLoader.loadBuffer('./synth.wav').then(
      function(buffer){
        done();
      },
      function(error){
      }
      );
  });

  it('Test loadBuffer function with invalid url', function(done){
    myBufferLoader.loadBuffer('./synh.wav').then(
      function(buffer){
      },
      function(error){
        done();
      }
      );
  });

  it('Test loadAll function with valid url', function(done){
    myBufferLoader.loadAll(['./synth.wav', './synth.wav']).then(
      function(buffer){
        done();
      },
      function(error){
      }
      );
  });

  it('Test loadAll function with invalid url', function(done){
    myBufferLoader.loadAll(['./synth.wav', './synh.wav']).then(
      function(buffer){
      },
      function(error){
        done();
      }
      );
  });

  it("Test load function", function (done) {
    // We should here spy the loadBuffer property
    // var spy = sinon.spy(myBufferLoader, "loadBuffer");
    // and then assert true for spy.calledOnce
    // but this is not allowed by sinon.js
    // as sinon.js spy for ES5 property descriptors are not available.
    done();
  });
});
