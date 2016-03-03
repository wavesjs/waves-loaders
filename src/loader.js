/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}


/**
 * Promise based implementation of XMLHttpRequest Level 2 for GET method.
 */
export default class Loader {
  /**
   * @constructs
   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
   */
  constructor(responseType = undefined) {
    /**
     * @type {string}
     */
    this.responseType = responseType;
    // rename to `onProgress` ?
    /**
     * @type {function}
     */
    this.progressCb = undefined;
  }

  /**
   * Method for a promise based file loading.
   * Internally switch between loadOne and loadAll.
   * @public
   * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
   * @returns {Promise}
   */
  load(fileURLs = throwIfMissing()) {
    if (fileURLs === undefined) throw (new Error('load needs at least a url to load'));
    if (Array.isArray(fileURLs)) {
      return this.loadAll(fileURLs);
    } else {
      return this.loadOne(fileURLs);
    }
  }

  /**
   * Load a single file
   * @private
   * @param {string} fileURL - The URL of the file to load.
   * @returns {Promise}
   */
  loadOne(fileURL) {
    return this.fileLoadingRequest(fileURL);
  }

  /**
   * Load all files at once in a single array and return a Promise
   * @private
   * @param {string[]} fileURLs - The URLs array of the files to load.
   * @returns {Promise}
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
   * @param {string} url - The URL of the file to load
   * @param {string} [index] - The index of the file in the array of files to load
   * @returns {Promise}
   */
  fileLoadingRequest(url, index) {
    var promise = new Promise(
      (resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.index = index;
        if (this.responseType) {
          request.responseType = this.responseType;
        } else {
          var suffix = '.json';
          if (url.indexOf(suffix, this.length - suffix.length) !== -1) {
            request.responseType = 'json';
          } else {
            request.responseType = 'arraybuffer';
          }
        }
        request.addEventListener('load', function() {
          // Test request.status value, as 404 will also get there
          // Test request.status === 0 for cordova internal ajax calls
          if (request.status === 200 || request.status === 304 || request.status === 0) {
            // Hack for iOS 7, to remove as soon as possible
            if (this.responseType === 'json' && typeof(request.response) === 'string') {
              request.response = JSON.parse(request.response);
            }
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
                value: evt.loaded / evt.total,
                loaded: evt.loaded,
                total: evt.total
              });
            } else {
              this.progressCallback({
                value: evt.loaded / evt.total,
                loaded: evt.loaded,
                total: evt.total
              });
            }
          }
        });
        // Manage network errors
        request.addEventListener('error', function() {
          reject(new Error('Network Error'));
        });

        request.send();
      });
    return promise;
  }

  /**
   * Get the callback function to get the progress of file loading process.
   * This is only for the file loading progress as decodeAudioData doesn't
   * expose a decode progress value.
   * @type {function}
   */
  get progressCallback() {
    return this.progressCb;
  }

  /**
   * Set the callback function to get the progress of file loading process.
   * This is only for the file loading progress as decodeAudioData doesn't
   * expose a decode progress value.
   * @type {function} callback - The callback that handles the response.
   */
  set progressCallback(callback) {
    this.progressCb = callback;
  }
}
