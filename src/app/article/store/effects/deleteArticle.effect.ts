import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from "../actions/deleteArticle.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";

@Injectable()

export class DeleteArticleEffect {

  deleteArticle$ = createEffect(() => this.action$.pipe(
    ofType(deleteArticleAction),
    switchMap(({slug}) => {
      return this.articleService.deleteArticle(slug)
        .pipe(
          map(() => deleteArticleSuccessAction()),
          catchError(() => of(deleteArticleFailureAction))
        )
    })
  ))

  redirectAfterDelete$ = createEffect(() => this.action$.pipe(
    ofType(deleteArticleSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  ),{dispatch: false})

  constructor(private action$: Actions,
              private router: Router,
              private articleService: ArticleService) {
  }
}
