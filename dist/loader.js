'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

/**
 * Promise based implementation of XMLHttpRequest Level 2 for GET method.
 */

var Loader = function () {
  /**
   * @constructs
   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
   */

  function Loader() {
    var responseType = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
    (0, _classCallCheck3.default)(this, Loader);

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


  (0, _createClass3.default)(Loader, [{
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

      return _promise2.default.all(promises);
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

      var promise = new _promise2.default(function (resolve, reject) {
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
          // Test request.status === 0 for cordova internal ajax calls
          if (request.status === 200 || request.status === 304 || request.status === 0) {
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
    }

    /**
     * Set the callback function to get the progress of file loading process.
     * This is only for the file loading progress as decodeAudioData doesn't
     * expose a decode progress value.
     * @type {function} callback - The callback that handles the response.
     */
    ,
    set: function set(callback) {
      this.progressCb = callback;
    }
  }]);
  return Loader;
}();

exports.default = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsU0FBUyxjQUFULEdBQTBCO0FBQ3hCLFFBQU0sSUFBSSxLQUFKLENBQVUsbUJBQVYsQ0FBTixDQUR3QjtDQUExQjs7Ozs7O0lBUXFCOzs7Ozs7QUFLbkIsV0FMbUIsTUFLbkIsR0FBc0M7UUFBMUIscUVBQWUseUJBQVc7d0NBTG5CLFFBS21COzs7OztBQUlwQyxTQUFLLFlBQUwsR0FBb0IsWUFBcEI7Ozs7O0FBSm9DLFFBU3BDLENBQUssVUFBTCxHQUFrQixTQUFsQixDQVRvQztHQUF0Qzs7Ozs7Ozs7Ozs7NkJBTG1COzsyQkF3QmU7VUFBN0IsaUVBQVcsZ0NBQWtCOztBQUNoQyxVQUFJLGFBQWEsU0FBYixFQUF3QixNQUFPLElBQUksS0FBSixDQUFVLG1DQUFWLENBQVAsQ0FBNUI7QUFDQSxVQUFJLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBSixFQUE2QjtBQUMzQixlQUFPLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBUCxDQUQyQjtPQUE3QixNQUVPO0FBQ0wsZUFBTyxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQVAsQ0FESztPQUZQOzs7Ozs7Ozs7Ozs7NEJBYU0sU0FBUztBQUNmLGFBQU8sS0FBSyxrQkFBTCxDQUF3QixPQUF4QixDQUFQLENBRGU7Ozs7Ozs7Ozs7Ozs0QkFVVCxVQUFVO0FBQ2hCLFVBQUksWUFBWSxTQUFTLE1BQVQ7VUFDZCxXQUFXLEVBQVgsQ0FGYzs7QUFJaEIsV0FBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBSixFQUFlLEVBQUUsQ0FBRixFQUFLO0FBQ2xDLGlCQUFTLElBQVQsQ0FBYyxLQUFLLGtCQUFMLENBQXdCLFNBQVMsQ0FBVCxDQUF4QixFQUFxQyxDQUFyQyxDQUFkLEVBRGtDO09BQXBDOztBQUlBLGFBQU8sa0JBQVEsR0FBUixDQUFZLFFBQVosQ0FBUCxDQVJnQjs7Ozs7Ozs7Ozs7Ozt1Q0FrQkMsS0FBSyxPQUFPOzs7QUFDN0IsVUFBSSxVQUFVLHNCQUNaLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDbkIsWUFBSSxVQUFVLElBQUksY0FBSixFQUFWLENBRGU7QUFFbkIsZ0JBQVEsSUFBUixDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsSUFBekIsRUFGbUI7QUFHbkIsZ0JBQVEsS0FBUixHQUFnQixLQUFoQixDQUhtQjtBQUluQixZQUFJLE1BQUssWUFBTCxFQUFtQjtBQUNyQixrQkFBUSxZQUFSLEdBQXVCLE1BQUssWUFBTCxDQURGO1NBQXZCLE1BRU87QUFDTCxjQUFJLFNBQVMsT0FBVCxDQURDO0FBRUwsY0FBSSxJQUFJLE9BQUosQ0FBWSxNQUFaLEVBQW9CLE1BQUssTUFBTCxHQUFjLE9BQU8sTUFBUCxDQUFsQyxLQUFxRCxDQUFDLENBQUQsRUFBSTtBQUMzRCxvQkFBUSxZQUFSLEdBQXVCLE1BQXZCLENBRDJEO1dBQTdELE1BRU87QUFDTCxvQkFBUSxZQUFSLEdBQXVCLGFBQXZCLENBREs7V0FGUDtTQUpGO0FBVUEsZ0JBQVEsZ0JBQVIsQ0FBeUIsTUFBekIsRUFBaUMsWUFBVzs7O0FBRzFDLGNBQUksUUFBUSxNQUFSLEtBQW1CLEdBQW5CLElBQTBCLFFBQVEsTUFBUixLQUFtQixHQUFuQixJQUEwQixRQUFRLE1BQVIsS0FBbUIsQ0FBbkIsRUFBc0I7O0FBRTVFLGdCQUFJLEtBQUssWUFBTCxLQUFzQixNQUF0QixJQUFnQyxPQUFPLFFBQVEsUUFBUixLQUFzQixRQUE3QixFQUF1QztBQUN6RSxzQkFBUSxRQUFSLEdBQW1CLEtBQUssS0FBTCxDQUFXLFFBQVEsUUFBUixDQUE5QixDQUR5RTthQUEzRTtBQUdBLG9CQUFRLFFBQVEsUUFBUixDQUFSLENBTDRFO1dBQTlFLE1BTU87QUFDTCxtQkFBTyxJQUFJLEtBQUosQ0FBVSxRQUFRLFVBQVIsQ0FBakIsRUFESztXQU5QO1NBSCtCLENBQWpDLENBZG1CO0FBMkJuQixnQkFBUSxnQkFBUixDQUF5QixVQUF6QixFQUFxQyxVQUFDLEdBQUQsRUFBUztBQUM1QyxjQUFJLE1BQUssZ0JBQUwsRUFBdUI7QUFDekIsZ0JBQUksVUFBVSxTQUFWLEVBQXFCO0FBQ3ZCLG9CQUFLLGdCQUFMLENBQXNCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDQSx1QkFBTyxJQUFJLE1BQUosR0FBYSxJQUFJLEtBQUo7QUFDcEIsd0JBQVEsSUFBSSxNQUFKO0FBQ1IsdUJBQU8sSUFBSSxLQUFKO2VBSlQsRUFEdUI7YUFBekIsTUFPTztBQUNMLG9CQUFLLGdCQUFMLENBQXNCO0FBQ3BCLHVCQUFPLElBQUksTUFBSixHQUFhLElBQUksS0FBSjtBQUNwQix3QkFBUSxJQUFJLE1BQUo7QUFDUix1QkFBTyxJQUFJLEtBQUo7ZUFIVCxFQURLO2FBUFA7V0FERjtTQURtQyxDQUFyQzs7QUEzQm1CLGVBOENuQixDQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQVc7QUFDM0MsaUJBQU8sSUFBSSxLQUFKLENBQVUsZUFBVixDQUFQLEVBRDJDO1NBQVgsQ0FBbEMsQ0E5Q21COztBQWtEbkIsZ0JBQVEsSUFBUixHQWxEbUI7T0FBckIsQ0FERSxDQUR5QjtBQXNEN0IsYUFBTyxPQUFQLENBdEQ2Qjs7Ozs7Ozs7Ozs7O3dCQStEUjtBQUNyQixhQUFPLEtBQUssVUFBTCxDQURjOzs7Ozs7Ozs7O3NCQVVGLFVBQVU7QUFDN0IsV0FBSyxVQUFMLEdBQWtCLFFBQWxCLENBRDZCOzs7U0E1SVoiLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuXG4vKipcbiAqIFByb21pc2UgYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMiBmb3IgR0VUIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGVyIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwiXCJdIC0gcmVzcG9uc2VUeXBlJ3MgdmFsdWUsIFwidGV4dFwiIChlcXVhbCB0byBcIlwiKSwgXCJhcnJheWJ1ZmZlclwiLCBcImJsb2JcIiwgXCJkb2N1bWVudFwiIG9yIFwianNvblwiXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZVR5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuICAgIC8vIHJlbmFtZSB0byBgb25Qcm9ncmVzc2AgP1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLnByb2dyZXNzQ2IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGZvciBhIHByb21pc2UgYmFzZWQgZmlsZSBsb2FkaW5nLlxuICAgKiBJbnRlcm5hbGx5IHN3aXRjaCBiZXR3ZWVuIGxvYWRPbmUgYW5kIGxvYWRBbGwuXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZmlsZVVSTHMgLSBUaGUgVVJMKHMpIG9mIHRoZSBmaWxlcyB0byBsb2FkLiBBY2NlcHRzIGEgVVJMIHBvaW50aW5nIHRvIHRoZSBmaWxlIGxvY2F0aW9uIG9yIGFuIGFycmF5IG9mIFVSTHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChmaWxlVVJMcyA9IHRocm93SWZNaXNzaW5nKCkpIHtcbiAgICBpZiAoZmlsZVVSTHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgKG5ldyBFcnJvcignbG9hZCBuZWVkcyBhdCBsZWFzdCBhIHVybCB0byBsb2FkJykpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVVUkxzKSkge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFsbChmaWxlVVJMcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRPbmUoZmlsZVVSTHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgc2luZ2xlIGZpbGVcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVUkwgLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZE9uZShmaWxlVVJMKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZUxvYWRpbmdSZXF1ZXN0KGZpbGVVUkwpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIGZpbGVzIGF0IG9uY2UgaW4gYSBzaW5nbGUgYXJyYXkgYW5kIHJldHVybiBhIFByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZVVSTHMgLSBUaGUgVVJMcyBhcnJheSBvZiB0aGUgZmlsZXMgdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkQWxsKGZpbGVVUkxzKSB7XG4gICAgdmFyIHVybHNDb3VudCA9IGZpbGVVUkxzLmxlbmd0aCxcbiAgICAgIHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybHNDb3VudDsgKytpKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuZmlsZUxvYWRpbmdSZXF1ZXN0KGZpbGVVUkxzW2ldLCBpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgZmlsZSBhc3luY2hyb25vdXNseSwgcmV0dXJuIGEgUHJvbWlzZS5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gbG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2luZGV4XSAtIFRoZSBpbmRleCBvZiB0aGUgZmlsZSBpbiB0aGUgYXJyYXkgb2YgZmlsZXMgdG8gbG9hZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGZpbGVMb2FkaW5nUmVxdWVzdCh1cmwsIGluZGV4KSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gdGhpcy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHN1ZmZpeCA9ICcuanNvbic7XG4gICAgICAgICAgaWYgKHVybC5pbmRleE9mKHN1ZmZpeCwgdGhpcy5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFRlc3QgcmVxdWVzdC5zdGF0dXMgdmFsdWUsIGFzIDQwNCB3aWxsIGFsc28gZ2V0IHRoZXJlXG4gICAgICAgICAgLy8gVGVzdCByZXF1ZXN0LnN0YXR1cyA9PT0gMCBmb3IgY29yZG92YSBpbnRlcm5hbCBhamF4IGNhbGxzXG4gICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDAgfHwgcmVxdWVzdC5zdGF0dXMgPT09IDMwNCB8fMKgcmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIEhhY2sgZm9yIGlPUyA3LCB0byByZW1vdmUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbicgJiYgdHlwZW9mKHJlcXVlc3QucmVzcG9uc2UpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVxdWVzdC5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChldnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2dC5sb2FkZWQsXG4gICAgICAgICAgICAgICAgdG90YWw6IGV2dC50b3RhbFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2dC5sb2FkZWQgLyBldnQudG90YWwsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBldnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIHRvdGFsOiBldnQudG90YWxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFuYWdlIG5ldHdvcmsgZXJyb3JzXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdOZXR3b3JrIEVycm9yJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9ncmVzcyBvZiBmaWxlIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBpcyBvbmx5IGZvciB0aGUgZmlsZSBsb2FkaW5nIHByb2dyZXNzIGFzIGRlY29kZUF1ZGlvRGF0YSBkb2Vzbid0XG4gICAqIGV4cG9zZSBhIGRlY29kZSBwcm9ncmVzcyB2YWx1ZS5cbiAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgKi9cbiAgZ2V0IHByb2dyZXNzQ2FsbGJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NDYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGdldCB0aGUgcHJvZ3Jlc3Mgb2YgZmlsZSBsb2FkaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgaXMgb25seSBmb3IgdGhlIGZpbGUgbG9hZGluZyBwcm9ncmVzcyBhcyBkZWNvZGVBdWRpb0RhdGEgZG9lc24ndFxuICAgKiBleHBvc2UgYSBkZWNvZGUgcHJvZ3Jlc3MgdmFsdWUuXG4gICAqIEB0eXBlIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCBoYW5kbGVzIHRoZSByZXNwb25zZS5cbiAgICovXG4gIHNldCBwcm9ncmVzc0NhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9ncmVzc0NiID0gY2FsbGJhY2s7XG4gIH1cbn1cbiJdfQ==