import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "../actions/addToFavorites.action";
import {catchError, map, of, switchMap} from "rxjs";
import {AddToFavoritesService} from "../../services/addToFavorites.service";
import {ArticleInterface} from "../../../../types/article.interface";

@Injectable()

export class AddToFavoritesEffect {

  addToFavorites$ = createEffect(() => this.action$.pipe(
    ofType(addToFavoritesAction),
    switchMap(({isFavorited, slug}) => {
      const article$ = isFavorited
        ? this.addToFavoritesService.removeFromFavorites(slug)
        : this.addToFavoritesService.addToFavorites(slug)
      return article$
        .pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article});
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        )
    })
  ))

  constructor(private action$: Actions,
              private addToFavoritesService: AddToFavoritesService) {
  }
}
