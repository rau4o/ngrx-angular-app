import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ArticleInterface} from "../../../types/article.interface";
import {environment} from "../../../../../environments/environment";
import {GetArticleResponseInterface} from "../../../types/getArticleResponse.interface";

@Injectable()

export class AddToFavoritesService {

  constructor(private http: HttpClient) {
  }

  public addToFavorites(slug: string): Observable<ArticleInterface> {
    return this.http.post(`${environment.apiUrl}/articles/${slug}/favorite`, {})
      .pipe(
        map(this.getArticle)
      )
  }

  public removeFromFavorites(slug: string): Observable<ArticleInterface> {
    return this.http.delete(`${environment.apiUrl}/articles/${slug}/favorite`)
      .pipe(
        map(this.getArticle)
      )
  }

  private getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }

}
