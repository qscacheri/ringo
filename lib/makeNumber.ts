export function isNumber(val: unknown): number | undefined {
    if (typeof val === 'number') {
        return val
    }
    if (typeof val === 'string') {
        return parseFloat(val)
    }
    if (typeof val === 'boolean') {
        return val ? 1 : 0
    }
    return undefined
}