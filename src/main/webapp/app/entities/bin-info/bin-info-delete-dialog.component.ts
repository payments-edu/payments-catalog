import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBinInfo } from 'app/shared/model/bin-info.model';
import { BinInfoService } from './bin-info.service';

@Component({
    selector: 'jhi-bin-info-delete-dialog',
    templateUrl: './bin-info-delete-dialog.component.html'
})
export class BinInfoDeleteDialogComponent {
    binInfo: IBinInfo;

    constructor(protected binInfoService: BinInfoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.binInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'binInfoListModification',
                content: 'Deleted an binInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bin-info-delete-popup',
    template: ''
})
export class BinInfoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ binInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BinInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.binInfo = binInfo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/bin-info', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/bin-info', { outlets: { popup: null } }]);
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
