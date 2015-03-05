var path = require('path');
var Loader = require('./loader');
var AudioBufferLoader = require('./audio-buffer-loader');

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

/**
 * SuperLoader
 * @class
 * @classdesc Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */
class SuperLoader {

  /**
   * @constructs
   * Use composition to setup appropriate file loaders
   */
  constructor() {
    this.bufferLoader = new AudioBufferLoader();
    this.loader = new Loader("json");
  }


  /**
   * @function - Method for promise audio and json file loading (and decoding for audio).
   * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
   * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining
   * at the end of the returned AudioBuffer
   * @returns {Promise}
   */
  load(fileURLs = throwIfMissing(), options = {}) {
    this.options = options;
    this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
    if (Array.isArray(fileURLs)) {
      var i = -1;
      var pos = [
        [],
        []
      ]; // pos is used to track the positions of each fileURL
      var otherURLs = fileURLs.filter(function(url, index) {
        var extname = path.extname(url);
        i += 1;
        if (extname == '.json') {
          pos[0].push(i);
          return true;
        } else {
          pos[1].push(i);
          return false;
        }
      });

      // var audioURLs = _.difference(fileURLs, otherURLs);
      var audioURLs = fileURLs.filter(function(url) {
        if (otherURLs.indexOf(url) === -1) { return url; }
      });

      var promises = [];

      if (otherURLs.length > 0) promises.push(this.loader.load(otherURLs));
      if (audioURLs.length > 0) promises.push(this.bufferLoader.load(audioURLs, this.options));

      return new Promise((resolve, reject) => {
        Promise.all(promises).then(
          (datas) => {
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
          }, (error) => {
            throw error;
          });
      });
    }
  }

}

module.exports = SuperLoader;