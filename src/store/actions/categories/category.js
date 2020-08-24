import * as actionsTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT, dataLogin } from "../../../utils/globals";

export const getListKategori = (params) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(`${ENDPOINT}/kategori`, { params });

      return dispatch({
        type: actionsTypes.GET_LIST_KATEGORI,
        payload: request.data.data,
      });
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
};

export const updateKategori = (id, data) => {
  return async (dispatch) => {
    try {
      const request = await axios.put(`${ENDPOINT}/kategori/${id}`, data, {
        headers: {
          Authorization: dataLogin.token,
        },
      });

      return dispatch(
        {
          type: actionsTypes.UPDATE_KATEGORI,
          payload: request.data.data,
        },

        dispatch(getListKategori())
      );
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
};

export const deleteKategori = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.delete(`${ENDPOINT}/kategori/${id}`, {
        headers: {
          Authorization: dataLogin.token,
        },
      });

      return dispatch(
        {
          type: actionsTypes.DELETE_KATEGORI,
          payload: request.data.data,
        },

        dispatch(getListKategori())
      );
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
};

export const addKategori = (data) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(`${ENDPOINT}/kategori`, data, {
        headers: {
          Authorization: dataLogin.token,
        },
      });

      return dispatch(
        {
          type: actionsTypes.ADD_KATEGORI,
          payload: request.data.data,
        },

        dispatch(getListKategori())
      );
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
};
