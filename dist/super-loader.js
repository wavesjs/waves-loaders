'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _audioBufferLoader = require('./audio-buffer-loader');

var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);

/**
 * SuperLoader
 * Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */

var SuperLoader = (function (_AudioBufferLoader) {
  /**
   * Use composition to setup appropriate file loaders
   */

  function SuperLoader() {
    _classCallCheck(this, SuperLoader);

    _get(Object.getPrototypeOf(SuperLoader.prototype), 'constructor', this).call(this, null);
    // bypass AudioBufferLoader constructor. This is bad but it works.
  }

  _inherits(SuperLoader, _AudioBufferLoader);

  return SuperLoader;
})(_audioBufferLoader2['default']);

exports['default'] = SuperLoader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9zdXBlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztpQ0FBOEIsdUJBQXVCOzs7Ozs7Ozs7SUFPaEMsV0FBVzs7Ozs7QUFJbkIsV0FKUSxXQUFXLEdBSWhCOzBCQUpLLFdBQVc7O0FBSzVCLCtCQUxpQixXQUFXLDZDQUt0QixJQUFJLEVBQUU7O0dBRWI7O1lBUGtCLFdBQVc7O1NBQVgsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiZXM2L3N1cGVyLWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdWRpb0J1ZmZlckxvYWRlciBmcm9tICcuL2F1ZGlvLWJ1ZmZlci1sb2FkZXInO1xuXG5cbi8qKlxuICogU3VwZXJMb2FkZXJcbiAqIEhlbHBlciB0byBsb2FkIG11bHRpcGxlIHR5cGUgb2YgZmlsZXMsIGFuZCBnZXQgdGhlbSBpbiB0aGVpciB1c2VmdWwgdHlwZSwganNvbiBmb3IganNvbiBmaWxlcywgQXVkaW9CdWZmZXIgZm9yIGF1ZGlvIGZpbGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBlckxvYWRlciBleHRlbmRzIEF1ZGlvQnVmZmVyTG9hZGVyIHtcbiAgLyoqXG4gICAqIFVzZSBjb21wb3NpdGlvbiB0byBzZXR1cCBhcHByb3ByaWF0ZSBmaWxlIGxvYWRlcnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKG51bGwpO1xuICAgIC8vIGJ5cGFzcyBBdWRpb0J1ZmZlckxvYWRlciBjb25zdHJ1Y3Rvci4gVGhpcyBpcyBiYWQgYnV0IGl0IHdvcmtzLlxuICB9XG59XG4iXX0=