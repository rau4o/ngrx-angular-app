import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from 'src/environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {TopBarModule} from "./shared/modules/topBar/topBar.module";
import {PersistanceService} from "./shared/services/persistance.service";
import {AuthInterceptor} from "./shared/services/authInterceptor.service";
import {GlobalFeedModule} from "./globalFeed/globalFeed.module";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {YourFeedModule} from "./yourFeed/yourFeed.module";
import {TagFeedModule} from "./tagFeed/tagFeed.module";
import {ArticleModule} from "./article/article.module";
import {CreateArticleModule} from "./createArticle/createArticle.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
