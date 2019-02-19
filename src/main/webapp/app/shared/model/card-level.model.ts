export interface ICardLevel {
    id?: number;
    name?: string;
}

export class CardLevel implements ICardLevel {
    constructor(public id?: number, public name?: string) {}
}
