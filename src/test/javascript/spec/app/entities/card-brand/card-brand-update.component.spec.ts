/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardBrandUpdateComponent } from 'app/entities/card-brand/card-brand-update.component';
import { CardBrandService } from 'app/entities/card-brand/card-brand.service';
import { CardBrand } from 'app/shared/model/card-brand.model';

describe('Component Tests', () => {
    describe('CardBrand Management Update Component', () => {
        let comp: CardBrandUpdateComponent;
        let fixture: ComponentFixture<CardBrandUpdateComponent>;
        let service: CardBrandService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardBrandUpdateComponent]
            })
                .overrideTemplate(CardBrandUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardBrandUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardBrandService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CardBrand(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardBrand = entity;
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
                    const entity = new CardBrand();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardBrand = entity;
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
