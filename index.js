/** 
 * @fileOverview
 * WAVE audio library module for buffer loading.
 */
"use strict";

var isArray = function isArray(item){
  return Object.prototype.toString.call(item) === "[object Array]";
};

var request = function request(url, callback) {

  // Load buffer asynchronously
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onreadystatechange = function() {
    if (req.readyState != 4) return;
    if (req.status != 200 && req.status != 304) {
      throw 'HTTP error ' + req.status;
    }

    callback(req);
  };

  if (req.readyState == 4) return;

  return req;
};

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
  loadSingle: {
    enumerable: true,
    value: function(context, url, callback) {

      var decode = function decode(req) {
        context.decodeAudioData(req.response,
          function(buffer) {
            if (!buffer) return;
            callback(buffer);
          },
          function(error) {
            throw error.toString();
          }
        );
      };

      request(url, decode).send();
    }
  },

  /**
   * Request an audio file, decode it in an AudioBuffer and pass it to a callback.
   * @public
   * @param {AudioContext} context Web Audio API AudioContext
   * @param {URL} url of the audio file to load
   * @param {Function} callback Function when loading finished.
   */
  loadEach: {
    enumerable: true,
    value: function(context, urls, callbacks) {
      var urlLen = urls.length;
      var loadCount = 0;

      var decode = function decode(req) {
        context.decodeAudioData(req.response,
          function(buffer) {
            if (!buffer) return;
            callbacks[loadCount++](buffer);
          },
          function(error) {}
        );
      };

      for (var i = 0; i < urlLen; ++i) request(urls[i], decode).send();
    }
  },

  /**
   * Request an audio file, decode it in an AudioBuffer and pass it to a callback.
   * @public
   * @param {AudioContext} context Web Audio API AudioContext
   * @param {URL} url of the audio file to load
   * @param {Function} callback Function when loading finished.
   */
  loadAll: {
    enumerable: true,
    value: function(context, urls, callback) {
      var urlLen = urls.length;
      var bufferList = [];
      var loadCount = 0;

      // performs request and passes audio data into resulting array
      // calls the callback at the end
      var decode = function decode(req) {
        context.decodeAudioData(req.response,
          function(buffer) {
            if (!buffer) return;

            bufferList.push(buffer);
            if (++loadCount === urlLen) callback(bufferList);
          },
          function(error) {}
        );
      };

      for (var i = 0; i < urlLen; ++i) request(urls[i], decode).send();
    }
  },

  /**
   * Request an audio file, decode it in an AudioBuffer and pass it to a callback.
   * @public
   * @param {AudioContext} context Web Audio API AudioContext
   * @param {URL} url of the audio file to load
   * @param {Function} callback Function when loading finished.
   */
  load: {
    enumerable: true,
    value: function(context, urls, callbacks) {
      if(isArray(urls) && isArray(callbacks)) {
        this.loadEach(context, urls, callbacks);
      } else if(isArray(urls)){
        this.loadAll(context, urls, callbacks);
      } else {
        this.loadSingle(context, urls, callbacks);
      }
    }
  }
};

// CommonJS object export
exports = module.exports = Object.create({}, bufferLoader);