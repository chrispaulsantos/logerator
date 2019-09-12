import { DEFAULT_OPTIONS } from './options';
import { Options } from './types';

export function apply(fn: any, options: Options): Function {
    return function(...args: any[]): any {
        // Since decorators are applied at declaration, we need to 
        // have this here, otherwise options.logFunction will be console.log
        // and even though we call configure(), it's possible for the declaration
        // to occur before configure is called
        const log = options.logFunction || DEFAULT_OPTIONS.logFunction;

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
