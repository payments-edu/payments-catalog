import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CardLevel } from 'app/shared/model/card-level.model';
import { CardLevelService } from './card-level.service';
import { CardLevelComponent } from './card-level.component';
import { CardLevelDetailComponent } from './card-level-detail.component';
import { CardLevelUpdateComponent } from './card-level-update.component';
import { CardLevelDeletePopupComponent } from './card-level-delete-dialog.component';
import { ICardLevel } from 'app/shared/model/card-level.model';

@Injectable({ providedIn: 'root' })
export class CardLevelResolve implements Resolve<ICardLevel> {
    constructor(private service: CardLevelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICardLevel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CardLevel>) => response.ok),
                map((cardLevel: HttpResponse<CardLevel>) => cardLevel.body)
            );
        }
        return of(new CardLevel());
    }
}

export const cardLevelRoute: Routes = [
    {
        path: '',
        component: CardLevelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardLevels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CardLevelDetailComponent,
        resolve: {
            cardLevel: CardLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardLevels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CardLevelUpdateComponent,
        resolve: {
            cardLevel: CardLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardLevels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CardLevelUpdateComponent,
        resolve: {
            cardLevel: CardLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardLevels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardLevelPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CardLevelDeletePopupComponent,
        resolve: {
            cardLevel: CardLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardLevels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
