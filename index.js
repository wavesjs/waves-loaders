/** 
 * @fileOverview
 * WAVE audio library module for buffer loading.
 * @author Karim Barkati and Victor Saiz
 * @version 0.1.0
 */

"use strict";

/** 
 * Buffer loader object with several loading methods.
 * @public
 */
var bufferLoader = {

  /**
   * Load a single audio file,
   * decode it in an AudioBuffer
   * and pass it to a callback.
   * @public
   * @param fileURL The URL of the audio file to load.
   * @param callback The callback function when loading finished.
   * @param audioContext The Web Audio API AudioContext.
   */
  loadBuffer: {
    enumerable: true,
    value: function(fileURL, callback, audioContext) {

      var successCallback = function successCallback(buffer) {
        if (!buffer) {
          throw 'error decoding file data: ' + buffer;
        }
        callback(buffer);
      };

      var errorCallback = function errorCallback(error) {
        console.error('decodeAudioData error', error);
      };

      var decodeCallback = function decodeCallback(requestCallback) {

        audioContext.decodeAudioData(
          requestCallback.response, // returned audio data array
          successCallback,
          errorCallback
        );
      };

      this.fileLoadingRequest(fileURL, decodeCallback).send();
    }
  },

  /**
   * Load audio files asynchronously,
   * decode each of them in an AudioBuffer,
   * and execute the callback for each.
   * @public
   * @param fileURLs The URLs array of the audio files to load.
   * @param callback The callback function when a loading finished.
   * @param audioContext The Web Audio API AudioContext.
   */
  loadEach: {
    enumerable: true,
    value: function(fileURLs, callback, audioContext) {
      var urlsCount = fileURLs.length;
      // var loadCount = 0;

      // var successCallback = function successCallback(buffer) {
      //   if (!buffer) return;
      //   callback[loadCount++](buffer);
      // };

      // var errorCallback = function errorCallback(error) {
      //   throw error.toString();
      // };

      // // Decode audio data asynchronously
      // var decodeCallback = function decodeCallback(requestCallback) {
      //   audioContext.decodeAudioData(
      //     requestCallback.response, // returned audio data array
      //     successCallback,
      //     errorCallback
      //   );
      // };

      for (var i = 0; i < urlsCount; ++i) {
        // this.filesLoadingRequest(fileURLs[i], decodeCallback, i).send();
        this.loadBuffer(fileURLs[i], callback, audioContext);
      }
    }
  },

  /**
   * Load audio files all at once,
   * decode each of them in an AudioBuffer,
   * and return a single callback when total loading finished.
   * @public
   * @param fileURLs The URLs array of the audio files to load.
   * @param callback The callback function when total loading finished.
   * @param audioContext The Web Audio API AudioContext.
   */
  loadAll: {
    enumerable: true,
    value: function(audioContext, fileURLs, callback) {
      var urlsCount = fileURLs.length;
      var bufferList = [];
      var loadCount = 0;

      // performs request and passes audio data into resulting array
      // calls the callback at the end
      var decode = function decode(req) {
        audioContext.decodeAudioData(req.response,
          function(buffer) {
            if (!buffer) return;

            bufferList.push(buffer);
            if (++loadCount === urlsCount) callback(bufferList);
          },
          function(error) {}
        );
      };

      for (var i = 0; i < urlsCount; ++i) {
        this.fileLoadingRequest(fileURLs[i], decode).send();
      }
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
    value: function(fileURLs, callback, audioContext) {
      if (Array.isArray(fileURLs)) {
        this.loadAll(fileURLs, callback, audioContext);
      } else {
        this.loadBuffer(fileURLs, callback, audioContext);
      }
    }
  },

  /**
   * Load a file asynchronously
   * and pass it to a callback as an 'arraybuffer'.
   * @private
   */
  fileLoadingRequest: {
    enumerable: false,
    value: function(url, callback) {

      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200 && request.status != 304) {
          throw 'HTTP error ' + request.status;
        }

        console.log(request)
        callback(request);
      };

      if (request.readyState == 4) return;
      return request;
    }
  },

  /**
   * Load a file asynchronously
   * and pass it to a callback as an 'arraybuffer'.
   * @private
   */
  filesLoadingRequest: {
    enumerable: false,
    value: function(url, callback, index) {

      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200 && request.status != 304) {
          throw 'HTTP error ' + request.status;
        }

        console.log(request);
        callback(request);
      };

      if (request.readyState == 4) return;
      return request;
    }
  }

};

// CommonJS object export
/* global module */
module.exports = Object.create({}, bufferLoader);