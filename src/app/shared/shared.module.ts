import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      HeaderComponent,
      CharacterTableComponent
    ],
  exports: [
    HeaderComponent,
    CharacterTableComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule
    ]
})
export class SharedModule { }
