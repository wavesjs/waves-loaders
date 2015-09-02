'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _audioBufferLoader = require('./audio-buffer-loader');

/**
 * SuperLoader
 * @class
 * @classdesc Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */

var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);

var SuperLoader = (function (_AudioBufferLoader) {
  _inherits(SuperLoader, _AudioBufferLoader);

  /**
   * @constructs
   * Use composition to setup appropriate file loaders
   */

  function SuperLoader() {
    _classCallCheck(this, SuperLoader);

    _get(Object.getPrototypeOf(SuperLoader.prototype), 'constructor', this).call(this, null);
    // bypass AudioBufferLoader constructor. This is bad but it works.
  }

  return SuperLoader;
})(_audioBufferLoader2['default']);

exports['default'] = SuperLoader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9zdXBlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7aUNBQThCLHVCQUF1Qjs7Ozs7Ozs7OztJQVFoQyxXQUFXO1lBQVgsV0FBVzs7Ozs7OztBQUtuQixXQUxRLFdBQVcsR0FLaEI7MEJBTEssV0FBVzs7QUFNNUIsK0JBTmlCLFdBQVcsNkNBTXRCLElBQUksRUFBRTs7R0FFYjs7U0FSa0IsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiZXM2L3N1cGVyLWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdWRpb0J1ZmZlckxvYWRlciBmcm9tICcuL2F1ZGlvLWJ1ZmZlci1sb2FkZXInO1xuXG5cbi8qKlxuICogU3VwZXJMb2FkZXJcbiAqIEBjbGFzc1xuICogQGNsYXNzZGVzYyBIZWxwZXIgdG8gbG9hZCBtdWx0aXBsZSB0eXBlIG9mIGZpbGVzLCBhbmQgZ2V0IHRoZW0gaW4gdGhlaXIgdXNlZnVsIHR5cGUsIGpzb24gZm9yIGpzb24gZmlsZXMsIEF1ZGlvQnVmZmVyIGZvciBhdWRpbyBmaWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwZXJMb2FkZXIgZXh0ZW5kcyBBdWRpb0J1ZmZlckxvYWRlciB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0c1xuICAgKiBVc2UgY29tcG9zaXRpb24gdG8gc2V0dXAgYXBwcm9wcmlhdGUgZmlsZSBsb2FkZXJzXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihudWxsKTtcbiAgICAvLyBieXBhc3MgQXVkaW9CdWZmZXJMb2FkZXIgY29uc3RydWN0b3IuIFRoaXMgaXMgYmFkIGJ1dCBpdCB3b3Jrcy5cbiAgfVxufVxuIl19