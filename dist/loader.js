"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

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
    var responseType = arguments[0] === undefined ? undefined : arguments[0];

    _classCallCheck(this, Loader);

    this.responseType = responseType;
    // rename to `onProgress` ?
    this.progressCb = undefined;
  }

  _createClass(Loader, {
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
      }
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
      }
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
      }
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
          if (_this.responseType) {
            request.responseType = _this.responseType;
          } else {
            var suffix = ".json";
            if (url.indexOf(suffix, _this.length - suffix.length) !== -1) {
              request.responseType = "json";
            } else {
              request.responseType = "arraybuffer";
            }
          }
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
      }
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
      }
    }
  });

  return Loader;
})();

module.exports = Loader;
//# sourceMappingURL=data:application/json;base64,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QUFHO0FBQ3RCLGVBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztPQUN4Qjs7Ozs7Ozs7V0FRb0IsVUFBQyxRQUFRLEVBQUU7QUFDOUIsWUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7T0FDNUI7Ozs7U0ExSUksTUFBTTs7O0FBOEliLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG4gZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuXG4vKipcbiAqIExvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZC5cbiAqL1xuIGNsYXNzIExvYWRlciB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwiXCJdIC0gcmVzcG9uc2VUeXBlJ3MgdmFsdWUsIFwidGV4dFwiIChlcXVhbCB0byBcIlwiKSwgXCJhcnJheWJ1ZmZlclwiLCBcImJsb2JcIiwgXCJkb2N1bWVudFwiIG9yIFwianNvblwiXG4gICAqL1xuICAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgLy8gcmVuYW1lIHRvIGBvblByb2dyZXNzYCA/XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIE1ldGhvZCBmb3IgYSBwcm9taXNlIGJhc2VkIGZpbGUgbG9hZGluZy5cbiAgICogSW50ZXJuYWxseSBzd2l0Y2ggYmV0d2VlbiBsb2FkT25lIGFuZCBsb2FkQWxsLlxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gICBsb2FkKGZpbGVVUkxzID0gdGhyb3dJZk1pc3NpbmcoKSkge1xuICAgIGlmIChmaWxlVVJMcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyAobmV3IEVycm9yKFwibG9hZCBuZWVkcyBhdCBsZWFzdCBhIHVybCB0byBsb2FkXCIpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlVVJMcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRBbGwoZmlsZVVSTHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkT25lKGZpbGVVUkxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIHNpbmdsZSBmaWxlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVVJMIC0gVGhlIFVSTCBvZiB0aGUgZmlsZSB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gICBsb2FkT25lKGZpbGVVUkwpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlTG9hZGluZ1JlcXVlc3QoZmlsZVVSTCk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhbGwgZmlsZXMgYXQgb25jZSBpbiBhIHNpbmdsZSBhcnJheSBhbmQgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlVVJMcyAtIFRoZSBVUkxzIGFycmF5IG9mIHRoZSBmaWxlcyB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gICBsb2FkQWxsKGZpbGVVUkxzKSB7XG4gICAgdmFyIHVybHNDb3VudCA9IGZpbGVVUkxzLmxlbmd0aCxcbiAgICBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzQ291bnQ7ICsraSkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMc1tpXSwgaSkpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIGZpbGUgYXN5bmNocm9ub3VzbHksIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpbmRleF0gLSBUaGUgaW5kZXggb2YgdGhlIGZpbGUgaW4gdGhlIGFycmF5IG9mIGZpbGVzIHRvIGxvYWRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICAgZmlsZUxvYWRpbmdSZXF1ZXN0KHVybCwgaW5kZXgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QuaW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYodGhpcy5yZXNwb25zZVR5cGUpe1xuICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gdGhpcy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICB2YXIgc3VmZml4ID0gJy5qc29uJztcbiAgICAgICAgICBpZih1cmwuaW5kZXhPZihzdWZmaXgsIHRoaXMubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xKXtcbiAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gVGVzdCByZXF1ZXN0LnN0YXR1cyB2YWx1ZSwgYXMgNDA0IHdpbGwgYWxzbyBnZXQgdGhlcmVcbiAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCByZXF1ZXN0LnN0YXR1cyA9PT0gMzA0KSB7XG4gICAgICAgICAgICAvLyBIYWNrIGZvciBpT1MgNywgdG8gcmVtb3ZlIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZihyZXF1ZXN0LnJlc3BvbnNlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcXVlc3Quc3RhdHVzVGV4dCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGxvYWRlZDogZXZ0LmxvYWRlZCxcbiAgICAgICAgICAgICAgICB0b3RhbDogZXZ0LnRvdGFsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1hbmFnZSBuZXR3b3JrIGVycm9yc1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgIH0pO1xucmV0dXJuIHByb21pc2U7XG59XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIEdldCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9ncmVzcyBvZiBmaWxlIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBpcyBvbmx5IGZvciB0aGUgZmlsZSBsb2FkaW5nIHByb2dyZXNzIGFzIGRlY29kZUF1ZGlvRGF0YSBkb2Vzbid0XG4gICAqIGV4cG9zZSBhIGRlY29kZSBwcm9ncmVzcyB2YWx1ZS5cbiAgICogQHJldHVybnMge0xvYWRlcn5wcm9ncmVzc0NhbGxiYWNrfVxuICAgKi9cbiAgIGdldCBwcm9ncmVzc0NhbGxiYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnByb2dyZXNzQ2I7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gU2V0IHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBnZXQgdGhlIHByb2dyZXNzIG9mIGZpbGUgbG9hZGluZyBwcm9jZXNzLlxuICAgKiBUaGlzIGlzIG9ubHkgZm9yIHRoZSBmaWxlIGxvYWRpbmcgcHJvZ3Jlc3MgYXMgZGVjb2RlQXVkaW9EYXRhIGRvZXNuJ3RcbiAgICogZXhwb3NlIGEgZGVjb2RlIHByb2dyZXNzIHZhbHVlLlxuICAgKiBAcGFyYW0ge0xvYWRlcn5wcm9ncmVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IGhhbmRsZXMgdGhlIHJlc3BvbnNlLlxuICAgKi9cbiAgIHNldCBwcm9ncmVzc0NhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gY2FsbGJhY2s7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiJdfQ==