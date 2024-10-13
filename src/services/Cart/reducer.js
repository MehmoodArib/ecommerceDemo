import {ADD_ITEM_TO_CART, DECREMENT_QUANTITY, REMOVE_ITEM} from './constants';

const initialAppState = {
  items: [],
};

export const CartReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const itemToAdd = action.payload; // The new item to add
      const existingItemIndex = state.items.findIndex(
        item => item.id === itemToAdd.id,
      ); // Check if the product already exists

      // If the item already exists in the cart
      if (existingItemIndex !== -1) {
        // Create a new items array with the updated quantity
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            // Update the quantity of the existing item
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems, // Return the updated items array
        };
      }

      // If the item does not exist, add it to the cart with quantity 1
      return {
        ...state,
        items: [...state.items, {...itemToAdd, quantity: 1}], // Add the new item with quantity 1
      };
    }

    case DECREMENT_QUANTITY: {
      const itemIdToRemove = action.payload;

      // Check if the item exists in the cart
      const existingItem = state.items.find(item => item.id === itemIdToRemove);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrease quantity by 1
          const updatedItems = state.items.map(item =>
            item.id === itemIdToRemove
              ? {...item, quantity: item.quantity - 1}
              : item,
          );
          return {
            ...state,
            items: updatedItems,
          };
        } else {
          // If quantity is 1, remove the item completely
          const filteredItems = state.items.filter(
            item => item.id !== itemIdToRemove,
          );
          return {
            ...state,
            items: filteredItems,
          };
        }
      }

      return state; // If item doesn't exist, return current state
    }
    case REMOVE_ITEM: {
      const itemIdToRemove = action.payload;

      // Filter out the item with the matching id
      const filteredItems = state.items.filter(
        item => item.id !== itemIdToRemove,
      );

      return {
        ...state,
        items: filteredItems,
      };
    }

    default:
      return state;
  }
};
