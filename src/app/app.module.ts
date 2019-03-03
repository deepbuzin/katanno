import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- here
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { EditorComponent } from './components/editor/editor.component';
import { ViewerComponent } from './components/viewer/viewer.component'; // <-- here

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'editor/:id',      component: EditorComponent },
  {
    path: 'viewer',
    component: ViewerComponent
  },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/main',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditorComponent,
    ViewerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule, // <-- here
    RoundProgressModule // <-- and here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
