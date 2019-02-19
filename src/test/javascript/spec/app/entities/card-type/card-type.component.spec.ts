/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardTypeComponent } from 'app/entities/card-type/card-type.component';
import { CardTypeService } from 'app/entities/card-type/card-type.service';
import { CardType } from 'app/shared/model/card-type.model';

describe('Component Tests', () => {
    describe('CardType Management Component', () => {
        let comp: CardTypeComponent;
        let fixture: ComponentFixture<CardTypeComponent>;
        let service: CardTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardTypeComponent],
                providers: []
            })
                .overrideTemplate(CardTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CardType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cardTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
