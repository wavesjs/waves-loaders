"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
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

var Loader = (function (_events$EventEmitter) {

  /**
   * @constructs
   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
   */

  function Loader() {
    var responseType = arguments[0] === undefined ? "" : arguments[0];

    _babelHelpers.classCallCheck(this, Loader);

    _babelHelpers.get(_core.Object.getPrototypeOf(Loader.prototype), "constructor", this).call(this);
    this.responseType = responseType;
    this.progressCb = undefined;
  }

  _babelHelpers.inherits(Loader, _events$EventEmitter);

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
          _this.emit("xmlhttprequest", request);
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
})(events.EventEmitter);

module.exports = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdXBlci1sb2FkZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0FBTS9CLFNBQVMsY0FBYyxHQUFHO0FBQ3hCLFFBQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUN0Qzs7Ozs7Ozs7SUFRSyxNQUFNOzs7Ozs7O0FBTUMsV0FOUCxNQUFNO1FBTUUsWUFBWSxnQ0FBRyxFQUFFOzt1Q0FOekIsTUFBTTs7QUFPUixrREFQRSxNQUFNLDZDQU9BO0FBQ1IsUUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDakMsUUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7R0FDN0I7O3lCQVZHLE1BQU07O29DQUFOLE1BQU07QUFtQlYsUUFBSTs7Ozs7Ozs7OzthQUFBLGdCQUE4QjtZQUE3QixRQUFRLGdDQUFHLGNBQWMsRUFBRTs7QUFDOUIsWUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLE1BQU8sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBRTtBQUNuRixZQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDM0IsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQixNQUFNO0FBQ0wsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjtPQUNGOzs7O0FBUUQsV0FBTzs7Ozs7Ozs7O2FBQUEsaUJBQUMsT0FBTyxFQUFFO0FBQ2YsZUFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDekM7Ozs7QUFRRCxXQUFPOzs7Ozs7Ozs7YUFBQSxpQkFBQyxRQUFRLEVBQUU7QUFDaEIsWUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU07WUFDN0IsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUNsQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7O0FBRUQsZUFBTyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDOUI7Ozs7QUFTRCxzQkFBa0I7Ozs7Ozs7Ozs7YUFBQSw0QkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFOzs7QUFDN0IsWUFBSSxPQUFPLEdBQUcsVUFBSSxPQUFPLENBQ3ZCLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUNuQixjQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ25DLGlCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsaUJBQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLGdCQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyQyxpQkFBTyxDQUFDLFlBQVksR0FBRyxNQUFLLFlBQVksQ0FBQztBQUN6QyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFXOztBQUUxQyxnQkFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTs7QUFFcEQsa0JBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxBQUFDLEtBQUssUUFBUSxFQUFFO0FBQ3pFLHVCQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2VBQ2pEO0FBQ0QscUJBQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0IsTUFBTTtBQUNMLG9CQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDdkM7V0FDRixDQUFDLENBQUM7QUFDSCxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQUcsRUFBSztBQUM1QyxnQkFBSSxNQUFLLGdCQUFnQixFQUFFO0FBQ3pCLGtCQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsc0JBQUssZ0JBQWdCLENBQUM7QUFDcEIsdUJBQUssRUFBRSxLQUFLO0FBQ1osdUJBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLO0FBQzdCLHdCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDbEIsdUJBQUssRUFBRSxHQUFHLENBQUMsS0FBSztpQkFDakIsQ0FBQyxDQUFDO2VBQ0osTUFBTTtBQUNMLHNCQUFLLGdCQUFnQixDQUFDO0FBQ3BCLHVCQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSztBQUM3Qix3QkFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0FBQ2xCLHVCQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7aUJBQ2pCLENBQUMsQ0FBQztlQUNKO2FBQ0Y7V0FDRixDQUFDLENBQUM7O0FBRUgsaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUMzQyxrQkFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7V0FDcEMsQ0FBQyxDQUFDOztBQUVILGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0FBQ0wsZUFBTyxPQUFPLENBQUM7T0FDaEI7Ozs7QUFrQkcsb0JBQWdCOzs7Ozs7Ozs7V0FWQSxZQUFHO0FBQ3JCLGVBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztPQUN4Qjs7Ozs7Ozs7V0FRbUIsVUFBQyxRQUFRLEVBQUU7QUFDN0IsWUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7T0FDNUI7Ozs7O1NBaElHLE1BQU07R0FBUyxNQUFNLENBQUMsWUFBWTs7QUFvSXhDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6InNyYy9zdXBlci1sb2FkZXIuZXM2LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuXG4vKipcbiAqIExvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZC5cbiAqL1xuY2xhc3MgTG9hZGVyIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwiXCJdIC0gcmVzcG9uc2VUeXBlJ3MgdmFsdWUsIFwidGV4dFwiIChlcXVhbCB0byBcIlwiKSwgXCJhcnJheWJ1ZmZlclwiLCBcImJsb2JcIiwgXCJkb2N1bWVudFwiIG9yIFwianNvblwiXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZVR5cGUgPSBcIlwiKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICB0aGlzLnByb2dyZXNzQ2IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTWV0aG9kIGZvciBhIHByb21pc2UgYmFzZWQgZmlsZSBsb2FkaW5nLlxuICAgKiBJbnRlcm5hbGx5IHN3aXRjaCBiZXR3ZWVuIGxvYWRPbmUgYW5kIGxvYWRBbGwuXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChmaWxlVVJMcyA9IHRocm93SWZNaXNzaW5nKCkpIHtcbiAgICBpZiAoZmlsZVVSTHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgKG5ldyBFcnJvcihcImxvYWQgbmVlZHMgYXQgbGVhc3QgYSB1cmwgdG8gbG9hZFwiKSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZVVSTHMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWxsKGZpbGVVUkxzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZE9uZShmaWxlVVJMcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYSBzaW5nbGUgZmlsZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVVSTCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkT25lKGZpbGVVUkwpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlTG9hZGluZ1JlcXVlc3QoZmlsZVVSTCk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhbGwgZmlsZXMgYXQgb25jZSBpbiBhIHNpbmdsZSBhcnJheSBhbmQgcmV0dXJuIGEgUHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlVVJMcyAtIFRoZSBVUkxzIGFycmF5IG9mIHRoZSBmaWxlcyB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRBbGwoZmlsZVVSTHMpIHtcbiAgICB2YXIgdXJsc0NvdW50ID0gZmlsZVVSTHMubGVuZ3RoLFxuICAgICAgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJsc0NvdW50OyArK2kpIHtcbiAgICAgIHByb21pc2VzLnB1c2godGhpcy5maWxlTG9hZGluZ1JlcXVlc3QoZmlsZVVSTHNbaV0sIGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYSBmaWxlIGFzeW5jaHJvbm91c2x5LCByZXR1cm4gYSBQcm9taXNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIFVSTCBvZiB0aGUgZmlsZSB0byBsb2FkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaW5kZXhdIC0gVGhlIGluZGV4IG9mIHRoZSBmaWxlIGluIHRoZSBhcnJheSBvZiBmaWxlcyB0byBsb2FkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgZmlsZUxvYWRpbmdSZXF1ZXN0KHVybCwgaW5kZXgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5lbWl0KCd4bWxodHRwcmVxdWVzdCcsIHJlcXVlc3QpO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHRoaXMucmVzcG9uc2VUeXBlO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBUZXN0IHJlcXVlc3Quc3RhdHVzIHZhbHVlLCBhcyA0MDQgd2lsbCBhbHNvIGdldCB0aGVyZVxuICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IHJlcXVlc3Quc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICAgIC8vIEhhY2sgZm9yIGlPUyA3LCB0byByZW1vdmUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbicgJiYgdHlwZW9mKHJlcXVlc3QucmVzcG9uc2UpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVxdWVzdC5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChldnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2dC5sb2FkZWQsXG4gICAgICAgICAgICAgICAgdG90YWw6IGV2dC50b3RhbFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFuYWdlIG5ldHdvcmsgZXJyb3JzXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gR2V0IHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBnZXQgdGhlIHByb2dyZXNzIG9mIGZpbGUgbG9hZGluZyBwcm9jZXNzLlxuICAgKiBUaGlzIGlzIG9ubHkgZm9yIHRoZSBmaWxlIGxvYWRpbmcgcHJvZ3Jlc3MgYXMgZGVjb2RlQXVkaW9EYXRhIGRvZXNuJ3RcbiAgICogZXhwb3NlIGEgZGVjb2RlIHByb2dyZXNzIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7TG9hZGVyfnByb2dyZXNzQ2FsbGJhY2t9XG4gICAqL1xuICBnZXQgcHJvZ3Jlc3NDYWxsYmFjaygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9ncmVzc0NiO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIFNldCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9ncmVzcyBvZiBmaWxlIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBpcyBvbmx5IGZvciB0aGUgZmlsZSBsb2FkaW5nIHByb2dyZXNzIGFzIGRlY29kZUF1ZGlvRGF0YSBkb2Vzbid0XG4gICAqIGV4cG9zZSBhIGRlY29kZSBwcm9ncmVzcyB2YWx1ZS5cbiAgICogQHBhcmFtIHtMb2FkZXJ+cHJvZ3Jlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCBoYW5kbGVzIHRoZSByZXNwb25zZS5cbiAgICovXG4gIHNldCBwcm9ncmVzc0NhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gY2FsbGJhY2s7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjsiXX0=