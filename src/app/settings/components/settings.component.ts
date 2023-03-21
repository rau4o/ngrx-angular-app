import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {filter, Observable, Subscription} from "rxjs";
import {currentUserSelector} from "../../auth/store/selectors";
import {BackendErrorsInterface} from "../../shared/types/backendErrors.interface";
import {isSubmittingSelector, validationErrorsSelector} from "../store/selectors";
import {updateCurrentUserAction} from "../../auth/store/actions/updateCurrentUser.action";
import {CurrentUserInputInterface} from "../../shared/types/currentUserInput.interface";
import {logoutAction} from "../../auth/store/actions/sync.action";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public currentUser: CurrentUserInterface;
  public form: FormGroup;

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  private currentUserSubscription$: Subscription;

  constructor(private fb: FormBuilder,
              private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  private initializeListeners(): void {
    this.currentUserSubscription$ = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      })
  }

  public submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription$.unsubscribe();
  }

}
