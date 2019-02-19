/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentscatalogTestModule } from '../../../test.module';
import { BinInfoDeleteDialogComponent } from 'app/entities/bin-info/bin-info-delete-dialog.component';
import { BinInfoService } from 'app/entities/bin-info/bin-info.service';

describe('Component Tests', () => {
    describe('BinInfo Management Delete Component', () => {
        let comp: BinInfoDeleteDialogComponent;
        let fixture: ComponentFixture<BinInfoDeleteDialogComponent>;
        let service: BinInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [BinInfoDeleteDialogComponent]
            })
                .overrideTemplate(BinInfoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BinInfoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BinInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
