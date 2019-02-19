import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBinInfo } from 'app/shared/model/bin-info.model';
import { BinInfoService } from './bin-info.service';
import { ICardType } from 'app/shared/model/card-type.model';
import { CardTypeService } from 'app/entities/card-type';
import { ICardLevel } from 'app/shared/model/card-level.model';
import { CardLevelService } from 'app/entities/card-level';
import { ICardBrand } from 'app/shared/model/card-brand.model';
import { CardBrandService } from 'app/entities/card-brand';
import { IBank } from 'app/shared/model/bank.model';
import { BankService } from 'app/entities/bank';

@Component({
    selector: 'jhi-bin-info-update',
    templateUrl: './bin-info-update.component.html'
})
export class BinInfoUpdateComponent implements OnInit {
    binInfo: IBinInfo;
    isSaving: boolean;

    cardtypes: ICardType[];

    cardlevels: ICardLevel[];

    cardbrands: ICardBrand[];

    banks: IBank[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected binInfoService: BinInfoService,
        protected cardTypeService: CardTypeService,
        protected cardLevelService: CardLevelService,
        protected cardBrandService: CardBrandService,
        protected bankService: BankService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ binInfo }) => {
            this.binInfo = binInfo;
        });
        this.cardTypeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICardType[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICardType[]>) => response.body)
            )
            .subscribe((res: ICardType[]) => (this.cardtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cardLevelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICardLevel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICardLevel[]>) => response.body)
            )
            .subscribe((res: ICardLevel[]) => (this.cardlevels = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cardBrandService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICardBrand[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICardBrand[]>) => response.body)
            )
            .subscribe((res: ICardBrand[]) => (this.cardbrands = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.bankService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBank[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBank[]>) => response.body)
            )
            .subscribe((res: IBank[]) => (this.banks = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.binInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.binInfoService.update(this.binInfo));
        } else {
            this.subscribeToSaveResponse(this.binInfoService.create(this.binInfo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBinInfo>>) {
        result.subscribe((res: HttpResponse<IBinInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCardTypeById(index: number, item: ICardType) {
        return item.id;
    }

    trackCardLevelById(index: number, item: ICardLevel) {
        return item.id;
    }

    trackCardBrandById(index: number, item: ICardBrand) {
        return item.id;
    }

    trackBankById(index: number, item: IBank) {
        return item.id;
    }
}
