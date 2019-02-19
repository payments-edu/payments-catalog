import { ICardType } from 'app/shared/model/card-type.model';
import { ICardLevel } from 'app/shared/model/card-level.model';
import { ICardBrand } from 'app/shared/model/card-brand.model';
import { IBank } from 'app/shared/model/bank.model';

export interface IBinInfo {
    id?: number;
    bin?: string;
    countryId?: number;
    type?: ICardType;
    level?: ICardLevel;
    cardBrand?: ICardBrand;
    bank?: IBank;
}

export class BinInfo implements IBinInfo {
    constructor(
        public id?: number,
        public bin?: string,
        public countryId?: number,
        public type?: ICardType,
        public level?: ICardLevel,
        public cardBrand?: ICardBrand,
        public bank?: IBank
    ) {}
}
