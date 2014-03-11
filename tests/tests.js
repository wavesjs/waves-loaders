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

  it('My sound was loaded with "load"', function(done) {
    this.timeout(myTimeout);
    bufferLoader.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
        console.log(audioBuffer);
      assert.isObject(audioBuffer, 'audioBuffer is not an object');
      done();
    }, audioContext);
  });
  
  it('My sound was loaded with "loadBuffer"', function(done) {
    this.timeout(myTimeout);
    bufferLoader.loadBuffer('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
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
    bufferLoader.loadEach(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffer) {
      assert.isObject(audioBuffer, 'audioBuffer is not an object');
      count++;
      if(count == 2)
        done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "loadAll"', function(done) {
    this.timeout(myTimeout);
    bufferLoader.loadAll(['./synth.wav', '../node_modules/snd-dep/sound.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[0].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[1].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "loadAll" in reverse order', function(done) {
    this.timeout(myTimeout);
    bufferLoader.loadAll(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[1].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[0].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "load"', function(done) {
    this.timeout(myTimeout);
    bufferLoader.load(['./synth.wav', '../node_modules/snd-dep/sound.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[0].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[1].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sounds were loaded with "load" in reverse order', function(done) {
    this.timeout(myTimeout);
    bufferLoader.load(['../node_modules/snd-dep/sound.wav', './synth.wav'], function(audioBuffers) {
      assert.equal(myAudioBuffers[0].length, audioBuffers[1].length, 'buffer1 is not ok');
      assert.equal(myAudioBuffers[1].length, audioBuffers[0].length, 'buffer2 is not ok');
      done();
    }, audioContext);
  });
  
  it('My sound is not correct, error "decodeAudioData" was detected', function(done) {
    this.timeout(myTimeout);
    try {
      bufferLoader.load('./nothing.txt', function(audioBuffer) {
      console.log(audioBuffer);
      }, audioContext);
    } catch(e) {
      done();
    }
  });
  
  it('My path is not correct, error "404" was detected', function(done) {
    this.timeout(myTimeout);
    try {
      bufferLoader.load('./nothing', function(audioBuffer) {
      console.log(audioBuffer);
      }, audioContext);
    } catch(e) {
      done();
    }
  });

});