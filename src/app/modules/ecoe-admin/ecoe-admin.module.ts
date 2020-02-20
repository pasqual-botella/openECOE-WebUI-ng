import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcoeAdminRoutingModule } from './ecoe-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AreasComponent } from './areas/areas.component';
import { StationsComponent } from './stations/stations.component';
import { StationDetailsComponent } from './station-details/station-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventsComponent } from './events-schedule/events.component';
import { StudentsComponent } from './students/students.component';
import { PlannerComponent } from './planner/planner.component';
import { PlannerSelectorComponent, AppStudentSelectorComponent } from './planner-selector/planner-selector.component';

@NgModule({
  declarations: [
    AreasComponent,
    StationsComponent,
    StationDetailsComponent,
    ScheduleComponent,
    EventsComponent,
    StudentsComponent,
    PlannerComponent,
    PlannerSelectorComponent,
    AppStudentSelectorComponent
  ],
  imports: [
    CommonModule,
    EcoeAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    TranslateModule,
    PipesModule,
    ComponentsModule
  ],
  entryComponents: [AppStudentSelectorComponent]
})
export class EcoeAdminModule { }
