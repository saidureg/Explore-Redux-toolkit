const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

// product constants
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

// // cart constants
// const GET_CART_ITEMS = "GET_CART_ITEMS";
// const ADD_CART_ITEM = "ADD_CART_ITEM";

// product initial state
const initialProductState = {
  products: ["Apple", "Orange", "Banana"],
  numberOfProducts: 3,
};

// cart initial state
// const initialCartState = {
//   carts: ["Apple"],
//   numberOfProducts: 1,
// };

// product actions
const get_products = () => {
  return {
    type: GET_PRODUCTS,
  };
};

const add_product = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

// cart actions
// const get_carts = () => {
//   return {
//     type: GET_CART_ITEMS,
//   };
// };

// const add_cart = (product) => {
//   return {
//     type: ADD_CART_ITEM,
//     payload: product,
//   };
// };

// product reducer
const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCT:
      return {
        products: [...state.products, action.payload],
        numberOfProducts: state.numberOfProducts + 1,
      };
    default:
      return state;
  }
};

// cart reducer
// const cartReducer = (state = initialCartState, action) => {
//   switch (action.type) {
//     case GET_CART_ITEMS:
//       return {
//         ...state,
//       };
//     case ADD_CART_ITEM:
//       return {
//         carts: [...state.carts, action.payload],
//         numberOfProducts: state.numberOfProducts + 1,
//       };
//     default:
//       return state;
//   }
// };

// root reducer
// const rootReducer = combineReducers({
//   productR: productReducer,
//   cartR: cartReducer,
// });

// product store
const store = createStore(productReducer, applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(get_products());
store.dispatch(add_product("Mango"));

// store.dispatch(get_carts());
// store.dispatch(add_cart("Mango"));
