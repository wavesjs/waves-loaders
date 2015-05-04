var AudioBufferLoader = require('./audio-buffer-loader');

/**
 * SuperLoader
 * @class
 * @classdesc Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */
class SuperLoader extends AudioBufferLoader {

  /**
   * @constructs
   * Use composition to setup appropriate file loaders
   */
  constructor() {
    // bypass AudioBufferLoader constructor. This is bad but it works.
  }



}

module.exports = SuperLoader;
