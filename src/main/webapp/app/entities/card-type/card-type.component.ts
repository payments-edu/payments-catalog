import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICardType } from 'app/shared/model/card-type.model';
import { AccountService } from 'app/core';
import { CardTypeService } from './card-type.service';

@Component({
    selector: 'jhi-card-type',
    templateUrl: './card-type.component.html'
})
export class CardTypeComponent implements OnInit, OnDestroy {
    cardTypes: ICardType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cardTypeService: CardTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cardTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<ICardType[]>) => res.ok),
                map((res: HttpResponse<ICardType[]>) => res.body)
            )
            .subscribe(
                (res: ICardType[]) => {
                    this.cardTypes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCardTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICardType) {
        return item.id;
    }

    registerChangeInCardTypes() {
        this.eventSubscriber = this.eventManager.subscribe('cardTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
