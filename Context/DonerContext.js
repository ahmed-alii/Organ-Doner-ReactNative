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
    console.log("search rec");
    console.log(a);
    dispatch({ type: "get_filter", payload: a });
  };
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
    console.log(a);
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
    const response = await Doner.get(
      `/user.json?orderBy="donation_Type"&equalTo="${data.name}"&print=pretty`
    );
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
      DOB: data.dob,
      address: data.address,
      donation_Type: data.donation_Type,
      status: data.status,
      religion: data.religion,
      email: data.email,
      ph: data.phone,
    });
    var id = response.data.length + 1;
    response = await Doner.get(`/login.json`);
    await Doner.put(`/login/${response.data.length}.json`, {
      id: id,
      user: data.email,
      pass: data.password,
      account_type: data.type,
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
    putrevorypass,
    putregistrationdata,
    getlogindata,
    getsearch,
    getSingleuserdata,
  },
  []
);
