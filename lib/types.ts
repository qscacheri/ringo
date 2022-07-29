import { RingoNodeAttribute } from './nodes/core/RingoNode';

export const RingoNodeTypes = [
    'add',
    'button',
    'timer',
    'multiply',
    'print',
    'oscillator',
    'speaker',
    'random',
    'scale',
    'display',
    'cube',
    'meter',
    'mic'
] as const;

export type RingoNodeType = typeof RingoNodeTypes[number];

export function isRingoType(nodeType: unknown): nodeType is RingoNodeType {
    return (
        typeof nodeType === 'string' &&
        RingoNodeTypes.includes(nodeType as RingoNodeType)
    );
}

export type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Point = {
    x: number;
    y: number;
};

export enum TerminalType {
    in = 'in',
    out = 'out',
}

export enum RingoAttributeType {
    number = 'number',
    string = 'string',
    boolean = 'boolean',
    selection = 'selection',
}

export type ConsoleMessage = {
    type: 'log' | 'error' | 'warn';
    message: string;
    timestamp: Date;
};

export type RingoNodeAttributeList = Map<string, RingoNodeAttribute>;

