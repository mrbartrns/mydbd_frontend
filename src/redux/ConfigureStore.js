import { createStore } from "redux";
import modules from "./modules";

// TODO: middleware, react-hot-lader 적용
const configureStore = (initialState) => {
  const store = createStore(
    modules,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore;
