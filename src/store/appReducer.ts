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
    case 'UPDATE_VALUE':
      const newData = state.data?.map((item, index) => {
        if (index === action.currentItem) {
          return {
            ...item,
            attributes: item.attributes.map(attr => {
              if (attr.name === action.attributeName) {
                return { ...attr, value: action.value };
              }
              return attr;
            }),
          };
        }
        return item;
      });

      return { ...state, data: newData || null };
    default:
      return state;
  }
};

export default appReducer;
