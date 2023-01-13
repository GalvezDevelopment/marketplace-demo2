import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, tap } from "rxjs";
import { selectBasketTotal } from "../../../state/selectors/basket.selectors";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private readonly store: Store, private readonly route: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectBasketTotal).pipe(
      map(total => total > 0),
      tap(state => !state && this.route.navigate(['/']))
    );
  }
}
