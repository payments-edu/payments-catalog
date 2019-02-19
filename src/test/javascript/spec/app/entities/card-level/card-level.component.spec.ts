/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PaymentscatalogTestModule } from '../../../test.module';
import { CardLevelComponent } from 'app/entities/card-level/card-level.component';
import { CardLevelService } from 'app/entities/card-level/card-level.service';
import { CardLevel } from 'app/shared/model/card-level.model';

describe('Component Tests', () => {
    describe('CardLevel Management Component', () => {
        let comp: CardLevelComponent;
        let fixture: ComponentFixture<CardLevelComponent>;
        let service: CardLevelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [CardLevelComponent],
                providers: []
            })
                .overrideTemplate(CardLevelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardLevelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardLevelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CardLevel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cardLevels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
