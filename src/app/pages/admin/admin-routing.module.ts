import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {AuthenticationGuard} from '../../guards/authentication/authentication.guard';
// import {Role} from '../../models';
import {Role} from '../../models/role';

/*const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin]},
    children: [
      {
        path: '',
        children: [
          {path: 'ecoe/:id', loadChildren: './ecoe/ecoe.module#EcoeModule', data: {title: 'ECOE', roles: [Role.Admin], breadcrumb: 'Ecoe'} },
          {path: 'cpanel', loadChildren: './cpanel/cpanel.module#CpanelModule', data: {title: 'cpanel', roles: [Role.Admin], breadcrumb: 'Panel'} },
          {path: '', component: HomeAdminComponent},
          {path: '**', redirectTo: ''}
        ]
      }
    ]
  }
];*/

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin]},
    children: [
      {
        path: '',
        children: [
          {path: 'ecoe/:id', loadChildren: './ecoe/ecoe.module#EcoeModule', data: {title: 'ECOE', roles: [Role.Admin]} },
          {path: 'cpanel', loadChildren: './cpanel/cpanel.module#CpanelModule', data: {title: 'cpanel', roles: [Role.Admin]} },
          {path: '', component: HomeAdminComponent},
          {path: '**', redirectTo: ''}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

export const ADMIN_ROUTING: Routes = routes;
