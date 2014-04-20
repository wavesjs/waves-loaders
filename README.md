# Buffer loader module

> WAVE audio library module for buffer loading.

The `bufferLoader` object provides several sound file loading methods:

- `load`
- `loadBuffer`
- `loadAll`


## Example

Requirement : q.js (https://github.com/kriskowal/q)

Load q.js and buffer-loader.js (for instance in your html file by using <script src="q.js"></script> and <script src="buffer-loader.js"></script>)


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
        // catch an error during loading process, or decodeAudioData
      }
  );

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
