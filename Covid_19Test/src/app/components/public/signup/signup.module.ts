import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { MaterialDesignFrameworkModule } from '@visur/formgenerator-material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/globals/shared/material.module'

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialDesignFrameworkModule,
    MaterialModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
