import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router:Router
  ) { }

  getHeaders():any {
    const token = JSON.parse(localStorage.getItem('userData')!);
    return token ? new HttpParams().set('auth', token.idToken) : null;
  }

  postdata(payload: any, path: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + path, payload, {params:this.getHeaders()})
      .pipe(retry(0), catchError(this.errorHandl));
  }

  getdata(path: any): Observable<any> {
    return this.http.get<any>(environment.baseURL + path).pipe(retry(0), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;

    } else {
      // Get server-side error
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(error);

      switch(error.error.error.message){
        case 'EMAIL_EXISTS':
        errorMessage = "The email exists already";
        break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = "The email does not exists";
          break;
        case 'INVALID_PASSWORD':
            errorMessage = "The password is invalid";
           break;
           case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = " Access to this account has been temporarily disabled due to many failed login attempts.";
           break;
      }
    }
    return throwError(errorMessage);
  }

  signUp(payload: any): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApikey}`, payload)
    .pipe(retry(0), catchError(this.errorHandl));
  }

  login(payload: any): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApikey}`, payload)
    .pipe(retry(0), catchError(this.errorHandl));
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getBlogById(id:string|undefined, path:any):Observable<any>{
    let url = `${environment.baseURL}${path}/${id}/.json`;
    return this.http.get<any>(url,{ params: this.getHeaders() }).pipe(retry(0), catchError(this.errorHandl));
  }

  update(id:string|undefined, path:any, payload:any):Observable<any>{
    let url = `${environment.baseURL}${path}/${id}/.json`;
    return this.http.put<any>(url, payload, { params: this.getHeaders() }).pipe(retry(0), catchError(this.errorHandl));
  }


}
