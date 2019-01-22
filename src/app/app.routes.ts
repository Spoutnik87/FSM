import { CreateShortcutComponent } from './components/create-shortcut/create-shortcut.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { NgModule } from '@angular/core';
import { SetupGuard } from './guards/setup.guard';
import { SignInComponent } from './components/signin/signin.component';
import { guards } from './guards';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SetupGuard],
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'create-shortcut',
    component: CreateShortcutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: [...guards],
})
export class AppRoutingModule {}
