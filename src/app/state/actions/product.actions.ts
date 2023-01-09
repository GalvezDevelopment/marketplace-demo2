import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from "../../core/models/product";

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    'Load list': emptyProps(),
    'Loaded list': props<{ products: Product[] }>(),
    'Update list': props<{ products: Product[] }>(),
    'Purchase': emptyProps(),
    'Purchased': emptyProps()
  }
});
