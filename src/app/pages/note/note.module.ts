import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';

import { NotePage } from './note.page';
const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote'],
  [{ list: 'ordered'}, { list: 'bullet' }],
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot({
      placeholder: 'Start writing',
      modules: {
        toolbar: toolbarOptions
      }
    })
  ],
  declarations: [NotePage]
})
export class NotePageModule {}
