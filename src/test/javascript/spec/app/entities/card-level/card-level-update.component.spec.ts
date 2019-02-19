/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardLevelUpdateComponent } from 'app/entities/card-level/card-level-update.component';
import { CardLevelService } from 'app/entities/card-level/card-level.service';
import { CardLevel } from 'app/shared/model/card-level.model';

describe('Component Tests', () => {
    describe('CardLevel Management Update Component', () => {
        let comp: CardLevelUpdateComponent;
        let fixture: ComponentFixture<CardLevelUpdateComponent>;
        let service: CardLevelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardLevelUpdateComponent]
            })
                .overrideTemplate(CardLevelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardLevelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardLevelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CardLevel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardLevel = entity;
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
                    const entity = new CardLevel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardLevel = entity;
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
