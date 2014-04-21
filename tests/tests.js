var assert = chai.assert;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();


describe("Load some sounds: synth.wav and sound.wav", function() {

  var myBufferLoader = createBufferLoader();
  var validArrayBuffer; // to have access to a valid buffer

  it('Test fileLoadingRequest function with an existing resource, Promise implementation for XMLHttpRequest', function(done){
    var progress_steps = [];
    myBufferLoader.fileLoadingRequest('./synth.wav').then(
      function(buffer){
        // should be sure it's the right buffer, well, we guess it is.
        validArrayBuffer = buffer;
        // we check that the progress event finally reached 1.
        assert.equal(progress_steps[progress_steps.length - 1], 1);
        done();
      },
      function(error){

      },
      function (progress) {
        // we keep track of progress
        progress_steps.push(progress);
      }
      );
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
    var progress_steps = {0: [], 1: []};
    myBufferLoader.loadAll(['./synth.wav', './synth.wav']).then(
      function(buffer){
        // check that all the progress events finally reached 1.
        assert.equal(progress_steps[0][progress_steps[0].length - 1], 1);
        assert.equal(progress_steps[1][progress_steps[1].length - 1], 1);
        done();
      },
      function(error){
      },
      function (progress) {
        progress_steps[progress.index].push(progress.value);
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
