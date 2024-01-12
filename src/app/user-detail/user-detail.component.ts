import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();

  constructor(private route:ActivatedRoute, 
    private firestore: Firestore, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id') ?? '';
      console.log('Got ID', this.userId);
      this.getUser();
    })
  }

  getUser() {
    const usersCollection = collection(this.firestore, 'users');
    const userDoc = doc(usersCollection, this.userId);

    getDoc(userDoc).then((userData: DocumentSnapshot<any>) => {
      if (userData.exists()) {
        this.user = userData.data();
        console.log('Retrieved user: ', this.user);
      } 
    }).catch(error => {
      console.error('Error getting user: ', error);
    });
  }
  
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }
  
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }
  
}
