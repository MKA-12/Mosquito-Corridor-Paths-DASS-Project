import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialstate = {
    items: [
        { ItemName: 'Eggs', ItemQuantity: '12' },
        { ItemName: 'Apples', ItemQuantity: '6' }
    ]
}

export default function(state = initialstate, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state
            };
        default:
            return state;
    }
}