import Loader from './loader';


/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

let audioContext;

window.AudioContext = (window.AudioContext || window.webkitAudioContext);

try {
  audioContext = new window.AudioContext();
} catch (e) {}


/**
 * AudioBufferLoader
 * Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 */
export default class AudioBufferLoader extends Loader {
  /**
   * Set the responseType to 'arraybuffer' and initialize options.
   * @param {string} [responseType="arraybuffer"]
   */
  constructor(responseType = 'arraybuffer') {
    super(responseType);
    this.options = {
      "wrapAroundExtension": 0
    };
    this.responseType = responseType;
    this.audioContext = audioContext;
  }

  /**
   * Allow to set the audio context that should be used in order to decode
   * the file and create the AudioBuffer.
   * @param {AudioContext} audioContext
   */
  setAudioContext(audioContext) {
    this.audioContext = audioContext;
  }

  /**
   * Method for promise audio file loading and decoding.
   * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
   * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer
   * @returns {Promise}
   */
  load(fileURLs = throwIfMissing(), options = {}) {
    this.options = options;
    this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
    return super.load(fileURLs);
  }

  /**
   * Load a single audio file, decode it in an AudioBuffer, return a Promise
   * @private
   * @param {string} fileURL - The URL of the audio file location to load.
   * @returns {Promise}
   */
  loadOne(fileURL) {
    return super.loadOne(fileURL)
      .then(
        this.decodeAudioData.bind(this),
        function(error) {
          throw error;
        });
  }

  /**
   * Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
   * @private
   * @param {string[]} fileURLs - The URLs array of the audio files to load.
   * @returns {Promise}
   */
  loadAll(fileURLs) {
    return super.loadAll(fileURLs)
      .then(
        (arraybuffers) => {
          return Promise.all(arraybuffers.map((arraybuffer) => {
            return this.decodeAudioData.bind(this)(arraybuffer);
          }));
        }, (error) => {
          throw error; // TODO: better error handler
        });
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
   * @returns {Promise}
   */
  decodeAudioData(arraybuffer) {
    if (arraybuffer instanceof ArrayBuffer) {
      return new Promise((resolve, reject) => {
        this.audioContext.decodeAudioData(
          arraybuffer, // returned audio data array
          (buffer) => {
            if (this.options.wrapAroundExtension === 0) resolve(buffer);
            else resolve(this.__wrapAround(buffer));
          }, (error) => {
            reject(new Error("DecodeAudioData error"));
          }
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(arraybuffer);
      });
    }
  }

  /**
   * WrapAround, copy the begining input buffer to the end of an output buffer
   * @private
   * @param {arraybuffer} inBuffer {arraybuffer} - The input buffer
   * @returns {arraybuffer} - The processed buffer (with frame copied from the begining to the end)
   */
  __wrapAround(inBuffer) {
    var length = inBuffer.length + this.options.wrapAroundExtension * inBuffer.sampleRate;

    var outBuffer = this.audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate);
    var arrayChData, arrayOutChData;

    for (var channel = 0; channel < inBuffer.numberOfChannels; channel++) {
      arrayChData = inBuffer.getChannelData(channel);
      arrayOutChData = outBuffer.getChannelData(channel);

      arrayOutChData.forEach(function(sample, index) {
        if (index < inBuffer.length) arrayOutChData[index] = arrayChData[index];
        else arrayOutChData[index] = arrayChData[index - inBuffer.length];
      });
    }

    return outBuffer;
  }
}
