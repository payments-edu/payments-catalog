import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardBrand } from 'app/shared/model/card-brand.model';

@Component({
    selector: 'jhi-card-brand-detail',
    templateUrl: './card-brand-detail.component.html'
})
export class CardBrandDetailComponent implements OnInit {
    cardBrand: ICardBrand;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardBrand }) => {
            this.cardBrand = cardBrand;
        });
    }

    previousState() {
        window.history.back();
    }
}
