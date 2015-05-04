/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

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

    _get(_core.Object.getPrototypeOf(Loader.prototype), "constructor", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,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Qk0sb0JBQWdCOzs7Ozs7Ozs7V0FWQSxZQUFHO0FBQ3RCLGVBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztPQUN4Qjs7Ozs7Ozs7V0FRb0IsVUFBQyxRQUFRLEVBQUU7QUFDOUIsWUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7T0FDNUI7Ozs7U0EzSUksTUFBTTs7O0FBK0liLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG4gZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuXG4vKipcbiAqIExvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZC5cbiAqL1xuIGNsYXNzIExvYWRlciB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwiXCJdIC0gcmVzcG9uc2VUeXBlJ3MgdmFsdWUsIFwidGV4dFwiIChlcXVhbCB0byBcIlwiKSwgXCJhcnJheWJ1ZmZlclwiLCBcImJsb2JcIiwgXCJkb2N1bWVudFwiIG9yIFwianNvblwiXG4gICAqL1xuICAgY29uc3RydWN0b3IocmVzcG9uc2VUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAvLyByZW5hbWUgdG8gYG9uUHJvZ3Jlc3NgID9cbiAgICB0aGlzLnByb2dyZXNzQ2IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTWV0aG9kIGZvciBhIHByb21pc2UgYmFzZWQgZmlsZSBsb2FkaW5nLlxuICAgKiBJbnRlcm5hbGx5IHN3aXRjaCBiZXR3ZWVuIGxvYWRPbmUgYW5kIGxvYWRBbGwuXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpKSB7XG4gICAgaWYgKGZpbGVVUkxzID09PSB1bmRlZmluZWQpIHRocm93IChuZXcgRXJyb3IoXCJsb2FkIG5lZWRzIGF0IGxlYXN0IGEgdXJsIHRvIGxvYWRcIikpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVVUkxzKSkge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFsbChmaWxlVVJMcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRPbmUoZmlsZVVSTHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGEgc2luZ2xlIGZpbGVcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgIGxvYWRPbmUoZmlsZVVSTCkge1xuICAgIHJldHVybiB0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGFsbCBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5IGFuZCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgIGxvYWRBbGwoZmlsZVVSTHMpIHtcbiAgICB2YXIgdXJsc0NvdW50ID0gZmlsZVVSTHMubGVuZ3RoLFxuICAgIHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybHNDb3VudDsgKytpKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuZmlsZUxvYWRpbmdSZXF1ZXN0KGZpbGVVUkxzW2ldLCBpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGEgZmlsZSBhc3luY2hyb25vdXNseSwgcmV0dXJuIGEgUHJvbWlzZS5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gbG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2luZGV4XSAtIFRoZSBpbmRleCBvZiB0aGUgZmlsZSBpbiB0aGUgYXJyYXkgb2YgZmlsZXMgdG8gbG9hZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gICBmaWxlTG9hZGluZ1JlcXVlc3QodXJsLCBpbmRleCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5pbmRleCA9IGluZGV4O1xuICAgICAgICBpZih0aGlzLnJlc3BvbnNlVHlwZSl7XG4gICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIHZhciBzdWZmaXggPSAnLmpzb24nO1xuICAgICAgICAgIGlmKHVybC5pbmRleE9mKHN1ZmZpeCwgdGhpcy5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTEpe1xuICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBUZXN0IHJlcXVlc3Quc3RhdHVzIHZhbHVlLCBhcyA0MDQgd2lsbCBhbHNvIGdldCB0aGVyZVxuICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IHJlcXVlc3Quc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICAgIC8vIEhhY2sgZm9yIGlPUyA3LCB0byByZW1vdmUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbicgJiYgdHlwZW9mKHJlcXVlc3QucmVzcG9uc2UpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVxdWVzdC5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChldnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2dC5sb2FkZWQsXG4gICAgICAgICAgICAgICAgdG90YWw6IGV2dC50b3RhbFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFuYWdlIG5ldHdvcmsgZXJyb3JzXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgICAgfSk7XG5yZXR1cm4gcHJvbWlzZTtcbn1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gR2V0IHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBnZXQgdGhlIHByb2dyZXNzIG9mIGZpbGUgbG9hZGluZyBwcm9jZXNzLlxuICAgKiBUaGlzIGlzIG9ubHkgZm9yIHRoZSBmaWxlIGxvYWRpbmcgcHJvZ3Jlc3MgYXMgZGVjb2RlQXVkaW9EYXRhIGRvZXNuJ3RcbiAgICogZXhwb3NlIGEgZGVjb2RlIHByb2dyZXNzIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7TG9hZGVyfnByb2dyZXNzQ2FsbGJhY2t9XG4gICAqL1xuICAgZ2V0IHByb2dyZXNzQ2FsbGJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NDYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBTZXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGdldCB0aGUgcHJvZ3Jlc3Mgb2YgZmlsZSBsb2FkaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgaXMgb25seSBmb3IgdGhlIGZpbGUgbG9hZGluZyBwcm9ncmVzcyBhcyBkZWNvZGVBdWRpb0RhdGEgZG9lc24ndFxuICAgKiBleHBvc2UgYSBkZWNvZGUgcHJvZ3Jlc3MgdmFsdWUuXG4gICAqIEBwYXJhbSB7TG9hZGVyfnByb2dyZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgaGFuZGxlcyB0aGUgcmVzcG9uc2UuXG4gICAqL1xuICAgc2V0IHByb2dyZXNzQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB0aGlzLnByb2dyZXNzQ2IgPSBjYWxsYmFjaztcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIl19