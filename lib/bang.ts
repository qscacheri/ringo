export const BANG = "__ringo_bang__";
export const isBang = (data: unknown): data is typeof BANG => data === BANG;