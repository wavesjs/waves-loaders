"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var path = require("path");
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
    _babelHelpers.classCallCheck(this, SuperLoader);

    this.bufferLoader = new AudioBufferLoader();
    this.loader = new Loader("json");
  }

  _babelHelpers.prototypeProperties(SuperLoader, null, {
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
            var extname = path.extname(url);
            i += 1;
            if (extname == ".json") {
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
      },
      writable: true,
      configurable: true
    }
  });

  return SuperLoader;
})();

module.exports = SuperLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdXBlci1sb2FkZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakMsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7Ozs7OztBQU96RCxTQUFTLGNBQWMsR0FBRztBQUN4QixRQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Q0FDdEM7Ozs7Ozs7O0lBT0ssV0FBVzs7Ozs7OztBQU1KLFdBTlAsV0FBVzt1Q0FBWCxXQUFXOztBQU9iLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0FBQzVDLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDbEM7O29DQVRHLFdBQVc7QUFtQmYsUUFBSTs7Ozs7Ozs7OzthQUFBLGdCQUE0QztZQUEzQyxRQUFRLGdDQUFHLGNBQWMsRUFBRTtZQUFFLE9BQU8sZ0NBQUcsRUFBRTs7QUFDNUMsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQztBQUN6RSxZQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDM0IsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDWCxjQUFJLEdBQUcsR0FBRyxDQUNSLEVBQUUsRUFDRixFQUFFLENBQ0gsQ0FBQztBQUNGLGNBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ25ELGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLGFBQUMsSUFBSSxDQUFDLENBQUM7QUFDUCxnQkFBSSxPQUFPLElBQUksT0FBTyxFQUFFO0FBQ3RCLGlCQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2YscUJBQU8sSUFBSSxDQUFDO2FBQ2IsTUFBTTtBQUNMLGlCQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2YscUJBQU8sS0FBSyxDQUFDO2FBQ2Q7V0FDRixDQUFDLENBQUM7OztBQUdILGNBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBUyxHQUFHLEVBQUU7QUFDNUMsZ0JBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUFFLHFCQUFPLEdBQUcsQ0FBQzthQUFFO1dBQ25ELENBQUMsQ0FBQzs7QUFFSCxjQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLGNBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLGNBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRXpGLGlCQUFPLFVBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxrQkFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDeEIsVUFBQyxLQUFLLEVBQUs7OztBQUdULGtCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3RCLHVCQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDbkIsTUFBTTtBQUNMLG9CQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLHVCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QywyQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzttQkFDbEM7aUJBQ0Y7QUFDRCx1QkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2VBQ2xCO2FBQ0YsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNaLG9CQUFNLEtBQUssQ0FBQzthQUNiLENBQUMsQ0FBQztXQUNOLENBQUMsQ0FBQztTQUNKO09BQ0Y7Ozs7OztTQXZFRyxXQUFXOzs7QUEyRWpCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6InNyYy9zdXBlci1sb2FkZXIuZXM2LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKTtcbnZhciBBdWRpb0J1ZmZlckxvYWRlciA9IHJlcXVpcmUoJy4vYXVkaW8tYnVmZmVyLWxvYWRlcicpO1xuXG4vKipcbiAqIEdldHMgY2FsbGVkIGlmIGEgcGFyYW1ldGVyIGlzIG1pc3NpbmcgYW5kIHRoZSBleHByZXNzaW9uXG4gKiBzcGVjaWZ5aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGV2YWx1YXRlZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcicpO1xufVxuXG4vKipcbiAqIFN1cGVyTG9hZGVyXG4gKiBAY2xhc3NcbiAqIEBjbGFzc2Rlc2MgSGVscGVyIHRvIGxvYWQgbXVsdGlwbGUgdHlwZSBvZiBmaWxlcywgYW5kIGdldCB0aGVtIGluIHRoZWlyIHVzZWZ1bCB0eXBlLCBqc29uIGZvciBqc29uIGZpbGVzLCBBdWRpb0J1ZmZlciBmb3IgYXVkaW8gZmlsZXMuXG4gKi9cbmNsYXNzIFN1cGVyTG9hZGVyIHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdHNcbiAgICogVXNlIGNvbXBvc2l0aW9uIHRvIHNldHVwIGFwcHJvcHJpYXRlIGZpbGUgbG9hZGVyc1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idWZmZXJMb2FkZXIgPSBuZXcgQXVkaW9CdWZmZXJMb2FkZXIoKTtcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIoXCJqc29uXCIpO1xuICB9XG5cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTWV0aG9kIGZvciBwcm9taXNlIGF1ZGlvIGFuZCBqc29uIGZpbGUgbG9hZGluZyAoYW5kIGRlY29kaW5nIGZvciBhdWRpbykuXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpbGVVUkxzIC0gVGhlIFVSTChzKSBvZiB0aGUgZmlsZXMgdG8gbG9hZC4gQWNjZXB0cyBhIFVSTCBwb2ludGluZyB0byB0aGUgZmlsZSBsb2NhdGlvbiBvciBhbiBhcnJheSBvZiBVUkxzLlxuICAgKiBAcGFyYW0ge3t3cmFwQXJvdW5kRXh0ZW5zaW9uOiBudW1iZXJ9fSBbb3B0aW9uc10gLSBPYmplY3Qgd2l0aCBhIHdyYXBBcm91bmRFeHRlbnNpb24ga2V5IHdoaWNoIHNldCB0aGUgbGVuZ3RoLCBpbiBzZWNvbmRzIHRvIGJlIGNvcGllZCBmcm9tIHRoZSBiZWdpbmluZ1xuICAgKiBhdCB0aGUgZW5kIG9mIHRoZSByZXR1cm5lZCBBdWRpb0J1ZmZlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWQoZmlsZVVSTHMgPSB0aHJvd0lmTWlzc2luZygpLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmRFeHRlbnNpb24gfHwgMDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlVVJMcykpIHtcbiAgICAgIHZhciBpID0gLTE7XG4gICAgICB2YXIgcG9zID0gW1xuICAgICAgICBbXSxcbiAgICAgICAgW11cbiAgICAgIF07IC8vIHBvcyBpcyB1c2VkIHRvIHRyYWNrIHRoZSBwb3NpdGlvbnMgb2YgZWFjaCBmaWxlVVJMXG4gICAgICB2YXIgb3RoZXJVUkxzID0gZmlsZVVSTHMuZmlsdGVyKGZ1bmN0aW9uKHVybCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGV4dG5hbWUgPSBwYXRoLmV4dG5hbWUodXJsKTtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoZXh0bmFtZSA9PSAnLmpzb24nKSB7XG4gICAgICAgICAgcG9zWzBdLnB1c2goaSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zWzFdLnB1c2goaSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gdmFyIGF1ZGlvVVJMcyA9IF8uZGlmZmVyZW5jZShmaWxlVVJMcywgb3RoZXJVUkxzKTtcbiAgICAgIHZhciBhdWRpb1VSTHMgPSBmaWxlVVJMcy5maWx0ZXIoZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGlmIChvdGhlclVSTHMuaW5kZXhPZih1cmwpID09PSAtMSkgeyByZXR1cm4gdXJsOyB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIHByb21pc2VzID0gW107XG5cbiAgICAgIGlmIChvdGhlclVSTHMubGVuZ3RoID4gMCkgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRlci5sb2FkKG90aGVyVVJMcykpO1xuICAgICAgaWYgKGF1ZGlvVVJMcy5sZW5ndGggPiAwKSBwcm9taXNlcy5wdXNoKHRoaXMuYnVmZmVyTG9hZGVyLmxvYWQoYXVkaW9VUkxzLCB0aGlzLm9wdGlvbnMpKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG4gICAgICAgICAgKGRhdGFzKSA9PiB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIHJlb3JkZXIgYW5kIGZsYXR0ZW4gYWxsIG9mIHRoZXNlIGZ1bGZpbGxlZCBwcm9taXNlc1xuICAgICAgICAgICAgLy8gQHRvZG8gdGhpcyBpcyB1Z2x5XG4gICAgICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YXNbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIG91dERhdGEgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBvc1tqXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgb3V0RGF0YVtwb3Nbal1ba11dID0gZGF0YXNbal1ba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc29sdmUob3V0RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwZXJMb2FkZXI7Il19