var assert = require('chai').assert;

describe('Tests', () => {
    it('', () => {
        var a = Person('a');
        var b = new Person('b');
        var c = Person;

        function Person(name) {
            this.first_name = name;
        }

        // assert(a.first_name === 'a', '');
        // assert(b.first_name === 'b', '');
        // assert(c.first_name === '', '');
    });
});