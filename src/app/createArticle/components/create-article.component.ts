import { Component, OnInit } from '@angular/core';
import {ArticleInputInterface} from "../../shared/types/articleInput.interface";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {isSubmittingSelector, validationErrorsSelector} from "../store/selectors";
import {BackendErrorsInterface} from "../../shared/types/backendErrors.interface";
import {createArticleAction} from "../store/actions/createArticle.action";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  public initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
