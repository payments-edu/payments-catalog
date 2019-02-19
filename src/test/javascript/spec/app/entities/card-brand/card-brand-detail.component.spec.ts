/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardBrandDetailComponent } from 'app/entities/card-brand/card-brand-detail.component';
import { CardBrand } from 'app/shared/model/card-brand.model';

describe('Component Tests', () => {
    describe('CardBrand Management Detail Component', () => {
        let comp: CardBrandDetailComponent;
        let fixture: ComponentFixture<CardBrandDetailComponent>;
        const route = ({ data: of({ cardBrand: new CardBrand(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardBrandDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CardBrandDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardBrandDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cardBrand).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
