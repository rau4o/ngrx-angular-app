import {NgModule} from "@angular/core";
import {TagFeedComponent} from './components/tag-feed.component';
import {CommonModule} from "@angular/common";
import {BannerModule} from "../shared/modules/banner/banner.module";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent
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
    TagFeedComponent
  ],
  exports: []
})

export class TagFeedModule {}
