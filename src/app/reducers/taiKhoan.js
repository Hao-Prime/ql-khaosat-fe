const taiKhoan = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "SET_USER_LOGIN":
      return action.payload;
    case "SET_USER_ZALO":
      return action.payload;
    case "SET_VAITRO":
      return action.payload;
    default:
      return state;
  }
};

export default taiKhoan;
