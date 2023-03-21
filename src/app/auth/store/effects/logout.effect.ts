import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {logoutAction} from "../actions/sync.action";
import {tap} from "rxjs";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {Router} from "@angular/router";

@Injectable()

export class LogoutEffect {

  logout$ = createEffect(() => this.action$.pipe(
    ofType(logoutAction),
    tap(() => {
      this.persistanceService.set('accessToken', '');
      this.router.navigate(['/']);
    })
  ), {dispatch: false})

  constructor(private action$: Actions,
              private router: Router,
              private persistanceService: PersistanceService) {
  }
}
