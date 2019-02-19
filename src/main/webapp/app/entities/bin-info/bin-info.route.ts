import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BinInfo } from 'app/shared/model/bin-info.model';
import { BinInfoService } from './bin-info.service';
import { BinInfoComponent } from './bin-info.component';
import { BinInfoDetailComponent } from './bin-info-detail.component';
import { BinInfoUpdateComponent } from './bin-info-update.component';
import { BinInfoDeletePopupComponent } from './bin-info-delete-dialog.component';
import { IBinInfo } from 'app/shared/model/bin-info.model';

@Injectable({ providedIn: 'root' })
export class BinInfoResolve implements Resolve<IBinInfo> {
    constructor(private service: BinInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBinInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BinInfo>) => response.ok),
                map((binInfo: HttpResponse<BinInfo>) => binInfo.body)
            );
        }
        return of(new BinInfo());
    }
}

export const binInfoRoute: Routes = [
    {
        path: '',
        component: BinInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BinInfos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BinInfoDetailComponent,
        resolve: {
            binInfo: BinInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BinInfos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BinInfoUpdateComponent,
        resolve: {
            binInfo: BinInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BinInfos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BinInfoUpdateComponent,
        resolve: {
            binInfo: BinInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BinInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const binInfoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BinInfoDeletePopupComponent,
        resolve: {
            binInfo: BinInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BinInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
