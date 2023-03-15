import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FeedService} from "../../services/feed.service";
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from "../actions/getFeed.action";
import {catchError, map, of, switchMap} from "rxjs";
import {GetFeedResponseInterface} from "../../types/GetFeedResponse.interface";

@Injectable()

export class GetFeedEffect {

   getFeed$ = createEffect(() => this.action$.pipe(
     ofType(getFeedAction),
     switchMap(({url}) => {
       return this.feedService.getFeed(url)
         .pipe(
           map((feed: GetFeedResponseInterface) => {
             return getFeedSuccessAction({feed});
           }),
           catchError(() => {
             return of(getFeedFailureAction);
           })
         )
     }),
   ))

  constructor(private action$: Actions,
              private feedService: FeedService) {
  }
}
