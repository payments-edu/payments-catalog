import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardBrand } from 'app/shared/model/card-brand.model';
import { CardBrandService } from './card-brand.service';

@Component({
    selector: 'jhi-card-brand-delete-dialog',
    templateUrl: './card-brand-delete-dialog.component.html'
})
export class CardBrandDeleteDialogComponent {
    cardBrand: ICardBrand;

    constructor(
        protected cardBrandService: CardBrandService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardBrandService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cardBrandListModification',
                content: 'Deleted an cardBrand'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-brand-delete-popup',
    template: ''
})
export class CardBrandDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardBrand }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CardBrandDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cardBrand = cardBrand;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/card-brand', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/card-brand', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
