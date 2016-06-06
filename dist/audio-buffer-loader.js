'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

var audioContext = void 0;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

try {
  audioContext = new window.AudioContext();
} catch (e) {}

/**
 * AudioBufferLoader
 * Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 */

var AudioBufferLoader = function (_Loader) {
  (0, _inherits3.default)(AudioBufferLoader, _Loader);

  /**
   * Set the responseType to 'arraybuffer' and initialize options.
   * @param {string} [responseType="arraybuffer"]
   */

  function AudioBufferLoader() {
    var responseType = arguments.length <= 0 || arguments[0] === undefined ? 'arraybuffer' : arguments[0];
    (0, _classCallCheck3.default)(this, AudioBufferLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AudioBufferLoader).call(this, responseType));

    _this.options = {
      "wrapAroundExtension": 0
    };
    _this.responseType = responseType;
    _this.audioContext = audioContext;
    return _this;
  }

  /**
   * Allow to set the audio context that should be used in order to decode
   * the file and create the AudioBuffer.
   * @param {AudioContext} audioContext
   */


  (0, _createClass3.default)(AudioBufferLoader, [{
    key: 'setAudioContext',
    value: function setAudioContext(audioContext) {
      this.audioContext = audioContext;
    }

    /**
     * Method for promise audio file loading and decoding.
     * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
     * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer
     * @returns {Promise}
     */

  }, {
    key: 'load',
    value: function load() {
      var fileURLs = arguments.length <= 0 || arguments[0] === undefined ? throwIfMissing() : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.options = options;
      this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'load', this).call(this, fileURLs);
    }

    /**
     * Load a single audio file, decode it in an AudioBuffer, return a Promise
     * @private
     * @param {string} fileURL - The URL of the audio file location to load.
     * @returns {Promise}
     */

  }, {
    key: 'loadOne',
    value: function loadOne(fileURL) {
      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'loadOne', this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
        throw error;
      });
    }

    /**
     * Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
     * @private
     * @param {string[]} fileURLs - The URLs array of the audio files to load.
     * @returns {Promise}
     */

  }, {
    key: 'loadAll',
    value: function loadAll(fileURLs) {
      var _this2 = this;

      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'loadAll', this).call(this, fileURLs).then(function (arraybuffers) {
        return _promise2.default.all(arraybuffers.map(function (arraybuffer) {
          return _this2.decodeAudioData.bind(_this2)(arraybuffer);
        }));
      }, function (error) {
        throw error; // TODO: better error handler
      });
    }

    /**
     * Decode Audio Data, return a Promise
     * @private
     * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
     * @returns {Promise}
     */

  }, {
    key: 'decodeAudioData',
    value: function decodeAudioData(arraybuffer) {
      var _this3 = this;

      if (arraybuffer instanceof ArrayBuffer) {
        return new _promise2.default(function (resolve, reject) {
          _this3.audioContext.decodeAudioData(arraybuffer, // returned audio data array
          function (buffer) {
            if (_this3.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this3.__wrapAround(buffer));
          }, function (error) {
            reject(new Error("DecodeAudioData error"));
          });
        });
      } else {
        return new _promise2.default(function (resolve, reject) {
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

  }, {
    key: '__wrapAround',
    value: function __wrapAround(inBuffer) {
      var length = inBuffer.length + this.options.wrapAroundExtension * inBuffer.sampleRate;

      var outBuffer = this.audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate);
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
}(_loader2.default);

exports.default = AudioBufferLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGlvLWJ1ZmZlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVFBLFNBQVMsY0FBVCxHQUEwQjtBQUN4QixRQUFNLElBQUksS0FBSixDQUFVLG1CQUFWLENBQU4sQ0FEd0I7Q0FBMUI7O0FBSUEsSUFBSSxxQkFBSjs7QUFFQSxPQUFPLFlBQVAsR0FBdUIsT0FBTyxZQUFQLElBQXVCLE9BQU8sa0JBQVA7O0FBRTlDLElBQUk7QUFDRixpQkFBZSxJQUFJLE9BQU8sWUFBUCxFQUFuQixDQURFO0NBQUosQ0FFRSxPQUFPLENBQVAsRUFBVSxFQUFWOzs7Ozs7O0lBT21COzs7Ozs7OztBQUtuQixXQUxtQixpQkFLbkIsR0FBMEM7UUFBOUIscUVBQWUsNkJBQWU7d0NBTHZCLG1CQUt1Qjs7NkZBTHZCLDhCQU1YLGVBRGtDOztBQUV4QyxVQUFLLE9BQUwsR0FBZTtBQUNiLDZCQUF1QixDQUF2QjtLQURGLENBRndDO0FBS3hDLFVBQUssWUFBTCxHQUFvQixZQUFwQixDQUx3QztBQU14QyxVQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FOd0M7O0dBQTFDOzs7Ozs7Ozs7NkJBTG1COztvQ0FtQkgsY0FBYztBQUM1QixXQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FENEI7Ozs7Ozs7Ozs7OzsyQkFVa0I7VUFBM0MsaUVBQVcsZ0NBQWdDO1VBQWQsZ0VBQVUsa0JBQUk7O0FBQzlDLFdBQUssT0FBTCxHQUFlLE9BQWYsQ0FEOEM7QUFFOUMsV0FBSyxPQUFMLENBQWEsbUJBQWIsR0FBbUMsS0FBSyxPQUFMLENBQWEsbUJBQWIsSUFBb0MsQ0FBcEMsQ0FGVztBQUc5Qyw4REFoQ2lCLHVEQWdDQyxTQUFsQixDQUg4Qzs7Ozs7Ozs7Ozs7OzRCQVl4QyxTQUFTO0FBQ2YsYUFBTyxpREExQ1UsMERBMENJLFFBQWQsQ0FDSixJQURJLENBRUgsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBQTBCLElBQTFCLENBRkcsRUFHSCxVQUFTLEtBQVQsRUFBZ0I7QUFDZCxjQUFNLEtBQU4sQ0FEYztPQUFoQixDQUhKLENBRGU7Ozs7Ozs7Ozs7Ozs0QkFlVCxVQUFVOzs7QUFDaEIsYUFBTyxpREF6RFUsMERBeURJLFNBQWQsQ0FDSixJQURJLENBRUgsVUFBQyxZQUFELEVBQWtCO0FBQ2hCLGVBQU8sa0JBQVEsR0FBUixDQUFZLGFBQWEsR0FBYixDQUFpQixVQUFDLFdBQUQsRUFBaUI7QUFDbkQsaUJBQU8sT0FBSyxlQUFMLENBQXFCLElBQXJCLFNBQWdDLFdBQWhDLENBQVAsQ0FEbUQ7U0FBakIsQ0FBN0IsQ0FBUCxDQURnQjtPQUFsQixFQUlHLFVBQUMsS0FBRCxFQUFXO0FBQ1osY0FBTSxLQUFOO0FBRFksT0FBWCxDQU5QLENBRGdCOzs7Ozs7Ozs7Ozs7b0NBa0JGLGFBQWE7OztBQUMzQixVQUFJLHVCQUF1QixXQUF2QixFQUFvQztBQUN0QyxlQUFPLHNCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsaUJBQUssWUFBTCxDQUFrQixlQUFsQixDQUNFLFdBREY7QUFFRSxvQkFBQyxNQUFELEVBQVk7QUFDVixnQkFBSSxPQUFLLE9BQUwsQ0FBYSxtQkFBYixLQUFxQyxDQUFyQyxFQUF3QyxRQUFRLE1BQVIsRUFBNUMsS0FDSyxRQUFRLE9BQUssWUFBTCxDQUFrQixNQUFsQixDQUFSLEVBREw7V0FERixFQUdHLFVBQUMsS0FBRCxFQUFXO0FBQ1osbUJBQU8sSUFBSSxLQUFKLENBQVUsdUJBQVYsQ0FBUCxFQURZO1dBQVgsQ0FMTCxDQURzQztTQUFyQixDQUFuQixDQURzQztPQUF4QyxNQVlPO0FBQ0wsZUFBTyxzQkFBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLGtCQUFRLFdBQVIsRUFEc0M7U0FBckIsQ0FBbkIsQ0FESztPQVpQOzs7Ozs7Ozs7Ozs7aUNBeUJXLFVBQVU7QUFDckIsVUFBSSxTQUFTLFNBQVMsTUFBVCxHQUFrQixLQUFLLE9BQUwsQ0FBYSxtQkFBYixHQUFtQyxTQUFTLFVBQVQsQ0FEN0M7O0FBR3JCLFVBQUksWUFBWSxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsQ0FBK0IsU0FBUyxnQkFBVCxFQUEyQixNQUExRCxFQUFrRSxTQUFTLFVBQVQsQ0FBOUUsQ0FIaUI7QUFJckIsVUFBSSxXQUFKLEVBQWlCLGNBQWpCLENBSnFCOztBQU1yQixXQUFLLElBQUksVUFBVSxDQUFWLEVBQWEsVUFBVSxTQUFTLGdCQUFULEVBQTJCLFNBQTNELEVBQXNFO0FBQ3BFLHNCQUFjLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFkLENBRG9FO0FBRXBFLHlCQUFpQixVQUFVLGNBQVYsQ0FBeUIsT0FBekIsQ0FBakIsQ0FGb0U7O0FBSXBFLHVCQUFlLE9BQWYsQ0FBdUIsVUFBUyxNQUFULEVBQWlCLEtBQWpCLEVBQXdCO0FBQzdDLGNBQUksUUFBUSxTQUFTLE1BQVQsRUFBaUIsZUFBZSxLQUFmLElBQXdCLFlBQVksS0FBWixDQUF4QixDQUE3QixLQUNLLGVBQWUsS0FBZixJQUF3QixZQUFZLFFBQVEsU0FBUyxNQUFULENBQTVDLENBREw7U0FEcUIsQ0FBdkIsQ0FKb0U7T0FBdEU7O0FBVUEsYUFBTyxTQUFQLENBaEJxQjs7O1NBcEdKIiwiZmlsZSI6ImF1ZGlvLWJ1ZmZlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9hZGVyIGZyb20gJy4vbG9hZGVyJztcblxuXG4vKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcicpO1xufVxuXG5sZXQgYXVkaW9Db250ZXh0O1xuXG53aW5kb3cuQXVkaW9Db250ZXh0ID0gKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCk7XG5cbnRyeSB7XG4gIGF1ZGlvQ29udGV4dCA9IG5ldyB3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG59IGNhdGNoIChlKSB7fVxuXG5cbi8qKlxuICogQXVkaW9CdWZmZXJMb2FkZXJcbiAqIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZCBhbmQgZGVjb2RlIGF1ZGlvIGRhdGEgZm9yIGFycmF5YnVmZmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb0J1ZmZlckxvYWRlciBleHRlbmRzIExvYWRlciB7XG4gIC8qKlxuICAgKiBTZXQgdGhlIHJlc3BvbnNlVHlwZSB0byAnYXJyYXlidWZmZXInIGFuZCBpbml0aWFsaXplIG9wdGlvbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIl1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcicpIHtcbiAgICBzdXBlcihyZXNwb25zZVR5cGUpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIFwid3JhcEFyb3VuZEV4dGVuc2lvblwiOiAwXG4gICAgfTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IGF1ZGlvQ29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvdyB0byBzZXQgdGhlIGF1ZGlvIGNvbnRleHQgdGhhdCBzaG91bGQgYmUgdXNlZCBpbiBvcmRlciB0byBkZWNvZGVcbiAgICogdGhlIGZpbGUgYW5kIGNyZWF0ZSB0aGUgQXVkaW9CdWZmZXIuXG4gICAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBhdWRpb0NvbnRleHRcbiAgICovXG4gIHNldEF1ZGlvQ29udGV4dChhdWRpb0NvbnRleHQpIHtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IGF1ZGlvQ29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZm9yIHByb21pc2UgYXVkaW8gZmlsZSBsb2FkaW5nIGFuZCBkZWNvZGluZy5cbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEBwYXJhbSB7e3dyYXBBcm91bmRFeHRlbnNpb246IG51bWJlcn19IFtvcHRpb25zXSAtIE9iamVjdCB3aXRoIGEgd3JhcEFyb3VuZEV4dGVuc2lvbiBrZXkgd2hpY2ggc2V0IHRoZSBsZW5ndGgsIGluIHNlY29uZHMgdG8gYmUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nIGF0IHRoZSBlbmQgb2YgdGhlIHJldHVybmVkIEF1ZGlvQnVmZmVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChmaWxlVVJMcyA9IHRocm93SWZNaXNzaW5nKCksIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiB8fCAwO1xuICAgIHJldHVybiBzdXBlci5sb2FkKGZpbGVVUkxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgc2luZ2xlIGF1ZGlvIGZpbGUsIGRlY29kZSBpdCBpbiBhbiBBdWRpb0J1ZmZlciwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVVSTCAtIFRoZSBVUkwgb2YgdGhlIGF1ZGlvIGZpbGUgbG9jYXRpb24gdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkT25lKGZpbGVVUkwpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZE9uZShmaWxlVVJMKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHRoaXMuZGVjb2RlQXVkaW9EYXRhLmJpbmQodGhpcyksXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIGF1ZGlvIGZpbGVzIGF0IG9uY2UgaW4gYSBzaW5nbGUgYXJyYXksIGRlY29kZSB0aGVtIGluIGFuIGFycmF5IG9mIEF1ZGlvQnVmZmVycywgYW5kIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGF1ZGlvIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZEFsbChmaWxlVVJMcykge1xuICAgIHJldHVybiBzdXBlci5sb2FkQWxsKGZpbGVVUkxzKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChhcnJheWJ1ZmZlcnMpID0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyYXlidWZmZXJzLm1hcCgoYXJyYXlidWZmZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpKGFycmF5YnVmZmVyKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycm9yOyAvLyBUT0RPOiBiZXR0ZXIgZXJyb3IgaGFuZGxlclxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvZGUgQXVkaW8gRGF0YSwgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSAtIFRoZSBhcnJheWJ1ZmZlciBvZiB0aGUgbG9hZGVkIGF1ZGlvIGZpbGUgdG8gYmUgZGVjb2RlZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBkZWNvZGVBdWRpb0RhdGEoYXJyYXlidWZmZXIpIHtcbiAgICBpZiAoYXJyYXlidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICAgIGFycmF5YnVmZmVyLCAvLyByZXR1cm5lZCBhdWRpbyBkYXRhIGFycmF5XG4gICAgICAgICAgKGJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID09PSAwKSByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICAgICAgICBlbHNlIHJlc29sdmUodGhpcy5fX3dyYXBBcm91bmQoYnVmZmVyKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRGVjb2RlQXVkaW9EYXRhIGVycm9yXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZShhcnJheWJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcEFyb3VuZCwgY29weSB0aGUgYmVnaW5pbmcgaW5wdXQgYnVmZmVyIHRvIHRoZSBlbmQgb2YgYW4gb3V0cHV0IGJ1ZmZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2FycmF5YnVmZmVyfSBpbkJ1ZmZlciB7YXJyYXlidWZmZXJ9IC0gVGhlIGlucHV0IGJ1ZmZlclxuICAgKiBAcmV0dXJucyB7YXJyYXlidWZmZXJ9IC0gVGhlIHByb2Nlc3NlZCBidWZmZXIgKHdpdGggZnJhbWUgY29waWVkIGZyb20gdGhlIGJlZ2luaW5nIHRvIHRoZSBlbmQpXG4gICAqL1xuICBfX3dyYXBBcm91bmQoaW5CdWZmZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gaW5CdWZmZXIubGVuZ3RoICsgdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gKiBpbkJ1ZmZlci5zYW1wbGVSYXRlO1xuXG4gICAgdmFyIG91dEJ1ZmZlciA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzLCBsZW5ndGgsIGluQnVmZmVyLnNhbXBsZVJhdGUpO1xuICAgIHZhciBhcnJheUNoRGF0YSwgYXJyYXlPdXRDaERhdGE7XG5cbiAgICBmb3IgKHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGluQnVmZmVyLm51bWJlck9mQ2hhbm5lbHM7IGNoYW5uZWwrKykge1xuICAgICAgYXJyYXlDaERhdGEgPSBpbkJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcbiAgICAgIGFycmF5T3V0Q2hEYXRhID0gb3V0QnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuXG4gICAgICBhcnJheU91dENoRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHNhbXBsZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgaW5CdWZmZXIubGVuZ3RoKSBhcnJheU91dENoRGF0YVtpbmRleF0gPSBhcnJheUNoRGF0YVtpbmRleF07XG4gICAgICAgIGVsc2UgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXggLSBpbkJ1ZmZlci5sZW5ndGhdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dEJ1ZmZlcjtcbiAgfVxufVxuIl19