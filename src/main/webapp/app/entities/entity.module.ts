import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'bin-info',
                loadChildren: './bin-info/bin-info.module#PaymentscatalogBinInfoModule'
            },
            {
                path: 'card-brand',
                loadChildren: './card-brand/card-brand.module#PaymentscatalogCardBrandModule'
            },
            {
                path: 'card-type',
                loadChildren: './card-type/card-type.module#PaymentscatalogCardTypeModule'
            },
            {
                path: 'card-level',
                loadChildren: './card-level/card-level.module#PaymentscatalogCardLevelModule'
            },
            {
                path: 'bank',
                loadChildren: './bank/bank.module#PaymentscatalogBankModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentscatalogEntityModule {}
