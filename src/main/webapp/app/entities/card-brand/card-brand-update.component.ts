import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICardBrand } from 'app/shared/model/card-brand.model';
import { CardBrandService } from './card-brand.service';

@Component({
    selector: 'jhi-card-brand-update',
    templateUrl: './card-brand-update.component.html'
})
export class CardBrandUpdateComponent implements OnInit {
    cardBrand: ICardBrand;
    isSaving: boolean;

    constructor(protected cardBrandService: CardBrandService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cardBrand }) => {
            this.cardBrand = cardBrand;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cardBrand.id !== undefined) {
            this.subscribeToSaveResponse(this.cardBrandService.update(this.cardBrand));
        } else {
            this.subscribeToSaveResponse(this.cardBrandService.create(this.cardBrand));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardBrand>>) {
        result.subscribe((res: HttpResponse<ICardBrand>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
