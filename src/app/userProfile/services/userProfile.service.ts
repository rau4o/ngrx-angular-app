import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProfileInterface} from "../../shared/types/profile.interface";
import {GetUserProfileResponseInterface} from "../types/getUserProfileResponse.interface";

@Injectable()

export class UserProfileService {

  constructor(private http: HttpClient) {
  }

  public getUserProfile(slug: string): Observable<ProfileInterface> {
    return this.http.get(`${environment.apiUrl}/profiles/${slug}`)
      .pipe(map((response: GetUserProfileResponseInterface) => response.profile))
  }
}
