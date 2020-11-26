import { Component, OnInit, Input } from '@angular/core';
import { NotebookService, Note } from '../../services/notebook.service';
import { ModalController } from '@ionic/angular';
import { NotebooksPage } from '../notebooks/notebooks.page';


@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  @Input() id: string;

  note: Note = {
    content: '',
    title: '',
    notebook: null,
    created: null,
    favourite: false
  };

  constructor(private modalCtrl: ModalController, private notebookService: NotebookService) { }

  ngOnInit() {
    console.log('my id: ', this.id);
    if (this.id) {
      this.notebookService.getNote(this.id).subscribe(res => {
        console.log('my note to update: ', res);
        this.note = res;
        this.notebookService.getNotebook(this.note.notebook.id).subscribe(notebook => {
          console.log('my notebook: ', notebook);
          this.note.notebook = notebook;
        });
      });
    }
  }

  async moveNote() {
    const modal = await this.modalCtrl.create({
      component: NotebooksPage,
      componentProps: {
        isModal: true,
        currentSelected: this.note.notebook
      }
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      console.log('result: ', result);
      if (result.data) {
        this.note.notebook = result.data.selected;
      }
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  done() {
    if (this.id) {
      console.log('should update: ', this.note);
      this.notebookService.updateNote(this.id, this.note).then(res => {
        console.log('after update: ', res);
        this.modalCtrl.dismiss();
      });
    } else {
      this.notebookService.addNote(this.note).then(res => {
        console.log('result: ', res);
        this.modalCtrl.dismiss();
      });
    }
  }

  toggleFavourite() {
    this.note.favourite = !this.note.favourite;
    this.notebookService.updateNote(this.id, this.note);
  }

}
