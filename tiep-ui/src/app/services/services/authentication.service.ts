/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/authentication/confirm';
import { Confirm$Params } from '../fn/authentication/confirm';
import { getAllUsers } from '../fn/authentication/get-all-users';
import { GetAllUsers$Params } from '../fn/authentication/get-all-users';
import { getEntrepreneurs } from '../fn/authentication/get-entrepreneurs';
import { GetEntrepreneurs$Params } from '../fn/authentication/get-entrepreneurs';
import { getItExperts } from '../fn/authentication/get-it-experts';
import { GetItExperts$Params } from '../fn/authentication/get-it-experts';
import { getUserByEmail } from '../fn/authentication/get-user-by-email';
import { GetUserByEmail$Params } from '../fn/authentication/get-user-by-email';
import { getUserById } from '../fn/authentication/get-user-by-id';
import { GetUserById$Params } from '../fn/authentication/get-user-by-id';
import { getUsersByRole } from '../fn/authentication/get-users-by-role';
import { GetUsersByRole$Params } from '../fn/authentication/get-users-by-role';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/auth/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/auth/users/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserByEmail()` */
  static readonly GetUserByEmailPath = '/auth/users/email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail$Response(params: GetUserByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail(params: GetUserByEmail$Params, context?: HttpContext): Observable<User> {
    return this.getUserByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUsersByRole()` */
  static readonly GetUsersByRolePath = '/auth/role/{userRole}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersByRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByRole$Response(params: GetUsersByRole$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getUsersByRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersByRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByRole(params: GetUsersByRole$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getUsersByRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `getItExperts()` */
  static readonly GetItExpertsPath = '/auth/it-experts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItExperts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItExperts$Response(params?: GetItExperts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getItExperts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItExperts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItExperts(params?: GetItExperts$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getItExperts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `getEntrepreneurs()` */
  static readonly GetEntrepreneursPath = '/auth/entrepreneurs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEntrepreneurs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEntrepreneurs$Response(params?: GetEntrepreneurs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getEntrepreneurs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEntrepreneurs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEntrepreneurs(params?: GetEntrepreneurs$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getEntrepreneurs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
