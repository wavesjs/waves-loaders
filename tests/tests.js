var assert = chai.assert;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

describe("Load some sounds: synth.wav and sound.wav", function() {

  var myBufferLoader = createBufferLoader();
  var validArrayBuffer; // To have access to a valid buffer in tests

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done){
    var progression = 0;
    function onProgress(val){
      progression = val;
    }
    myBufferLoader.progressCallback = onProgress;
    myBufferLoader.fileLoadingRequest('./synth.wav').then(
      function(buffer){
        // Should be sure it's the right buffer, well, we guess it is.
        validArrayBuffer = buffer;
        // We check that the progress event finally reached 1.
        assert.equal(progression, 1);
        done();
      });
  });

  it('Test fileLoadingRequest function with a wrong url, Promise implementation for XMLHttpRequest', function(done){
    myBufferLoader.fileLoadingRequest('./synt.wav').then(
      function(buffer){
      },
      function(error){
        assert.equal(error.message, 'Not Found');
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
    var progress_steps = [];
    function onProgress(val){
      progress_steps[val.index] = val.value;
    }
    myBufferLoader.progressCallback = onProgress;
    myBufferLoader.loadAll(['./synth.wav', './synth.wav']).then(
      function(buffer){
        // Check that all the progress events finally reached 1.
        assert.equal(progress_steps[0], 1);
        assert.equal(progress_steps[1], 1);
        done();
      },
      function(error){
      });
  });

  it('Test loadAll function with invalid url', function(done){
    myBufferLoader.loadAll(['./synth.wav', './synh.wav']).then(
      function(buffer){
      },
      function(error){
        done();
      });
  });
  /*
  it("Test load function", function (done) {
    // TODO: We should here spy the loadBuffer property
    myBufferLoader.loadBuffer = sinon.spy();
    myBufferLoader.loadBuffer('./synth.wav').then(
      function(buffer){
        // And then assert true for spy.calledOnce.
        // But this is not allowed by sinon.js
        // as sinon.js spy for ES5 property descriptors are not available.
        // console.log(myBufferLoader.loadBuffer.calledOnce);
        // The problem here is the use of value in the property description.
        done();
      }
    );
  });*/
});
