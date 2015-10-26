import AudioBufferLoader from './audio-buffer-loader';


/**
 * SuperLoader
 * Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */
export default class SuperLoader extends AudioBufferLoader {
  /**
   * Use composition to setup appropriate file loaders
   */
  constructor() {
    super(null);
    // bypass AudioBufferLoader constructor. This is bad but it works.
  }
}
