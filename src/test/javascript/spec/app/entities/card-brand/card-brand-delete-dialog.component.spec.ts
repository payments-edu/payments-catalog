/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardBrandDeleteDialogComponent } from 'app/entities/card-brand/card-brand-delete-dialog.component';
import { CardBrandService } from 'app/entities/card-brand/card-brand.service';

describe('Component Tests', () => {
    describe('CardBrand Management Delete Component', () => {
        let comp: CardBrandDeleteDialogComponent;
        let fixture: ComponentFixture<CardBrandDeleteDialogComponent>;
        let service: CardBrandService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardBrandDeleteDialogComponent]
            })
                .overrideTemplate(CardBrandDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardBrandDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardBrandService);
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
