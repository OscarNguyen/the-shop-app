import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQty = state.items[action.productId].quantity;
      let updatedCart;
      if (currentQty > 1) {
        // const updatedCartItem = new CartItem(
        //   selectedCartItem.quantity - 1,
        //   selectedCartItem.productPrice,
        //   selectedCartItem.productTitle,
        //   selectedCartItem.sum - selectedCartItem.productPrice,
        // );
        // updatedCart = { ...state.items, [action.productId]: updatedCartItem };
        updatedCart = {
          // ...state,
          // items: {
          ...state.items,
          [action.productId]: {
            ...state.items[action.productId],
            quantity: currentQty - 1,
            sum: selectedCartItem.sum - selectedCartItem.productPrice,
          },
          //  },
        };
      } else {
        updatedCart = { ...state.items };
        delete updatedCart[action.productId];
        //  const updatedCart = delete state.items[action.productId];
      }
      return {
        ...state,
        items: {
          ...updatedCart,
        },
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
  }
  return state;
};
