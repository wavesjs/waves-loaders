/** 
 * @fileOverview
 * WAVE audio library module for buffer loading.
 * @author Karim Barkati and Victor Saiz
 * @version 0.2.0
 */

"use strict";
/* global module, console */

/** 
 * Buffer loader object with several loading methods.
 * @public
 */
var bufferLoader = {

  /**
   * Main wrapper function for loading.
   * Switch between loadBuffer and loadAll;
   * loadEach has to be called explicitely.
   * @public
   * @param fileURLs The URLs of the audio files to load.
   * @param callback The callback function.
   * @param audioContext The Web Audio API AudioContext.
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
          throw 'error decoding data: ' + buffer;
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
   * Load all audio files at once,
   * decode them in an array of AudioBuffers,
   * and return a single callback when all loadings finished.
   * @public
   * @param fileURLs The URLs array of the audio files to load.
   * @param callback The callback function when total loading finished.
   * @param audioContext The Web Audio API AudioContext.
   * @todo Parallelize instead of cascade loading.
   */
  loadAll: {
    enumerable: true,
    value: function(fileURLs, callback, audioContext) {
      var urlsCount = fileURLs.length;
      var bufferList = [];
      var i = 0;

      var that = this;
      var successCallback = function successCallback(buffer) {
        if (!buffer) {
          throw 'error decoding data: ' + buffer;
        }
        bufferList[i] = buffer;

        // Cascade file loading.
        i = i + 1;
        if (i < urlsCount) {
          that.fileLoadingRequest(fileURLs[i], decodeCallback).send();
        } else {
          callback(bufferList); // When all files are loaded.
        }
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

      this.fileLoadingRequest(fileURLs[0], decodeCallback).send();
    }
  },

  /**
   * Load each audio file asynchronously,
   * decode it in an AudioBuffer,
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

      for (var i = 0; i < urlsCount; ++i) {
        // this.filesLoadingRequest(fileURLs[i], decodeCallback, i).send();
        this.loadBuffer(fileURLs[i], callback, audioContext);
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

        console.log(request);
        callback(request);
      };

      if (request.readyState == 4) return;
      return request;
    }
  },

  /**
   * Load an numbered file asynchronously
   * and pass it to a callback as an 'arraybuffer'
   * with the index.
   * @private
   */
  numberedFileLoadingRequest: {
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

        console.log("index: ", index, request);
        callback(request, index);
      };

      if (request.readyState == 4) return;
      return request;
    }
  },

  /**
   * Load a file asynchronously
   * and pass it to a callback as an 'arraybuffer'.
   * Note: unused attempt for a parallel loading, passing the buffer index.
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
module.exports = Object.create({}, bufferLoader);