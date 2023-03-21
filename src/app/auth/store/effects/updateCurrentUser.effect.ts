import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from "../actions/updateCurrentUser.action";
import {catchError, map, of, switchMap} from "rxjs";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()

export class UpdateCurrentUserEffect {

  updateCurrentUser$ = createEffect(() => this.action$.pipe(
    ofType(updateCurrentUserAction),
    switchMap(({currentUserInput}) => {
      return this.authService.updateCurrentUser(currentUserInput)
        .pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateCurrentUserFailureAction({errors: errorResponse.error.errors}));
          })
        )
    })
  ))

  constructor(private action$: Actions,
              private authService: AuthService) {
  }
}
