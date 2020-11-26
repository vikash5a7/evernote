import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Notebook, NotebookService } from 'src/app/services/notebook.service';
import { NotebookCreateModalPage } from '../notebook-create-modal/notebook-create-modal.page';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.page.html',
  styleUrls: ['./notebooks.page.scss'],
})
export class NotebooksPage implements OnInit {

  notebooks: Observable<any[]>;
  @Input() isModal: boolean;
  @Input() currentSelected: Notebook;

  constructor(private notebookService: NotebookService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.loadNotebooks();
  }

  loadNotebooks() {
    if (this.isModal) {
      this.notebooks = this.notebookService.getNotebookList();
    } else {
      this.notebooks = this.notebookService.getNotebooks();
    }
  }

  async addNotebook() {
    console.log('adding notes');
    const modal = await this.modalCtrl.create({
      component: NotebookCreateModalPage
    });
    modal.present();
  }

  openNotebook(notebook) {
    console.log('please open: ', notebook);

    if (this.isModal) {
      this.modalCtrl.dismiss({
        selected: notebook
      });
    } else {
      this.router.navigateByUrl(`/app/notebooks/${notebook.id}`);
    }
  }

  filterNotebooks(e) {
    const filter = e.detail.value;
    console.log('filter: ', filter);

    if (filter === '') {
      this.loadNotebooks();
    } else {
      this.notebooks = this.notebookService.getNotebooksFiltered(filter);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
