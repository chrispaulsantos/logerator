export function log(options?: Options): (target: any) => void {
    const defaultOptions: Options = { loggerFn: console.log };

    if (options) {
        defaultOptions.static = options.static || false;
        defaultOptions.loggerFn = options.loggerFn || console.log;
    }

    return function(target): void {
        let prototype = target.prototype;
        let list: string[] = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter((key, i, arr) => key !== 'constructor' && arr.indexOf(key) === i);

        list.forEach(key => {
            let fn = prototype[key];
            if (fn && isMethod(fn)) {
                prototype[key] = wrap(fn, defaultOptions.loggerFn);
            }
        });
    };
}

export interface Options {
    loggerFn?: LogFunction;
    static?: boolean;
}

type LogFunction = (message: string) => void;

function isMethod(fn: any): any {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}

function wrap(fn: any, logFn: LogFunction): Function {
    return function(...args: any[]): any {
        let instance = this;
        let wrapper = function(...args: any[]): any {
            logFn(`START ${fn.name}()`);
            let result = fn.apply(instance, args);

            if (result instanceof Promise) {
                return result
                    .then(val => {
                        logFn(`---- RESOLVE ----`);
                        logFn(val);
                        logFn(`END: ${fn.name}()`);

                        return val;
                    })
                    .catch(e => {
                        logFn(`---- REJECT ----`);
                        logFn(e);
                        logFn(`END: ${fn.name}()`);

                        return Promise.reject(e);
                    });
            }

            logFn(`---- RESULT ----`);
            logFn(result);
            logFn(`END: ${fn.name}()`);

            return result;
        };

        return wrapper.apply(this, args);
    };
}
