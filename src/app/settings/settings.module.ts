import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { SettingsComponent } from './components/settings.component';
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
  ],
  declarations: [
    SettingsComponent
  ],
  exports: []
})

export class SettingsModule {}
