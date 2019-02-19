/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PaymentscatalogTestModule } from '../../../test.module';
import { BinInfoComponent } from 'app/entities/bin-info/bin-info.component';
import { BinInfoService } from 'app/entities/bin-info/bin-info.service';
import { BinInfo } from 'app/shared/model/bin-info.model';

describe('Component Tests', () => {
    describe('BinInfo Management Component', () => {
        let comp: BinInfoComponent;
        let fixture: ComponentFixture<BinInfoComponent>;
        let service: BinInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [BinInfoComponent],
                providers: []
            })
                .overrideTemplate(BinInfoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BinInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BinInfoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BinInfo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.binInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
