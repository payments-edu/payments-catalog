/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardTypeDeleteDialogComponent } from 'app/entities/card-type/card-type-delete-dialog.component';
import { CardTypeService } from 'app/entities/card-type/card-type.service';

describe('Component Tests', () => {
    describe('CardType Management Delete Component', () => {
        let comp: CardTypeDeleteDialogComponent;
        let fixture: ComponentFixture<CardTypeDeleteDialogComponent>;
        let service: CardTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardTypeDeleteDialogComponent]
            })
                .overrideTemplate(CardTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardTypeService);
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
