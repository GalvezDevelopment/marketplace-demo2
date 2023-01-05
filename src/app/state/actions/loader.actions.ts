import { Action, createActionGroup, emptyProps, props } from '@ngrx/store';

export const loaderActions = createActionGroup({
  source: 'Loader',
  events: {
    Add: props<{ action: Action }>(),
    Remove: props<{ action: Action }>()
  }
})
