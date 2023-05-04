import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {User} from "./model";
import {Observable} from "rxjs";

@Injectable()
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);

  public fetchUsers$(): Observable<User[]> {
    const url: string = 'https://644834f250c25337443b088a.mockapi.io/users';

    return this.http.get<User[]>(url);
  }

  public createUser$(user: Partial<User>): Observable<User[]> {
    const url: string = 'https://644834f250c25337443b088a.mockapi.io/users';

    return this.http.get<User[]>(url);
  }
}
