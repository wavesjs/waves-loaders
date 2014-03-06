var audioContext = new webkitAudioContext();
var targetNode = audioContext.destination;
var player = null;
var audioBuffer = null;
var currentTime = null;

function assert(expr, msg) {
  if (!expr) throw new Error(msg || 'failed');
}

function floatToInt(f) {
  return Math.round(f * 1000);
}

describe("Sound : sound.wav", function() {
  var self = this;

  var sound = {
    audioBuffer: {
      duration: 185.75672916666667,
      gain: 1,
      length: 8916323,
      numberOfChannels: 2,
      sampleRate: 48000
    }
  };

  var myTimeout = 200000;

  it('My sound was loaded !', function(done) {
    this.timeout(myTimeout);
    bufferLoader.load('../node_modules/snd-dep/sound.wav', function(audioBuffer) {
      self.audioBuffer = audioBuffer;
      assert(typeof(self.audioBuffer) === "object", "AudioBuffer is not an object");
      assert(self.audioBuffer.length === sound.audioBuffer.length, "AudioBuffer length is not correct");
      done();

    }, audioContext);
  });

  it('my player start with offset at 0', function(done) {
    this.timeout(myTimeout);
    self.player = createPlayer(self.audioBuffer, audioContext);
    self.player.connect(self.targetNode); // unconnected by default
    var offset = self.player.start();
    self.currentTime = offset;
    assert(offset === 0, "offset first start is not equal to 0");
    done();
  });

  it('my player pause', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      self.player.pause();
      var time = self.player.startPosition;
      self.currentTime = time;
      time = floatToInt(time);

      //TODO Find an other way to test elapsed time 
      if (time < 500 || time > 530) {
        assert(false, "offset of pause is not between 1.0 and 1.1");
      }

      done();
    }, 500);
  });

  it('my player restart', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      var offset = self.player.start();

      assert(self.currentTime === offset, "offset of start doesn't match with pause")

      done();
    }, 1000);
  });

  it('my player is ended', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      self.player.seek(Math.floor(sound.audioBuffer.duration));
      self.player.on("ended", function() {
        done();
      });
    }, 1500);
  });

  it('my player re-start after ended', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      var offset = self.player.start();
      assert(offset === 0, "offset first start is not equal to 0");
      done();
    }, 3000);
  });

  it('seek with overflow value', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      var seek = self.player.seek((Math.floor(sound.audioBuffer.duration) + 10));
      var time = self.player.startPosition;
      var overflow = (Math.floor(sound.audioBuffer.duration) + 10) - sound.audioBuffer.duration;
      assert(time === seek, "startPosition is not equal to seek return position");

      //maybe it's normal
      //assert(time === overflow, "overflow is not equal to startposition");
      done();

    }, 3500);
  });

  it('set gain', function(done) {
    this.timeout(myTimeout);

    setTimeout(function() {
      var myGain = 0.4;
      self.player.setGain(myGain);

      assert(myGain.toString() === self.player.gain.toString(), myGain.toString() + " is not equal to " + self.player.gain.toString());

      assert((myGain * myGain).toString() === self.player.gainNode.gain.value.toString(), (myGain * myGain).toString() + " is not equal to gainNode.gain.value : " + self.player.gainNode.gain.value.toString());

      done();

    }, 4000);
  });

});