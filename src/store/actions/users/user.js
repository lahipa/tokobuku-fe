import * as actionsTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT, dataLogin } from "../../../utils/globals";

export const getListUser = (params, token = "") => {
  //console.log(params, "ini params");
  const request = axios.get(`${ENDPOINT}/users`, {
    params,
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_USER,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const getUserById = (id, token = "") => {
  const request = axios.get(`${ENDPOINT}/users/${id}`, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_USER_BY_ID,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const updateUser = (id, data, token = "") => {
  const request = axios.put(`${ENDPOINT}/users/${id}`, data, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.UPDATE_USER,
          payload: response.data.data,
        });

        return dispatch(getListUser(null, token));
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

// export const deleteUser = (id, token = "") => {
//   const request = axios.delete(`${ENDPOINT}/users/${id}`, {
//     headers: {
//       Authorization: dataLogin ? dataLogin.token : token,
//     },
//   });

//   return (dispatch) => {
//     request
//       .then((response) => {
//         dispatch({
//           type: actionsTypes.DELETE_USER,
//           payload: response.data,
//         });
//         return dispatch(getListUser(null, token));
//       })
//       .catch((err) => {
//         console.log(err.response);
//         return err.response;
//       });
//   };
// };

export const registerUser = (data) => {
  const request = axios.post(`${ENDPOINT}/users/register`, data);

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.ADD_USER,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const loginUser = (data) => {
  const request = axios.post(`${ENDPOINT}/users/login`, data);

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch(
          {
            type: actionsTypes.LOGIN_USER,
            payload: response.data,
            isLogin: true,
          },

          window.localStorage.setItem(
            "dataLogin",
            JSON.stringify(response.data.data)
          )
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

// Async Await Approach
// --
// export const loginUser = (data) => {
//   return async (dispatch) => {
//     try {
//       //console.log(data, "ini data dari user login");
//       const request = await axios.post(`${ENDPOINT}/users/login`, data);

//       return dispatch(
//         {
//           type: actionsTypes.LOGIN_USER,
//           payload: request.data.data,
//           isLogin: true,
//         },

//         //console.log(request.data.data, "data user")
//         window.localStorage.setItem(
//           "dataLogin",
//           JSON.stringify(request.data.data)
//         )
//       );
//     } catch (err) {
//       return err.response;
//     }
//   };
// };
