import { Options } from './types';

export const DEFAULT_OPTIONS: Options = {
    logFunction: console.log,
};

export const configure = function(options: Options) {
    if (options.logFunction) {
        DEFAULT_OPTIONS.logFunction = options.logFunction;
    }
};