var assert = require('chai').assert;

describe('Tests', () => {
    it('', () => {
        var a = Person('a');
        var b = new Person('b');
        var c = Person;

        function Person(name) {
            this.first_name = name;
        }

        var expectedA = undefined;
        var expectedB = undefined;
        var expectedC = undefined;

        // assert(a && a.first_name === expectedA, '');
        // assert(b && b.first_name === expectedB, '');
        a = b;
        // assert(c && c.first_name === expectedC, '');
    });
});