import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class FileUploadService {
    apiUrl = "https://file.io";
    fileUrls: any[] = [];
        
    constructor(private http:HttpClient) { }

    setFileUrls(fileUrls: any[]){
        this.fileUrls = [...fileUrls];
    }

    upload(file: any):Observable<any> {
        const formData = new FormData();
            
        formData.append("file", file, file.name);
            
        return this.http.post(this.apiUrl, formData);
    }
}
