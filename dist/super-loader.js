"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var AudioBufferLoader = require("./audio-buffer-loader");

/**
 * SuperLoader
 * @class
 * @classdesc Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */

var SuperLoader = (function (_AudioBufferLoader) {

  /**
   * @constructs
   * Use composition to setup appropriate file loaders
   */

  function SuperLoader() {
    _classCallCheck(this, SuperLoader);
  }

  _inherits(SuperLoader, _AudioBufferLoader);

  return SuperLoader;
})(AudioBufferLoader);

module.exports = SuperLoader;

// bypass AudioBufferLoader constructor. This is bad but it works.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9zdXBlci1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7Ozs7Ozs7SUFPbkQsV0FBVzs7Ozs7OztBQU1KLFdBTlAsV0FBVyxHQU1EOzBCQU5WLFdBQVc7R0FRZDs7WUFSRyxXQUFXOztTQUFYLFdBQVc7R0FBUyxpQkFBaUI7O0FBYzNDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImVzNi9zdXBlci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXVkaW9CdWZmZXJMb2FkZXIgPSByZXF1aXJlKCcuL2F1ZGlvLWJ1ZmZlci1sb2FkZXInKTtcblxuLyoqXG4gKiBTdXBlckxvYWRlclxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIEhlbHBlciB0byBsb2FkIG11bHRpcGxlIHR5cGUgb2YgZmlsZXMsIGFuZCBnZXQgdGhlbSBpbiB0aGVpciB1c2VmdWwgdHlwZSwganNvbiBmb3IganNvbiBmaWxlcywgQXVkaW9CdWZmZXIgZm9yIGF1ZGlvIGZpbGVzLlxuICovXG5jbGFzcyBTdXBlckxvYWRlciBleHRlbmRzIEF1ZGlvQnVmZmVyTG9hZGVyIHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdHNcbiAgICogVXNlIGNvbXBvc2l0aW9uIHRvIHNldHVwIGFwcHJvcHJpYXRlIGZpbGUgbG9hZGVyc1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gYnlwYXNzIEF1ZGlvQnVmZmVyTG9hZGVyIGNvbnN0cnVjdG9yLiBUaGlzIGlzIGJhZCBidXQgaXQgd29ya3MuXG4gIH1cblxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBlckxvYWRlcjtcbiJdfQ==