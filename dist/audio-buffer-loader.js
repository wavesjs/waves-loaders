'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

var audioContext;

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
    var responseType = arguments[0] === undefined ? 'arraybuffer' : arguments[0];

    _classCallCheck(this, AudioBufferLoader);

    _get(Object.getPrototypeOf(AudioBufferLoader.prototype), 'constructor', this).call(this, responseType);
    this.options = {
      'wrapAroundExtension': 0
    };
    this.responseType = responseType;
  }

  _inherits(AudioBufferLoader, _Loader);

  _createClass(AudioBufferLoader, [{
    key: 'load',

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
      return _get(Object.getPrototypeOf(AudioBufferLoader.prototype), 'load', this).call(this, fileURLs);
    }
  }, {
    key: 'loadOne',

    /**
     * @function - Load a single audio file, decode it in an AudioBuffer, return a Promise
     * @private
     * @param {string} fileURL - The URL of the audio file location to load.
     * @returns {Promise}
     */
    value: function loadOne(fileURL) {
      return _get(Object.getPrototypeOf(AudioBufferLoader.prototype), 'loadOne', this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
        throw error;
      });
    }
  }, {
    key: 'loadAll',

    /**
     * @function - Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
     * @private
     * @param {string[]} fileURLs - The URLs array of the audio files to load.
     * @returns {Promise}
     */
    value: function loadAll(fileURLs) {
      var _this = this;

      return _get(Object.getPrototypeOf(AudioBufferLoader.prototype), 'loadAll', this).call(this, fileURLs).then(function (arraybuffers) {
        return _Promise.all(arraybuffers.map(function (arraybuffer) {
          return _this.decodeAudioData.bind(_this)(arraybuffer);
        }));
      }, function (error) {
        throw error; // TODO: better error handler
      });
    }
  }, {
    key: 'decodeAudioData',

    /**
     * @function - Decode Audio Data, return a Promise
     * @private
     * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
     * @returns {Promise}
     */
    value: function decodeAudioData(arraybuffer) {
      var _this2 = this;

      if (arraybuffer instanceof ArrayBuffer) {
        return new _Promise(function (resolve, reject) {
          audioContext.decodeAudioData(arraybuffer, // returned audio data array
          function (buffer) {
            if (_this2.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this2.__wrapAround(buffer));
          }, function (error) {
            reject(new Error('DecodeAudioData error'));
          });
        });
      } else {
        return new _Promise(function (resolve, reject) {
          resolve(arraybuffer);
        });
      }
    }
  }, {
    key: '__wrapAround',

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
    }
  }]);

  return AudioBufferLoader;
})(_loader2['default']);

exports['default'] = AudioBufferLoader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9hdWRpby1idWZmZXItbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUFtQixVQUFVOzs7Ozs7Ozs7QUFRN0IsU0FBUyxjQUFjLEdBQUc7QUFDeEIsUUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3RDOztBQUVELElBQUksWUFBWSxDQUFDOztBQUVqQixJQUFJO0FBQ0YsY0FBWSxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0NBQzFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTs7Ozs7Ozs7O0lBU08saUJBQWlCOzs7Ozs7QUFLekIsV0FMUSxpQkFBaUIsR0FLTTtRQUE5QixZQUFZLGdDQUFHLGFBQWE7OzBCQUxyQixpQkFBaUI7O0FBTWxDLCtCQU5pQixpQkFBaUIsNkNBTTVCLFlBQVksRUFBRTtBQUNwQixRQUFJLENBQUMsT0FBTyxHQUFHO0FBQ2IsMkJBQXFCLEVBQUUsQ0FBQztLQUN6QixDQUFDO0FBQ0YsUUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7R0FFbEM7O1lBWmtCLGlCQUFpQjs7ZUFBakIsaUJBQWlCOzs7Ozs7Ozs7O1dBcUJoQyxnQkFBNEM7VUFBM0MsUUFBUSxnQ0FBRyxjQUFjLEVBQUU7VUFBRSxPQUFPLGdDQUFHLEVBQUU7O0FBQzVDLFVBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFVBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUM7QUFDekUsd0NBeEJpQixpQkFBaUIsc0NBd0JoQixRQUFRLEVBQUU7S0FDN0I7Ozs7Ozs7Ozs7V0FRTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixhQUFPLDJCQWxDVSxpQkFBaUIseUNBa0NiLE9BQU8sRUFDekIsSUFBSSxDQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMvQixVQUFTLEtBQUssRUFBRTtBQUNkLGNBQU0sS0FBSyxDQUFDO09BQ2IsQ0FBQyxDQUFDO0tBQ1I7Ozs7Ozs7Ozs7V0FRTSxpQkFBQyxRQUFRLEVBQUU7OztBQUNoQixhQUFPLDJCQWpEVSxpQkFBaUIseUNBaURiLFFBQVEsRUFDMUIsSUFBSSxDQUNILFVBQUMsWUFBWSxFQUFLO0FBQ2hCLGVBQU8sU0FBUSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFdBQVcsRUFBSztBQUNuRCxpQkFBTyxNQUFLLGVBQWUsQ0FBQyxJQUFJLE9BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRCxDQUFDLENBQUMsQ0FBQztPQUNMLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDWixjQUFNLEtBQUssQ0FBQztPQUNiLENBQUMsQ0FBQztLQUNSOzs7Ozs7Ozs7O1dBUWMseUJBQUMsV0FBVyxFQUFFOzs7QUFDM0IsVUFBSSxXQUFXLFlBQVksV0FBVyxFQUFFO0FBQ3RDLGVBQU8sYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsc0JBQVksQ0FBQyxlQUFlLENBQzFCLFdBQVc7QUFDWCxvQkFBQyxNQUFNLEVBQUs7QUFDVixnQkFBSSxPQUFLLE9BQU8sQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQ3ZELE9BQU8sQ0FBQyxPQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1dBQ3pDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDWixrQkFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztXQUM1QyxDQUNGLENBQUM7U0FDSCxDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsZUFBTyxhQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztPQUNKO0tBQ0Y7Ozs7Ozs7Ozs7V0FRVyxzQkFBQyxRQUFRLEVBQUU7QUFDckIsVUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBRXRGLFVBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEcsVUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDOztBQUVoQyxXQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxFQUFFO0FBQ3BFLG1CQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyxzQkFBYyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5ELHNCQUFjLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM3QyxjQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FDbkUsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25FLENBQUMsQ0FBQztPQUNKOztBQUVELGFBQU8sU0FBUyxDQUFDO0tBQ2xCOzs7U0E3R2tCLGlCQUFpQjs7O3FCQUFqQixpQkFBaUIiLCJmaWxlIjoiZXM2L2F1ZGlvLWJ1ZmZlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9hZGVyIGZyb20gJy4vbG9hZGVyJztcblxuXG4vKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcicpO1xufVxuXG52YXIgYXVkaW9Db250ZXh0O1xuXG50cnkge1xuICBhdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xufSBjYXRjaCAoZSkge31cblxuXG4vKipcbiAqIEF1ZGlvQnVmZmVyTG9hZGVyXG4gKiBAY2xhc3NcbiAqIEBjbGFzc2Rlc2MgUHJvbWlzZSBiYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZvciBHRVQgbWV0aG9kIGFuZCBkZWNvZGUgYXVkaW8gZGF0YSBmb3IgYXJyYXlidWZmZXIuXG4gKiBJbmhlcml0IGZyb20gTG9hZGVyIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvQnVmZmVyTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIFNldCB0aGUgcmVzcG9uc2VUeXBlIHRvICdhcnJheWJ1ZmZlcicgYW5kIGluaXRpYWxpemUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcicpIHtcbiAgICBzdXBlcihyZXNwb25zZVR5cGUpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIFwid3JhcEFyb3VuZEV4dGVuc2lvblwiOiAwXG4gICAgfTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIE1ldGhvZCBmb3IgcHJvbWlzZSBhdWRpbyBmaWxlIGxvYWRpbmcgYW5kIGRlY29kaW5nLlxuICAgKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBmaWxlVVJMcyAtIFRoZSBVUkwocykgb2YgdGhlIGF1ZGlvIGZpbGVzIHRvIGxvYWQuIEFjY2VwdHMgYSBVUkwgcG9pbnRpbmcgdG8gdGhlIGZpbGUgbG9jYXRpb24gb3IgYW4gYXJyYXkgb2YgVVJMcy5cbiAgICogQHBhcmFtIHt7d3JhcEFyb3VuZEV4dGVuc2lvbjogbnVtYmVyfX0gW29wdGlvbnNdIC0gT2JqZWN0IHdpdGggYSB3cmFwQXJvdW5kRXh0ZW5zaW9uIGtleSB3aGljaCBzZXQgdGhlIGxlbmd0aCwgaW4gc2Vjb25kcyB0byBiZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmdcbiAgICogYXQgdGhlIGVuZCBvZiB0aGUgcmV0dXJuZWQgQXVkaW9CdWZmZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkKGZpbGVVUkxzID0gdGhyb3dJZk1pc3NpbmcoKSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uIHx8IDA7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWQoZmlsZVVSTHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYSBzaW5nbGUgYXVkaW8gZmlsZSwgZGVjb2RlIGl0IGluIGFuIEF1ZGlvQnVmZmVyLCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVVJMIC0gVGhlIFVSTCBvZiB0aGUgYXVkaW8gZmlsZSBsb2NhdGlvbiB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRPbmUoZmlsZVVSTCkge1xuICAgIHJldHVybiBzdXBlci5sb2FkT25lKGZpbGVVUkwpXG4gICAgICAudGhlbihcbiAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEuYmluZCh0aGlzKSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhbGwgYXVkaW8gZmlsZXMgYXQgb25jZSBpbiBhIHNpbmdsZSBhcnJheSwgZGVjb2RlIHRoZW0gaW4gYW4gYXJyYXkgb2YgQXVkaW9CdWZmZXJzLCBhbmQgcmV0dXJuIGEgUHJvbWlzZS5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZVVSTHMgLSBUaGUgVVJMcyBhcnJheSBvZiB0aGUgYXVkaW8gZmlsZXMgdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkQWxsKGZpbGVVUkxzKSB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRBbGwoZmlsZVVSTHMpXG4gICAgICAudGhlbihcbiAgICAgICAgKGFycmF5YnVmZmVycykgPT4ge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJheWJ1ZmZlcnMubWFwKChhcnJheWJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlQXVkaW9EYXRhLmJpbmQodGhpcykoYXJyYXlidWZmZXIpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFRPRE86IGJldHRlciBlcnJvciBoYW5kbGVyXG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIERlY29kZSBBdWRpbyBEYXRhLCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7YXJyYXlidWZmZXJ9IC0gVGhlIGFycmF5YnVmZmVyIG9mIHRoZSBsb2FkZWQgYXVkaW8gZmlsZSB0byBiZSBkZWNvZGVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGRlY29kZUF1ZGlvRGF0YShhcnJheWJ1ZmZlcikge1xuICAgIGlmIChhcnJheWJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICAgIGFycmF5YnVmZmVyLCAvLyByZXR1cm5lZCBhdWRpbyBkYXRhIGFycmF5XG4gICAgICAgICAgKGJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID09PSAwKSByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICAgICAgICBlbHNlIHJlc29sdmUodGhpcy5fX3dyYXBBcm91bmQoYnVmZmVyKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRGVjb2RlQXVkaW9EYXRhIGVycm9yXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZShhcnJheWJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gV3JhcEFyb3VuZCwgY29weSB0aGUgYmVnaW5pbmcgaW5wdXQgYnVmZmVyIHRvIHRoZSBlbmQgb2YgYW4gb3V0cHV0IGJ1ZmZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSBpbkJ1ZmZlciB7YXJyYXlidWZmZXJ9IC0gVGhlIGlucHV0IGJ1ZmZlclxuICAgKiBAcmV0dXJucyB7YXJyYXlidWZmZXJ9IC0gVGhlIHByb2Nlc3NlZCBidWZmZXIgKHdpdGggZnJhbWUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nIHRvIHRoZSBlbmQpXG4gICAqL1xuICBfX3dyYXBBcm91bmQoaW5CdWZmZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gaW5CdWZmZXIubGVuZ3RoICsgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gKiBpbkJ1ZmZlci5zYW1wbGVSYXRlO1xuXG4gICAgdmFyIG91dEJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoaW5CdWZmZXIubnVtYmVyT2ZDaGFubmVscywgbGVuZ3RoLCBpbkJ1ZmZlci5zYW1wbGVSYXRlKTtcbiAgICB2YXIgYXJyYXlDaERhdGEsIGFycmF5T3V0Q2hEYXRhO1xuXG4gICAgZm9yICh2YXIgY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCBpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzOyBjaGFubmVsKyspIHtcbiAgICAgIGFycmF5Q2hEYXRhID0gaW5CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG4gICAgICBhcnJheU91dENoRGF0YSA9IG91dEJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcblxuICAgICAgYXJyYXlPdXRDaERhdGEuZm9yRWFjaChmdW5jdGlvbihzYW1wbGUsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IGluQnVmZmVyLmxlbmd0aCkgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXhdO1xuICAgICAgICBlbHNlIGFycmF5T3V0Q2hEYXRhW2luZGV4XSA9IGFycmF5Q2hEYXRhW2luZGV4IC0gaW5CdWZmZXIubGVuZ3RoXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRCdWZmZXI7XG4gIH1cbn1cbiJdfQ==