import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICardLevel } from 'app/shared/model/card-level.model';
import { CardLevelService } from './card-level.service';

@Component({
    selector: 'jhi-card-level-update',
    templateUrl: './card-level-update.component.html'
})
export class CardLevelUpdateComponent implements OnInit {
    cardLevel: ICardLevel;
    isSaving: boolean;

    constructor(protected cardLevelService: CardLevelService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cardLevel }) => {
            this.cardLevel = cardLevel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cardLevel.id !== undefined) {
            this.subscribeToSaveResponse(this.cardLevelService.update(this.cardLevel));
        } else {
            this.subscribeToSaveResponse(this.cardLevelService.create(this.cardLevel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardLevel>>) {
        result.subscribe((res: HttpResponse<ICardLevel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
