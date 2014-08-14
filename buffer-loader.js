!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BufferLoader=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileOverview
 * Audio buffer loader.
 * @author Karim Barkati, Victor Saiz, Emmanuel Fréard, Samuel Goldszmidt
 * @version 4.0.0
 */

'use strict';

_dereq_("audio-context"); //make an AudioContext instance globally available
_dereq_("native-promise-only");

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

},{"audio-context":2,"native-promise-only":3}],2:[function(_dereq_,module,exports){
/* Generated by es6-transpiler v 0.7.14-2 */
// instantiates an audio context in the global scope if not there already
var context = window.audioContext || new AudioContext();
window.audioContext = context;
module.exports = context;
},{}],3:[function(_dereq_,module,exports){
(function (global){
/*! Native Promise Only
    v0.7.6-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return s(a,"prototype",g,!1),s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])
(1)
});