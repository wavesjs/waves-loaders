/* written in ECMAscript 6 */
/**
 * @fileOverview
 * Audio buffer loader.
 * @author Karim Barkati, Victor Saiz, Emmanuel Fréard, Samuel Goldszmidt
 * @version 5.0.0
 */

'use strict';

require("audio-context"); //make an AudioContext instance globally available
require("native-promise-only");
var _ = require('lodash'),
  events = require('events'),
  path = require('path');


/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

class Loader extends events.EventEmitter {

  constructor(responseType = "") {
    super();
    this.responseType = responseType;
    this.progressCb = undefined;
  }

  /**
   * Main wrapper function for audio buffer loading.
   * Switch between loadOne and loadAll.
   * @public
   * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
   */
  load(fileURLs = throwIfMissing()) {
    if (fileURLs == undefined) throw (new Error("load needs at least a url to load"));
    if (Array.isArray(fileURLs)) {
      return this.loadAll(fileURLs);
    } else {
      return this.loadOne(fileURLs);
    }
  }

  /**
   * Load a single file, return a Promise
   * @public
   * @param fileURL The URL of the audio file location to load.
   */
  loadOne(fileURL) {
    return this.fileLoadingRequest(fileURL);
  }

  /**
   * Load all files at once in a single array
   * and return a Promise
   * @public
   * @param fileURLs The URLs array of the files to load.
   */
  loadAll(fileURLs) {
    var urlsCount = fileURLs.length,
      promises = [];

    for (var i = 0; i < urlsCount; ++i) {
      promises.push(this.fileLoadingRequest(fileURLs[i], i));
    }

    return Promise.all(promises);
  }

  /**
   * Load a file asynchronously, return a Promise.
   * @private
   * @param url The URL of the audio file to load.
   */
  fileLoadingRequest(url, index) {
    var promise = new Promise(
      (resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.index = index;
        this.emit('xmlhttprequest', request);
        request.responseType = this.responseType;
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


class BufferLoader extends Loader {

  constructor() {
    this.responseType = 'arraybuffer';
    this.wrapAroundExtension = 0;
  }

  load(fileURLs = throwIfMissing(), wrapAroundExtension = 0) {
    this.wrapAroundExtension = wrapAroundExtension;
    return super.load(fileURLs);
  }

  /**
   * Load a single audio file,
   * decode it in an AudioBuffer, return a Promise
   * @public
   * @param fileURL The URL of the audio file location to load.
   */
  loadOne(fileURL) {
    return super.loadOne(fileURL)
      .then(
        this.decodeAudioData.bind(this),
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
    return super.loadAll(fileURLs)
      .then(
        (arraybuffers) => {
          return Promise.all(arraybuffers.map((arraybuffer) => {
            return this.decodeAudioData.bind(this)(arraybuffer);
          }));
        }, (error) => {
          throw error; // TODO: better error handler
        });
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param arraybuffer The arraybuffer of the loaded audio file to be decoded.
   */
  decodeAudioData(arraybuffer) {
    return new Promise((resolve, reject) => {
      window.audioContext.decodeAudioData(
        arraybuffer, // returned audio data array
        (buffer) => {
          if (this.wrapAroundExtension === 0) resolve(buffer);
          else resolve(this.__wrapAround(buffer));
        }, (error) => {
          reject(new Error("DecodeAudioData error"));
        }
      );
    });
  }

  /**
   * WrapAround, copy the begining input buffer to the end of an output buffer
   * @private
   * @inBuffer The input buffer
   */
  __wrapAround(inBuffer) {
    var length = inBuffer.length + this.wrapAroundExtension * inBuffer.sampleRate,
      outBuffer = window.audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate),
      arrayChData, arrayOutChData;
    for (var channel = 0; channel < inBuffer.numberOfChannels; channel++) {
      arrayChData = inBuffer.getChannelData(channel);
      arrayOutChData = outBuffer.getChannelData(channel);
      _.forEach(arrayOutChData, function(sample, index) {
        if(index < inBuffer.length) arrayOutChData[index] = arrayChData[index];
        else arrayOutChData[index] = arrayChData[index-inBuffer.length];
      });
    }
    return outBuffer;
  }

}


class PolyLoader {

  constructor() {
    this.bufferLoader = new BufferLoader();
    this.loader = new Loader("json");
  }

  load(fileURLs = throwIfMissing(), wrapAroundExtension = 0) {
    if (Array.isArray(fileURLs)) {
      var i = -1;
      var pos = [
        [],
        []
      ]; // pos is used to track the positions of each fileURL
      var otherURLs = _.filter(fileURLs, function(url, index) {
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
      var audioURLs = _.difference(fileURLs, otherURLs);
      var promises = [];
      if (otherURLs.length > 0) promises.push(this.loader.load(otherURLs));
      if (audioURLs.length > 0) promises.push(this.bufferLoader.load(audioURLs, wrapAroundExtension));

      return new Promise((resolve, reject) => {
        Promise.all(promises).then(
          (datas) => {
            // Need to reorder and flatten all of this !
            // this is ugly
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

// CommonJS function export
module.exports = {
  Loader: Loader,
  BufferLoader: BufferLoader,
  PolyLoader: PolyLoader
};
