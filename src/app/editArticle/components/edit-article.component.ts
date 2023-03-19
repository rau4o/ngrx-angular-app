import { Component, OnInit } from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {articleSelector, isLoadingSelector, isSubmittingSelector, validationErrorsSelector} from "../store/selectors";
import {ActivatedRoute} from "@angular/router";
import {getArticleAction} from "../store/actions/getArticle.actions";
import {updateArticleAction} from "../store/actions/updateArticle.action";
import {ArticleInputInterface} from "../../shared/types/articleInput.interface";
import {BackendErrorsInterface} from "../../shared/types/backendErrors.interface";
import {ArticleInterface} from "../../shared/types/article.interface";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public initialValues$: Observable<ArticleInputInterface>;
  public isSubmitting$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface>;
  public slug: string;

  constructor(private store: Store<AppStateInterface>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.initialValues$ = this.store
      .pipe(
        select(articleSelector),
        filter(Boolean),
        map((article: ArticleInterface) => {
          return {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList
          }
        })
      );
  }

  public onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }
}
