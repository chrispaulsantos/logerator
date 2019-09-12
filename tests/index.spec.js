const logerator = require('../lib');

const decorate = logerator.log();

const TestClass = function() {}
TestClass.prototype.testFunction = function() {}

describe('Test Suite', () => {
    /**
     * @type {TestClass}
     */
    let testClass;

    beforeAll(() => {
        decorate(TestClass);
        testClass = new TestClass();
    });

    it('Should be a function', () => {
        expect(logerator.log).toBeInstanceOf(Function);
    });

    it('Should do something', () => {
        testClass.testFunction();
        expect(true).toBeTruthy();
    })
});