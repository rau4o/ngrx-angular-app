import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PopularTagType} from "../../../types/popularTag.type";
import {GetPopularTagResponseInterface} from "../types/getPopularTagResponse.interface";

@Injectable()

export class PopularTagsServices {
  constructor(private http: HttpClient) {
  }

  public getPopularTags(): Observable<PopularTagType[]> {
    return this.http.get(`${environment.apiUrl}/tags`)
      .pipe(
        map((response: GetPopularTagResponseInterface) => {
          return response.tags
        })
      )
  }
}
