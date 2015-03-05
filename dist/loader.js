"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error("Missing parameter");
}

/**
 * Loader
 * @class
 * @classdesc Promise based implementation of XMLHttpRequest Level 2 for GET method.
 */

var Loader = (function () {

  /**
   * @constructs
   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
   */

  function Loader() {
    var responseType = arguments[0] === undefined ? "" : arguments[0];

    _babelHelpers.classCallCheck(this, Loader);

    _babelHelpers.get(_core.Object.getPrototypeOf(Loader.prototype), "constructor", this).call(this);
    this.responseType = responseType;
    // rename to `onProgress` ?
    this.progressCb = undefined;
  }

  _babelHelpers.prototypeProperties(Loader, null, {
    load: {

      /**
       * @function - Method for a promise based file loading.
       * Internally switch between loadOne and loadAll.
       * @public
       * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
       * @returns {Promise}
       */

      value: function load() {
        var fileURLs = arguments[0] === undefined ? throwIfMissing() : arguments[0];

        if (fileURLs === undefined) throw new Error("load needs at least a url to load");
        if (Array.isArray(fileURLs)) {
          return this.loadAll(fileURLs);
        } else {
          return this.loadOne(fileURLs);
        }
      },
      writable: true,
      configurable: true
    },
    loadOne: {

      /**
       * @function - Load a single file
       * @private
       * @param {string} fileURL - The URL of the file to load.
       * @returns {Promise}
       */

      value: function loadOne(fileURL) {
        return this.fileLoadingRequest(fileURL);
      },
      writable: true,
      configurable: true
    },
    loadAll: {

      /**
       * @function - Load all files at once in a single array and return a Promise
       * @private
       * @param {string[]} fileURLs - The URLs array of the files to load.
       * @returns {Promise}
       */

      value: function loadAll(fileURLs) {
        var urlsCount = fileURLs.length,
            promises = [];

        for (var i = 0; i < urlsCount; ++i) {
          promises.push(this.fileLoadingRequest(fileURLs[i], i));
        }

        return _core.Promise.all(promises);
      },
      writable: true,
      configurable: true
    },
    fileLoadingRequest: {

      /**
       * @function - Load a file asynchronously, return a Promise.
       * @private
       * @param {string} url - The URL of the file to load
       * @param {string} [index] - The index of the file in the array of files to load
       * @returns {Promise}
       */

      value: function fileLoadingRequest(url, index) {
        var _this = this;

        var promise = new _core.Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open("GET", url, true);
          request.index = index;

          request.responseType = _this.responseType;
          request.addEventListener("load", function () {
            // Test request.status value, as 404 will also get there
            if (request.status === 200 || request.status === 304) {
              // Hack for iOS 7, to remove as soon as possible
              if (this.responseType === "json" && typeof request.response === "string") {
                request.response = JSON.parse(request.response);
              }
              resolve(request.response);
            } else {
              reject(new Error(request.statusText));
            }
          });
          request.addEventListener("progress", function (evt) {
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
          request.addEventListener("error", function () {
            reject(new Error("Network Error"));
          });

          request.send();
        });
        return promise;
      },
      writable: true,
      configurable: true
    },
    progressCallback: {

      /**
       * @function - Get the callback function to get the progress of file loading process.
       * This is only for the file loading progress as decodeAudioData doesn't
       * expose a decode progress value.
       * @returns {Loader~progressCallback}
       */

      get: function () {
        return this.progressCb;
      },

      /**
       * @function - Set the callback function to get the progress of file loading process.
       * This is only for the file loading progress as decodeAudioData doesn't
       * expose a decode progress value.
       * @param {Loader~progressCallback} callback - The callback that handles the response.
       */
      set: function (callback) {
        this.progressCb = callback;
      },
      configurable: true
    }
  });

  return Loader;
})();

module.exports = Loader;
//# sourceMappingURL=data:application/json;base64,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QUFFLFVBQUMsR0FBRyxFQUFLO0FBQzVDLGdCQUFJLE1BQUssZ0JBQWdCLEVBQUU7QUFDekIsa0JBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN2QixzQkFBSyxnQkFBZ0IsQ0FBQztBQUNwQix1QkFBSyxFQUFFLEtBQUs7QUFDWix1QkFBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUs7QUFDN0Isd0JBQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtBQUNsQix1QkFBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2lCQUNqQixDQUFDLENBQUM7ZUFDSixNQUFNO0FBQ0wsc0JBQUssZ0JBQWdCLENBQUM7QUFDcEIsdUJBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLO0FBQzdCLHdCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDbEIsdUJBQUssRUFBRSxHQUFHLENBQUMsS0FBSztpQkFDakIsQ0FBQyxDQUFDO2VBQ0o7YUFDRjtXQUNGLENBQUMsQ0FBQzs7QUFFSCxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO0FBQzNDLGtCQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztXQUNwQyxDQUFDLENBQUM7O0FBRUgsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQixDQUFDLENBQUM7QUFDTCxlQUFPLE9BQU8sQ0FBQztPQUNoQjs7OztBQWtCRyxvQkFBZ0I7Ozs7Ozs7OztXQVZBLFlBQUc7QUFDckIsZUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDO09BQ3hCOzs7Ozs7OztXQVFtQixVQUFDLFFBQVEsRUFBRTtBQUM3QixZQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztPQUM1Qjs7Ozs7U0FqSUcsTUFBTTs7O0FBcUlaLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcicpO1xufVxuXG5cbi8qKlxuICogTG9hZGVyXG4gKiBAY2xhc3NcbiAqIEBjbGFzc2Rlc2MgUHJvbWlzZSBiYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZvciBHRVQgbWV0aG9kLlxuICovXG5jbGFzcyBMb2FkZXIge1xuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc3BvbnNlVHlwZT1cIlwiXSAtIHJlc3BvbnNlVHlwZSdzIHZhbHVlLCBcInRleHRcIiAoZXF1YWwgdG8gXCJcIiksIFwiYXJyYXlidWZmZXJcIiwgXCJibG9iXCIsIFwiZG9jdW1lbnRcIiBvciBcImpzb25cIlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gXCJcIikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgLy8gcmVuYW1lIHRvIGBvblByb2dyZXNzYCA/XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIE1ldGhvZCBmb3IgYSBwcm9taXNlIGJhc2VkIGZpbGUgbG9hZGluZy5cbiAgICogSW50ZXJuYWxseSBzd2l0Y2ggYmV0d2VlbiBsb2FkT25lIGFuZCBsb2FkQWxsLlxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpKSB7XG4gICAgaWYgKGZpbGVVUkxzID09PSB1bmRlZmluZWQpIHRocm93IChuZXcgRXJyb3IoXCJsb2FkIG5lZWRzIGF0IGxlYXN0IGEgdXJsIHRvIGxvYWRcIikpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVVUkxzKSkge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFsbChmaWxlVVJMcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRPbmUoZmlsZVVSTHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGEgc2luZ2xlIGZpbGVcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZE9uZShmaWxlVVJMKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZUxvYWRpbmdSZXF1ZXN0KGZpbGVVUkwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYWxsIGZpbGVzIGF0IG9uY2UgaW4gYSBzaW5nbGUgYXJyYXkgYW5kIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZVVSTHMgLSBUaGUgVVJMcyBhcnJheSBvZiB0aGUgZmlsZXMgdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkQWxsKGZpbGVVUkxzKSB7XG4gICAgdmFyIHVybHNDb3VudCA9IGZpbGVVUkxzLmxlbmd0aCxcbiAgICAgIHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybHNDb3VudDsgKytpKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuZmlsZUxvYWRpbmdSZXF1ZXN0KGZpbGVVUkxzW2ldLCBpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGEgZmlsZSBhc3luY2hyb25vdXNseSwgcmV0dXJuIGEgUHJvbWlzZS5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gbG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2luZGV4XSAtIFRoZSBpbmRleCBvZiB0aGUgZmlsZSBpbiB0aGUgYXJyYXkgb2YgZmlsZXMgdG8gbG9hZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGZpbGVMb2FkaW5nUmVxdWVzdCh1cmwsIGluZGV4KSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LmluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gVGVzdCByZXF1ZXN0LnN0YXR1cyB2YWx1ZSwgYXMgNDA0IHdpbGwgYWxzbyBnZXQgdGhlcmVcbiAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCByZXF1ZXN0LnN0YXR1cyA9PT0gMzA0KSB7XG4gICAgICAgICAgICAvLyBIYWNrIGZvciBpT1MgNywgdG8gcmVtb3ZlIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZihyZXF1ZXN0LnJlc3BvbnNlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcXVlc3Quc3RhdHVzVGV4dCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGxvYWRlZDogZXZ0LmxvYWRlZCxcbiAgICAgICAgICAgICAgICB0b3RhbDogZXZ0LnRvdGFsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1hbmFnZSBuZXR3b3JrIGVycm9yc1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIEdldCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9ncmVzcyBvZiBmaWxlIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBpcyBvbmx5IGZvciB0aGUgZmlsZSBsb2FkaW5nIHByb2dyZXNzIGFzIGRlY29kZUF1ZGlvRGF0YSBkb2Vzbid0XG4gICAqIGV4cG9zZSBhIGRlY29kZSBwcm9ncmVzcyB2YWx1ZS5cbiAgICogQHJldHVybnMge0xvYWRlcn5wcm9ncmVzc0NhbGxiYWNrfVxuICAgKi9cbiAgZ2V0IHByb2dyZXNzQ2FsbGJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NDYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBTZXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGdldCB0aGUgcHJvZ3Jlc3Mgb2YgZmlsZSBsb2FkaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgaXMgb25seSBmb3IgdGhlIGZpbGUgbG9hZGluZyBwcm9ncmVzcyBhcyBkZWNvZGVBdWRpb0RhdGEgZG9lc24ndFxuICAgKiBleHBvc2UgYSBkZWNvZGUgcHJvZ3Jlc3MgdmFsdWUuXG4gICAqIEBwYXJhbSB7TG9hZGVyfnByb2dyZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgaGFuZGxlcyB0aGUgcmVzcG9uc2UuXG4gICAqL1xuICBzZXQgcHJvZ3Jlc3NDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMucHJvZ3Jlc3NDYiA9IGNhbGxiYWNrO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7Il19