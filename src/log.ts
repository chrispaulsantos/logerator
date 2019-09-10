import { apply } from './apply';
import { Options } from './types';
import { isMethod } from './util';

export function log(options: Options): (target: any) => void {
    return function(target): void {
        let prototype = target.prototype;
        let functionNames: string[] = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter((key, i, arr) => key !== 'constructor' && arr.indexOf(key) === i);

        functionNames.forEach(key => {
            let fn = prototype[key];
            if (fn && isMethod(fn)) {
                prototype[key] = apply(fn, options.logFunction);
            }
        });
    };
}
