import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {HttpService} from "@core/services/http.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ],
  providers:[
    HttpService
  ]
})
export class FeatureModule { }
