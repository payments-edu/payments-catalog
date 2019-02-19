export interface ICardBrand {
    id?: number;
    code?: string;
    name?: string;
    priority?: number;
    url?: string;
    phone?: string;
}

export class CardBrand implements ICardBrand {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public priority?: number,
        public url?: string,
        public phone?: string
    ) {}
}
