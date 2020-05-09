import creatrfoodcontext from "./createdonercontext";
import Doner from "../API/Doner";

const Foodreducer = (state, action) => {
  switch (action.type) {
    case "get_login_data":
      return action.payload;
    case "get_filter":
      return action.payload;
    case "get_cat_data":
      return action.payload;
    case "get_SUser_data":
      return action.payload;
    default:
      return state;
  }
};

const getlogindata = (dispatch) => {
  return async (name) => {
    const response = await Doner.get(
      `/login.json?orderBy="user"&equalTo="${name}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_login_data", payload: a });
  };
};

const getSingleuserdata = (dispatch) => {
  return async () => {
    const response = await Doner.get(`/user.json`);
    dispatch({ type: "get_SUser_data", payload: response.data });
  };
};

const putcomment = (dispatch) => {
  return async (data, callback) => {
    var response = await Doner.get(`/user/${data.id - 1}/reviews.json`);
    await Doner.put(
      `/user/${data.id - 1}/reviews/${
        response.data == null ? 0 : response.data.length
      }.json`,
      { comment: data.comment, name: data.name, title: data.title }
    );
    callback();
  };
};

const putregistrationdata = (dispatch) => {
  return async (data, callback) => {
    var response = await Doner.get(`/user.json`);
    await Doner.put(`/user/${response.data.length}.json`, {
      id: response.data.length + 1,
      title: data.title,
      name: data.name,
      age: data.age,
      DOB: data.DOB,
      address: data.address,
      donation_Type: data.donation_Type,
      status: data.status,
      religion: data.religion,
      email: data.email,
      Location: data.Location,
      ph: data.ph,
    });
    var id = response.data.length + 1;
    response = await Doner.get(`/login.json`);
    await Doner.put(`/login/${response.data.length}.json`, {
      id: id,
      user: data.email,
      pass: data.password,
      name: data.title + data.name,
      account_type: "Person",
    });
    callback();
  };
};

const putrevorypass = (dispatch) => {
  return async (data, callback) => {
    await Doner.put(`/login/${data.id - 1}.json`, {
      id: data.id,
      user: data.email,
      pass: data.pass,
      account_type: data.type,
    });
    callback();
  };
};

export const { Context, Provider } = creatrfoodcontext(
  Foodreducer,
  {
    putrevorypass,
    putregistrationdata,
    getlogindata,
    getSingleuserdata,
    putcomment,
  },
  []
);
