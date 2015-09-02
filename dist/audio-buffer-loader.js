"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

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

var audioContext;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

try {
  audioContext = new window.AudioContext();
} catch (e) {}

/**
 * AudioBufferLoader
 * @class
 * @classdesc Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 * Inherit from Loader class
 */

var AudioBufferLoader = (function (_Loader) {

  /**
   * @constructs
   * Set the responseType to 'arraybuffer' and initialize options.
   */

  function AudioBufferLoader() {
    var responseType = arguments[0] === undefined ? "arraybuffer" : arguments[0];

    _classCallCheck(this, AudioBufferLoader);

    _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "constructor", this).call(this, responseType);
    this.options = {
      wrapAroundExtension: 0
    };
    this.responseType = responseType;
  }

  _inherits(AudioBufferLoader, _Loader);

  _createClass(AudioBufferLoader, {
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
        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "load", this).call(this, fileURLs);
      }
    },
    loadOne: {

      /**
       * @function - Load a single audio file, decode it in an AudioBuffer, return a Promise
       * @private
       * @param {string} fileURL - The URL of the audio file location to load.
       * @returns {Promise}
       */

      value: function loadOne(fileURL) {
        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadOne", this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
          throw error;
        });
      }
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

        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadAll", this).call(this, fileURLs).then(function (arraybuffers) {
          return _core.Promise.all(arraybuffers.map(function (arraybuffer) {
            return _this.decodeAudioData.bind(_this)(arraybuffer);
          }));
        }, function (error) {
          throw error; // TODO: better error handler
        });
      }
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

        if (arraybuffer instanceof ArrayBuffer) {
          return new _core.Promise(function (resolve, reject) {
            audioContext.decodeAudioData(arraybuffer, // returned audio data array
            function (buffer) {
              if (_this.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this.__wrapAround(buffer));
            }, function (error) {
              reject(new Error("DecodeAudioData error"));
            });
          });
        } else {
          return new _core.Promise(function (resolve, reject) {
            resolve(arraybuffer);
          });
        }
      }
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
          console.log(arrayOutChData);

          arrayOutChData.forEach(function (sample, index) {
            if (index < inBuffer.length) arrayOutChData[index] = arrayChData[index];else arrayOutChData[index] = arrayChData[index - inBuffer.length];
          });
        }

        return outBuffer;
      }
    }
  });

  return AudioBufferLoader;
})(Loader);

module.exports = AudioBufferLoader;
//# sourceMappingURL=data:application/json;base64,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QjtHQUFTLE1BQU07O0FBa0h0QyxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKTtcblxuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxudmFyIGF1ZGlvQ29udGV4dDtcblxud2luZG93LkF1ZGlvQ29udGV4dCA9ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpO1xuXG50cnkge1xuICBhdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xufSBjYXRjaCAoZSkge31cblxuLyoqXG4gKiBBdWRpb0J1ZmZlckxvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZCBhbmQgZGVjb2RlIGF1ZGlvIGRhdGEgZm9yIGFycmF5YnVmZmVyLlxuICogSW5oZXJpdCBmcm9tIExvYWRlciBjbGFzc1xuICovXG5cbmNsYXNzIEF1ZGlvQnVmZmVyTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdHNcbiAgICogU2V0IHRoZSByZXNwb25zZVR5cGUgdG8gJ2FycmF5YnVmZmVyJyBhbmQgaW5pdGlhbGl6ZSBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJykge1xuICAgIHN1cGVyKHJlc3BvbnNlVHlwZSk7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgXCJ3cmFwQXJvdW5kRXh0ZW5zaW9uXCI6IDBcbiAgICB9O1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuXG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTWV0aG9kIGZvciBwcm9taXNlIGF1ZGlvIGZpbGUgbG9hZGluZyBhbmQgZGVjb2RpbmcuXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgYXVkaW8gZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcGFyYW0ge3t3cmFwQXJvdW5kRXh0ZW5zaW9uOiBudW1iZXJ9fSBbb3B0aW9uc10gLSBPYmplY3Qgd2l0aCBhIHdyYXBBcm91bmRFeHRlbnNpb24ga2V5IHdoaWNoIHNldCB0aGUgbGVuZ3RoLCBpbiBzZWNvbmRzIHRvIGJlIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZ1xuICAgKiBhdCB0aGUgZW5kIG9mIHRoZSByZXR1cm5lZCBBdWRpb0J1ZmZlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gfHwgMDtcbiAgICByZXR1cm4gc3VwZXIubG9hZChmaWxlVVJMcyk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIHNpbmdsZSBhdWRpbyBmaWxlLCBkZWNvZGUgaXQgaW4gYW4gQXVkaW9CdWZmZXIsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBhdWRpbyBmaWxlIGxvY2F0aW9uIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZE9uZShmaWxlVVJMKSB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRPbmUoZmlsZVVSTClcbiAgICAgIC50aGVuKFxuICAgICAgICB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpLFxuICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGFsbCBhdWRpbyBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5LCBkZWNvZGUgdGhlbSBpbiBhbiBhcnJheSBvZiBBdWRpb0J1ZmZlcnMsIGFuZCByZXR1cm4gYSBQcm9taXNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlVVJMcyAtIFRoZSBVUkxzIGFycmF5IG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRBbGwoZmlsZVVSTHMpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZEFsbChmaWxlVVJMcylcbiAgICAgIC50aGVuKFxuICAgICAgICAoYXJyYXlidWZmZXJzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycmF5YnVmZmVycy5tYXAoKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVBdWRpb0RhdGEuYmluZCh0aGlzKShhcnJheWJ1ZmZlcik7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjsgLy8gVE9ETzogYmV0dGVyIGVycm9yIGhhbmRsZXJcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gRGVjb2RlIEF1ZGlvIERhdGEsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthcnJheWJ1ZmZlcn0gLSBUaGUgYXJyYXlidWZmZXIgb2YgdGhlIGxvYWRlZCBhdWRpbyBmaWxlIHRvIGJlIGRlY29kZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgZGVjb2RlQXVkaW9EYXRhKGFycmF5YnVmZmVyKSB7XG4gICAgaWYoYXJyYXlidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgIGFycmF5YnVmZmVyLCAvLyByZXR1cm5lZCBhdWRpbyBkYXRhIGFycmF5XG4gICAgICAgIChidWZmZXIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPT09IDApIHJlc29sdmUoYnVmZmVyKTtcbiAgICAgICAgICBlbHNlIHJlc29sdmUodGhpcy5fX3dyYXBBcm91bmQoYnVmZmVyKSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJEZWNvZGVBdWRpb0RhdGEgZXJyb3JcIikpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9ZWxzZXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZShhcnJheWJ1ZmZlcik7XG4gICAgfSk7XG4gIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBXcmFwQXJvdW5kLCBjb3B5IHRoZSBiZWdpbmluZyBpbnB1dCBidWZmZXIgdG8gdGhlIGVuZCBvZiBhbiBvdXRwdXQgYnVmZmVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7YXJyYXlidWZmZXJ9IGluQnVmZmVyIHthcnJheWJ1ZmZlcn0gLSBUaGUgaW5wdXQgYnVmZmVyXG4gICAqIEByZXR1cm5zIHthcnJheWJ1ZmZlcn0gLSBUaGUgcHJvY2Vzc2VkIGJ1ZmZlciAod2l0aCBmcmFtZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmcgdG8gdGhlIGVuZClcbiAgICovXG4gIF9fd3JhcEFyb3VuZChpbkJ1ZmZlcikge1xuICAgIHZhciBsZW5ndGggPSBpbkJ1ZmZlci5sZW5ndGggKyB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiAqIGluQnVmZmVyLnNhbXBsZVJhdGU7XG4gICAgdmFyIG91dEJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoaW5CdWZmZXIubnVtYmVyT2ZDaGFubmVscywgbGVuZ3RoLCBpbkJ1ZmZlci5zYW1wbGVSYXRlKTtcbiAgICB2YXIgYXJyYXlDaERhdGEsIGFycmF5T3V0Q2hEYXRhO1xuXG4gICAgZm9yICh2YXIgY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCBpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzOyBjaGFubmVsKyspIHtcbiAgICAgIGFycmF5Q2hEYXRhID0gaW5CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG4gICAgICBhcnJheU91dENoRGF0YSA9IG91dEJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcbiAgICAgIGNvbnNvbGUubG9nKGFycmF5T3V0Q2hEYXRhKTtcblxuICAgICAgYXJyYXlPdXRDaERhdGEuZm9yRWFjaChmdW5jdGlvbihzYW1wbGUsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IGluQnVmZmVyLmxlbmd0aCkgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXhdO1xuICAgICAgICBlbHNlIGFycmF5T3V0Q2hEYXRhW2luZGV4XSA9IGFycmF5Q2hEYXRhW2luZGV4IC0gaW5CdWZmZXIubGVuZ3RoXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRCdWZmZXI7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQnVmZmVyTG9hZGVyO1xuIl19