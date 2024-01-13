import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc } from '@angular/fire/firestore';

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

  async saveUser() {
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');
    const userDoc = doc(usersCollection, this.userId);
    const updatedUserData = this.getDefinedProperties(this.user.toJSON());

    updateDoc(userDoc, updatedUserData).then(() => {
      console.log('User updated successfully');
      this.loading = false;
      this.dialogRef.close();
    }).catch(error => {
      console.error('Error updating user: ', error);
      this.loading = false;
    });
  }

  private getDefinedProperties(obj: any): any {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        result[key] = value;
      }
    }
    return result;
  }

}
