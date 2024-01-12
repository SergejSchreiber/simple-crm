import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate !: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) { }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is:', this.user);
    await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
    console.log('adding user finished');
    this.loading = false;
    this.dialogRef.close();
  }
  

}
