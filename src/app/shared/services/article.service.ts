import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {GetArticleResponseInterface} from "../types/getArticleResponse.interface";
import {environment} from "../../../environments/environment";
import {ArticleInterface} from "../types/article.interface";

@Injectable()

export class ArticleService {

  constructor(private http: HttpClient) {
  }

  public getArticle(slug: string): Observable<ArticleInterface> {
    return this.http.get<GetArticleResponseInterface>(`${environment.apiUrl}/articles/${slug}`)
      .pipe(
        map((res: GetArticleResponseInterface) => res.article)
      );
  }

}
