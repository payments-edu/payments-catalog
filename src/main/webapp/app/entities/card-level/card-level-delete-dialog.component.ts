import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardLevel } from 'app/shared/model/card-level.model';
import { CardLevelService } from './card-level.service';

@Component({
    selector: 'jhi-card-level-delete-dialog',
    templateUrl: './card-level-delete-dialog.component.html'
})
export class CardLevelDeleteDialogComponent {
    cardLevel: ICardLevel;

    constructor(
        protected cardLevelService: CardLevelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardLevelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cardLevelListModification',
                content: 'Deleted an cardLevel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-level-delete-popup',
    template: ''
})
export class CardLevelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cardLevel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CardLevelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cardLevel = cardLevel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/card-level', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/card-level', { outlets: { popup: null } }]);
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
