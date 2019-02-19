import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBinInfo } from 'app/shared/model/bin-info.model';

@Component({
    selector: 'jhi-bin-info-detail',
    templateUrl: './bin-info-detail.component.html'
})
export class BinInfoDetailComponent implements OnInit {
    binInfo: IBinInfo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ binInfo }) => {
            this.binInfo = binInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
