import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataExporterComponent } from './data-exporter/data-exporter.component';

const routes: Routes = [
  { path: 'data-exporter', component: DataExporterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
