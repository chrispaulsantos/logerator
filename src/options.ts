import { Options } from './types';

export const DEFAULT_OPTIONS: Options = {
    logFunction: console.log
};

/**
 * Configures the global default options with the provided options
 * @param {Options} options The options to configure the default options with
 */
export const configure = function(options: Options) {
    if (options.logFunction) {
        DEFAULT_OPTIONS.logFunction = options.logFunction;
    }
};
