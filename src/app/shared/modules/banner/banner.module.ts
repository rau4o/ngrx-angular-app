import {NgModule} from "@angular/core";
import {BannerComponent} from "./components/banner.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent],
  exports: [BannerComponent]
})

export class BannerModule {}
