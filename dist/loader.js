/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
function throwIfMissing() {
  throw new Error('Missing parameter');
}

/**
 * Promise based implementation of XMLHttpRequest Level 2 for GET method.
 */

var Loader = (function () {
  /**
   * @constructs
   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
   */

  function Loader() {
    var responseType = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

    _classCallCheck(this, Loader);

    /**
     * @type {string}
     */
    this.responseType = responseType;
    // rename to `onProgress` ?
    /**
     * @type {function}
     */
    this.progressCb = undefined;
  }

  /**
   * Method for a promise based file loading.
   * Internally switch between loadOne and loadAll.
   * @public
   * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
   * @returns {Promise}
   */

  _createClass(Loader, [{
    key: 'load',
    value: function load() {
      var fileURLs = arguments.length <= 0 || arguments[0] === undefined ? throwIfMissing() : arguments[0];

      if (fileURLs === undefined) throw new Error('load needs at least a url to load');
      if (Array.isArray(fileURLs)) {
        return this.loadAll(fileURLs);
      } else {
        return this.loadOne(fileURLs);
      }
    }

    /**
     * Load a single file
     * @private
     * @param {string} fileURL - The URL of the file to load.
     * @returns {Promise}
     */
  }, {
    key: 'loadOne',
    value: function loadOne(fileURL) {
      return this.fileLoadingRequest(fileURL);
    }

    /**
     * Load all files at once in a single array and return a Promise
     * @private
     * @param {string[]} fileURLs - The URLs array of the files to load.
     * @returns {Promise}
     */
  }, {
    key: 'loadAll',
    value: function loadAll(fileURLs) {
      var urlsCount = fileURLs.length,
          promises = [];

      for (var i = 0; i < urlsCount; ++i) {
        promises.push(this.fileLoadingRequest(fileURLs[i], i));
      }

      return _Promise.all(promises);
    }

    /**
     * Load a file asynchronously, return a Promise.
     * @private
     * @param {string} url - The URL of the file to load
     * @param {string} [index] - The index of the file in the array of files to load
     * @returns {Promise}
     */
  }, {
    key: 'fileLoadingRequest',
    value: function fileLoadingRequest(url, index) {
      var _this = this;

      var promise = new _Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.index = index;
        if (_this.responseType) {
          request.responseType = _this.responseType;
        } else {
          var suffix = '.json';
          if (url.indexOf(suffix, _this.length - suffix.length) !== -1) {
            request.responseType = 'json';
          } else {
            request.responseType = 'arraybuffer';
          }
        }
        request.addEventListener('load', function () {
          // Test request.status value, as 404 will also get there
          if (request.status === 200 || request.status === 304) {
            // Hack for iOS 7, to remove as soon as possible
            if (this.responseType === 'json' && typeof request.response === 'string') {
              request.response = JSON.parse(request.response);
            }
            resolve(request.response);
          } else {
            reject(new Error(request.statusText));
          }
        });
        request.addEventListener('progress', function (evt) {
          if (_this.progressCallback) {
            if (index !== undefined) {
              _this.progressCallback({
                index: index,
                value: evt.loaded / evt.total,
                loaded: evt.loaded,
                total: evt.total
              });
            } else {
              _this.progressCallback({
                value: evt.loaded / evt.total,
                loaded: evt.loaded,
                total: evt.total
              });
            }
          }
        });
        // Manage network errors
        request.addEventListener('error', function () {
          reject(new Error('Network Error'));
        });

        request.send();
      });
      return promise;
    }

    /**
     * Get the callback function to get the progress of file loading process.
     * This is only for the file loading progress as decodeAudioData doesn't
     * expose a decode progress value.
     * @type {function}
     */
  }, {
    key: 'progressCallback',
    get: function get() {
      return this.progressCb;
    },

    /**
     * Set the callback function to get the progress of file loading process.
     * This is only for the file loading progress as decodeAudioData doesn't
     * expose a decode progress value.
     * @type {function} callback - The callback that handles the response.
     */
    set: function set(callback) {
      this.progressCb = callback;
    }
  }]);

  return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsY0FBYyxHQUFHO0FBQ3hCLFFBQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUN0Qzs7Ozs7O0lBTW9CLE1BQU07Ozs7OztBQUtkLFdBTFEsTUFBTSxHQUthO1FBQTFCLFlBQVkseURBQUcsU0FBUzs7MEJBTGpCLE1BQU07Ozs7O0FBU3ZCLFFBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOzs7OztBQUtqQyxRQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztHQUM3Qjs7Ozs7Ozs7OztlQWZrQixNQUFNOztXQXdCckIsZ0JBQThCO1VBQTdCLFFBQVEseURBQUcsY0FBYyxFQUFFOztBQUM5QixVQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUUsTUFBTyxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFFO0FBQ25GLFVBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUMzQixlQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDL0IsTUFBTTtBQUNMLGVBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUMvQjtLQUNGOzs7Ozs7Ozs7O1dBUU0saUJBQUMsT0FBTyxFQUFFO0FBQ2YsYUFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7Ozs7Ozs7Ozs7V0FRTSxpQkFBQyxRQUFRLEVBQUU7QUFDaEIsVUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU07VUFDN0IsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUNsQyxnQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDeEQ7O0FBRUQsYUFBTyxTQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5Qjs7Ozs7Ozs7Ozs7V0FTaUIsNEJBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTs7O0FBQzdCLFVBQUksT0FBTyxHQUFHLGFBQ1osVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ25CLFlBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFDbkMsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLGVBQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLFlBQUksTUFBSyxZQUFZLEVBQUU7QUFDckIsaUJBQU8sQ0FBQyxZQUFZLEdBQUcsTUFBSyxZQUFZLENBQUM7U0FDMUMsTUFBTTtBQUNMLGNBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUNyQixjQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMzRCxtQkFBTyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7V0FDL0IsTUFBTTtBQUNMLG1CQUFPLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztXQUN0QztTQUNGO0FBQ0QsZUFBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFXOztBQUUxQyxjQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFOztBQUVwRCxnQkFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEFBQUMsS0FBSyxRQUFRLEVBQUU7QUFDekUscUJBQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7QUFDRCxtQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUMzQixNQUFNO0FBQ0wsa0JBQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztXQUN2QztTQUNGLENBQUMsQ0FBQztBQUNILGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDNUMsY0FBSSxNQUFLLGdCQUFnQixFQUFFO0FBQ3pCLGdCQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsb0JBQUssZ0JBQWdCLENBQUM7QUFDcEIscUJBQUssRUFBRSxLQUFLO0FBQ1oscUJBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLO0FBQzdCLHNCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDbEIscUJBQUssRUFBRSxHQUFHLENBQUMsS0FBSztlQUNqQixDQUFDLENBQUM7YUFDSixNQUFNO0FBQ0wsb0JBQUssZ0JBQWdCLENBQUM7QUFDcEIscUJBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLO0FBQzdCLHNCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDbEIscUJBQUssRUFBRSxHQUFHLENBQUMsS0FBSztlQUNqQixDQUFDLENBQUM7YUFDSjtXQUNGO1NBQ0YsQ0FBQyxDQUFDOztBQUVILGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUMzQyxnQkFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDOztBQUVILGVBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUNoQixDQUFDLENBQUM7QUFDTCxhQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7Ozs7OztTQVFtQixlQUFHO0FBQ3JCLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4Qjs7Ozs7Ozs7U0FRbUIsYUFBQyxRQUFRLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7S0FDNUI7OztTQTdJa0IsTUFBTTs7O3FCQUFOLE1BQU0iLCJmaWxlIjoic3JjL2xvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogR2V0cyBjYWxsZWQgaWYgYSBwYXJhbWV0ZXIgaXMgbWlzc2luZyBhbmQgdGhlIGV4cHJlc3Npb25cbiAqIHNwZWNpZnlpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaXMgZXZhbHVhdGVkLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZNaXNzaW5nKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcGFyYW1ldGVyJyk7XG59XG5cblxuLyoqXG4gKiBQcm9taXNlIGJhc2VkIGltcGxlbWVudGF0aW9uIG9mIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIgZm9yIEdFVCBtZXRob2QuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRlciB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc3BvbnNlVHlwZT1cIlwiXSAtIHJlc3BvbnNlVHlwZSdzIHZhbHVlLCBcInRleHRcIiAoZXF1YWwgdG8gXCJcIiksIFwiYXJyYXlidWZmZXJcIiwgXCJibG9iXCIsIFwiZG9jdW1lbnRcIiBvciBcImpzb25cIlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAvLyByZW5hbWUgdG8gYG9uUHJvZ3Jlc3NgID9cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy5wcm9ncmVzc0NiID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBmb3IgYSBwcm9taXNlIGJhc2VkIGZpbGUgbG9hZGluZy5cbiAgICogSW50ZXJuYWxseSBzd2l0Y2ggYmV0d2VlbiBsb2FkT25lIGFuZCBsb2FkQWxsLlxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpKSB7XG4gICAgaWYgKGZpbGVVUkxzID09PSB1bmRlZmluZWQpIHRocm93IChuZXcgRXJyb3IoJ2xvYWQgbmVlZHMgYXQgbGVhc3QgYSB1cmwgdG8gbG9hZCcpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlVVJMcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRBbGwoZmlsZVVSTHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkT25lKGZpbGVVUkxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhIHNpbmdsZSBmaWxlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVVJMIC0gVGhlIFVSTCBvZiB0aGUgZmlsZSB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRPbmUoZmlsZVVSTCkge1xuICAgIHJldHVybiB0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5IGFuZCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZEFsbChmaWxlVVJMcykge1xuICAgIHZhciB1cmxzQ291bnQgPSBmaWxlVVJMcy5sZW5ndGgsXG4gICAgICBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzQ291bnQ7ICsraSkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMc1tpXSwgaSkpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhIGZpbGUgYXN5bmNocm9ub3VzbHksIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpbmRleF0gLSBUaGUgaW5kZXggb2YgdGhlIGZpbGUgaW4gdGhlIGFycmF5IG9mIGZpbGVzIHRvIGxvYWRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBmaWxlTG9hZGluZ1JlcXVlc3QodXJsLCBpbmRleCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5pbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAodGhpcy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHRoaXMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdWZmaXggPSAnLmpzb24nO1xuICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdWZmaXgsIHRoaXMubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBUZXN0IHJlcXVlc3Quc3RhdHVzIHZhbHVlLCBhcyA0MDQgd2lsbCBhbHNvIGdldCB0aGVyZVxuICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IHJlcXVlc3Quc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICAgIC8vIEhhY2sgZm9yIGlPUyA3LCB0byByZW1vdmUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbicgJiYgdHlwZW9mKHJlcXVlc3QucmVzcG9uc2UpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVxdWVzdC5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChldnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2dC5sb2FkZWQsXG4gICAgICAgICAgICAgICAgdG90YWw6IGV2dC50b3RhbFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFuYWdlIG5ldHdvcmsgZXJyb3JzXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdOZXR3b3JrIEVycm9yJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9ncmVzcyBvZiBmaWxlIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBpcyBvbmx5IGZvciB0aGUgZmlsZSBsb2FkaW5nIHByb2dyZXNzIGFzIGRlY29kZUF1ZGlvRGF0YSBkb2Vzbid0XG4gICAqIGV4cG9zZSBhIGRlY29kZSBwcm9ncmVzcyB2YWx1ZS5cbiAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgKi9cbiAgZ2V0IHByb2dyZXNzQ2FsbGJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NDYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGdldCB0aGUgcHJvZ3Jlc3Mgb2YgZmlsZSBsb2FkaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgaXMgb25seSBmb3IgdGhlIGZpbGUgbG9hZGluZyBwcm9ncmVzcyBhcyBkZWNvZGVBdWRpb0RhdGEgZG9lc24ndFxuICAgKiBleHBvc2UgYSBkZWNvZGUgcHJvZ3Jlc3MgdmFsdWUuXG4gICAqIEB0eXBlIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCBoYW5kbGVzIHRoZSByZXNwb25zZS5cbiAgICovXG4gIHNldCBwcm9ncmVzc0NhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gY2FsbGJhY2s7XG4gIH1cbn1cbiJdfQ==