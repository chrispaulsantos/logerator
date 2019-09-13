import { DEFAULT_OPTIONS } from './options';
import { Options } from './types';

/**
 * Wraps the provided function with log calls for better execution logs
 * @param {any} fn The function to wrap
 * @param {string} name The name of the function
 * @param {Options} options The options for an instance of the log decorator
 */
export function apply(fn: any, className: string, methodName: string, options: Options): Function {
    return function(...args: any[]): any {
        // Since decorators are applied at declaration, we need to
        // have this here, otherwise options.logFunction will be console.log
        // and even though we call configure(), it's possible for the declaration
        // to occur before configure is called
        const log = options.logFunction || DEFAULT_OPTIONS.logFunction;

        log(`START: ${className}.${methodName}()`);
        let result = fn.apply(this, args);

        if (result instanceof Promise) {
            return result
                .then(val => {
                    log(`---- RESOLVE ----`);
                    log(val);
                    log(`END: ${className}.${methodName}()`);

                    return val;
                })
                .catch(e => {
                    log(`---- REJECT ----`);
                    log(e);
                    log(`END: ${className}.${methodName}()`);

                    return Promise.reject(e);
                });
        }

        log(`---- RESULT ----`);
        log(result);
        log(`END: ${className}.${methodName}()`);

        return result;
    };
}
