import { log as logFn } from './log';
import { Options } from './types';

const DEFAULT_OPTIONS: Options = {
    logFunction: console.log,
    static: false
};

const configure = function(options: Options) {
    if (options.logFunction) {
        DEFAULT_OPTIONS.logFunction = options.logFunction;
    }
    if (options.hasOwnProperty('static')) {
        DEFAULT_OPTIONS.static = options.static;
    }
};

const log = function(options?: Options) {
    const opts: Options = { ...DEFAULT_OPTIONS };

    if (options) {
        if (options.logFunction) {
            opts.logFunction = options.logFunction;
        }
    }

    return logFn(opts);
};

export * from './types';
export { log, configure };
export default {
    log,
    configure
};
