import { UnlockVolumeModalComponent } from "./components/unlock-volume-modal/unlock-volume-modal.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { AutofocusDirective } from "./directives/autofocus.directive";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AppRoutingModule } from "./app.routes";
import { HomeComponent } from "./components/home/home.component";
import { ConfigComponent } from "./components/config/config.component";
import { StoreModule } from "@ngrx/store";
import { reducers, effects } from "./store";
import { SignInComponent } from "./components/signin/signin.component";
import { VersionComponent } from "./components/version/version.component";
import { services } from "./services";
import { EffectsModule } from "@ngrx/effects";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HeaderComponent } from "./components/header/header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { VolumesComponent } from "./components/volumes/volumes.component";
import { VolumeComponent } from "./components/volume/volume.component";
import { ShortcutComponent } from "./components/shortcut/shortcut.component";
import { ShortcutListComponent } from "./components/shortcut-list/shortcut-list.component";
import { CreateShortcutComponent } from "./components/create-shortcut/create-shortcut.component";
import { MessagesComponent } from "./components/messages/messages.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ConfigComponent,
    SignInComponent,
    VersionComponent,
    AlertsComponent,
    VolumesComponent,
    VolumeComponent,
    AutofocusDirective,
    LoadingComponent,
    UnlockVolumeModalComponent,
    ShortcutComponent,
    ShortcutListComponent,
    CreateShortcutComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature("freenas", reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    ...services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, HeaderComponent],
  entryComponents: [UnlockVolumeModalComponent]
})
export class AppModule {}
