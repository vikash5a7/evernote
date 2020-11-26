import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface Notebook {
  name: string;
  created: any;
}

export interface Note {
  content: string;
  title: string;
  notebook: any;
  created: any;
  favourite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private notebooksCollection: AngularFirestoreCollection<Notebook>;
  private notebooks: Observable<Notebook[]>;

  constructor(private afs: AngularFirestore) {
    this.notebooksCollection = this.afs.collection<Notebook>('notebooks');
    this.notebooks = this.notebooksCollection.valueChanges({idField: 'id'});
  }

  addNotebook(name: string) {
    return this.notebooksCollection.add({
      name,
      created: firebase.firestore.Timestamp.now()
    });
  }

  getNotebooks() {
    return this.notebooks;
  }

  getNotebookList() {
    return this.notebooksCollection.valueChanges({idField: 'id'}).pipe(
      take(1)
    );
  }

  addNote(note: Note) {
    if (note.notebook) {
      note.notebook = this.afs.doc(`/notebooks/${note.notebook.id}`).ref;
    }
    note.created = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection<Note>('notes').add(note);
  }

  getNotebook(id) {
    return this.notebooksCollection.doc(id).snapshotChanges().pipe(
      take(1),
      map(actions => {
        const data = actions.payload.data() as Notebook;
        // tslint:disable-next-line: no-shadowed-variable
        const id = actions.payload;
        return { id, ...data };
      })
    );
  }

  getNotesForBook(id) {
    const pObj = this.afs.doc(`notebooks/${id}`).ref;

    return this.afs.collection<Note>('notes', ref => ref.where('notebook', '==', pObj))
    .valueChanges({idField: 'id'});
  }

  getNote(id) {
    return this.afs.doc<Note>(`notes/${id}`).valueChanges();
  }

  updateNote(id, note) {
    console.log('save: ', note);
    if (note.notebook) {
      note.notebook = this.afs.doc(`/notebooks/${note.notebook.id}`).ref;
    }
    console.log('save note now: ', note);

    note.changed = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.doc(`notes/${id}`).update(note);
  }

  getNotebooksFiltered(filter) {
    const end = '\uf8ff';
    return this.afs.collection('notebooks', ref =>
    ref.orderBy('name')
    .startAt(filter)
    .endAt(end))
    .valueChanges({idField: 'id'});
  }

  getFavourites() {
    return this.afs.collection<Note>('notes', ref => ref.where('favourite', '==', true))
    .valueChanges({idField: 'id'});
  }

  deleteNote(id) {
    this.afs.doc<Note>(`notes/${id}`).delete();
  }
}
