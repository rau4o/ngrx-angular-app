import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticleInputInterface} from "../../shared/types/articleInput.interface";
import {ArticleInterface} from "../../shared/types/article.interface";
import {SaveArticleResponseInterface} from "../../shared/types/saveArticleResponse.interface";

@Injectable()

export class EditArticleService {
  constructor(private http: HttpClient) {
  }

  public updateArticle(slug: string, article: ArticleInputInterface): Observable<ArticleInterface> {
    return this.http.put<SaveArticleResponseInterface>(`${environment.apiUrl}/articles/${slug}`, article)
      .pipe(map(res => res.article));
  }
}
