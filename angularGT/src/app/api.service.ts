import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Esto en practica profesional debe estar en archvio aparte.
  private HOST = "https://2dcxi07uok.execute-api.us-east-1.amazonaws.com/"

  private apiGet =this.HOST+"apiGet";
  private apiPost = this.HOST+"apiPost";
  private apiDelete= this.HOST+"apiDelete";

  constructor(private http: HttpClient) {}

  getAllFilesS3():any{
   return this.http.get(this.apiGet)
  }

  getContentFile(nameFile:string):any{
    let obj = undefined;
    return this.http.get(this.apiGet+'?nameFile='+nameFile);
  }

  setDeleteFile(nameFile:string){
    let obj = undefined;
    return this.http.delete(this.apiDelete+'?nameFile='+nameFile);
  }

  setWebS3(url:string,nameFile:string){
    let obj= {
      url:url,
      nameFile:nameFile
    }
    return this.http.post(this.apiPost,JSON.stringify(obj));
  }
  


}
