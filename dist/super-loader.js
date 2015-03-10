"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var Loader = require("./loader");
var AudioBufferLoader = require("./audio-buffer-loader");

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error("Missing parameter");
}

/**
 * SuperLoader
 * @class
 * @classdesc Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */

var SuperLoader = (function () {

  /**
   * @constructs
   * Use composition to setup appropriate file loaders
   */

  function SuperLoader() {
    _classCallCheck(this, SuperLoader);

    this.bufferLoader = new AudioBufferLoader();
    this.loader = new Loader("json");
  }

  _createClass(SuperLoader, {
    load: {

      /**
       * @function - Method for promise audio and json file loading (and decoding for audio).
       * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
       * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining
       * at the end of the returned AudioBuffer
       * @returns {Promise}
       */

      value: function load() {
        var fileURLs = arguments[0] === undefined ? throwIfMissing() : arguments[0];
        var options = arguments[1] === undefined ? {} : arguments[1];

        this.options = options;
        this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
        if (Array.isArray(fileURLs)) {
          var i = -1;
          var pos = [[], []]; // pos is used to track the positions of each fileURL
          var otherURLs = fileURLs.filter(function (url, index) {
            // var extname = path.extname(url);
            var parts = url.split(".");
            var extname = parts[parts.length - 1];
            i += 1;
            if (extname == "json") {
              pos[0].push(i);
              return true;
            } else {
              pos[1].push(i);
              return false;
            }
          });

          // var audioURLs = _.difference(fileURLs, otherURLs);
          var audioURLs = fileURLs.filter(function (url) {
            if (otherURLs.indexOf(url) === -1) {
              return url;
            }
          });

          var promises = [];

          if (otherURLs.length > 0) promises.push(this.loader.load(otherURLs));
          if (audioURLs.length > 0) promises.push(this.bufferLoader.load(audioURLs, this.options));

          return new _core.Promise(function (resolve, reject) {
            _core.Promise.all(promises).then(function (datas) {
              // Need to reorder and flatten all of these fulfilled promises
              // @todo this is ugly
              if (datas.length === 1) {
                resolve(datas[0]);
              } else {
                var outData = [];
                for (var j = 0; j < pos.length; j++) {
                  for (var k = 0; k < pos[j].length; k++) {
                    outData[pos[j][k]] = datas[j][k];
                  }
                }
                resolve(outData);
              }
            }, function (error) {
              throw error;
            });
          });
        }
      }
    }
  });

  return SuperLoader;
})();

module.exports = SuperLoader;
//# sourceMappingURL=data:application/json;base64,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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDbkIsTUFBTTtBQUNMLG9CQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLHVCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QywyQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzttQkFDbEM7aUJBQ0Y7QUFDRCx1QkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2VBQ2xCO2FBQ0YsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNaLG9CQUFNLEtBQUssQ0FBQzthQUNiLENBQUMsQ0FBQztXQUNOLENBQUMsQ0FBQztTQUNKO09BQ0Y7Ozs7U0F6RUcsV0FBVzs7O0FBNkVqQixNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJlczYvc3VwZXItbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIExvYWRlciA9IHJlcXVpcmUoJy4vbG9hZGVyJyk7XG52YXIgQXVkaW9CdWZmZXJMb2FkZXIgPSByZXF1aXJlKCcuL2F1ZGlvLWJ1ZmZlci1sb2FkZXInKTtcblxuLyoqXG4gKiBHZXRzIGNhbGxlZCBpZiBhIHBhcmFtZXRlciBpcyBtaXNzaW5nIGFuZCB0aGUgZXhwcmVzc2lvblxuICogc3BlY2lmeWluZyB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBldmFsdWF0ZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk1pc3NpbmcoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwYXJhbWV0ZXInKTtcbn1cblxuLyoqXG4gKiBTdXBlckxvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIEhlbHBlciB0byBsb2FkIG11bHRpcGxlIHR5cGUgb2YgZmlsZXMsIGFuZCBnZXQgdGhlbSBpbiB0aGVpciB1c2VmdWwgdHlwZSwganNvbiBmb3IganNvbiBmaWxlcywgQXVkaW9CdWZmZXIgZm9yIGF1ZGlvIGZpbGVzLlxuICovXG5jbGFzcyBTdXBlckxvYWRlciB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIFVzZSBjb21wb3NpdGlvbiB0byBzZXR1cCBhcHByb3ByaWF0ZSBmaWxlIGxvYWRlcnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnVmZmVyTG9hZGVyID0gbmV3IEF1ZGlvQnVmZmVyTG9hZGVyKCk7XG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKFwianNvblwiKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIE1ldGhvZCBmb3IgcHJvbWlzZSBhdWRpbyBhbmQganNvbiBmaWxlIGxvYWRpbmcgKGFuZCBkZWNvZGluZyBmb3IgYXVkaW8pLlxuICAgKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBmaWxlVVJMcyAtIFRoZSBVUkwocykgb2YgdGhlIGZpbGVzIHRvIGxvYWQuIEFjY2VwdHMgYSBVUkwgcG9pbnRpbmcgdG8gdGhlIGZpbGUgbG9jYXRpb24gb3IgYW4gYXJyYXkgb2YgVVJMcy5cbiAgICogQHBhcmFtIHt7d3JhcEFyb3VuZEV4dGVuc2lvbjogbnVtYmVyfX0gW29wdGlvbnNdIC0gT2JqZWN0IHdpdGggYSB3cmFwQXJvdW5kRXh0ZW5zaW9uIGtleSB3aGljaCBzZXQgdGhlIGxlbmd0aCwgaW4gc2Vjb25kcyB0byBiZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmdcbiAgICogYXQgdGhlIGVuZCBvZiB0aGUgcmV0dXJuZWQgQXVkaW9CdWZmZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkKGZpbGVVUkxzID0gdGhyb3dJZk1pc3NpbmcoKSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uIHx8IDA7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZVVSTHMpKSB7XG4gICAgICB2YXIgaSA9IC0xO1xuICAgICAgdmFyIHBvcyA9IFtcbiAgICAgICAgW10sXG4gICAgICAgIFtdXG4gICAgICBdOyAvLyBwb3MgaXMgdXNlZCB0byB0cmFjayB0aGUgcG9zaXRpb25zIG9mIGVhY2ggZmlsZVVSTFxuICAgICAgdmFyIG90aGVyVVJMcyA9IGZpbGVVUkxzLmZpbHRlcihmdW5jdGlvbih1cmwsIGluZGV4KSB7XG4gICAgICAgIC8vIHZhciBleHRuYW1lID0gcGF0aC5leHRuYW1lKHVybCk7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgZXh0bmFtZSA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmIChleHRuYW1lID09ICdqc29uJykge1xuICAgICAgICAgIHBvc1swXS5wdXNoKGkpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvc1sxXS5wdXNoKGkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHZhciBhdWRpb1VSTHMgPSBfLmRpZmZlcmVuY2UoZmlsZVVSTHMsIG90aGVyVVJMcyk7XG4gICAgICB2YXIgYXVkaW9VUkxzID0gZmlsZVVSTHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBpZiAob3RoZXJVUkxzLmluZGV4T2YodXJsKSA9PT0gLTEpIHsgcmV0dXJuIHVybDsgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuXG4gICAgICBpZiAob3RoZXJVUkxzLmxlbmd0aCA+IDApIHByb21pc2VzLnB1c2godGhpcy5sb2FkZXIubG9hZChvdGhlclVSTHMpKTtcbiAgICAgIGlmIChhdWRpb1VSTHMubGVuZ3RoID4gMCkgcHJvbWlzZXMucHVzaCh0aGlzLmJ1ZmZlckxvYWRlci5sb2FkKGF1ZGlvVVJMcywgdGhpcy5vcHRpb25zKSk7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKFxuICAgICAgICAgIChkYXRhcykgPT4ge1xuICAgICAgICAgICAgLy8gTmVlZCB0byByZW9yZGVyIGFuZCBmbGF0dGVuIGFsbCBvZiB0aGVzZSBmdWxmaWxsZWQgcHJvbWlzZXNcbiAgICAgICAgICAgIC8vIEB0b2RvIHRoaXMgaXMgdWdseVxuICAgICAgICAgICAgaWYgKGRhdGFzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGFzWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBvdXREYXRhID0gW107XG4gICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwb3Nbal0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgIG91dERhdGFbcG9zW2pdW2tdXSA9IGRhdGFzW2pdW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXNvbHZlKG91dERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cGVyTG9hZGVyOyJdfQ==