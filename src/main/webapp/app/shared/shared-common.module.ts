import { NgModule } from '@angular/core';

import { PaymentscatalogSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PaymentscatalogSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PaymentscatalogSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PaymentscatalogSharedCommonModule {}
