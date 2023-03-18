import {Injectable} from "@angular/core";
import {ArticleService as SharedArticleService} from "../../../shared/services/article.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from "../actions/getArticle.action";
import {catchError, map, of, switchMap} from "rxjs";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()

export class GetArticleEffect {

  getArticle$ = createEffect(() => this.action$.pipe(
   ofType(getArticleAction),
   switchMap(({slug}) => {
     return this.sharedArticleService.getArticle(slug)
       .pipe(
         map((article: ArticleInterface) => {
           return getArticleSuccessAction({article});
         }),
         catchError(() => {
           return of(getArticleFailureAction);
         })
       )
   })
  ))

  constructor(private action$: Actions,
              private sharedArticleService: SharedArticleService) {
  }
}
