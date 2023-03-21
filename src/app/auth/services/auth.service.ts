import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {environment} from "../../../environments/environment";
import {AuthResponseInterface} from "../types/authResponse.interface";
import {LoginRequestInterface} from "../types/loginRequest.interface";
import {CurrentUserInputInterface} from "../../shared/types/currentUserInput.interface";

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {}

  public getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users`, data)
      .pipe(
        map(this.getUser)
      );
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users/login`, data)
      .pipe(
        map(this.getUser)
      );
  }

  public getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<AuthResponseInterface>(`${environment.apiUrl}/user`)
      .pipe(
        map(this.getUser)
      )
  }

  public updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    return this.http.put(`${environment.apiUrl}/user`, currentUserInput)
      .pipe(
        map(this.getUser)
      )
  }
}
