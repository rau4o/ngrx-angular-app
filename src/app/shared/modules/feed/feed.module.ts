import {NgModule} from "@angular/core";
import {FeedComponent} from './components/feed.component';
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {GetFeedEffect} from "./store/effects/getFeed.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {FeedService} from "./services/feed.service";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "../errorMessage/errorMessage.module";
import {LoadingModule} from "../loading/loading.module";
import {PaginationModule} from "../pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers)
  ],
  declarations: [
    FeedComponent
  ],
  exports: [
    FeedComponent
  ],
  providers: [FeedService]
})

export class FeedModule {}
