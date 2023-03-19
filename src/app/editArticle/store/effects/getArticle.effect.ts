import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ArticleService as SharedArticleService} from "../../../shared/services/article.service";
import {getArticleAction} from "../../../article/store/actions/getArticle.action";
import {catchError, map, of, switchMap} from "rxjs";
import {getArticleFailureAction, getArticleSuccessAction} from "../actions/getArticle.actions";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()

export class GetArticleEffect {

  getArticle$ = createEffect(() => this.action$.pipe(
    ofType(getArticleAction),
    switchMap(({slug}) => {
      return this.articleService.getArticle(slug)
        .pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article});
          }),
          catchError(_ => {
            return of(getArticleFailureAction())
          })
        )
    })
  ))

  constructor(private action$: Actions,
              private articleService: SharedArticleService) {
  }
}
