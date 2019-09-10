export function isMethod(fn: any): any {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}
