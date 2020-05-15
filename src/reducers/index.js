import { combineReducers } from "redux";

import { users } from "./users.reducer";
import { schedules } from "./schedules.reducer";
import { rooms } from "./rooms.reducer";
import { products } from "./products.reducer";
import { receipts } from "./receipts.reducer";

const rootReducer = combineReducers({
  users,
  schedules,
  rooms,
  products,
  receipts,
});

export default rootReducer;
