import {NgModule} from "@angular/core";
import { TopBarComponent } from './components/top-bar.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ]
})

export class TopBarModule {}
