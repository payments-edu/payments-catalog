/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardBrandComponent } from 'app/entities/card-brand/card-brand.component';
import { CardBrandService } from 'app/entities/card-brand/card-brand.service';
import { CardBrand } from 'app/shared/model/card-brand.model';

describe('Component Tests', () => {
    describe('CardBrand Management Component', () => {
        let comp: CardBrandComponent;
        let fixture: ComponentFixture<CardBrandComponent>;
        let service: CardBrandService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardBrandComponent],
                providers: []
            })
                .overrideTemplate(CardBrandComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardBrandComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardBrandService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CardBrand(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cardBrands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
