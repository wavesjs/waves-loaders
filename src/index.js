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


class Loader extends events.EventEmitter {

  constructor() {
    super();
    this.responseType = "";
    this.progressCb = undefined;
  }

  /**
   * Main wrapper function for audio buffer loading.
   * Switch between loadOne and loadAll.
   * @public
   * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
   */
  load(fileURLs) {
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
        request.responseType = this.responseType; // "arraybuffer";
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
    this.overlap = 0;
  }

  load(fileURLs, overlap = 0) {
    this.overlap = overlap;
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
    var promise = new Promise((resolve, reject) => {
      window.audioContext.decodeAudioData(
        arraybuffer, // returned audio data array
        (buffer) => {
          if (this.overlap == 0) {
            resolve(buffer);
          } else {
            // We copy the begining of the buffer (overlap in seconds)
            // to the end of the buffer we will return
            var length = buffer.length + this.overlap * buffer.sampleRate,
              outBuffer = window.audioContext.createBuffer(buffer.numberOfChannels, length, buffer.sampleRate),
              i, channel, arrayChData, arrayOutChData;
            for (channel = 0; channel < buffer.numberOfChannels; channel++) {
              arrayChData = buffer.getChannelData(channel);
              arrayOutChData = outBuffer.getChannelData(channel);
              for (i = 0; i < buffer.length; i++) {
                arrayOutChData[i] = arrayChData[i];
              }
              for (i = buffer.length; i < length; i++) {
                arrayOutChData[i] = arrayChData[i - buffer.length];
              }
            }
            resolve(outBuffer);
          }
        }, (error) => {
          reject(new Error("DecodeAudioData error"));
        }
      );
    });
    return promise;
  }

}


class PolyLoader {

  constructor() {
    this.bufferLoader = new BufferLoader();
    this.loader = new Loader();
  }

  load(fileURLs, overlap = 0) {
    var i = -1;
    var pos = [[], []]; // used to track the positions of each fileURL
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
    if (audioURLs.length > 0) promises.push(this.bufferLoader.load(audioURLs, overlap));

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(
        (datas) => {
          // Need to reorder and flatten all of this !
          // this is ugly
          if (datas.length === 1) {
            resolve(datas[0])
          } else {
            var outData = [];
            for(var j = 0; j<pos.length; j++){
              for(var k = 0; k<pos[j].length; k++){
                outData[pos[j][k]] = datas[j][k]
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

// CommonJS function export
module.exports = {
  BufferLoader: BufferLoader,
  PolyLoader: PolyLoader,
  Loader: Loader
};
