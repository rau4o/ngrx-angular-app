import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "../actions/createArticle.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {CreateArticleService} from "../../services/createArticle.service";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()

export class CreateArticleEffect {

  createArticle = createEffect(() => this.action$.pipe(
    ofType(createArticleAction),
    switchMap(({articleInput}) => {
      return this.createArticleService.createArticle(articleInput)
        .pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(createArticleFailureAction({errors: errorResponse.error.errors}));
          })
        )
    })
  ))

  redirectAfterCreate$ = createEffect(() => this.action$.pipe(
    ofType(createArticleSuccessAction),
    tap(({article}) => {
      this.router.navigate(['/articles', article.slug]);
    })
  ), {dispatch: false})

  constructor(private action$: Actions,
              private router: Router,
              private createArticleService: CreateArticleService) {
  }
}
