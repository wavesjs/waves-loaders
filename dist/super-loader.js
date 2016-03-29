'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _audioBufferLoader = require('./audio-buffer-loader');

var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SuperLoader
 * Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */

var SuperLoader = function (_AudioBufferLoader) {
  (0, _inherits3.default)(SuperLoader, _AudioBufferLoader);

  /**
   * Use composition to setup appropriate file loaders
   */

  function SuperLoader() {
    (0, _classCallCheck3.default)(this, SuperLoader);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SuperLoader).call(this, null));
    // bypass AudioBufferLoader constructor. This is bad but it works.
  }

  return SuperLoader;
}(_audioBufferLoader2.default);

exports.default = SuperLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cGVyLWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0lBT3FCOzs7Ozs7O0FBSW5CLFdBSm1CLFdBSW5CLEdBQWM7d0NBSkssYUFJTDt3RkFKSyx3QkFLWDs7QUFETSxHQUFkOztTQUptQiIsImZpbGUiOiJzdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXVkaW9CdWZmZXJMb2FkZXIgZnJvbSAnLi9hdWRpby1idWZmZXItbG9hZGVyJztcblxuXG4vKipcbiAqIFN1cGVyTG9hZGVyXG4gKiBIZWxwZXIgdG8gbG9hZCBtdWx0aXBsZSB0eXBlIG9mIGZpbGVzLCBhbmQgZ2V0IHRoZW0gaW4gdGhlaXIgdXNlZnVsIHR5cGUsIGpzb24gZm9yIGpzb24gZmlsZXMsIEF1ZGlvQnVmZmVyIGZvciBhdWRpbyBmaWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwZXJMb2FkZXIgZXh0ZW5kcyBBdWRpb0J1ZmZlckxvYWRlciB7XG4gIC8qKlxuICAgKiBVc2UgY29tcG9zaXRpb24gdG8gc2V0dXAgYXBwcm9wcmlhdGUgZmlsZSBsb2FkZXJzXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihudWxsKTtcbiAgICAvLyBieXBhc3MgQXVkaW9CdWZmZXJMb2FkZXIgY29uc3RydWN0b3IuIFRoaXMgaXMgYmFkIGJ1dCBpdCB3b3Jrcy5cbiAgfVxufVxuIl19