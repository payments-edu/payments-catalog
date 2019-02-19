import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICardType } from 'app/shared/model/card-type.model';

type EntityResponseType = HttpResponse<ICardType>;
type EntityArrayResponseType = HttpResponse<ICardType[]>;

@Injectable({ providedIn: 'root' })
export class CardTypeService {
    public resourceUrl = SERVER_API_URL + 'api/card-types';

    constructor(protected http: HttpClient) {}

    create(cardType: ICardType): Observable<EntityResponseType> {
        return this.http.post<ICardType>(this.resourceUrl, cardType, { observe: 'response' });
    }

    update(cardType: ICardType): Observable<EntityResponseType> {
        return this.http.put<ICardType>(this.resourceUrl, cardType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICardType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICardType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
