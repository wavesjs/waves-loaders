

<!-- Start ./src/index.js -->

written in ECMAscript 6

Author: Samuel Goldszmidt

Version: 0.1.1

## throwIfMissing()

Gets called if a parameter is missing and the expression
specifying the default value is evaluated.

# Loader

Promise based implementation of XMLHttpRequest Level 2 for GET method.

## constructor([responseType=""])

### Params: 

* **string** *[responseType=""]* - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"

## load(fileURLs)

Method for a promise based file loading.
Internally switch between loadOne and loadAll.

### Params: 

* **(string|string[])** *fileURLs* - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.

### Return:

* **Promise** 

## progressCallback

Get the callback function to get the progress of file loading process.
This is only for the file loading progress as decodeAudioData doesn't
expose a decode progress value.

### Return:

* **Loader~progressCallback** 

## progressCallback(callback)

Set the callback function to get the progress of file loading process.
This is only for the file loading progress as decodeAudioData doesn't
expose a decode progress value.

### Params: 

* **Loader~progressCallback** *callback* - The callback that handles the response.

# AudioBufferLoader

Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer. Inherit from Loader class

## constructor()

## load(fileURLs, number}})

Method for promise audio file loading and decoding.

### Params: 

* **(string|string[])** *fileURLs* - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
* **wrapAroundExtension:** *number}}* [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer

### Return:

* **Promise** 

# SuperLoader

Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.

## constructor()

## load(fileURLs, number}})

Method for promise audio and json file loading (and decoding for audio).

### Params: 

* **(string|string[])** *fileURLs* - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
* **wrapAroundExtension:** *number}}* [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer

### Return:

* **Promise** 

<!-- End ./src/index.js -->

