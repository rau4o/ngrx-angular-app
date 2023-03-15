import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PopularTagsComponent} from './components/popular-tags.component';
import {PopularTagsServices} from "./services/popularTags.services";
import {EffectsModule} from "@ngrx/effects";
import {GetPopularTagsEffect} from "./store/effects/getPopularTags.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {LoadingModule} from "../loading/loading.module";
import {ErrorMessageModule} from "../errorMessage/errorMessage.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', reducers),
    LoadingModule,
    ErrorMessageModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsServices]
})

export class PopularTagsModule {}
