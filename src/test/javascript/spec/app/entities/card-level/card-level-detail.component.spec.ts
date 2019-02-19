/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardLevelDetailComponent } from 'app/entities/card-level/card-level-detail.component';
import { CardLevel } from 'app/shared/model/card-level.model';

describe('Component Tests', () => {
    describe('CardLevel Management Detail Component', () => {
        let comp: CardLevelDetailComponent;
        let fixture: ComponentFixture<CardLevelDetailComponent>;
        const route = ({ data: of({ cardLevel: new CardLevel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardLevelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CardLevelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardLevelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cardLevel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
