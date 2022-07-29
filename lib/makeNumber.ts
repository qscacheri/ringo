export function makeNumber(val: unknown): number {
    if (typeof val === 'number') {
        return val
    }
    if (typeof val === 'string') {
        return parseFloat(val)
    }
    if (typeof val === 'boolean') {
        return val ? 1 : 0
    }
    throw new Error(`Cannot make number from ${val}`)
}