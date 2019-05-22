import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpLayerService {

    constructor(
        private _http: HttpClient,
    ) { }

    get(url: string): Observable<any> {
        try {
            return this._http.get(url);
        } catch (error) {
            console.log(error);
        }
    }
    post(url: string, data: any): Observable<any> {
        const headerOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        try {
            const body = JSON.stringify(data);
            return this._http.post(url, body, headerOptions);
        } catch (error) {
            console.log(error);
        }
    }
}
