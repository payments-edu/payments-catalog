/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PaymentscatalogTestModule } from '../../../test.module';
import { BinInfoUpdateComponent } from 'app/entities/bin-info/bin-info-update.component';
import { BinInfoService } from 'app/entities/bin-info/bin-info.service';
import { BinInfo } from 'app/shared/model/bin-info.model';

describe('Component Tests', () => {
    describe('BinInfo Management Update Component', () => {
        let comp: BinInfoUpdateComponent;
        let fixture: ComponentFixture<BinInfoUpdateComponent>;
        let service: BinInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PaymentscatalogTestModule],
                declarations: [BinInfoUpdateComponent]
            })
                .overrideTemplate(BinInfoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BinInfoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BinInfoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BinInfo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.binInfo = entity;
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
                    const entity = new BinInfo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.binInfo = entity;
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
