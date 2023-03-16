import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YourFeedComponent} from './components/your-feed.component';
import {BannerModule} from "../shared/modules/banner/banner.module";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'feed',
    component: YourFeedComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    BannerModule,
    FeedTogglerModule,
    FeedModule,
    PopularTagsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    YourFeedComponent
  ],
  exports: []
})

export class YourFeedModule {}
