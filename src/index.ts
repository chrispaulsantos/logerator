export function log(options: Options = { static: false }): (target: any) => void {
    options = {
        static: false,
        ...options
    };

    if (!options.loggerFn) {
        options.loggerFn = console.log;
    }

    options.loggerFn('Hello');

    return function(target): void {
        let prototype = target.prototype;
        let list: string[] = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter((key, i, arr) => key !== 'constructor' && arr.indexOf(key) === i);

        list.forEach(key => {
            let fn = prototype[key];
            if (fn && isMethod(fn)) {
                prototype[key] = wrap(fn, options.loggerFn);
            }
        });
    };
}

export interface Options {
    loggerFn?: (msg: string) => void;
    static?: boolean;
}

function isMethod(fn: any): any {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}

function wrap(fn: any, logFn: any): Function {
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
                    .catch(reason => {
                        logFn(`---- REJECT ----`);
                        logFn(reason);
                        logFn(`END: ${fn.name}()`);

                        return Promise.reject(reason);
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
