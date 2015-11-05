const test = require('tape');

import SuperLoader from '../src/super-loader';


const json = './tests/assets/test.json';
var polyLoader = new SuperLoader();
var synth = './tests/assets/guitar.wav';

test("SuperLoader - Should load correctly one single file", (assert) => {
  function onProgress(obj) {
    // Here we could test total loaded values
    //console.log(obj)
  }
  polyLoader.progressCallback = onProgress;
  polyLoader.load(json).then(
    function(file) {
      // should assert files are correct ...
      assert.end();
    }
  );
});

test("SuperLoader - Should load correctly audio files and json files", (assert) => {
  function onProgress(obj) {
    // Here we could test total loaded values
    //console.log(obj)
  }
  polyLoader.progressCallback = onProgress;
  polyLoader.load([json, synth, json, synth]).then(
    function(files) {
      assert.equal(files.length, 4);
      // should assert files are correct ...
      assert.end();
    },
    function(error) {
      console.log(error);
    }
  );
});

test("SuperLoader - Should load correctly one type of files (only jsons, or only audios)", (assert) => {
  var filesToLoad = [json, json];

  function onProgress(obj) {
    // Here we could test total loaded values
    //console.log(obj)
  }
  polyLoader.progressCallback = onProgress;
  polyLoader.load(filesToLoad).then(
    function(files) {
      assert.equal(files.length, 2);
      assert.end();
    },
    function(error) {
      console.log(error);
    }
  );
});
