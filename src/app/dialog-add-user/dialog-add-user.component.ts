import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  // firestore: Firestore = inject(Firestore)
  user = new User();
  birthDate !: Date; 

  constructor(private firestore: Firestore) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is:', this.user);

    addDoc(collection(this.firestore, 'users'), this.user.toJSON());
      console.log('adding user finished');
  }

}
