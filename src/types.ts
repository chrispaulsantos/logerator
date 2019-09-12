export interface Options {
    logFunction?: LogFunction;
}

export type LogFunction = (message: string) => void;
