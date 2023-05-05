import { User, DataItem } from '../types';

const initialState = {
  user: null as User | null,
  data: null as DataItem[] | null,
  currentItem: 0,
};

export type DataState = typeof initialState;

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.data };
    case 'SET_DATA':
      return { ...state, data: action.data };
    case 'SET_CURRENT_ITEM':
      return { ...state, currentItem: action.currentItem };
    default:
      return state;
  }
};

export default appReducer;
