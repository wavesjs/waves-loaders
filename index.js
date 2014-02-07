/** 
 * @fileOverview
 * WAVE audio library module for buffer loading.
 */


/** 
 * Buffer loader object with potentially several loading methods.
 * @public
 */
var bufferLoader = {

  /**
   * Request an audio file, decode it in an AudioBuffer and pass it to a callback.
   * @public
   * @param {AudioContext} context Web Audio API AudioContext
   * @param {URL} url of the audio file to load
   * @param {Function} callback Function when loading finished.
   */
  load: {
    enumerable: true,
    value: function(context, url, callback) {

      url = '/' + url;
      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        context.decodeAudioData(request.response,

          function(buffer) {
            if (!buffer) {
              alert('error decoding file data: ' + url);
              return;
            }
            callback(buffer);
          },

          function(error) {
            console.error('decodeAudioData error', error);
          }
        );

      };

      request.onerror = function() {
        alert('bufferLoader: XMLHttpRequest error');
      };

      request.send();
    }
  }
};


// CommonJS object export
exports = module.exports = Object.create({}, bufferLoader);