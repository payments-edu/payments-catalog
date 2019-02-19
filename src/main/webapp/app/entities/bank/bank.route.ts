import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Bank } from 'app/shared/model/bank.model';
import { BankService } from './bank.service';
import { BankComponent } from './bank.component';
import { BankDetailComponent } from './bank-detail.component';
import { BankUpdateComponent } from './bank-update.component';
import { BankDeletePopupComponent } from './bank-delete-dialog.component';
import { IBank } from 'app/shared/model/bank.model';

@Injectable({ providedIn: 'root' })
export class BankResolve implements Resolve<IBank> {
    constructor(private service: BankService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBank> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Bank>) => response.ok),
                map((bank: HttpResponse<Bank>) => bank.body)
            );
        }
        return of(new Bank());
    }
}

export const bankRoute: Routes = [
    {
        path: '',
        component: BankComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BankDetailComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BankUpdateComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BankUpdateComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BankDeletePopupComponent,
        resolve: {
            bank: BankResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Banks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
