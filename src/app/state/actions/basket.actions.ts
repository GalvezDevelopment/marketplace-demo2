import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from "../../core/models/product";

export const basketActions = createActionGroup({
  source: 'Basket',
  events: {
    'Load': emptyProps(),
    'Add': props<{ product: Product }>(),
    'Remove product': props<{ productSku: string }>(),
    'empty': emptyProps()
  }
});
