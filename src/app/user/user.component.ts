import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');

    collectionData(usersCollection).subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
