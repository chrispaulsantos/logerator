/**
 * Checks if a method is a function or not
 * @param {any} fn The method to check
 */
export function isMethod(fn: any): any {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}
