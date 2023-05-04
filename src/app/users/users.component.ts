import {Component, OnInit} from '@angular/core';
import {UsersStore} from "./users.store";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public readonly users$ = this.store.users$;
  public readonly error$ = this.store.error$;

  constructor(private readonly store: UsersStore) {
  }

  public ngOnInit(): void {
    this.store.init();
  }
}
