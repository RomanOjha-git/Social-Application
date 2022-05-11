const initialMessage = {
  messageTo: "",
  picture: "",
  message: [],
};

// this action will Store the messge of rootUser message to other people and which is currently fetch
const setCurrentUserMessageReducer = (state = initialMessage, action) => {
  if (action.type === "currentUserMessage") {
    return {
      ...action.payload,
      message: action.payload.message.reverse(),
    };
  } else if (action.type === "appendOnMessage") {
    return {
      ...state,
      message: [action.payload, ...state.message],
    };
  } else {
    return state;
  }
};

export default setCurrentUserMessageReducer;