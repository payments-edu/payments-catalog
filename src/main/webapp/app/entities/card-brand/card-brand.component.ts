import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICardBrand } from 'app/shared/model/card-brand.model';
import { AccountService } from 'app/core';
import { CardBrandService } from './card-brand.service';

@Component({
    selector: 'jhi-card-brand',
    templateUrl: './card-brand.component.html'
})
export class CardBrandComponent implements OnInit, OnDestroy {
    cardBrands: ICardBrand[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cardBrandService: CardBrandService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cardBrandService
            .query()
            .pipe(
                filter((res: HttpResponse<ICardBrand[]>) => res.ok),
                map((res: HttpResponse<ICardBrand[]>) => res.body)
            )
            .subscribe(
                (res: ICardBrand[]) => {
                    this.cardBrands = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCardBrands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICardBrand) {
        return item.id;
    }

    registerChangeInCardBrands() {
        this.eventSubscriber = this.eventManager.subscribe('cardBrandListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
