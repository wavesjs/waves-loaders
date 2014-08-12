var assert = chai.assert;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

describe("Load some sounds: synth.wav and sound.wav", function() {
  var myBufferLoader = new BufferLoader();
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
        assert.equal(error.message, 'Forbidden');
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

  it("Test load function for one url", function (done) {
    sinon.spy(myBufferLoader, 'loadBuffer');
    myBufferLoader.load('./synth.wav').then(
      function(buffer){
        assert.isTrue(myBufferLoader.loadBuffer.calledOnce);
        done();
      }
    );
  });

  it("Test load function for more than one url", function (done) {
    sinon.spy(myBufferLoader, 'loadAll');
    myBufferLoader.load(['./synth.wav', './synth.wav']).then(
      function(buffer){
        assert.isTrue(myBufferLoader.loadAll.calledOnce);
        done();
      }
    );
  });
});
