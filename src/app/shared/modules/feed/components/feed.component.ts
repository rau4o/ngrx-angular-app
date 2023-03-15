import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getFeedAction} from "../store/actions/getFeed.action";
import {Observable, of, Subscription} from "rxjs";
import {GetFeedResponseInterface} from "../types/GetFeedResponse.interface";
import {errorSelector, feedSelector, isLoadingSelector} from "../store/selectors";
import {AppStateInterface} from "../../../types/appState.interface";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute, Params, Router} from "@angular/router";
import queryString from 'query-string';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  @Input('apiUrl') apiUrlProps: string;

  public limit: number = environment.limit;
  public baseUrl: string;
  public currentPage: number;

  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public feed$: Observable<GetFeedResponseInterface | null>;

  private queryParamSubscription$: Subscription;

  constructor(private store: Store<AppStateInterface>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector))

    this.baseUrl = this.router.url.split('?')[0];
  }

  private fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }

  private initializeListeners(): void {
    this.queryParamSubscription$ = this.route.queryParams
      .subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
    });
  }

  ngOnDestroy(): void {
    this.queryParamSubscription$.unsubscribe();
  }
}
