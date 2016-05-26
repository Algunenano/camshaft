'use strict';

var assert = require('assert');
var nodes = require('../../../lib/node');

describe('filter-category', function() {

    var column = 'wadus_column';
    var source = new nodes.Source({query: 'select * from table'});

    it('should work with accept array param', function() {
        var filterCategory = new nodes.FilterCategory({ source: source, column: column, accept: ['accept_val'] });

        assert.equal(filterCategory.column, column);
        assert.deepEqual(filterCategory.accept, ['accept_val']);
        assert.equal(filterCategory.reject, null);
    });

    it('should work with reject array param', function() {
        var filterCategory = new nodes.FilterCategory({ source: source, column: column, reject: ['reject_val'] });

        assert.equal(filterCategory.column, column);
        assert.deepEqual(filterCategory.reject, ['reject_val']);
        assert.equal(filterCategory.accept, null);
    });

    it('should fail when min and max are not provided', function() {
        var filterCategory;

        assert.throws(
            function() {
                filterCategory = new nodes.FilterCategory({ source: source, column: column });
            },
            function(err) {
                assert.equal(err.message, 'Category filter expects at least one array in accept or reject params');
                return true;
            }
        );
    });

});
