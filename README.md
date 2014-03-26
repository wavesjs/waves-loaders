# Buffer loader module

> WAVE audio library module for buffer loading.

The `bufferLoader` object provides several sound file loading methods:

- `load`
- `loadBuffer`
- `loadEach`
- `loadAll`


## Example

```js
  // we need an audio context to decode the file
  var audioContext = new AudioContext();

  // load the file passing the path, callback and context
  bufferLoader.load('sound/file/path', onLoaded, audioContext);

  // do something with the loaded audio buffer
  function onLoaded(buffer){
    console.log(buffer)
  };
```

## API

The `bufferLoader` object exposes the following API:

Method | Description
--- | ---
 `bufferLoader.load(fileURLs, callback, audioContext)` | Main wrapper function for loading. Switch between `loadBuffer` for a single path and `loadAll` for an array of paths; `loadEach` has to be called explicitely.
`bufferLoader.loadBuffer(fileURL, callback, audioContext)` | Load a single audio file, decode it in an AudioBuffer and pass it to the callback (`callback(buffer)`).
`bufferLoader.loadEach(fileURLs, callback, audioContext)` | Load each audio file asynchronously, decode it in an AudioBuffer, and execute the callback for each right after its decoding (`callback(buffer)`).
`bufferLoader.loadAll(fileURLs, callback, audioContext)` | Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a single callback when all loadings finished (`callback(buffersArray)`).

## Tests

If grunt is not installed

```bash
$ npm install -g grunt-cli
```

Install all depencies in the module folder 

```bash
$ npm install
```

Run the server on 9001 port (you can change the port in the Grunfile.js)

```bash
$ grunt test
```

Run the test via the web browser on `http://localhost:9001/tests`

## License

This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code is part of the WAVE project (http://wave.ircam.fr), funded by ANR (The French National Research Agency), *ContInt* program, 2012-2015.
