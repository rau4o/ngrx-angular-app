import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileInterface} from "../../shared/types/profile.interface";
import {filter, map, Observable, Subscription, combineLatest} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {getUserProfileAction} from "../store/actions/getUserProfile.action";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isLoadingSelector, userProfileSelector} from "../store/selectors";
import {errorSelector} from "../../article/store/selectors";
import {currentUserSelector} from "../../auth/store/selectors";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public userProfile: ProfileInterface;
  private slug: string;
  public apiUrl: string;

  public isCurrentUserProfile$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  private userProfileSubscription: Subscription;

  constructor(private store: Store<AppStateInterface>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
        return currentUser.username === userProfile.username;
      })
    )
  }

  private initializeListeners(): void {
    this.userProfileSubscription = this.store.pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      })
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    })
  }

  private fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }

  public getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
