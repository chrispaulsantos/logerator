const logerator = require('../lib');

let consoleOutput = '';
let mockConsoleLog = function(msg) {
    consoleOutput += `${msg}\n`;
};
const decorator = logerator.log({ logFunction: mockConsoleLog });

describe('logerator.log.class', () => {
    class TestClass {
        testFunction() {}
        testFunctionWithInput(val) {
            return val;
        }
        testFunctionWithPromiseResolve() {
            return Promise.resolve(true);
        }
        testFunctionWithPromiseReject() {
            return Promise.reject(false);
        }
    }

    /**
     * @type {TestClass}
     */
    let testClass;

    beforeEach(() => {
        consoleOutput = '';
    });

    beforeAll(() => {
        decorator(TestClass);
        testClass = new TestClass();
    });

    it('Should be a function', () => {
        expect(logerator.log).toBeInstanceOf(Function);
    });

    it('Should do call console log', () => {
        const expected = `START: TestClass.testFunction()\n---- RESULT ----\nundefined\nEND: TestClass.testFunction()\n`;

        testClass.testFunction();

        expect(consoleOutput).toBe(expected);
    });

    it('Should do call console log with return', () => {
        const expected = `START: TestClass.testFunctionWithInput()\n---- RESULT ----\n5\nEND: TestClass.testFunctionWithInput()\n`;

        testClass.testFunctionWithInput(5);

        expect(consoleOutput).toBe(expected);
    });

    it('Should do call console log with promise resolve', done => {
        const expected = `START: TestClass.testFunctionWithPromiseResolve()\n---- RESOLVE ----\ntrue\nEND: TestClass.testFunctionWithPromiseResolve()\n`;

        testClass.testFunctionWithPromiseResolve().then(() => {
            expect(consoleOutput).toBe(expected);
            done();
        });
    });

    it('Should do call console log with promise reject', done => {
        const expected = `START: TestClass.testFunctionWithPromiseReject()\n---- REJECT ----\nfalse\nEND: TestClass.testFunctionWithPromiseReject()\n`;

        testClass.testFunctionWithPromiseReject().catch(() => {
            expect(consoleOutput).toBe(expected);
            done();
        });
    });
});

describe('logerator.log.method', () => {
    it('something', () => {
        const fn = function() {};
        decorator(fn);

        fn();
        expect(true).toBeTruthy();
    });
});

describe('logerator.configure', () => {
    it('Should be a function', () => {
        expect(logerator.configure).toBeInstanceOf(Function);
    });
});
