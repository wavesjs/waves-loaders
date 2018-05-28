# `waves-loaders`

> module for loading WebAudio buffers (and other loading utilities).

## Installation

```
npm install [--save] waves-loaders
```

## Example

__loading one file__

```js
import * as loaders from 'waves-loaders';

const loader = new loaders.AudioBufferLoader();
loader.onProgress(progress => console.log(progress));
// { value:.., total:..., loaded:... }

async function init() {
  await buffer = loader.load('sound/file/url');
  // do something with `buffer`
}
```

__loading multiple files__

```js
import * as loaders from 'waves-loaders';

const loader = new loaders.AudioBufferLoader();

async function init() {
  await buffers = loader.load(['sound/file-1', 'sound/file-1']);
  // do something with `buffers[0]` and `buffers[1]`
}
```

## License

This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).

## Acknowledgments

This code is part of the [WAVE project](http://wave.ircam.fr), funded by ANR (The French National Research Agency), _ContInt_ program, 2012-2015.
