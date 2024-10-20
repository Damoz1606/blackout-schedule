export interface Blackout {
    [key: string]: BlackoutRange[]
}

export interface BlackoutRange {
    from: string;
    to: string;
}