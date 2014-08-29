var DP$0 = Object.defineProperty;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,Object.getOwnPropertyDescriptor(s,p));}}return t};/* written in ECMAscript 6 */
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

var Loader = (function(super$0){MIXIN$0(Loader, super$0);

  function Loader() {var responseType = arguments[0];if(responseType === void 0)responseType = "";
    super$0.call(this);
    this.responseType = responseType;
    this.progressCb = undefined;
  }Loader.prototype = Object.create(super$0.prototype, {"constructor": {"value": Loader, "configurable": true, "writable": true}, progressCallback: {"get": progressCallback$get$0, "set": progressCallback$set$0, "configurable": true, "enumerable": true} });DP$0(Loader, "prototype", {"configurable": false, "enumerable": false, "writable": false});

  /**
   * Main wrapper function for audio buffer loading.
   * Switch between loadOne and loadAll.
   * @public
   * @param fileURLs The URL(s) of the audio files to load. Accepts a URL to the audio file location or an array of URLs.
   */
  Loader.prototype.load = function() {var fileURLs = arguments[0];if(fileURLs === void 0)fileURLs = throwIfMissing();
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
  Loader.prototype.loadOne = function(fileURL) {
    return this.fileLoadingRequest(fileURL);
  }

  /**
   * Load all files at once in a single array
   * and return a Promise
   * @public
   * @param fileURLs The URLs array of the files to load.
   */
  Loader.prototype.loadAll = function(fileURLs) {
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
  Loader.prototype.fileLoadingRequest = function(url, index) {var this$0 = this;
    var promise = new Promise(
      function(resolve, reject)  {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.index = index;
        this$0.emit('xmlhttprequest', request);
        request.responseType = this$0.responseType;
        request.addEventListener('load', function() {
          // Test request.status value, as 404 will also get there
          if (request.status === 200 || request.status === 304) {
            resolve(request.response);
          } else {
            reject(new Error(request.statusText));
          }
        });
        request.addEventListener('progress', function(evt)  {
          if (this$0.progressCallback) {
            if (index !== undefined) {
              this$0.progressCallback({
                index: index,
                value: evt.loaded / evt.total
              });
            } else {
              this$0.progressCallback(evt.loaded / evt.total);
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
  function progressCallback$get$0() {
    return this.progressCb;
  }
  function progressCallback$set$0(callback) {
    this.progressCb = callback;
  }

;return Loader;})(events.EventEmitter);


var BufferLoader = (function(super$0){MIXIN$0(BufferLoader, super$0);

  function BufferLoader() {
    this.responseType = 'arraybuffer';
    this.wrapAroundExtension = 0;
  }BufferLoader.prototype = Object.create(super$0.prototype, {"constructor": {"value": BufferLoader, "configurable": true, "writable": true} });DP$0(BufferLoader, "prototype", {"configurable": false, "enumerable": false, "writable": false});

  BufferLoader.prototype.load = function() {var fileURLs = arguments[0];if(fileURLs === void 0)fileURLs = throwIfMissing();var wrapAroundExtension = arguments[1];if(wrapAroundExtension === void 0)wrapAroundExtension = 0;
    this.wrapAroundExtension = wrapAroundExtension;
    return super$0.prototype.load.call(this, fileURLs);
  }

  /**
   * Load a single audio file,
   * decode it in an AudioBuffer, return a Promise
   * @public
   * @param fileURL The URL of the audio file location to load.
   */
  BufferLoader.prototype.loadOne = function(fileURL) {
    return super$0.prototype.loadOne.call(this, fileURL)
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
  BufferLoader.prototype.loadAll = function(fileURLs) {var this$0 = this;
    return super$0.prototype.loadAll.call(this, fileURLs)
      .then(
        function(arraybuffers)  {
          return Promise.all(arraybuffers.map(function(arraybuffer)  {
            return this$0.decodeAudioData.bind(this$0)(arraybuffer);
          }));
        }, function(error)  {
          throw error; // TODO: better error handler
        });
  }

  /**
   * Decode Audio Data, return a Promise
   * @private
   * @param arraybuffer The arraybuffer of the loaded audio file to be decoded.
   */
  BufferLoader.prototype.decodeAudioData = function(arraybuffer) {var this$0 = this;
    return new Promise(function(resolve, reject)  {
      window.audioContext.decodeAudioData(
        arraybuffer, // returned audio data array
        function(buffer)  {
          if (this$0.wrapAroundExtension === 0) resolve(buffer);
          else resolve(this$0.__wrapAround(buffer));
        }, function(error)  {
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
  BufferLoader.prototype.__wrapAround = function(inBuffer) {
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

;return BufferLoader;})(Loader);


var PolyLoader = (function(){

  function PolyLoader() {
    this.bufferLoader = new BufferLoader();
    this.loader = new Loader("json");
  }DP$0(PolyLoader, "prototype", {"configurable": false, "enumerable": false, "writable": false});

  PolyLoader.prototype.load = function() {var fileURLs = arguments[0];if(fileURLs === void 0)fileURLs = throwIfMissing();var wrapAroundExtension = arguments[1];if(wrapAroundExtension === void 0)wrapAroundExtension = 0;
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

      return new Promise(function(resolve, reject)  {
        Promise.all(promises).then(
          function(datas)  {
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
          }, function(error)  {
            throw error;
          });
      });
    }
  }

;return PolyLoader;})();

// CommonJS function export
module.exports = {
  Loader: Loader,
  BufferLoader: BufferLoader,
  PolyLoader: PolyLoader
};
