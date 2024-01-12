import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user!: User;
  userId!: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) {}

  saveUser() {
    this.loading = true;

    if (!this.user.customIdName) {
      console.error('Error: customIdName is undefined or null.');
      this.loading = false;
      return;
    }

    const usersCollection = collection(this.firestore, 'users');
    const userDoc = doc(usersCollection, this.userId);

    // Überprüfe, ob user.toJSON() einen Wert hat
    const userData = this.user.toJSON();
    if (!userData) {
      console.error('Error: userData is undefined or null.');
      this.loading = false;
      return;
    }

    updateDoc(userDoc, userData).then(() => {
      console.log('User updated successfully');
      this.loading = false;
      this.dialogRef.close();
    }).catch(error => {
      console.error('Error updating user: ', error);
      this.loading = false;
    });
  }

}
