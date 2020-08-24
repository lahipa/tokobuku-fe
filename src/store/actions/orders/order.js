import * as actionsTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT, dataLogin } from "../../../utils/globals";

export const getAllListOrder = (params, token = "") => {
  const request = axios.get(`${ENDPOINT}/orders`, {
    params,
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_LIST_ORDER,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const getNotification = (params, token = "") => {
  const request = axios.get(`${ENDPOINT}/orders`, {
    params,
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_NOTIF,
          payload: response.data.data.rows,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const getOrderById = (id, token = "") => {
  const request = axios.get(`${ENDPOINT}/orders/${id}`, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.GET_ORDER_BY_ID,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const updateOrder = (id, data, token = "") => {
  const request = axios.put(`${ENDPOINT}/orders/${id}`, data, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.UPDATE_ORDER,
          payload: response.data.data,
        });

        return dispatch(getOrderById(id, token));
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};

export const createOrder = (data, token = "") => {
  const request = axios.post(`${ENDPOINT}/orders/`, data, {
    headers: {
      Authorization: dataLogin ? dataLogin.token : token,
    },
  });

  return (dispatch) => {
    request
      .then((response) => {
        return dispatch({
          type: actionsTypes.CREATE_ORDER,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};
