## `waves-loaders`

> module for loading `AudioBuffer` and other loading utilities.

### Installation

```
npm install [--save] waves-loaders
```

### Example

```js
import * as loaders from 'waves-loaders';

const loader = new loaders.AudioBufferLoader();
loader.onProgress(progress => { /* { value:.., total:..., loaded:... } */ });

async function init() {
  await buffer = loader.load('sound/file/url');
  // do something with `buffer`
}
```

Use the same `load` method to load multiple files, by passing
an array of urls `['url/to/file1', 'url/to/file2', ...]`.
The progress is then an object, eg. `{ index: 4, value: 0.2, total:999, loaded:1}`, where index corresponds to the file index in the array of files,
and value, between 0.0 and 1, corresponds to the file loading progress.

## License

This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code is part of the [WAVE project](http://wave.ircam.fr), funded by ANR (The French National Research Agency), _ContInt_ program, 2012-2015.
