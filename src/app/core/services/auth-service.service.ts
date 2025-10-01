// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  login()  { this._isLoggedIn$.next(true); }
  logout() { this._isLoggedIn$.next(false); }

  // snapshot opcional (evita subscribe só p/ ler)
  get isLoggedInSnapshot() { return this._isLoggedIn$.getValue(); }
}
