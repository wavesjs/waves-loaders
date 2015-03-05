"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

// is this really usefull ?
// var events = require('events');
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
          // this.emit('xmlhttprequest', request);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9zdXBlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQU9BLFNBQVMsY0FBYyxHQUFHO0FBQ3hCLFFBQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUN0Qzs7Ozs7Ozs7SUFRSyxNQUFNOzs7Ozs7O0FBTUMsV0FOUCxNQUFNO1FBTUUsWUFBWSxnQ0FBRyxFQUFFOzt1Q0FOekIsTUFBTTs7QUFPUixrREFQRSxNQUFNLDZDQU9BO0FBQ1IsUUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7O0FBRWpDLFFBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0dBQzdCOztvQ0FYRyxNQUFNO0FBb0JWLFFBQUk7Ozs7Ozs7Ozs7YUFBQSxnQkFBOEI7WUFBN0IsUUFBUSxnQ0FBRyxjQUFjLEVBQUU7O0FBQzlCLFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRSxNQUFPLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUU7QUFDbkYsWUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzNCLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0IsTUFBTTtBQUNMLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7T0FDRjs7OztBQVFELFdBQU87Ozs7Ozs7OzthQUFBLGlCQUFDLE9BQU8sRUFBRTtBQUNmLGVBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3pDOzs7O0FBUUQsV0FBTzs7Ozs7Ozs7O2FBQUEsaUJBQUMsUUFBUSxFQUFFO0FBQ2hCLFlBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNO1lBQzdCLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWhCLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFD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ZWZ1bGwgP1xuLy8gdmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuXG4vKipcbiAqIExvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZC5cbiAqL1xuY2xhc3MgTG9hZGVyIHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNwb25zZVR5cGU9XCJcIl0gLSByZXNwb25zZVR5cGUncyB2YWx1ZSwgXCJ0ZXh0XCIgKGVxdWFsIHRvIFwiXCIpLCBcImFycmF5YnVmZmVyXCIsIFwiYmxvYlwiLCBcImRvY3VtZW50XCIgb3IgXCJqc29uXCJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlVHlwZSA9IFwiXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuICAgIC8vIHJlbmFtZSB0byBgb25Qcm9ncmVzc2AgP1xuICAgIHRoaXMucHJvZ3Jlc3NDYiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBNZXRob2QgZm9yIGEgcHJvbWlzZSBiYXNlZCBmaWxlIGxvYWRpbmcuXG4gICAqIEludGVybmFsbHkgc3dpdGNoIGJldHdlZW4gbG9hZE9uZSBhbmQgbG9hZEFsbC5cbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBmaWxlVVJMcyAtIFRoZSBVUkwocykgb2YgdGhlIGZpbGVzIHRvIGxvYWQuIEFjY2VwdHMgYSBVUkwgcG9pbnRpbmcgdG8gdGhlIGZpbGUgbG9jYXRpb24gb3IgYW4gYXJyYXkgb2YgVVJMcy5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkKGZpbGVVUkxzID0gdGhyb3dJZk1pc3NpbmcoKSkge1xuICAgIGlmIChmaWxlVVJMcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyAobmV3IEVycm9yKFwibG9hZCBuZWVkcyBhdCBsZWFzdCBhIHVybCB0byBsb2FkXCIpKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlVVJMcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRBbGwoZmlsZVVSTHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkT25lKGZpbGVVUkxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIHNpbmdsZSBmaWxlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVVJMIC0gVGhlIFVSTCBvZiB0aGUgZmlsZSB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRPbmUoZmlsZVVSTCkge1xuICAgIHJldHVybiB0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBMb2FkIGFsbCBmaWxlcyBhdCBvbmNlIGluIGEgc2luZ2xlIGFycmF5IGFuZCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVVUkxzIC0gVGhlIFVSTHMgYXJyYXkgb2YgdGhlIGZpbGVzIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZEFsbChmaWxlVVJMcykge1xuICAgIHZhciB1cmxzQ291bnQgPSBmaWxlVVJMcy5sZW5ndGgsXG4gICAgICBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzQ291bnQ7ICsraSkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmZpbGVMb2FkaW5nUmVxdWVzdChmaWxlVVJMc1tpXSwgaSkpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhIGZpbGUgYXN5bmNocm9ub3VzbHksIHJldHVybiBhIFByb21pc2UuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpbmRleF0gLSBUaGUgaW5kZXggb2YgdGhlIGZpbGUgaW4gdGhlIGFycmF5IG9mIGZpbGVzIHRvIGxvYWRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBmaWxlTG9hZGluZ1JlcXVlc3QodXJsLCBpbmRleCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5pbmRleCA9IGluZGV4O1xuICAgICAgICAvLyB0aGlzLmVtaXQoJ3htbGh0dHByZXF1ZXN0JywgcmVxdWVzdCk7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gdGhpcy5yZXNwb25zZVR5cGU7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFRlc3QgcmVxdWVzdC5zdGF0dXMgdmFsdWUsIGFzIDQwNCB3aWxsIGFsc28gZ2V0IHRoZXJlXG4gICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDAgfHwgcmVxdWVzdC5zdGF0dXMgPT09IDMwNCkge1xuICAgICAgICAgICAgLy8gSGFjayBmb3IgaU9TIDcsIHRvIHJlbW92ZSBhcyBzb29uIGFzIHBvc3NpYmxlXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJyAmJiB0eXBlb2YocmVxdWVzdC5yZXNwb25zZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXF1ZXN0LnN0YXR1c1RleHQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgKGV2dCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGxvYWRlZDogZXZ0LmxvYWRlZCxcbiAgICAgICAgICAgICAgICB0b3RhbDogZXZ0LnRvdGFsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2dC5sb2FkZWQsXG4gICAgICAgICAgICAgICAgdG90YWw6IGV2dC50b3RhbFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYW5hZ2UgbmV0d29yayBlcnJvcnNcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBHZXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGdldCB0aGUgcHJvZ3Jlc3Mgb2YgZmlsZSBsb2FkaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgaXMgb25seSBmb3IgdGhlIGZpbGUgbG9hZGluZyBwcm9ncmVzcyBhcyBkZWNvZGVBdWRpb0RhdGEgZG9lc24ndFxuICAgKiBleHBvc2UgYSBkZWNvZGUgcHJvZ3Jlc3MgdmFsdWUuXG4gICAqIEByZXR1cm5zIHtMb2FkZXJ+cHJvZ3Jlc3NDYWxsYmFja31cbiAgICovXG4gIGdldCBwcm9ncmVzc0NhbGxiYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnByb2dyZXNzQ2I7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gU2V0IHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBnZXQgdGhlIHByb2dyZXNzIG9mIGZpbGUgbG9hZGluZyBwcm9jZXNzLlxuICAgKiBUaGlzIGlzIG9ubHkgZm9yIHRoZSBmaWxlIGxvYWRpbmcgcHJvZ3Jlc3MgYXMgZGVjb2RlQXVkaW9EYXRhIGRvZXNuJ3RcbiAgICogZXhwb3NlIGEgZGVjb2RlIHByb2dyZXNzIHZhbHVlLlxuICAgKiBAcGFyYW0ge0xvYWRlcn5wcm9ncmVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IGhhbmRsZXMgdGhlIHJlc3BvbnNlLlxuICAgKi9cbiAgc2V0IHByb2dyZXNzQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB0aGlzLnByb2dyZXNzQ2IgPSBjYWxsYmFjaztcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyOyJdfQ==