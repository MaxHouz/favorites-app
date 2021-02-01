import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProvidersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }
