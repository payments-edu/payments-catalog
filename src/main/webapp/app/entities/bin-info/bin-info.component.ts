import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBinInfo } from 'app/shared/model/bin-info.model';
import { AccountService } from 'app/core';
import { BinInfoService } from './bin-info.service';

@Component({
    selector: 'jhi-bin-info',
    templateUrl: './bin-info.component.html'
})
export class BinInfoComponent implements OnInit, OnDestroy {
    binInfos: IBinInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected binInfoService: BinInfoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.binInfoService
            .query()
            .pipe(
                filter((res: HttpResponse<IBinInfo[]>) => res.ok),
                map((res: HttpResponse<IBinInfo[]>) => res.body)
            )
            .subscribe(
                (res: IBinInfo[]) => {
                    this.binInfos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBinInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBinInfo) {
        return item.id;
    }

    registerChangeInBinInfos() {
        this.eventSubscriber = this.eventManager.subscribe('binInfoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
