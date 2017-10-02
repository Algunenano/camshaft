'use strict';

var assert = require('assert');
var Source = require('../../../lib/node/nodes/source');
var FilterRange = require('../../../lib/node/nodes/filter-range');

describe('filter-range', function() {

    var owner = 'localhost';
    var column = 'wadus_column';
    var source = new Source(owner, {query: 'select * from table'});

    it('should work with minOrEqual param', function() {
        var filterRange = new FilterRange(owner, { source: source, column: column, minOrEqual: 100 });

        assert.equal(filterRange.column, column);
        assert.equal(filterRange.minOrEqual, 100);
        assert.equal(filterRange.maxOrEqual, null);
        assert.equal(filterRange.min, null);
        assert.equal(filterRange.max, null);
    });

    it('should work with maxOrEqual param', function() {
        var filterRange = new FilterRange(owner, { source: source, column: column, maxOrEqual: 100 });

        assert.equal(filterRange.column, column);
        assert.equal(filterRange.minOrEqual, null);
        assert.equal(filterRange.maxOrEqual, 100);
        assert.equal(filterRange.min, null);
        assert.equal(filterRange.max, null);
    });

    it('should work with min param', function() {
        var filterRange = new FilterRange(owner, { source: source, column: column, min: 100 });

        assert.equal(filterRange.column, column);
        assert.equal(filterRange.minOrEqual, null);
        assert.equal(filterRange.maxOrEqual, null);
        assert.equal(filterRange.min, 100);
        assert.equal(filterRange.max, null);
    });

    it('should work with max param', function() {
        var filterRange = new FilterRange(owner, { source: source, column: column, max: 10000 });

        assert.equal(filterRange.column, column);
        assert.equal(filterRange.minOrEqual, null);
        assert.equal(filterRange.maxOrEqual, null);
        assert.equal(filterRange.min, null);
        assert.equal(filterRange.max, 10000);
    });

    it('should fail when minOrEqual, maxOrEqual, min, and max are not provided', function() {
        var filterRange;

        assert.throws(
            function() {
                filterRange = new FilterRange(owner, { source: source, column: column });
            },
            function(err) {
                assert.equal(
                    err.message,
                    'Range filter expect to have at least one value in minOrEqual, maxOrEqual, min, or max numeric params'
                );
                return true;
            }
        );
    });

});
