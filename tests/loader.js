const test = require('tape');

import Loader from '../src/loader';


const json = './tests/assets/test.json';

test("Loader loads JSON file with a Promise", (assert) => {
    var loader = new Loader('json');
    loader.load(json).then(function(json) {
        assert.equal(json.foo, 'bar');
        assert.end();
    }, function(error) {});
});
