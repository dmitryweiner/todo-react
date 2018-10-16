import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM} from "./action-types";
import {store} from "../Store";
import uuidv1 from "uuid";

const initialState = {
    items: store.getItems()
};

const rootReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ITEM:
            const item = action.payload;
            item["id"] = uuidv1();
            newState = {...state, items: [...state.items, item]};
            break;
        case REMOVE_ITEM:
            newState = {...state, items: state.items.filter((item) => item.id !== action.payload)};
            break;
        case UPDATE_ITEM:
            newState = {...state, items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                })};
            break;
        default:
            newState = {...state};
            break;
    }
    store.setItems(newState.items);
    return newState;
};
export default rootReducer;