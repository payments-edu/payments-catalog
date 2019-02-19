import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICardBrand } from 'app/shared/model/card-brand.model';

type EntityResponseType = HttpResponse<ICardBrand>;
type EntityArrayResponseType = HttpResponse<ICardBrand[]>;

@Injectable({ providedIn: 'root' })
export class CardBrandService {
    public resourceUrl = SERVER_API_URL + 'api/card-brands';

    constructor(protected http: HttpClient) {}

    create(cardBrand: ICardBrand): Observable<EntityResponseType> {
        return this.http.post<ICardBrand>(this.resourceUrl, cardBrand, { observe: 'response' });
    }

    update(cardBrand: ICardBrand): Observable<EntityResponseType> {
        return this.http.put<ICardBrand>(this.resourceUrl, cardBrand, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICardBrand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICardBrand[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
