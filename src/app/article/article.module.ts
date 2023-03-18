import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {ErrorMessageModule} from "../shared/modules/errorMessage/errorMessage.module";
import {RouterModule, Routes} from "@angular/router";
import {LoadingModule} from "../shared/modules/loading/loading.module";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import { ArticleComponent } from './components/article.component';
import {TagListModule} from "../shared/modules/tagList/tagList.module";
import {ArticleService} from "./services/article.service";
import {DeleteArticleEffect} from "./store/effects/deleteArticle.effect";

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    TagListModule
  ],
  declarations: [
    ArticleComponent
  ],
  exports: [],
  providers: [SharedArticleService, ArticleService]
})

export class ArticleModule {}
