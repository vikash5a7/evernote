import { NotebookService, Note } from './../../services/notebook.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotePage } from '../note/note.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  notes: Observable<Note[]>;

  constructor(private notebookService: NotebookService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.notes = this.notebookService.getFavourites();
  }

  async openNote(id) {
    const modal = await this.modalCtrl.create({
      component: NotePage,
      componentProps: {
        id
      }
    });
    modal.present();
  }

  delete(note) {
    console.log('delete me: ', note);
    this.notebookService.deleteNote(note.id);
  }

}
