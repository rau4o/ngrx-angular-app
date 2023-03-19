import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {EditArticleService} from "../../services/editArticle.service";
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from "../actions/updateArticle.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()

export class UpdateArticleEffect {

  updateArticle$ = createEffect(() => this.action$.pipe(
    ofType(updateArticleAction),
    switchMap(({slug, articleInput}) => {
      return this.editArticleService.updateArticle(slug, articleInput)
        .pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateArticleFailureAction({errors: errorResponse.error.errors}))
          })
        )
    })
  ))

  redirectAfterUpdate = createEffect(() => this.action$.pipe(
    ofType(updateArticleSuccessAction),
    tap(({article}) => {
      this.router.navigate(['/articles', article.slug]);
    })
  ), {dispatch: false})

  constructor(private action$: Actions,
              private router: Router,
              private editArticleService: EditArticleService) {
  }
}
