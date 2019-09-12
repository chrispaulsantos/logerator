import { apply } from './apply';
import { Options } from './types';
import { isMethod } from './util';

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

    return function(target): void {
        let prototype = target.prototype;
        let functionNames: string[] = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter((key, i, arr) => key !== 'constructor' && arr.indexOf(key) === i);

        functionNames.forEach(key => {
            let fn = prototype[key];
            if (fn && isMethod(fn)) {
                prototype[key] = apply(fn, opts);
            }
        });
    };
}
