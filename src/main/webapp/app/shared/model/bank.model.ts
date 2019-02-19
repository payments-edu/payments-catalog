export interface IBank {
    id?: number;
    name?: string;
    swiftCode?: string;
    priority?: number;
    url?: string;
    phone?: string;
    countryId?: number;
}

export class Bank implements IBank {
    constructor(
        public id?: number,
        public name?: string,
        public swiftCode?: string,
        public priority?: number,
        public url?: string,
        public phone?: string,
        public countryId?: number
    ) {}
}
