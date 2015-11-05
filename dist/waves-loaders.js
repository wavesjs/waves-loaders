/**
 * @file Loaders: AudioBuffer loader and utilities
 * @author Samuel Goldszmidt
 * @version 0.1.1
 */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _audioBufferLoader = require('./audio-buffer-loader');

var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);

var _superLoader = require('./super-loader');

var _superLoader2 = _interopRequireDefault(_superLoader);

exports['default'] = { Loader: _loader2['default'], AudioBufferLoader: _audioBufferLoader2['default'], SuperLoader: _superLoader2['default'] };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy93YXZlcy1sb2FkZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7c0JBS21CLFVBQVU7Ozs7aUNBQ0MsdUJBQXVCOzs7OzJCQUM3QixnQkFBZ0I7Ozs7cUJBRXpCLEVBQUUsTUFBTSxxQkFBQSxFQUFFLGlCQUFpQixnQ0FBQSxFQUFFLFdBQVcsMEJBQUEsRUFBRSIsImZpbGUiOiJzcmMvd2F2ZXMtbG9hZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTG9hZGVyczogQXVkaW9CdWZmZXIgbG9hZGVyIGFuZCB1dGlsaXRpZXNcbiAqIEBhdXRob3IgU2FtdWVsIEdvbGRzem1pZHRcbiAqIEB2ZXJzaW9uIDAuMS4xXG4gKi9cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi9sb2FkZXInO1xuaW1wb3J0IEF1ZGlvQnVmZmVyTG9hZGVyIGZyb20gJy4vYXVkaW8tYnVmZmVyLWxvYWRlcic7XG5pbXBvcnQgU3VwZXJMb2FkZXIgZnJvbSAnLi9zdXBlci1sb2FkZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7IExvYWRlciwgQXVkaW9CdWZmZXJMb2FkZXIsIFN1cGVyTG9hZGVyIH07Il19