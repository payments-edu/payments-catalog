import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentscatalogSharedModule } from 'app/shared';
import {
    CardLevelComponent,
    CardLevelDetailComponent,
    CardLevelUpdateComponent,
    CardLevelDeletePopupComponent,
    CardLevelDeleteDialogComponent,
    cardLevelRoute,
    cardLevelPopupRoute
} from './';

const ENTITY_STATES = [...cardLevelRoute, ...cardLevelPopupRoute];

@NgModule({
    imports: [PaymentscatalogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CardLevelComponent,
        CardLevelDetailComponent,
        CardLevelUpdateComponent,
        CardLevelDeleteDialogComponent,
        CardLevelDeletePopupComponent
    ],
    entryComponents: [CardLevelComponent, CardLevelUpdateComponent, CardLevelDeleteDialogComponent, CardLevelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentscatalogCardLevelModule {}
