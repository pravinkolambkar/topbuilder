import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TradepersonPages } from '../models/tradepersonpages.model'; 
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TradepersonPagesService implements OnInit {    
    private tpPagesUrl = '../../assets/JsonFiles/TradepersonPages.json';

    constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

        gettpPages(): Observable<TradepersonPages[]> {
            return this.http.get<TradepersonPages[]>(this.tpPagesUrl);
        }

        gettpPageById(id: number): Observable<TradepersonPages | undefined> {
        return this.gettpPages().pipe(
            map((tppages: TradepersonPages[]) => tppages.find(tppage => tppage.tradepersonId === id))
        );
    }
}