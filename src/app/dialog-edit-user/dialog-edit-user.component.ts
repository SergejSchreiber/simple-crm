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
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
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
