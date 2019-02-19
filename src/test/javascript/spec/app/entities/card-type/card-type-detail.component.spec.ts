/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardTypeDetailComponent } from 'app/entities/card-type/card-type-detail.component';
import { CardType } from 'app/shared/model/card-type.model';

describe('Component Tests', () => {
    describe('CardType Management Detail Component', () => {
        let comp: CardTypeDetailComponent;
        let fixture: ComponentFixture<CardTypeDetailComponent>;
        const route = ({ data: of({ cardType: new CardType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CardTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cardType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
