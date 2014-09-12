## loaders

> AudioBuffer loader and other loader utilities module

### Example

Load loaders.js (or the minified version) in your html file by using:

```html
    <script src="loaders.min.js"></script>
```

```js
  // We need an audio context to decode the file
  // By default, buffer-loader search for audioContext in the window.
  var audioContext = new AudioContext();

  // Load the file passing the path
  var myAudioBufferLoader = new loaders.AudioBufferLoader();
  AudioBufferLoader.progressCallback = function(val){
    // Do something with the progress value
  }
  AudioBufferLoader.load('sound/file/url').then(
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

### Tests

If gulp is not installed

```bash
$ npm install -g gulp
```

Install all dependencies in the module folder

```bash
$ npm install
```

Run the test suite

```bash
$ mocha tests/tests.js
```

Generate the coverage report

```bash
mocha -r blanket -R html-cov > coverage.html tests/tests.js
```

### Usage
Read the API documentation [here](https://github.com/Ircam-RnD/loaders/blob/master/docs/api.md)

### Status

This library is under heavy development and subject to change.  
Every new API breaking change we will be adding snapshots to the repository so you can always fetch a working copy.

## License
This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments
This code is part of the [WAVE project](http://wave.ircam.fr),  
funded by ANR (The French National Research Agency),  
_ContInt_ program,  
2012-2015.
