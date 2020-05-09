import creatrfoodcontext from "./createdonercontext";
import Doner from "../API/Doner";

const Foodreducer = (state, action) => {
  switch (action.type) {
    case "get_filter":
      return action.payload;
    default:
      return state;
  }
};

const getsearch = (dispatch) => {
  return async (value) => {
    const response = await Doner.get(
      `/user.json?orderBy="donation_Type"&startAt="${value}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_filter", payload: a });
  };
};

export const { Context, Provider } = creatrfoodcontext(
  Foodreducer,
  {
    getsearch,
  },
  []
);
