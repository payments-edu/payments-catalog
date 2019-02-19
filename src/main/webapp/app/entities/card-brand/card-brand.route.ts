import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CardBrand } from 'app/shared/model/card-brand.model';
import { CardBrandService } from './card-brand.service';
import { CardBrandComponent } from './card-brand.component';
import { CardBrandDetailComponent } from './card-brand-detail.component';
import { CardBrandUpdateComponent } from './card-brand-update.component';
import { CardBrandDeletePopupComponent } from './card-brand-delete-dialog.component';
import { ICardBrand } from 'app/shared/model/card-brand.model';

@Injectable({ providedIn: 'root' })
export class CardBrandResolve implements Resolve<ICardBrand> {
    constructor(private service: CardBrandService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICardBrand> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CardBrand>) => response.ok),
                map((cardBrand: HttpResponse<CardBrand>) => cardBrand.body)
            );
        }
        return of(new CardBrand());
    }
}

export const cardBrandRoute: Routes = [
    {
        path: '',
        component: CardBrandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardBrands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CardBrandDetailComponent,
        resolve: {
            cardBrand: CardBrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardBrands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CardBrandUpdateComponent,
        resolve: {
            cardBrand: CardBrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardBrands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CardBrandUpdateComponent,
        resolve: {
            cardBrand: CardBrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardBrands'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardBrandPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CardBrandDeletePopupComponent,
        resolve: {
            cardBrand: CardBrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardBrands'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
