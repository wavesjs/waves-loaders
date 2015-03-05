"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var Loader = require("./loader");

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error("Missing parameter");
}

var audioContext = new AudioContext();

/**
 * AudioBufferLoader
 * @class
 * @classdesc Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 * Inherit from Loader class
 */

var AudioBufferLoader = (function (Loader) {

  /**
   * @constructs
   * Set the responseType to 'arraybuffer' and initialize options.
   */

  function AudioBufferLoader() {
    _babelHelpers.classCallCheck(this, AudioBufferLoader);

    this.options = {
      wrapAroundExtension: 0
    };
    this.responseType = "arraybuffer";
    _babelHelpers.get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "constructor", this).call(this, this.responseType);
  }

  _babelHelpers.inherits(AudioBufferLoader, Loader);

  _babelHelpers.prototypeProperties(AudioBufferLoader, null, {
    load: {

      /**
       * @function - Method for promise audio file loading and decoding.
       * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
       * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining
       * at the end of the returned AudioBuffer
       * @returns {Promise}
       */

      value: function load() {
        var fileURLs = arguments[0] === undefined ? throwIfMissing() : arguments[0];
        var options = arguments[1] === undefined ? {} : arguments[1];

        this.options = options;
        this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
        return _babelHelpers.get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "load", this).call(this, fileURLs);
      },
      writable: true,
      configurable: true
    },
    loadOne: {

      /**
       * @function - Load a single audio file, decode it in an AudioBuffer, return a Promise
       * @private
       * @param {string} fileURL - The URL of the audio file location to load.
       * @returns {Promise}
       */

      value: function loadOne(fileURL) {
        return _babelHelpers.get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadOne", this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
          throw error;
        });
      },
      writable: true,
      configurable: true
    },
    loadAll: {

      /**
       * @function - Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
       * @private
       * @param {string[]} fileURLs - The URLs array of the audio files to load.
       * @returns {Promise}
       */

      value: function loadAll(fileURLs) {
        var _this = this;

        return _babelHelpers.get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadAll", this).call(this, fileURLs).then(function (arraybuffers) {
          return _core.Promise.all(arraybuffers.map(function (arraybuffer) {
            return _this.decodeAudioData.bind(_this)(arraybuffer);
          }));
        }, function (error) {
          throw error; // TODO: better error handler
        });
      },
      writable: true,
      configurable: true
    },
    decodeAudioData: {

      /**
       * @function - Decode Audio Data, return a Promise
       * @private
       * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
       * @returns {Promise}
       */

      value: function decodeAudioData(arraybuffer) {
        var _this = this;

        return new _core.Promise(function (resolve, reject) {
          audioContext.decodeAudioData(arraybuffer, // returned audio data array
          function (buffer) {
            if (_this.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this.__wrapAround(buffer));
          }, function (error) {
            reject(new Error("DecodeAudioData error"));
          });
        });
      },
      writable: true,
      configurable: true
    },
    __wrapAround: {

      /**
       * @function - WrapAround, copy the begining input buffer to the end of an output buffer
       * @private
       * @param {arraybuffer} inBuffer {arraybuffer} - The input buffer
       * @returns {arraybuffer} - The processed buffer (with frame copied from the begining to the end)
       */

      value: function __wrapAround(inBuffer) {
        var length = inBuffer.length + this.options.wrapAroundExtension * inBuffer.sampleRate;
        var outBuffer = audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate);
        var arrayChData, arrayOutChData;

        for (var channel = 0; channel < inBuffer.numberOfChannels; channel++) {
          arrayChData = inBuffer.getChannelData(channel);
          arrayOutChData = outBuffer.getChannelData(channel);

          arrayOutChData.forEach(function (sample, index) {
            if (index < inBuffer.length) arrayOutChData[index] = arrayChData[index];else arrayOutChData[index] = arrayChData[index - inBuffer.length];
          });
        }

        return outBuffer;
      },
      writable: true,
      configurable: true
    }
  });

  return AudioBufferLoader;
})(Loader);

module.exports = AudioBufferLoader;
//# sourceMappingURL=data:application/json;base64,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QVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEcsWUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDOztBQUVoQyxhQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxFQUFFO0FBQ3BFLHFCQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyx3QkFBYyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5ELHdCQUFjLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM3QyxnQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQ25FLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUNuRSxDQUFDLENBQUM7U0FDSjs7QUFFRCxlQUFPLFNBQVMsQ0FBQztPQUNsQjs7Ozs7O1NBdEdHLGlCQUFpQjtHQUFTLE1BQU07O0FBMEd0QyxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKTtcblxuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxudmFyIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuLyoqXG4gKiBBdWRpb0J1ZmZlckxvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZCBhbmQgZGVjb2RlIGF1ZGlvIGRhdGEgZm9yIGFycmF5YnVmZmVyLlxuICogSW5oZXJpdCBmcm9tIExvYWRlciBjbGFzc1xuICovXG5cbmNsYXNzIEF1ZGlvQnVmZmVyTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdHNcbiAgICogU2V0IHRoZSByZXNwb25zZVR5cGUgdG8gJ2FycmF5YnVmZmVyJyBhbmQgaW5pdGlhbGl6ZSBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgXCJ3cmFwQXJvdW5kRXh0ZW5zaW9uXCI6IDBcbiAgICB9O1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICBzdXBlcih0aGlzLnJlc3BvbnNlVHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTWV0aG9kIGZvciBwcm9taXNlIGF1ZGlvIGZpbGUgbG9hZGluZyBhbmQgZGVjb2RpbmcuXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgYXVkaW8gZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcGFyYW0ge3t3cmFwQXJvdW5kRXh0ZW5zaW9uOiBudW1iZXJ9fSBbb3B0aW9uc10gLSBPYmplY3Qgd2l0aCBhIHdyYXBBcm91bmRFeHRlbnNpb24ga2V5IHdoaWNoIHNldCB0aGUgbGVuZ3RoLCBpbiBzZWNvbmRzIHRvIGJlIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZ1xuICAgKiBhdCB0aGUgZW5kIG9mIHRoZSByZXR1cm5lZCBBdWRpb0J1ZmZlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gfHwgMDtcbiAgICByZXR1cm4gc3VwZXIubG9hZChmaWxlVVJMcyk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIHNpbmdsZSBhdWRpbyBmaWxlLCBkZWNvZGUgaXQgaW4gYW4gQXVkaW9CdWZmZXIsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBhdWRpbyBmaWxlIGxvY2F0aW9uIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZE9uZShmaWxlVVJMKSB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRPbmUoZmlsZVVSTClcbiAgICAgIC50aGVuKFxuICAgICAgICB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpLFxuICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGFsbCBhdWRpbyBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5LCBkZWNvZGUgdGhlbSBpbiBhbiBhcnJheSBvZiBBdWRpb0J1ZmZlcnMsIGFuZCByZXR1cm4gYSBQcm9taXNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlVVJMcyAtIFRoZSBVUkxzIGFycmF5IG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRBbGwoZmlsZVVSTHMpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZEFsbChmaWxlVVJMcylcbiAgICAgIC50aGVuKFxuICAgICAgICAoYXJyYXlidWZmZXJzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycmF5YnVmZmVycy5tYXAoKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVBdWRpb0RhdGEuYmluZCh0aGlzKShhcnJheWJ1ZmZlcik7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjsgLy8gVE9ETzogYmV0dGVyIGVycm9yIGhhbmRsZXJcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gRGVjb2RlIEF1ZGlvIERhdGEsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthcnJheWJ1ZmZlcn0gLSBUaGUgYXJyYXlidWZmZXIgb2YgdGhlIGxvYWRlZCBhdWRpbyBmaWxlIHRvIGJlIGRlY29kZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgZGVjb2RlQXVkaW9EYXRhKGFycmF5YnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgIGFycmF5YnVmZmVyLCAvLyByZXR1cm5lZCBhdWRpbyBkYXRhIGFycmF5XG4gICAgICAgIChidWZmZXIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPT09IDApIHJlc29sdmUoYnVmZmVyKTtcbiAgICAgICAgICBlbHNlIHJlc29sdmUodGhpcy5fX3dyYXBBcm91bmQoYnVmZmVyKSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJEZWNvZGVBdWRpb0RhdGEgZXJyb3JcIikpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIFdyYXBBcm91bmQsIGNvcHkgdGhlIGJlZ2luaW5nIGlucHV0IGJ1ZmZlciB0byB0aGUgZW5kIG9mIGFuIG91dHB1dCBidWZmZXJcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthcnJheWJ1ZmZlcn0gaW5CdWZmZXIge2FycmF5YnVmZmVyfSAtIFRoZSBpbnB1dCBidWZmZXJcbiAgICogQHJldHVybnMge2FycmF5YnVmZmVyfSAtIFRoZSBwcm9jZXNzZWQgYnVmZmVyICh3aXRoIGZyYW1lIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZyB0byB0aGUgZW5kKVxuICAgKi9cbiAgX193cmFwQXJvdW5kKGluQnVmZmVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IGluQnVmZmVyLmxlbmd0aCArIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uICogaW5CdWZmZXIuc2FtcGxlUmF0ZTtcbiAgICB2YXIgb3V0QnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzLCBsZW5ndGgsIGluQnVmZmVyLnNhbXBsZVJhdGUpO1xuICAgIHZhciBhcnJheUNoRGF0YSwgYXJyYXlPdXRDaERhdGE7XG5cbiAgICBmb3IgKHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGluQnVmZmVyLm51bWJlck9mQ2hhbm5lbHM7IGNoYW5uZWwrKykge1xuICAgICAgYXJyYXlDaERhdGEgPSBpbkJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcbiAgICAgIGFycmF5T3V0Q2hEYXRhID0gb3V0QnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuXG4gICAgICBhcnJheU91dENoRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHNhbXBsZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgaW5CdWZmZXIubGVuZ3RoKSBhcnJheU91dENoRGF0YVtpbmRleF0gPSBhcnJheUNoRGF0YVtpbmRleF07XG4gICAgICAgIGVsc2UgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXggLSBpbkJ1ZmZlci5sZW5ndGhdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dEJ1ZmZlcjtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXVkaW9CdWZmZXJMb2FkZXI7Il19