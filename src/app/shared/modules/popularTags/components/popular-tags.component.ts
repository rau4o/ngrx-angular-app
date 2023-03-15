import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../types/appState.interface";
import {Observable} from "rxjs";
import {errorSelector, isLoadingSelector, popularTagsSelector} from "../store/selectors";
import {PopularTagType} from "../../../types/popularTag.type";
import {getPopularTagsAction} from "../store/actions/getPopularTags.action";

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public popularTags$: Observable<PopularTagType[] | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
