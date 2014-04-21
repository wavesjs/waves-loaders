# Buffer loader module

> WAVE audio library module for buffer loading.

The `bufferLoader` object provides several sound file loading methods:

- `load`
- `loadBuffer`
- `loadAll`

## Requirements

- [Q](https://github.com/kriskowal/q) version 1.0.x - [a Promise implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Example

Load q.js and buffer-loader.js, for instance in your html file by using:

```html
    <script src="q.js"></script>
    <script src="buffer-loader.min.js"></script>
```

```js
  // we need an audio context to decode the file
  var audioContext = new AudioContext();

  // load the file passing the path
  var myBufferLoader = createBufferLoader();
  myBufferLoader.load('sound/file/path').then(
      function(buffer){
        // do something with the loaded audio buffer
      },
      function(error){
        // catch an error during loading or decodeAudioData process
      },
      function(progress){
        // do something with the progress value, value between 0.0 and 1
      }
  );

  // same method for loading multiple files
  // except that the progress is this time an object which has an index key corresponding to the file index in the array passed to load,
  // and a value key, same value as for single file loading, between 0.0 and 1, corresponding to the file loading progress.

```

## API

The `bufferLoader` object exposes the following API:

Method | Description
--- | ---
`bufferLoader.load(fileURLs)` | Main wrapper function for loading. Switch between `loadBuffer` for a single path and `loadAll` for an array of paths, and returns a Promise.
`bufferLoader.loadBuffer(fileURL)` | Load a single audio file, decode it in an AudioBuffer and returns a Promise.
`bufferLoader.loadAll(fileURLs)` | Load all audio files at once in a single array, decode them in an array of AudioBuffers, and returns a Promise.

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
