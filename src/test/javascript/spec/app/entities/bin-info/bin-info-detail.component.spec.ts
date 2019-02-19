/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { BinInfoDetailComponent } from 'app/entities/bin-info/bin-info-detail.component';
import { BinInfo } from 'app/shared/model/bin-info.model';

describe('Component Tests', () => {
    describe('BinInfo Management Detail Component', () => {
        let comp: BinInfoDetailComponent;
        let fixture: ComponentFixture<BinInfoDetailComponent>;
        const route = ({ data: of({ binInfo: new BinInfo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [BinInfoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BinInfoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BinInfoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.binInfo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
