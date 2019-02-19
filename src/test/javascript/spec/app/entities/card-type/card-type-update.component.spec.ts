/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardTypeUpdateComponent } from 'app/entities/card-type/card-type-update.component';
import { CardTypeService } from 'app/entities/card-type/card-type.service';
import { CardType } from 'app/shared/model/card-type.model';

describe('Component Tests', () => {
    describe('CardType Management Update Component', () => {
        let comp: CardTypeUpdateComponent;
        let fixture: ComponentFixture<CardTypeUpdateComponent>;
        let service: CardTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardTypeUpdateComponent]
            })
                .overrideTemplate(CardTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CardType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CardType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
