const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };

    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };

    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };

    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case "UPDATE_USERS":
      return { ...state, users: action.payload };

    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "UPDATE_EVENTS":
      return { ...state, events: action.payload };

    default:
      throw new Error("No matched action!");
  }
};

export default reducer;
