import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticleInputInterface} from "../../shared/types/articleInput.interface";
import {ArticleInterface} from "../../shared/types/article.interface";
import {SaveArticleResponseInterface} from "../../shared/types/saveArticleResponse.interface";

@Injectable()

export class CreateArticleService {

  constructor(private http: HttpClient) {
  }

  public createArticle(articleInput: ArticleInputInterface): Observable<ArticleInterface> {
    return this.http.post<SaveArticleResponseInterface>(`${environment.apiUrl}/articles`, {article: articleInput})
      .pipe(
        map((response: SaveArticleResponseInterface) => response.article)
      )
  }
}
