export interface Options {
    logFunction?: LogFunction;
    static?: boolean;
}

export type LogFunction = (message: string) => void;
