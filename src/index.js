/**
 * @fileOverview
 * Audio buffer loader.
 * @author Karim Barkati, Victor Saiz, Emmanuel Fréard, Samuel Goldszmidt
 * @version 4.0.0
 */

'use strict';

require("audio-context"); //make an AudioContext instance globally available
require("native-promise-only");
var events = require('events');

class BufferLoader extends events.EventEmitter {

  constructor() {
    super();
    this.progressCb = undefined;
  }

  /**
   * Main wrapper function for audio buffer loading.
   * Switch between loadBuffer and loadAll.
   * @public
   * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
   */
  load(fileURLs) {
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
  loadBuffer(fileURL) {
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
  loadAll(fileURLs) {
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
  fileLoadingRequest(url, index) {
    var promise = new Promise(
      (resolve, reject) => {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.index = index;
        this.emit('xmlhttprequest', request);
        request.responseType = "arraybuffer";
        request.addEventListener('load', function() {
          // Test request.status value, as 404 will also get there
          if (request.status === 200 || request.status === 304) {
            resolve(request.response);
          } else {
            reject(new Error(request.statusText));
          }
        });
        request.addEventListener('progress', (evt) => {
          if (this.progressCallback) {
            if (index !== undefined) {
              this.progressCallback({
                index: index,
                value: evt.loaded / evt.total
              });
            } else {
              this.progressCallback(evt.loaded / evt.total);
            }
          }
        });
        // Manage network errors
        request.addEventListener('error', function() {
          reject(new Error("Network Error"));
        });

        request.send();
      });
    return promise;
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param arraybuffer The arraybuffer of the loaded audio file to be decoded.
   */
  decodeAudioData(arraybuffer) {
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
  get progressCallback() {
    return this.progressCb;
  }
  set progressCallback(callback) {
    this.progressCb = callback;
  }

}


// CommonJS function export
module.exports = BufferLoader;
