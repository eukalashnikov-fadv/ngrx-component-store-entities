import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../model';
import { UsersService } from '../users.service';
import { exhaustMap, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface UsersState extends EntityState<User> {
  currentUserId: string | null;
  error: Error | null;
}

export const adapter = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  currentUserId: null,
  error: null,
});

const { selectAll, selectEntities } = adapter.getSelectors();

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  users$ = this.select(selectAll);
  userEntities$ = this.select(selectEntities);
  currentUseId$ = this.select((state) => state.currentUserId);
  selectedUser$ = this.select(
    this.userEntities$,
    this.currentUseId$,
    (entities, currentId) => (currentId ? entities[currentId] : undefined)
  );

  error$ = this.select((state) => state.error);

  constructor(private readonly usersService: UsersService) {
    super(initialState);
  }

  public init() {
    this.fetchUsers();
  }

  fetchUsers = this.effect((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.usersService.fetchUsers$().pipe(
          tapResponse(
            (users: User[]) => {
              this.setState((state) => adapter.addMany(users, state));
            },
            (error: HttpErrorResponse) => {
              this.setState((state) =>
                adapter.removeAll({ ...state, currentUserId: null, error })
              );
            }
          )
        )
      )
    )
  );

  createUser = this.effect((newUser$: Observable<User>) =>
    newUser$.pipe(
      exhaustMap((newUser) =>
        this.usersService.createUser$(newUser).pipe(
          tapResponse(
            (users: User[]) => {
              this.setState((state) => adapter.addMany(users, state));
            },
            (error: HttpErrorResponse) => {
              this.setState((state) =>
                adapter.removeAll({ ...state, currentUserId: null, error })
              );
            }
          )
        )
      )
    )
  );
}
