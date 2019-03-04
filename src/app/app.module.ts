import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FilesComponent} from './files/files.component';
import {EditorComponent} from './components/editor/editor.component';
import {HomeComponent} from './components/home/home.component';
import {ViewerComponent} from './components/viewer/viewer.component';
import {TableComponent} from './components/table/table.component';
import {PreviewComponent} from './components/preview/preview.component';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'editor/:id', component: EditorComponent},
    {path: 'viewer', component: ViewerComponent},
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    declarations: [
        AppComponent,
        FilesComponent,
        EditorComponent,
        HomeComponent,
        ViewerComponent,
        TableComponent,
        PreviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
