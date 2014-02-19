# Buffer loader

Buffer loader object that provides several loading methods of sound files via Ajax:

1.  and returns an audiobuffer to a callback function.


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
