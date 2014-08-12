!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BufferLoader=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileOverview
 * Audio buffer loader.
 * @author Karim Barkati, Victor Saiz, Emmanuel Fréard, Samuel Goldszmidt
 * @version 4.0.0
 */

'use strict';

var Promise = _dereq_("native-promise-only");

// Ensure global availability of an "audioContext" instance of web audio AudioContext.
window.audioContext = window.audioContext || new AudioContext() || new webkitAudioContext();

var BufferLoader = (function(){var DP$0 = Object.defineProperty;

  function BufferLoader() {
    this.progressCb = undefined;
  }Object.defineProperties(BufferLoader.prototype, {progressCallback: {"get": progressCallback$get$0, "set": progressCallback$set$0, "configurable": true, "enumerable": true}});DP$0(BufferLoader, "prototype", {"configurable": false, "enumerable": false, "writable": false});

  /**
   * Main wrapper function for audio buffer loading.
   * Switch between loadBuffer and loadAll.
   * @public
   * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
   */
  BufferLoader.prototype.load = function(fileURLs) {
    if (Array.isArray(fileURLs)) {
      return this.loadAll(fileURLs);
    } else {
      return this.loadBuffer(fileURLs);
    }
  }

  /**
   * Load a single audio file,
   * decode it in an AudioBuffer, return a Promise
   * @public
   * @param fileURL The URL of the audio file location to load.
   */
  BufferLoader.prototype.loadBuffer = function(fileURL) {
    return this.fileLoadingRequest(fileURL)
      .then(
        this.decodeAudioData,
        function(error) {
          throw error;
        });
  }

  /**
   * Load all audio files at once in a single array,
   * decode them in an array of AudioBuffers,
   * and return a Promise
   * @public
   * @param fileURLs The URLs array of the audio files to load.
   */
  BufferLoader.prototype.loadAll = function(fileURLs) {
    var urlsCount = fileURLs.length,
      promises = [],
      that = this;

    for (var i = 0; i < urlsCount; ++i) {
      promises.push(this.fileLoadingRequest(fileURLs[i], i));
    }

    return Promise.all(promises)
      .then(
        function get_all_the_things(arraybuffers) {
          return Promise.all(arraybuffers.map(function(arraybuffer) {
            return that.decodeAudioData(arraybuffer);
          }));
        },
        function(error) {
          throw error; // TODO: better error handler
        });
  }

  /**
   * Load a file asynchronously, return a Promise.
   * @private
   * @param url The URL of the audio file to load.
   */
  BufferLoader.prototype.fileLoadingRequest = function(url, index) {
    var self = this;
    var promise = new Promise(
      function(resolve, reject) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
          // Test request.status value, as 404 will also get there
          if (request.status === 200 || request.status === 304) {
            resolve(request.response);
          } else {
            reject(new Error(request.statusText));
          }
        };
        request.onprogress = function(evt) {
          if (self.progressCallback) {
            if (index !== undefined) {
              self.progressCallback({
                index: index,
                value: evt.loaded / evt.total
              });
            } else {
              self.progressCallback(evt.loaded / evt.total);
            }
          }
        };
        // Manage network errors
        request.onerror = function() {
          reject(new Error("Network Error"));
        };
        request.send();
      });
    return promise;
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param arraybuffer The arraybuffer of the loaded audio file to be decoded.
   */
  BufferLoader.prototype.decodeAudioData = function(arraybuffer) {
    var promise = new Promise(function(resolve, reject) {
      window.audioContext.decodeAudioData(
        arraybuffer, // returned audio data array
        function successCallback(buffer) {
          resolve(buffer);
        },
        function errorCallback(error) {
          reject(new Error("DecodeAudioData error"));
        }
      );
    });
    return promise;
  }

  /**
   * Set / Get the callback function to get the progress of file loading process.
   * This is only for the file loading progress as decodeAudioData doesn't
   * expose a decode progress value.
   */
  function progressCallback$get$0() {
    return this.progressCb;
  }
  function progressCallback$set$0(callback) {
    this.progressCb = callback;
  }

;return BufferLoader;})();


// CommonJS function export
module.exports = BufferLoader;

},{"native-promise-only":"bwMhdl"}]},{},[1])
(1)
});