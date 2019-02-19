import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CardType } from 'app/shared/model/card-type.model';
import { CardTypeService } from './card-type.service';
import { CardTypeComponent } from './card-type.component';
import { CardTypeDetailComponent } from './card-type-detail.component';
import { CardTypeUpdateComponent } from './card-type-update.component';
import { CardTypeDeletePopupComponent } from './card-type-delete-dialog.component';
import { ICardType } from 'app/shared/model/card-type.model';

@Injectable({ providedIn: 'root' })
export class CardTypeResolve implements Resolve<ICardType> {
    constructor(private service: CardTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICardType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CardType>) => response.ok),
                map((cardType: HttpResponse<CardType>) => cardType.body)
            );
        }
        return of(new CardType());
    }
}

export const cardTypeRoute: Routes = [
    {
        path: '',
        component: CardTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CardTypeDetailComponent,
        resolve: {
            cardType: CardTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CardTypeUpdateComponent,
        resolve: {
            cardType: CardTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CardTypeUpdateComponent,
        resolve: {
            cardType: CardTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CardTypeDeletePopupComponent,
        resolve: {
            cardType: CardTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
