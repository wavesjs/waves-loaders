import Loader from './loader';

const AudioContext = (window.AudioContext || window.webkitAudioContext);

if (!AudioContext)
  throw new Error('WebAudio API not supported');

const audioContext = new AudioContext();

const silentBuffer = new Uint32Array([
  0x46464952, 0x00000038, 0x45564157, 0x20746d66,
  0x00000010, 0x00010001, 0x0000ac44, 0x00015888,
  0x00100002, 0x61746164, 0x00000014, 0x00000000,
  0x00000000, 0x00000000, 0x00000000, 0x00000000,
  0x00000000, 0x00000000, 0x00000000, 0x00000000,
  0x00000000, 0x00000000, 0x00000000, 0x00000000,
  0x00000000, 0x00000000, 0x00000000, 0x00000000,
]).buffer;

const noop = () => {};

let decodeAudioData = audioContext.decodeAudioData;

const promise = audioContext.decodeAudioData(silentBuffer, noop, noop);
// implement non promised base decode audio data
if (!promise) {
  decodeAudioData = function(arraybuffer) {
    return new Promise(function(resolve, reject) {
      audioContext.decodeAudioData(arraybuffer, (buffer) => {
        resolve(buffer);
      }, (err) => {
        reject(new Error('Unable to decode audio data'));
      });
    });
  }
}


/**
 * AudioBufferLoader
 * Promise based implementation of XMLHttpRequest Level 2 for GET method and
 * decode audio data for arraybuffer.
 */
export default class AudioBufferLoader extends Loader {
  /**
   * Set the responseType to 'arraybuffer' and initialize options.
   * @param {string} [responseType="arraybuffer"]
   */
  constructor(responseType = 'arraybuffer') {
    super(responseType);

    this.options = { wrapAroundExtension: 0 };
    this.responseType = responseType;
    this.audioContext = audioContext;

    this.decodeAudioData = this.decodeAudioData.bind(this);
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
   * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load.
   *  Accepts a URL pointing to the file location or an array of URLs.
   * @param {{wrapAroundExtension: number}} [options] - Object with a
   *  wrapAroundExtension key which set the length, in seconds to be copied from
   *  the begining at the end of the returned AudioBuffer
   * @returns {Promise}
   */
  load(fileURLs, options = {}) {
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
      .then(this.decodeAudioData)
      .catch((err) => { throw err; });
  }

  /**
   * Load all audio files at once in a single array, decode them in an array of
   * AudioBuffers, and return a Promise.
   * @private
   * @param {string[]} fileURLs - The URLs array of the audio files to load.
   * @returns {Promise}
   */
  loadAll(fileURLs) {
    return super.loadAll(fileURLs)
      .then((arraybuffers) => {
        const promises = arrayBuffers.map((arrayBuffer) => {
          return this.decodeAudioData(arraybuffer);
        });

        return Promise.all(promises);
      })
      .catch((err) => { throw err; });
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
   * @returns {Promise}
   */
  decodeAudioData(arraybuffer) {
    if (arraybuffer instanceof ArrayBuffer) {
      const promise = decodeAudioData.call(audioContext, arraybuffer)

      promise
        .then((buffer) => {
          if (this.options.wrapAroundExtension !== 0)
            buffer = this.__wrapAround(buffer);

          return Promise.resolve(buffer);
        })
        .catch((err) => { throw new Error('Unable to decode audio data') });

      return promise;
    } else {
      return new Promise.resolve(arraybuffer);
    }
  }

  /**
   * WrapAround, copy the begining input buffer to the end of an output buffer
   * @private
   * @param {arraybuffer} inBuffer {arraybuffer} - The input buffer
   * @returns {arraybuffer} - The processed buffer (with frame copied from the begining to the end)
   */
  __wrapAround(inBuffer) {
    const { numberOfChannels, sampleRate, length } = inBuffer;
    const outLength = length + this.options.wrapAroundExtension * sampleRate;
    const outBuffer = this.audioContext.createBuffer(numberOfChannels, outLength, sampleRate);

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = inBuffer.getChannelData(channel);
      const outData = outBuffer.getChannelData(channel);
      const inLength = inBuffer.length;

      for (let i = 0; i < outLength; i++) {
        if (i < inLength)
          outData[i] = channelData[i];
        else
          outData[i] = channelData[i - inLength];
      }
    }

    return outBuffer;
  }
}
