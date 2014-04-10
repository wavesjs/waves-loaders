var assert = chai.assert;

var audioContext = new webkitAudioContext() || new AudioContext();

describe("Load some sounds: synth.wav and sound.wav", function() {
  var self = this;

  var myAudioBuffers = [{ //synth.wav
    duration: 1.7874829931972789,
    gain: 1,
    length: 78828,
    numberOfChannels: 1,
    sampleRate: 44100
  }, { //sound.wav
    duration: 3.633605442176871, 
    gain: 1,
    length: 160242,
    numberOfChannels: 2,
    sampleRate: 44100
  }];

  var myTimeout = 200000;
  var myBufferLoader = createBufferLoader();
  var myBufferLoader2 = createBufferLoader();

  it('My sound was loaded with "load"', function(done) {
    this.timeout(myTimeout);
    
    myBufferLoader.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
      console.log(audioBuffer);
      assert.isObject(audioBuffer, 'audioBuffer is not an object');
      done();
    }, audioContext);
  });
  
  it('My sound was loaded with "loadBuffer"', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.loadBuffer('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
      assert.isObject(audioBuffer, 'audioBuffer is not an object');
      done();

    }, audioContext);
  });
 
  /*
  If an order notion will be developped
  it('My sounds were loaded with "loadEach"', function(done) {
    this.timeout(myTimeout);
    var count = 0;
    bufferLoader.loadEach(['./synth.wav', '../node_modules/snd-dep/sound.wav'], function(audioBuffer) {
      assert.equal(myAudioBuffers[count].length, audioBuffer.length, 'buffer' + count + ' is not ok');
      count++;
      if(count == 2)
        done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "loadEach" in reverse order', function(done) {
    this.timeout(myTimeout);
    var count = 1;
    bufferLoader.loadEach(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffer) {
      assert.equal(myAudioBuffers[count].length, audioBuffer.length, 'buffer' + count + ' is not ok');
      count--;
      if(count == -1)
        done();
    }, audioContext);
  });*/
  
  it('My sounds were loaded with "loadEach" in reverse order', function(done) {
    this.timeout(myTimeout);
    var count = 0;
    myBufferLoader.loadEach(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffer) {
      assert.isObject(audioBuffer, 'audioBuffer is not an object');
      count++;
      if(count == 2)
        done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "loadAll"', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.loadAll(['./synth.wav', '../node_modules/snd-dep/sound.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[0].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[1].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "loadAll" in reverse order', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.loadAll(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[1].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[0].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "load"', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.load(['./synth.wav', '../node_modules/snd-dep/sound.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[0].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[1].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "load" in reverse order', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.load(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[1].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[0].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('2 sounds loaded by 2 buffer loader', function(done) {
    this.timeout(myTimeout);
    var isFirstIsLoaded = false;
    var isSecondIsLoaded = false;
    
    myBufferLoader.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
      assert.equal(myAudioBuffers[1].length, audioBuffer.length, 'myBufferLoader is not ok');
      isFirstIsLoaded = true;
      if(isSecondIsLoaded) {
        console.log("second loaded, first loaded");
        done();
      }
    }, audioContext);
    
    myBufferLoader2.load('./synth.wav', function(audioBuffer) {
      assert.equal(myAudioBuffers[0].length, audioBuffer.length, 'myBufferLoader2 is not ok');
      isSecondIsLoaded = true;
      if(isFirstIsLoaded) {
        console.log("first loaded, second loaded"); 
        done();
      }
    }, audioContext);
  });
  
  it('2 sounds loaded by 2 buffer loader reverse sound files', function(done) {
    this.timeout(myTimeout);
    var isFirstIsLoaded = false;
    var isSecondIsLoaded = false;
    
    myBufferLoader.load('./synth.wav', function(audioBuffer) {
      assert.equal(myAudioBuffers[0].length, audioBuffer.length, 'myBufferLoader is not ok');
      isFirstIsLoaded = true;
      if(isSecondIsLoaded) {
        console.log("second loaded, first loaded");
        done();
      }
    }, audioContext);
    
    myBufferLoader2.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
      assert.equal(myAudioBuffers[1].length, audioBuffer.length, 'myBufferLoader2 is not ok');
      isSecondIsLoaded = true;
      if(isFirstIsLoaded) {
        console.log("first loaded, second loaded"); 
        done();
      }
    }, audioContext);
  });
  
  it('Cascad loading', function(done) {
    this.timeout(myTimeout);
    myBufferLoader.load('./synth.wav', function(audioBuffer) {
      assert.equal(myAudioBuffers[0].length, audioBuffer.length, 'myBufferLoader is not ok');
      
      myBufferLoader.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
        assert.equal(myAudioBuffers[1].length, audioBuffer.length, 'myBufferLoader in cascad is not ok');
        done();
      }, audioContext);
      
    }, audioContext);
    
  });
  
  
  /*
  Waiting for promises
  it('My sound is not correct, error "decodeAudioData" was detected', function(done) {
    this.timeout(myTimeout);
    try {
      myBufferLoader.load('./nothing.txt', function(audioBuffer) {
      console.log(audioBuffer);
      }, audioContext);
    } catch(e) {
      done();
    }
  });
  
  it('My path is not correct, error "404" was detected', function(done) {
    this.timeout(myTimeout);
    try {
      myBufferLoader.load('./nothing', function(audioBuffer) {
      console.log(audioBuffer);
      }, audioContext);
    } catch(e) {
      done();
    }
  });*/

});