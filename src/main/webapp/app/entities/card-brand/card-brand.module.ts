import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentscatalogSharedModule } from 'app/shared';
import {
    CardBrandComponent,
    CardBrandDetailComponent,
    CardBrandUpdateComponent,
    CardBrandDeletePopupComponent,
    CardBrandDeleteDialogComponent,
    cardBrandRoute,
    cardBrandPopupRoute
} from './';

const ENTITY_STATES = [...cardBrandRoute, ...cardBrandPopupRoute];

@NgModule({
    imports: [PaymentscatalogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CardBrandComponent,
        CardBrandDetailComponent,
        CardBrandUpdateComponent,
        CardBrandDeleteDialogComponent,
        CardBrandDeletePopupComponent
    ],
    entryComponents: [CardBrandComponent, CardBrandUpdateComponent, CardBrandDeleteDialogComponent, CardBrandDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentscatalogCardBrandModule {}
