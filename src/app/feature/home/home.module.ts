import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DescriptionComponent} from "./description/description.component";
import {PageHomeComponent} from "./page-home/page-home.component";
import {ServicesComponent} from "./services/services.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {HomeRoutingModule} from "./home-routing.module";
import {ComponentsModule} from "../components/components.module";
import {CarouselModule} from "ngx-bootstrap/carousel";



@NgModule({
  declarations: [
    PageHomeComponent,
    DescriptionComponent,
    ServicesComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    CarouselModule
  ]
})
export class HomeModule { }
