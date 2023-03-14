import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {environment} from "../../../environments/environment";
import {AuthResponseInterface} from "../types/authResponse.interface";

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {}

  public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users`, data)
      .pipe(
        map((response: AuthResponseInterface) => response.user)
      );
  }
}
