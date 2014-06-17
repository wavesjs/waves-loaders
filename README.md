# Buffer loader module

> WAVE audio library module for buffer loading.

The `bufferLoader` object provides several sound file loading methods:

- `load`
- `loadBuffer`
- `loadAll`

## Example

Load buffer-loader.js (or the minified version) in your html file by using:

```html
    <script src="buffer-loader.min.js"></script>
```

```js
  // We need an audio context to decode the file
  // By default, buffer-loader search for audioContext in the window.
  var audioContext = new AudioContext();

  // Load the file passing the path
  var myBufferLoader = createBufferLoader();
  myBufferLoader.progressCallback = function(val){
    // Do something with the progress value
  }
  myBufferLoader.load('sound/file/url').then(
      function(buffer){
        // Do something with the loaded audio buffer
      },
      function(error){
        // Catch an error during the loading or decodeAudioData process
      }
  );

```

Use the same ```load``` method to load multiple files, by passing
an array of urls ['url/to/file1', 'url/to/file2', ...].
The progress is then an object, eg. {index: 4, value: 0.2},
where index corresponds to the file index in the array of files,
and value, between 0.0 and 1, corresponds to the file loading progress.


## API

The `bufferLoader` object exposes the following API:

Method | Description
--- | ---
`bufferLoader.load(fileURLs)` | Main wrapper function for loading. Switch between `loadBuffer` for a single path and `loadAll` for an array of paths, and return a Promise.
`bufferLoader.loadBuffer(fileURL)` | Load a single audio file, decode it in an AudioBuffer and return a Promise.
`bufferLoader.loadAll(fileURLs)` | Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.

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
