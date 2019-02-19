import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICardLevel } from 'app/shared/model/card-level.model';
import { AccountService } from 'app/core';
import { CardLevelService } from './card-level.service';

@Component({
    selector: 'jhi-card-level',
    templateUrl: './card-level.component.html'
})
export class CardLevelComponent implements OnInit, OnDestroy {
    cardLevels: ICardLevel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cardLevelService: CardLevelService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cardLevelService
            .query()
            .pipe(
                filter((res: HttpResponse<ICardLevel[]>) => res.ok),
                map((res: HttpResponse<ICardLevel[]>) => res.body)
            )
            .subscribe(
                (res: ICardLevel[]) => {
                    this.cardLevels = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCardLevels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICardLevel) {
        return item.id;
    }

    registerChangeInCardLevels() {
        this.eventSubscriber = this.eventManager.subscribe('cardLevelListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
