import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PopularTagsServices} from "../../services/popularTags.services";
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from "../actions/getPopularTags.action";
import {catchError, map, of, switchMap} from "rxjs";
import {PopularTagType} from "../../../../types/popularTag.type";

@Injectable()

export class GetPopularTagsEffect {

  getPopularTags$ = createEffect(() => this.action$.pipe(
    ofType(getPopularTagsAction),
    switchMap(() => {
      return this.popularTagsService.getPopularTags()
        .pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags})
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction);
          })
        )
    }),
  ))

  constructor(private action$: Actions,
              private popularTagsService: PopularTagsServices) {
  }
}
