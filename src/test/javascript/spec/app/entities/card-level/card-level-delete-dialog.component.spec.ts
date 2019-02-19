/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardLevelDeleteDialogComponent } from 'app/entities/card-level/card-level-delete-dialog.component';
import { CardLevelService } from 'app/entities/card-level/card-level.service';

describe('Component Tests', () => {
    describe('CardLevel Management Delete Component', () => {
        let comp: CardLevelDeleteDialogComponent;
        let fixture: ComponentFixture<CardLevelDeleteDialogComponent>;
        let service: CardLevelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardLevelDeleteDialogComponent]
            })
                .overrideTemplate(CardLevelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardLevelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardLevelService);
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
