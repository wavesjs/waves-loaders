## waves-loaders

> AudioBuffer loader and other loader utilities module

### Installation

```shell
npm install [--save] waves-js/waves-loaders
```

### Example

```js
import * as loaders from 'waves-loaders';

// load the file passing the path
const myAudioBufferLoader = new loaders.AudioBufferLoader();

myAudioBufferLoader.onProgress((obj) => {
  // do something with the progress value obj
  // obj: { value:.., total:..., loaded:... }
  // value is loaded/total
});

myAudioBufferLoader.load('sound/file/url')
  .then((buffer) => {
    // do something with the loaded audio buffer
  }).catch((err) => console.error(err.stack));
```

Use the same `load` method to load multiple files, by passing
an array of urls `['url/to/file1', 'url/to/file2', ...]`.
The progress is then an object, eg. `{ index: 4, value: 0.2, total:999, loaded:1}`, where index corresponds to the file index in the array of files,
and value, between 0.0 and 1, corresponds to the file loading progress.

## License
This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code is part of the [WAVE project](http://wave.ircam.fr), funded by ANR (The French National Research Agency), _ContInt_ program, 2012-2015.
