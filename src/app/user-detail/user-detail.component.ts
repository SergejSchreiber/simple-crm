import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();

  constructor(private route:ActivatedRoute, private firestore: Firestore) { }

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

  editUserDetail() {

  }

  editMenu() {
    
  }

}
