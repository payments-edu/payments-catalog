import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentscatalogSharedModule } from 'app/shared';
import {
    BinInfoComponent,
    BinInfoDetailComponent,
    BinInfoUpdateComponent,
    BinInfoDeletePopupComponent,
    BinInfoDeleteDialogComponent,
    binInfoRoute,
    binInfoPopupRoute
} from './';

const ENTITY_STATES = [...binInfoRoute, ...binInfoPopupRoute];

@NgModule({
    imports: [PaymentscatalogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BinInfoComponent,
        BinInfoDetailComponent,
        BinInfoUpdateComponent,
        BinInfoDeleteDialogComponent,
        BinInfoDeletePopupComponent
    ],
    entryComponents: [BinInfoComponent, BinInfoUpdateComponent, BinInfoDeleteDialogComponent, BinInfoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentscatalogBinInfoModule {}
