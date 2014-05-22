/** 
 * @fileOverview
 * WAVE audio library module for buffer loading.
 * @author Karim.Barkati@ircam.fr, Norbert.Schnell@ircam.fr, Victor.Saiz@ircam.fr
 * @version 1.2.0
 */



/**
 * Function invocation pattern for object creation.
 * @public
 */
var createBufferLoader = function createBufferLoader() {
  'use strict';

  // Ensure global availability of an "audioContext" instance of web audio AudioContext.
  window.audioContext = window.audioContext || new AudioContext() || new webkitAudioContext();

  /**
   * ECMAScript5 property descriptors object.
   */
  var bufferLoaderObject = {

    // Attributes for loadAll closure.
    bufferList: {
      writable: true
    },
    loadCount: {
      writable: true
    },

    /**
     * Main wrapper function for loading.
     * Switch between loadBuffer and loadAll;
     * loadEach has to be called explicitly.
     * @public
     * @param fileURLs The URLs of the audio files to load.
     * @param toplevelCallback The callback function.
     */
    load: {
      enumerable: true,
      value: function(fileURLs, toplevelCallback) {
        if (Array.isArray(fileURLs)) {
          this.loadAll(fileURLs, toplevelCallback);
        } else {
          this.loadBuffer(fileURLs, toplevelCallback);
        }
      }
    },

    /**
     * Load a single audio file,
     * decode it in an AudioBuffer
     * and pass it to the callback.
     * @public
     * @param fileURL The URL of the audio file to load.
     * @param toplevelCallback The callback function when loading finished.
     */
    loadBuffer: {
      enumerable: true,
      value: function(fileURL, toplevelCallback) {

        var successCallback = function successCallback(buffer) {
          if (!buffer) {
            throw 'error decoding data: ' + buffer;
          }
          toplevelCallback(buffer);
        };

        var errorCallback = function errorCallback(error) {
          throw 'decodeAudioData error: ' + error;
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
     * Load each audio file asynchronously,
     * decode it in an AudioBuffer,
     * and execute the callback for each.
     * @public
     * @param fileURLs The URLs array of the audio files to load.
     * @param toplevelCallback The callback function when a loading finished.
     */
    loadEach: {
      enumerable: true,
      value: function(fileURLs, toplevelCallback) {
        var urlsCount = fileURLs.length;

        for (var i = 0; i < urlsCount; ++i) {
          this.loadBuffer(fileURLs[i], toplevelCallback);
        }
      }
    },

    /**
     * Load all audio files at once in a single array,
     * decode them in an array of AudioBuffers,
     * and return a single callback when all loadings finished.
     * @public
     * @param fileURLs The URLs array of the audio files to load.
     * @param toplevelCallback The callback function when total loading finished.
     */
    loadAll: {
      enumerable: true,
      value: function(fileURLs, toplevelCallback) {
        var urlsCount = fileURLs.length;
        this.loadCount = 0;
        this.bufferList = [];
        for (var i = 0; i < urlsCount; ++i) {
          this.loadBufferAtIndex(fileURLs[i], toplevelCallback, i, urlsCount);
        }
      }
    },

    /**
     * Load a single audio file,
     * decode it in an AudioBuffer
     * and store it in a buffer list at provided index.
     * @private
     * @param fileURL The URL of the audio file to load.
     * @param toplevelCallback The callback function when loading finished.
     */
    loadBufferAtIndex: {
      enumerable: false,
      value: function(fileURL, toplevelCallback, index, urlsCount) {

        var that = this;

        var successCallback = function successCallback(buffer) {
          if (!buffer) {
            throw 'error decoding data: ' + buffer;
          }
          that.loadCount++;
          if (that.loadCount < urlsCount) {
            that.bufferList[index] = buffer;
          } else {
            that.bufferList[index] = buffer;
            toplevelCallback(that.bufferList); // When all files are loaded.
          }
        };

        var errorCallback = function errorCallback(error) {
          throw 'decodeAudioData error: ' + error;
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

          callback(request);
        };

        if (request.readyState == 4) return;
        return request;
      }
    },
  };

  // Instantiate an object.
  var instance = Object.create({}, bufferLoaderObject);
  return instance;
};


// CommonJS function export
module.exports = createBufferLoader;