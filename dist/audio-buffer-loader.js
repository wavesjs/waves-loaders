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

var audioContext = undefined;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

try {
  audioContext = new window.AudioContext();
} catch (e) {}

/**
 * AudioBufferLoader
 * Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 */

var AudioBufferLoader = (function (_Loader) {
  /**
   * Set the responseType to 'arraybuffer' and initialize options.
   * @param {string} [responseType="arraybuffer"]
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
     * Method for promise audio file loading and decoding.
     * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
     * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer
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
     * Load a single audio file, decode it in an AudioBuffer, return a Promise
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
     * Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
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
     * Decode Audio Data, return a Promise
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
     * WrapAround, copy the begining input buffer to the end of an output buffer
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9hdWRpby1idWZmZXItbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUFtQixVQUFVOzs7Ozs7Ozs7QUFRN0IsU0FBUyxjQUFjLEdBQUc7QUFDeEIsUUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3RDOztBQUVELElBQUksWUFBWSxZQUFBLENBQUM7O0FBRWpCLE1BQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsa0JBQWtCLEFBQUMsQ0FBQzs7QUFFekUsSUFBSTtBQUNGLGNBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztDQUMxQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Ozs7Ozs7SUFPTyxpQkFBaUI7Ozs7OztBQUt6QixXQUxRLGlCQUFpQixHQUtNO1FBQTlCLFlBQVksZ0NBQUcsYUFBYTs7MEJBTHJCLGlCQUFpQjs7QUFNbEMsK0JBTmlCLGlCQUFpQiw2Q0FNNUIsWUFBWSxFQUFFO0FBQ3BCLFFBQUksQ0FBQyxPQUFPLEdBQUc7QUFDYiwyQkFBcUIsRUFBRSxDQUFDO0tBQ3pCLENBQUM7QUFDRixRQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztHQUVsQzs7WUFaa0IsaUJBQWlCOztlQUFqQixpQkFBaUI7Ozs7Ozs7OztXQW9CaEMsZ0JBQTRDO1VBQTNDLFFBQVEsZ0NBQUcsY0FBYyxFQUFFO1VBQUUsT0FBTyxnQ0FBRyxFQUFFOztBQUM1QyxVQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixVQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLElBQUksQ0FBQyxDQUFDO0FBQ3pFLHdDQXZCaUIsaUJBQWlCLHNDQXVCaEIsUUFBUSxFQUFFO0tBQzdCOzs7Ozs7Ozs7O1dBUU0saUJBQUMsT0FBTyxFQUFFO0FBQ2YsYUFBTywyQkFqQ1UsaUJBQWlCLHlDQWlDYixPQUFPLEVBQ3pCLElBQUksQ0FDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDL0IsVUFBUyxLQUFLLEVBQUU7QUFDZCxjQUFNLEtBQUssQ0FBQztPQUNiLENBQUMsQ0FBQztLQUNSOzs7Ozs7Ozs7O1dBUU0saUJBQUMsUUFBUSxFQUFFOzs7QUFDaEIsYUFBTywyQkFoRFUsaUJBQWlCLHlDQWdEYixRQUFRLEVBQzFCLElBQUksQ0FDSCxVQUFDLFlBQVksRUFBSztBQUNoQixlQUFPLFNBQVEsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFXLEVBQUs7QUFDbkQsaUJBQU8sTUFBSyxlQUFlLENBQUMsSUFBSSxPQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckQsQ0FBQyxDQUFDLENBQUM7T0FDTCxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ1osY0FBTSxLQUFLLENBQUM7T0FDYixDQUFDLENBQUM7S0FDUjs7Ozs7Ozs7OztXQVFjLHlCQUFDLFdBQVcsRUFBRTs7O0FBQzNCLFVBQUksV0FBVyxZQUFZLFdBQVcsRUFBRTtBQUN0QyxlQUFPLGFBQVksVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ3RDLHNCQUFZLENBQUMsZUFBZSxDQUMxQixXQUFXO0FBQ1gsb0JBQUMsTUFBTSxFQUFLO0FBQ1YsZ0JBQUksT0FBSyxPQUFPLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUN2RCxPQUFPLENBQUMsT0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztXQUN6QyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ1osa0JBQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7V0FDNUMsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO09BQ0osTUFBTTtBQUNMLGVBQU8sYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7T0FDSjtLQUNGOzs7Ozs7Ozs7O1dBUVcsc0JBQUMsUUFBUSxFQUFFO0FBQ3JCLFVBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDOztBQUV0RixVQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xHLFVBQUksV0FBVyxFQUFFLGNBQWMsQ0FBQzs7QUFFaEMsV0FBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsRUFBRTtBQUNwRSxtQkFBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0Msc0JBQWMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuRCxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDN0MsY0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQ25FLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuRSxDQUFDLENBQUM7T0FDSjs7QUFFRCxhQUFPLFNBQVMsQ0FBQztLQUNsQjs7O1NBNUdrQixpQkFBaUI7OztxQkFBakIsaUJBQWlCIiwiZmlsZSI6ImVzNi9hdWRpby1idWZmZXItbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYWRlciBmcm9tICcuL2xvYWRlcic7XG5cblxuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxubGV0IGF1ZGlvQ29udGV4dDtcblxud2luZG93LkF1ZGlvQ29udGV4dCA9ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpO1xuXG50cnkge1xuICBhdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xufSBjYXRjaCAoZSkge31cblxuXG4vKipcbiAqIEF1ZGlvQnVmZmVyTG9hZGVyXG4gKiBQcm9taXNlIGJhc2VkIGltcGxlbWVudGF0aW9uIG9mIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIgZm9yIEdFVCBtZXRob2QgYW5kIGRlY29kZSBhdWRpbyBkYXRhIGZvciBhcnJheWJ1ZmZlci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9CdWZmZXJMb2FkZXIgZXh0ZW5kcyBMb2FkZXIge1xuICAvKipcbiAgICogU2V0IHRoZSByZXNwb25zZVR5cGUgdG8gJ2FycmF5YnVmZmVyJyBhbmQgaW5pdGlhbGl6ZSBvcHRpb25zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCJdXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInKSB7XG4gICAgc3VwZXIocmVzcG9uc2VUeXBlKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBcIndyYXBBcm91bmRFeHRlbnNpb25cIjogMFxuICAgIH07XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZm9yIHByb21pc2UgYXVkaW8gZmlsZSBsb2FkaW5nIGFuZCBkZWNvZGluZy5cbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEBwYXJhbSB7e3dyYXBBcm91bmRFeHRlbnNpb246IG51bWJlcn19IFtvcHRpb25zXSAtIE9iamVjdCB3aXRoIGEgd3JhcEFyb3VuZEV4dGVuc2lvbiBrZXkgd2hpY2ggc2V0IHRoZSBsZW5ndGgsIGluIHNlY29uZHMgdG8gYmUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nIGF0IHRoZSBlbmQgb2YgdGhlIHJldHVybmVkIEF1ZGlvQnVmZmVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChmaWxlVVJMcyA9IHRocm93SWZNaXNzaW5nKCksIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiB8fCAwO1xuICAgIHJldHVybiBzdXBlci5sb2FkKGZpbGVVUkxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgc2luZ2xlIGF1ZGlvIGZpbGUsIGRlY29kZSBpdCBpbiBhbiBBdWRpb0J1ZmZlciwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVVSTCAtIFRoZSBVUkwgb2YgdGhlIGF1ZGlvIGZpbGUgbG9jYXRpb24gdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkT25lKGZpbGVVUkwpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZE9uZShmaWxlVVJMKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHRoaXMuZGVjb2RlQXVkaW9EYXRhLmJpbmQodGhpcyksXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIGF1ZGlvIGZpbGVzIGF0IG9uY2UgaW4gYSBzaW5nbGUgYXJyYXksIGRlY29kZSB0aGVtIGluIGFuIGFycmF5IG9mIEF1ZGlvQnVmZmVycywgYW5kIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGF1ZGlvIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZEFsbChmaWxlVVJMcykge1xuICAgIHJldHVybiBzdXBlci5sb2FkQWxsKGZpbGVVUkxzKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChhcnJheWJ1ZmZlcnMpID0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyYXlidWZmZXJzLm1hcCgoYXJyYXlidWZmZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpKGFycmF5YnVmZmVyKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycm9yOyAvLyBUT0RPOiBiZXR0ZXIgZXJyb3IgaGFuZGxlclxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvZGUgQXVkaW8gRGF0YSwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSAtIFRoZSBhcnJheWJ1ZmZlciBvZiB0aGUgbG9hZGVkIGF1ZGlvIGZpbGUgdG8gYmUgZGVjb2RlZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBkZWNvZGVBdWRpb0RhdGEoYXJyYXlidWZmZXIpIHtcbiAgICBpZiAoYXJyYXlidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShcbiAgICAgICAgICBhcnJheWJ1ZmZlciwgLy8gcmV0dXJuZWQgYXVkaW8gZGF0YSBhcnJheVxuICAgICAgICAgIChidWZmZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiA9PT0gMCkgcmVzb2x2ZShidWZmZXIpO1xuICAgICAgICAgICAgZWxzZSByZXNvbHZlKHRoaXMuX193cmFwQXJvdW5kKGJ1ZmZlcikpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkRlY29kZUF1ZGlvRGF0YSBlcnJvclwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUoYXJyYXlidWZmZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBBcm91bmQsIGNvcHkgdGhlIGJlZ2luaW5nIGlucHV0IGJ1ZmZlciB0byB0aGUgZW5kIG9mIGFuIG91dHB1dCBidWZmZXJcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthcnJheWJ1ZmZlcn0gaW5CdWZmZXIge2FycmF5YnVmZmVyfSAtIFRoZSBpbnB1dCBidWZmZXJcbiAgICogQHJldHVybnMge2FycmF5YnVmZmVyfSAtIFRoZSBwcm9jZXNzZWQgYnVmZmVyICh3aXRoIGZyYW1lIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZyB0byB0aGUgZW5kKVxuICAgKi9cbiAgX193cmFwQXJvdW5kKGluQnVmZmVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IGluQnVmZmVyLmxlbmd0aCArIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uICogaW5CdWZmZXIuc2FtcGxlUmF0ZTtcblxuICAgIHZhciBvdXRCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKGluQnVmZmVyLm51bWJlck9mQ2hhbm5lbHMsIGxlbmd0aCwgaW5CdWZmZXIuc2FtcGxlUmF0ZSk7XG4gICAgdmFyIGFycmF5Q2hEYXRhLCBhcnJheU91dENoRGF0YTtcblxuICAgIGZvciAodmFyIGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgaW5CdWZmZXIubnVtYmVyT2ZDaGFubmVsczsgY2hhbm5lbCsrKSB7XG4gICAgICBhcnJheUNoRGF0YSA9IGluQnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuICAgICAgYXJyYXlPdXRDaERhdGEgPSBvdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG5cbiAgICAgIGFycmF5T3V0Q2hEYXRhLmZvckVhY2goZnVuY3Rpb24oc2FtcGxlLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCBpbkJ1ZmZlci5sZW5ndGgpIGFycmF5T3V0Q2hEYXRhW2luZGV4XSA9IGFycmF5Q2hEYXRhW2luZGV4XTtcbiAgICAgICAgZWxzZSBhcnJheU91dENoRGF0YVtpbmRleF0gPSBhcnJheUNoRGF0YVtpbmRleCAtIGluQnVmZmVyLmxlbmd0aF07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0QnVmZmVyO1xuICB9XG59XG4iXX0=