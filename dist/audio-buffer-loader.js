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

    return _this;
  }

  /**
   * Method for promise audio file loading and decoding.
   * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
   * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer
   * @returns {Promise}
   */


  (0, _createClass3.default)(AudioBufferLoader, [{
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
          audioContext.decodeAudioData(arraybuffer, // returned audio data array
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
}(_loader2.default);

exports.default = AudioBufferLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGlvLWJ1ZmZlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVFBLFNBQVMsY0FBVCxHQUEwQjtBQUN4QixRQUFNLElBQUksS0FBSixDQUFVLG1CQUFWLENBQU4sQ0FEd0I7Q0FBMUI7O0FBSUEsSUFBSSxxQkFBSjs7QUFFQSxPQUFPLFlBQVAsR0FBdUIsT0FBTyxZQUFQLElBQXVCLE9BQU8sa0JBQVA7O0FBRTlDLElBQUk7QUFDRixpQkFBZSxJQUFJLE9BQU8sWUFBUCxFQUFuQixDQURFO0NBQUosQ0FFRSxPQUFPLENBQVAsRUFBVSxFQUFWOzs7Ozs7O0lBT21COzs7Ozs7OztBQUtuQixXQUxtQixpQkFLbkIsR0FBMEM7UUFBOUIscUVBQWUsNkJBQWU7d0NBTHZCLG1CQUt1Qjs7NkZBTHZCLDhCQU1YLGVBRGtDOztBQUV4QyxVQUFLLE9BQUwsR0FBZTtBQUNiLDZCQUF1QixDQUF2QjtLQURGLENBRndDO0FBS3hDLFVBQUssWUFBTCxHQUFvQixZQUFwQixDQUx3Qzs7O0dBQTFDOzs7Ozs7Ozs7OzZCQUxtQjs7MkJBb0I2QjtVQUEzQyxpRUFBVyxnQ0FBZ0M7VUFBZCxnRUFBVSxrQkFBSTs7QUFDOUMsV0FBSyxPQUFMLEdBQWUsT0FBZixDQUQ4QztBQUU5QyxXQUFLLE9BQUwsQ0FBYSxtQkFBYixHQUFtQyxLQUFLLE9BQUwsQ0FBYSxtQkFBYixJQUFvQyxDQUFwQyxDQUZXO0FBRzlDLDhEQXZCaUIsdURBdUJDLFNBQWxCLENBSDhDOzs7Ozs7Ozs7Ozs7NEJBWXhDLFNBQVM7QUFDZixhQUFPLGlEQWpDVSwwREFpQ0ksUUFBZCxDQUNKLElBREksQ0FFSCxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FGRyxFQUdILFVBQVMsS0FBVCxFQUFnQjtBQUNkLGNBQU0sS0FBTixDQURjO09BQWhCLENBSEosQ0FEZTs7Ozs7Ozs7Ozs7OzRCQWVULFVBQVU7OztBQUNoQixhQUFPLGlEQWhEVSwwREFnREksU0FBZCxDQUNKLElBREksQ0FFSCxVQUFDLFlBQUQsRUFBa0I7QUFDaEIsZUFBTyxrQkFBUSxHQUFSLENBQVksYUFBYSxHQUFiLENBQWlCLFVBQUMsV0FBRCxFQUFpQjtBQUNuRCxpQkFBTyxPQUFLLGVBQUwsQ0FBcUIsSUFBckIsU0FBZ0MsV0FBaEMsQ0FBUCxDQURtRDtTQUFqQixDQUE3QixDQUFQLENBRGdCO09BQWxCLEVBSUcsVUFBQyxLQUFELEVBQVc7QUFDWixjQUFNLEtBQU47QUFEWSxPQUFYLENBTlAsQ0FEZ0I7Ozs7Ozs7Ozs7OztvQ0FrQkYsYUFBYTs7O0FBQzNCLFVBQUksdUJBQXVCLFdBQXZCLEVBQW9DO0FBQ3RDLGVBQU8sc0JBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0Qyx1QkFBYSxlQUFiLENBQ0UsV0FERjtBQUVFLG9CQUFDLE1BQUQsRUFBWTtBQUNWLGdCQUFJLE9BQUssT0FBTCxDQUFhLG1CQUFiLEtBQXFDLENBQXJDLEVBQXdDLFFBQVEsTUFBUixFQUE1QyxLQUNLLFFBQVEsT0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQVIsRUFETDtXQURGLEVBR0csVUFBQyxLQUFELEVBQVc7QUFDWixtQkFBTyxJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUFQLEVBRFk7V0FBWCxDQUxMLENBRHNDO1NBQXJCLENBQW5CLENBRHNDO09BQXhDLE1BWU87QUFDTCxlQUFPLHNCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsa0JBQVEsV0FBUixFQURzQztTQUFyQixDQUFuQixDQURLO09BWlA7Ozs7Ozs7Ozs7OztpQ0F5QlcsVUFBVTtBQUNyQixVQUFJLFNBQVMsU0FBUyxNQUFULEdBQWtCLEtBQUssT0FBTCxDQUFhLG1CQUFiLEdBQW1DLFNBQVMsVUFBVCxDQUQ3Qzs7QUFHckIsVUFBSSxZQUFZLGFBQWEsWUFBYixDQUEwQixTQUFTLGdCQUFULEVBQTJCLE1BQXJELEVBQTZELFNBQVMsVUFBVCxDQUF6RSxDQUhpQjtBQUlyQixVQUFJLFdBQUosRUFBaUIsY0FBakIsQ0FKcUI7O0FBTXJCLFdBQUssSUFBSSxVQUFVLENBQVYsRUFBYSxVQUFVLFNBQVMsZ0JBQVQsRUFBMkIsU0FBM0QsRUFBc0U7QUFDcEUsc0JBQWMsU0FBUyxjQUFULENBQXdCLE9BQXhCLENBQWQsQ0FEb0U7QUFFcEUseUJBQWlCLFVBQVUsY0FBVixDQUF5QixPQUF6QixDQUFqQixDQUZvRTs7QUFJcEUsdUJBQWUsT0FBZixDQUF1QixVQUFTLE1BQVQsRUFBaUIsS0FBakIsRUFBd0I7QUFDN0MsY0FBSSxRQUFRLFNBQVMsTUFBVCxFQUFpQixlQUFlLEtBQWYsSUFBd0IsWUFBWSxLQUFaLENBQXhCLENBQTdCLEtBQ0ssZUFBZSxLQUFmLElBQXdCLFlBQVksUUFBUSxTQUFTLE1BQVQsQ0FBNUMsQ0FETDtTQURxQixDQUF2QixDQUpvRTtPQUF0RTs7QUFVQSxhQUFPLFNBQVAsQ0FoQnFCOzs7U0EzRkoiLCJmaWxlIjoiYXVkaW8tYnVmZmVyLWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkZXIgZnJvbSAnLi9sb2FkZXInO1xuXG5cbi8qKlxuICogR2V0cyBjYWxsZWQgaWYgYSBwYXJhbWV0ZXIgaXMgbWlzc2luZyBhbmQgdGhlIGV4cHJlc3Npb25cbiAqIHNwZWNpZnlpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaXMgZXZhbHVhdGVkLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZNaXNzaW5nKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcGFyYW1ldGVyJyk7XG59XG5cbmxldCBhdWRpb0NvbnRleHQ7XG5cbndpbmRvdy5BdWRpb0NvbnRleHQgPSAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KTtcblxudHJ5IHtcbiAgYXVkaW9Db250ZXh0ID0gbmV3IHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbn0gY2F0Y2ggKGUpIHt9XG5cblxuLyoqXG4gKiBBdWRpb0J1ZmZlckxvYWRlclxuICogUHJvbWlzZSBiYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZvciBHRVQgbWV0aG9kIGFuZCBkZWNvZGUgYXVkaW8gZGF0YSBmb3IgYXJyYXlidWZmZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvQnVmZmVyTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcbiAgLyoqXG4gICAqIFNldCB0aGUgcmVzcG9uc2VUeXBlIHRvICdhcnJheWJ1ZmZlcicgYW5kIGluaXRpYWxpemUgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiXVxuICAgKi9cbiAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJykge1xuICAgIHN1cGVyKHJlc3BvbnNlVHlwZSk7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgXCJ3cmFwQXJvdW5kRXh0ZW5zaW9uXCI6IDBcbiAgICB9O1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuXG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGZvciBwcm9taXNlIGF1ZGlvIGZpbGUgbG9hZGluZyBhbmQgZGVjb2RpbmcuXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgYXVkaW8gZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcGFyYW0ge3t3cmFwQXJvdW5kRXh0ZW5zaW9uOiBudW1iZXJ9fSBbb3B0aW9uc10gLSBPYmplY3Qgd2l0aCBhIHdyYXBBcm91bmRFeHRlbnNpb24ga2V5IHdoaWNoIHNldCB0aGUgbGVuZ3RoLCBpbiBzZWNvbmRzIHRvIGJlIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZyBhdCB0aGUgZW5kIG9mIHRoZSByZXR1cm5lZCBBdWRpb0J1ZmZlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gfHwgMDtcbiAgICByZXR1cm4gc3VwZXIubG9hZChmaWxlVVJMcyk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhIHNpbmdsZSBhdWRpbyBmaWxlLCBkZWNvZGUgaXQgaW4gYW4gQXVkaW9CdWZmZXIsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBhdWRpbyBmaWxlIGxvY2F0aW9uIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZE9uZShmaWxlVVJMKSB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRPbmUoZmlsZVVSTClcbiAgICAgIC50aGVuKFxuICAgICAgICB0aGlzLmRlY29kZUF1ZGlvRGF0YS5iaW5kKHRoaXMpLFxuICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCBhdWRpbyBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5LCBkZWNvZGUgdGhlbSBpbiBhbiBhcnJheSBvZiBBdWRpb0J1ZmZlcnMsIGFuZCByZXR1cm4gYSBQcm9taXNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlVVJMcyAtIFRoZSBVUkxzIGFycmF5IG9mIHRoZSBhdWRpbyBmaWxlcyB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRBbGwoZmlsZVVSTHMpIHtcbiAgICByZXR1cm4gc3VwZXIubG9hZEFsbChmaWxlVVJMcylcbiAgICAgIC50aGVuKFxuICAgICAgICAoYXJyYXlidWZmZXJzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycmF5YnVmZmVycy5tYXAoKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVBdWRpb0RhdGEuYmluZCh0aGlzKShhcnJheWJ1ZmZlcik7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjsgLy8gVE9ETzogYmV0dGVyIGVycm9yIGhhbmRsZXJcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVjb2RlIEF1ZGlvIERhdGEsIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthcnJheWJ1ZmZlcn0gLSBUaGUgYXJyYXlidWZmZXIgb2YgdGhlIGxvYWRlZCBhdWRpbyBmaWxlIHRvIGJlIGRlY29kZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgZGVjb2RlQXVkaW9EYXRhKGFycmF5YnVmZmVyKSB7XG4gICAgaWYgKGFycmF5YnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgICAgYXJyYXlidWZmZXIsIC8vIHJldHVybmVkIGF1ZGlvIGRhdGEgYXJyYXlcbiAgICAgICAgICAoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gPT09IDApIHJlc29sdmUoYnVmZmVyKTtcbiAgICAgICAgICAgIGVsc2UgcmVzb2x2ZSh0aGlzLl9fd3JhcEFyb3VuZChidWZmZXIpKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJEZWNvZGVBdWRpb0RhdGEgZXJyb3JcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKGFycmF5YnVmZmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwQXJvdW5kLCBjb3B5IHRoZSBiZWdpbmluZyBpbnB1dCBidWZmZXIgdG8gdGhlIGVuZCBvZiBhbiBvdXRwdXQgYnVmZmVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7YXJyYXlidWZmZXJ9IGluQnVmZmVyIHthcnJheWJ1ZmZlcn0gLSBUaGUgaW5wdXQgYnVmZmVyXG4gICAqIEByZXR1cm5zIHthcnJheWJ1ZmZlcn0gLSBUaGUgcHJvY2Vzc2VkIGJ1ZmZlciAod2l0aCBmcmFtZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmcgdG8gdGhlIGVuZClcbiAgICovXG4gIF9fd3JhcEFyb3VuZChpbkJ1ZmZlcikge1xuICAgIHZhciBsZW5ndGggPSBpbkJ1ZmZlci5sZW5ndGggKyB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiAqIGluQnVmZmVyLnNhbXBsZVJhdGU7XG5cbiAgICB2YXIgb3V0QnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzLCBsZW5ndGgsIGluQnVmZmVyLnNhbXBsZVJhdGUpO1xuICAgIHZhciBhcnJheUNoRGF0YSwgYXJyYXlPdXRDaERhdGE7XG5cbiAgICBmb3IgKHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGluQnVmZmVyLm51bWJlck9mQ2hhbm5lbHM7IGNoYW5uZWwrKykge1xuICAgICAgYXJyYXlDaERhdGEgPSBpbkJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcbiAgICAgIGFycmF5T3V0Q2hEYXRhID0gb3V0QnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuXG4gICAgICBhcnJheU91dENoRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHNhbXBsZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgaW5CdWZmZXIubGVuZ3RoKSBhcnJheU91dENoRGF0YVtpbmRleF0gPSBhcnJheUNoRGF0YVtpbmRleF07XG4gICAgICAgIGVsc2UgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXggLSBpbkJ1ZmZlci5sZW5ndGhdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dEJ1ZmZlcjtcbiAgfVxufVxuIl19