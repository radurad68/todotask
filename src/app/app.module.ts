import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { ProjectsPage } from '../pages/projects/projects';
import { ProjectAddPage } from '../pages/project-add/project-add';
import { ProjectViewPage } from '../pages/project-view/project-view';
import { TaskAddPage } from '../pages/task-add/task-add';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { ProjectsServiceProvider } from '../providers/projects-service/projects-service';

import { CircleComponent } from '../components/circle/circle';

@NgModule({
  declarations: [
    MyApp,
    ProjectsPage,
    ProjectAddPage,
    ProjectViewPage,
    TaskAddPage,
    CircleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjectsPage,
    ProjectAddPage,
    ProjectViewPage,
    TaskAddPage,
    CircleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageServiceProvider,
    ProjectsServiceProvider
  ]
})
export class AppModule {}
