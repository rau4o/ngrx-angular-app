import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { EditArticleComponent } from './components/edit-article.component';
import {EditArticleService} from "./services/editArticle.service";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {UpdateArticleEffect} from "./store/effects/updateArticle.effect";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {ArticleFormModule} from "../shared/modules/articleForm/articleForm.module";
import {reducers} from "./store/reducers";
import {RouterModule, Routes} from "@angular/router";
import {LoadingModule} from "../shared/modules/loading/loading.module";

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ArticleFormModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('editArticle', reducers),
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    LoadingModule
  ],
  declarations: [
    EditArticleComponent
  ],
  providers: [EditArticleService, SharedArticleService]
})

export class EditArticleModule {}
