import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MissionListComponent } from './missionlist/missionlist.component';
import { MissionDetailsComponent } from './missiondetails/missiondetails.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MissionListComponent },
      { path: 'mission/:flightNumber', component: MissionDetailsComponent }
    ]),
    
  ],
  declarations: [
    AppComponent,
    MissionListComponent,
    MissionDetailsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
