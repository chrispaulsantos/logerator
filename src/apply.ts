import { LogFunction } from './types';

export function apply(fn: any, log: LogFunction): Function {
    return function(...args: any[]): any {
        log(`START ${fn.name}()`);
        let result = fn.apply(this, args);

        if (result instanceof Promise) {
            return result
                .then(val => {
                    log(`---- RESOLVE ----`);
                    log(val);
                    log(`END: ${fn.name}()`);

                    return val;
                })
                .catch(e => {
                    log(`---- REJECT ----`);
                    log(e);
                    log(`END: ${fn.name}()`);

                    return Promise.reject(e);
                });
        }

        log(`---- RESULT ----`);
        log(result);
        log(`END: ${fn.name}()`);

        return result;
    };
}
