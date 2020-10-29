import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }
}
