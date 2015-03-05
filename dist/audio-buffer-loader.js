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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdXBlci1sb2FkZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7OztBQU9qQyxTQUFTLGNBQWMsR0FBRztBQUN4QixRQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Q0FDdEM7O0FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7Ozs7O0lBU2hDLGlCQUFpQixjQUFTLE1BQU07Ozs7Ozs7QUFNekIsV0FOUCxpQkFBaUI7dUNBQWpCLGlCQUFpQjs7QUFPbkIsUUFBSSxDQUFDLE9BQU8sR0FBRztBQUNiLDJCQUF1QixDQUFDO0tBQ3pCLENBQUM7QUFDRixRQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUNsQyxrREFYRSxpQkFBaUIsNkNBV2IsSUFBSSxDQUFDLFlBQVksRUFBRTtHQUMxQjs7eUJBWkcsaUJBQWlCLEVBQVMsTUFBTTs7b0NBQWhDLGlCQUFpQjtBQXFCckIsUUFBSTs7Ozs7Ozs7OzthQUFBLGdCQUE0QztZQUEzQyxRQUFRLGdDQUFHLGNBQWMsRUFBRTtZQUFFLE9BQU8sZ0NBQUcsRUFBRTs7QUFDNUMsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQztBQUN6RSw2REF4QkUsaUJBQWlCLHNDQXdCRCxRQUFRLEVBQUU7T0FDN0I7Ozs7QUFRRCxXQUFPOzs7Ozs7Ozs7YUFBQSxpQkFBQyxPQUFPLEVBQUU7QUFDZixlQUFPLDhDQWxDTCxpQkFBaUIseUNBa0NFLE9BQU8sRUFDekIsSUFBSSxDQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMvQixVQUFTLEtBQUssRUFBRTtBQUNkLGdCQUFNLEtBQUssQ0FBQztTQUNiLENBQUMsQ0FBQztPQUNSOzs7O0FBUUQsV0FBTzs7Ozs7Ozs7O2FBQUEsaUJBQUMsUUFBUSxFQUFFOzs7QUFDaEIsZUFBTyw4Q0FqREwsaUJBQWlCLHlDQWlERSxRQUFRLEVBQzFCLElBQUksQ0FDSCxVQUFDLFlBQVksRUFBSztBQUNoQixpQkFBTyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFdBQVcsRUFBSztBQUNuRCxtQkFBTyxNQUFLLGVBQWUsQ0FBQyxJQUFJLE9BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNyRCxDQUFDLENBQUMsQ0FBQztTQUNMLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDWixnQkFBTSxLQUFLLENBQUM7U0FDYixDQUFDLENBQUM7T0FDUjs7OztBQVFELG1CQUFlOzs7Ozs7Ozs7YUFBQSx5QkFBQyxXQUFXLEVBQUU7OztBQUMzQixlQUFPLFVBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxzQkFBWSxDQUFDLGVBQWUsQ0FDMUIsV0FBVztBQUNYLG9CQUFDLE1BQU0sRUFBSztBQUNWLGdCQUFJLE1BQUssT0FBTyxDQUFDLG1CQUFtQixLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FDdkQsT0FBTyxDQUFDLE1BQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7V0FDekMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNaLGtCQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1dBQzVDLENBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztPQUNKOzs7O0FBUUQsZ0JBQVk7Ozs7Ozs7OzthQUFBLHNCQUFDLFFBQVEsRUFBRTtBQUNyQixZQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztBQUN0RixZQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xHLFlBQUksV0FBVyxFQUFFLGNBQWMsQ0FBQzs7QUFFaEMsYUFBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsRUFBRTtBQUNwRSxxQkFBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0Msd0JBQWMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuRCx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDN0MsZ0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUNuRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7V0FDbkUsQ0FBQyxDQUFDO1NBQ0o7O0FBRUQsZUFBTyxTQUFTLENBQUM7T0FDbEI7Ozs7OztTQXRHRyxpQkFBaUI7R0FBUyxNQUFNOztBQTBHdEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyIsImZpbGUiOiJzcmMvc3VwZXItbG9hZGVyLmVzNi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4vKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcicpO1xufVxuXG52YXIgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4vKipcbiAqIEF1ZGlvQnVmZmVyTG9hZGVyXG4gKiBAY2xhc3NcbiAqIEBjbGFzc2Rlc2MgUHJvbWlzZSBiYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZvciBHRVQgbWV0aG9kIGFuZCBkZWNvZGUgYXVkaW8gZGF0YSBmb3IgYXJyYXlidWZmZXIuXG4gKiBJbmhlcml0IGZyb20gTG9hZGVyIGNsYXNzXG4gKi9cblxuY2xhc3MgQXVkaW9CdWZmZXJMb2FkZXIgZXh0ZW5kcyBMb2FkZXIge1xuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0c1xuICAgKiBTZXQgdGhlIHJlc3BvbnNlVHlwZSB0byAnYXJyYXlidWZmZXInIGFuZCBpbml0aWFsaXplIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBcIndyYXBBcm91bmRFeHRlbnNpb25cIjogMFxuICAgIH07XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIHN1cGVyKHRoaXMucmVzcG9uc2VUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBNZXRob2QgZm9yIHByb21pc2UgYXVkaW8gZmlsZSBsb2FkaW5nIGFuZCBkZWNvZGluZy5cbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEBwYXJhbSB7e3dyYXBBcm91bmRFeHRlbnNpb246IG51bWJlcn19IFtvcHRpb25zXSAtIE9iamVjdCB3aXRoIGEgd3JhcEFyb3VuZEV4dGVuc2lvbiBrZXkgd2hpY2ggc2V0IHRoZSBsZW5ndGgsIGluIHNlY29uZHMgdG8gYmUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nXG4gICAqIGF0IHRoZSBlbmQgb2YgdGhlIHJldHVybmVkIEF1ZGlvQnVmZmVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChmaWxlVVJMcyA9IHRocm93SWZNaXNzaW5nKCksIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiB8fCAwO1xuICAgIHJldHVybiBzdXBlci5sb2FkKGZpbGVVUkxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGEgc2luZ2xlIGF1ZGlvIGZpbGUsIGRlY29kZSBpdCBpbiBhbiBBdWRpb0J1ZmZlciwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVVSTCAtIFRoZSBVUkwgb2YgdGhlIGF1ZGlvIGZpbGUgbG9jYXRpb24gdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkT25lKGZpbGVVUkwpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZE9uZShmaWxlVVJMKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHRoaXMuZGVjb2RlQXVkaW9EYXRhLmJpbmQodGhpcyksXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYWxsIGF1ZGlvIGZpbGVzIGF0IG9uY2UgaW4gYSBzaW5nbGUgYXJyYXksIGRlY29kZSB0aGVtIGluIGFuIGFycmF5IG9mIEF1ZGlvQnVmZmVycywgYW5kIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGF1ZGlvIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZEFsbChmaWxlVVJMcykge1xuICAgIHJldHVybiBzdXBlci5sb2FkQWxsKGZpbGVVUkxzKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChhcnJheWJ1ZmZlcnMpID0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyYXlidWZmZXJzLm1hcCgoYXJyYXlidWZmZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpKGFycmF5YnVmZmVyKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycm9yOyAvLyBUT0RPOiBiZXR0ZXIgZXJyb3IgaGFuZGxlclxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBEZWNvZGUgQXVkaW8gRGF0YSwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSAtIFRoZSBhcnJheWJ1ZmZlciBvZiB0aGUgbG9hZGVkIGF1ZGlvIGZpbGUgdG8gYmUgZGVjb2RlZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBkZWNvZGVBdWRpb0RhdGEoYXJyYXlidWZmZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShcbiAgICAgICAgYXJyYXlidWZmZXIsIC8vIHJldHVybmVkIGF1ZGlvIGRhdGEgYXJyYXlcbiAgICAgICAgKGJ1ZmZlcikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiA9PT0gMCkgcmVzb2x2ZShidWZmZXIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZSh0aGlzLl9fd3JhcEFyb3VuZChidWZmZXIpKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkRlY29kZUF1ZGlvRGF0YSBlcnJvclwiKSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gV3JhcEFyb3VuZCwgY29weSB0aGUgYmVnaW5pbmcgaW5wdXQgYnVmZmVyIHRvIHRoZSBlbmQgb2YgYW4gb3V0cHV0IGJ1ZmZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSBpbkJ1ZmZlciB7YXJyYXlidWZmZXJ9IC0gVGhlIGlucHV0IGJ1ZmZlclxuICAgKiBAcmV0dXJucyB7YXJyYXlidWZmZXJ9IC0gVGhlIHByb2Nlc3NlZCBidWZmZXIgKHdpdGggZnJhbWUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nIHRvIHRoZSBlbmQpXG4gICAqL1xuICBfX3dyYXBBcm91bmQoaW5CdWZmZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gaW5CdWZmZXIubGVuZ3RoICsgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gKiBpbkJ1ZmZlci5zYW1wbGVSYXRlO1xuICAgIHZhciBvdXRCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKGluQnVmZmVyLm51bWJlck9mQ2hhbm5lbHMsIGxlbmd0aCwgaW5CdWZmZXIuc2FtcGxlUmF0ZSk7XG4gICAgdmFyIGFycmF5Q2hEYXRhLCBhcnJheU91dENoRGF0YTtcblxuICAgIGZvciAodmFyIGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgaW5CdWZmZXIubnVtYmVyT2ZDaGFubmVsczsgY2hhbm5lbCsrKSB7XG4gICAgICBhcnJheUNoRGF0YSA9IGluQnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuICAgICAgYXJyYXlPdXRDaERhdGEgPSBvdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG5cbiAgICAgIGFycmF5T3V0Q2hEYXRhLmZvckVhY2goZnVuY3Rpb24oc2FtcGxlLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCBpbkJ1ZmZlci5sZW5ndGgpIGFycmF5T3V0Q2hEYXRhW2luZGV4XSA9IGFycmF5Q2hEYXRhW2luZGV4XTtcbiAgICAgICAgZWxzZSBhcnJheU91dENoRGF0YVtpbmRleF0gPSBhcnJheUNoRGF0YVtpbmRleCAtIGluQnVmZmVyLmxlbmd0aF07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0QnVmZmVyO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb0J1ZmZlckxvYWRlcjsiXX0=