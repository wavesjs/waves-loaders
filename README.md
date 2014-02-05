# Buffer loader

Simple buffer loader library that loads a sound file via ajaz and returns an audiobuffer to a callback.

## Usage

```
  // we need an audio context to decode the file
  var audioContext = new webkitAudioContext();

  // load the file passing the context, path and callback
  bufferLoader.load(audioContext, 'snd/bach.mp3', function(buffer){
    // do something here with your buffer

    console.log(buffer)
  });
```
