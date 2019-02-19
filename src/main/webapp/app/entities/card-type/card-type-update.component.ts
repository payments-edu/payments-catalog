import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICardType } from 'app/shared/model/card-type.model';
import { CardTypeService } from './card-type.service';

@Component({
    selector: 'jhi-card-type-update',
    templateUrl: './card-type-update.component.html'
})
export class CardTypeUpdateComponent implements OnInit {
    cardType: ICardType;
    isSaving: boolean;

    constructor(protected cardTypeService: CardTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cardType }) => {
            this.cardType = cardType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cardType.id !== undefined) {
            this.subscribeToSaveResponse(this.cardTypeService.update(this.cardType));
        } else {
            this.subscribeToSaveResponse(this.cardTypeService.create(this.cardType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardType>>) {
        result.subscribe((res: HttpResponse<ICardType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
