import creatrfoodcontext from "./createdonercontext";
import Doner from "../API/Doner";

//This is used to get the data of the Specfic Doner Categoy from the API

const Foodreducer = (state, action) => {
  switch (action.type) {
    case "get_cat_data":
      return action.payload;
    default:
      return state;
  }
};

const getcatdata = (dispatch) => {
  return async (cat) => {
    const response = await Doner.get(
      `/user.json?orderBy="donation_Type"&equalTo="${cat}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_cat_data", payload: a });
  };
};

export const { Context, Provider } = creatrfoodcontext(
  Foodreducer,
  {
    getcatdata,
  },
  []
);
