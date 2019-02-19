import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardLevel } from 'app/shared/model/card-level.model';

@Component({
    selector: 'jhi-card-level-detail',
    templateUrl: './card-level-detail.component.html'
})
export class CardLevelDetailComponent implements OnInit {
    cardLevel: ICardLevel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardLevel }) => {
            this.cardLevel = cardLevel;
        });
    }

    previousState() {
        window.history.back();
    }
}
