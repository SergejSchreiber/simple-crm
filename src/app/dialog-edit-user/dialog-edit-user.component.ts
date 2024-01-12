import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user!: User;
  userId!: string;
  birthDate !: Date;
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) {}

  saveUser() {
    // this.loading = true;
    // this.user.birthDate = this.birthDate.getTime();
    // const userDoc = doc(collection(this.firestore, 'users'), this.userId);

    // updateDoc(userDoc, this.user.toJSON()).then(() => {
    //   this.loading = false;
    //   console.log('User updated successfully.');
    //   this.dialogRef.close(); // Optional: Schließe den Dialog nach dem Speichern
    // }).catch(error => {
    //   this.loading = false;
    //   console.error('Error updating user: ', error);
    // });
  }

}
