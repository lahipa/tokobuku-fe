import * as actionsTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT, dataLogin } from "../../../utils/globals";

export const getListCart = (uid, token = "") => {
  const request = axios.get(`${ENDPOINT}/cart?uid=${uid}`, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_LIST_CART,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const substractFromCart = (id, data, token = "") => {
  const request = axios.put(`${ENDPOINT}/cart/${id}`, data, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.UPDATE_CART_LIST,
          payload: response.data.data,
        });

        return dispatch(getListCart(data.user_id, token));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const removeFromCart = (id, uid, token = "") => {
  const request = axios.delete(`${ENDPOINT}/cart/${id}`, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.REMOVE_FROM_CART,
          payload: response.data.data,
        });

        return dispatch(getListCart(uid, token));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const addToCart = (data, token = "") => {
  const request = axios.post(`${ENDPOINT}/cart/`, data, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.ADD_TO_CART,
          payload: response.data.data,
        });

        return dispatch(getListCart(data.user_id, token));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

// Async Await Approach
// --
// export const addToCart = (data, token) => {
//   console.log(data, "data from add action");

//   return async (dispatch) => {
//     try {
//       const request = await axios.post(`${ENDPOINT}/cart/`, data, {
//         headers: {
//           Authorization: dataLogin ? dataLogin.token : token,
//         },
//       });

//       return dispatch(
//         {
//           type: actionsTypes.ADD_TO_CART,
//           payload: request.data.data,
//         },

//         dispatch(getListCart(data.user_id))
//       );
//     } catch (err) {
//       console.log(err.response);
//       return err.response;
//     }
//   };
// };
