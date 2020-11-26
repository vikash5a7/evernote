import { NotePage } from './../note/note.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async startNote() {
    const modal = await this.modalCtrl.create({
      component: NotePage
    });
    modal.present();
  }
}
