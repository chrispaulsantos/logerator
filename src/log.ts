import { apply } from './apply';
import { Options } from './types';
import { isMethod } from './util';

/**
 * Decorates a class's methods to log function calls
 * @param {Options} options The options to configure an instance of the log decorator
 */
export function log(options?: Options): (target: any) => void {
    let opts: Options = {};

    // We build our options object here, and then pass it to apply.
    // We do this to allow for configuring default options even after
    // declaration of the class
    if (options) {
        if (options.logFunction) {
            opts.logFunction = options.logFunction;
        }
    }

    return function() {
        const args = arguments;
        console.log(arguments);
        if (args.length === 1) {
            logClass(opts).apply(null, args);
            return;
        }
        if (args[2] || args[2] === 0) {
            switch (typeof args[2]) {
                case 'object': {
                    logMethod(opts).apply(null, args);
                    return;
                }
            }
        }
    };
}

const logClass = function(opts: Options) {
    return function(target): void {
        let prototype = target.prototype;

        // Find the prototype property names, filtering out the constructor
        let functionNames: string[] = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter((key, i, arr) => key !== 'constructor' && arr.indexOf(key) === i);

        functionNames.forEach(key => {
            let fn = prototype[key];
            // If fn is defined and also a method, apply
            // the wrapper function
            if (fn && isMethod(fn)) {
                prototype[key] = apply(fn, target.name, key, opts);
            }
        });
    };
};

const logMethod = function(opts: Options) {
    return function(target, key, descriptor) {
        console.log(target);
    };
};
