import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBank } from 'app/shared/model/bank.model';
import { BankService } from './bank.service';

@Component({
    selector: 'jhi-bank-update',
    templateUrl: './bank-update.component.html'
})
export class BankUpdateComponent implements OnInit {
    bank: IBank;
    isSaving: boolean;

    constructor(protected bankService: BankService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bank }) => {
            this.bank = bank;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(this.bankService.create(this.bank));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBank>>) {
        result.subscribe((res: HttpResponse<IBank>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
