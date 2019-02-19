export interface ICardType {
    id?: number;
    name?: string;
}

export class CardType implements ICardType {
    constructor(public id?: number, public name?: string) {}
}
