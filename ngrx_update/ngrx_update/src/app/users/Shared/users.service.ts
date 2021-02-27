import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user'

@Injectable()
export class UsersService {
  protected URL="https://localhost:44325/api/User";
  
  constructor(protected http: HttpClient) { }


  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<User[]> {
    console.log('All users');
    return this.http.get<User[]>(this.URL, {params});
  }
  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<User> {
    return this.http.get<User>(this.URL + '/' + id);
  }

   /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: User): Observable<User> {
   // return this.http.post<User>(this.URL, data, {headers});
    return this.http.post<User>(this.URL+'/Register', JSON.stringify(data), {headers: this.getHttpHeaders()});

  } 

  /**
   * Update specific object into DB
   * @param data the object to be updated
   * @returns gets the response
   */
  public update(data: User): Observable<User> {
    return this.http.put<User>(this.URL + '/' + data.id, JSON.stringify(data), {headers: this.getHttpHeaders()});
  }

    /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<User> {
    return this.http.delete<User>(this.URL + '/' + id);
  }

   /**
   * Get the common HttpHeaders
   */
  private getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return headers;
  }

}

