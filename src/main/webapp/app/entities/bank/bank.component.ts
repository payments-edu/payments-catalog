import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBank } from 'app/shared/model/bank.model';
import { AccountService } from 'app/core';
import { BankService } from './bank.service';

@Component({
    selector: 'jhi-bank',
    templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit, OnDestroy {
    banks: IBank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected bankService: BankService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.bankService
            .query()
            .pipe(
                filter((res: HttpResponse<IBank[]>) => res.ok),
                map((res: HttpResponse<IBank[]>) => res.body)
            )
            .subscribe(
                (res: IBank[]) => {
                    this.banks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBank) {
        return item.id;
    }

    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe('bankListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
