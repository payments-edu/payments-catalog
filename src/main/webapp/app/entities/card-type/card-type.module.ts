import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentscatalogSharedModule } from 'app/shared';
import {
    CardTypeComponent,
    CardTypeDetailComponent,
    CardTypeUpdateComponent,
    CardTypeDeletePopupComponent,
    CardTypeDeleteDialogComponent,
    cardTypeRoute,
    cardTypePopupRoute
} from './';

const ENTITY_STATES = [...cardTypeRoute, ...cardTypePopupRoute];

@NgModule({
    imports: [PaymentscatalogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CardTypeComponent,
        CardTypeDetailComponent,
        CardTypeUpdateComponent,
        CardTypeDeleteDialogComponent,
        CardTypeDeletePopupComponent
    ],
    entryComponents: [CardTypeComponent, CardTypeUpdateComponent, CardTypeDeleteDialogComponent, CardTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentscatalogCardTypeModule {}
