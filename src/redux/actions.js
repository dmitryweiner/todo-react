import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM} from "./action-types";

export const addItem = item => ({ type: ADD_ITEM, payload: item });

export const updateItem = item => ({ type: UPDATE_ITEM, payload: item });

export const removeItem = id => ({ type: REMOVE_ITEM, payload: id });
