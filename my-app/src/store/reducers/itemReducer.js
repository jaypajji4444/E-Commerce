import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'

import * as actionTypes from "../actions/actionTypes"


const initState = {
    items: [
        { id: 1, title: 'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110, img: Item1 },
        { id: 2, title: 'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80, img: Item2 },
        { id: 3, title: 'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 120, img: Item3 },
        { id: 4, title: 'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 260, img: Item4 },
        { id: 5, title: 'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 160, img: Item5 },
        { id: 6, title: 'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 90, img: Item6 }
    ],

    addedItems: [],
    total: 0

}

const addItem = (state, action) => {
    console.log(state)
    const addedItem = state.items.find(item => item._id === action.itemId)
    let existed_item = state.addedItems.find(item => action.itemId === item._id)
    console.log(action.itemId)
    if (existed_item) {
        addedItem.qty = addedItem.qty + 1
        return {
            ...state,
            total: state.total + addedItem.price
        }
    }
    else {
        addedItem.qty = 1
        const newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal,
            addedItems: [...state.addedItems, addedItem]
        }
    }
}


const deleteItem = (state, action) => {
    const jay = state.addedItems.filter(x => {
        return x._id !== action.itemId
    })
    const findItem = state.addedItems.find(x => x._id === action.itemId)

    const reduceCost = findItem.qty * findItem.price
    const newCost = state.total - reduceCost
    return {
        ...state,
        addedItems: jay,
        total: newCost
    }

}

const setItems = (state, action) => {
    return {
        ...state,
        items: action.items
    }
}

const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return addItem(state, action)
        case actionTypes.DELETE_FROM_CART:
            return deleteItem(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setItems(state, action)
            case actionTypes.REMOVE_ITEM:
                return state    
        default:
            return state

    }
}

export default itemReducer