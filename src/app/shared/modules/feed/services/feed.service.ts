import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GetFeedResponseInterface} from "../types/GetFeedResponse.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable()

export class FeedService {

  constructor(private http: HttpClient) {}

  public getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(`${environment.apiUrl}${url}`);
  }
}
