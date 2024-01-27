import axios from "axios";
import appendSerialNumber from "./apiCallAppenders";
import { failureNotification } from "./notificationHelper";
import { backendURL } from "./config";

const baseURI = backendURL();

export const getCallWithOutHeaders = async (endpoint) => {
  try {
    let apiResponse = await axios({
      method: "get",
      url: `${baseURI}/${endpoint}`,
    });
    if (apiResponse.data.error) {
      failureNotification(`${apiResponse.data.msg}`);
    }
    console.log(apiResponse);
    return appendSerialNumber(apiResponse.data.data);
  } catch (error) {
    console.log(error);
    failureNotification(`${error}`);
  }
};
export const getCallWithHeaders = async (endpoint) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}`,
    });
    console.log(apiResponse);
    if (apiResponse.data.error) {
      failureNotification(`${apiResponse.data.msg}`);
    }
    return appendSerialNumber(apiResponse.data.data);
  } catch (error) {
    console.log(error);
    failureNotification(`${error}`);
  }
};

export const adminDashboardCall = async (endpoint) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}`,
    });
    if (apiResponse.data.error) {
      failureNotification(`${apiResponse.data.msg}`);
    }
    return apiResponse.data;
  } catch (error) {
    console.log(error);
    failureNotification(`${error}`);
  }
};

export const customerDashboardCall = async (endpoint, id) => {
  try {
    let apiResponse = await axios({
      method: "get",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    if (apiResponse.data.error) {
      failureNotification(`${apiResponse.data.msg}`);
    }
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCallSpecificWithoutHeaders = async (endpoint, id) => {
  try {
    let apiResponse = await axios({
      method: "get",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    if (apiResponse.data.error) {
      failureNotification(`${apiResponse.data.msg}`);
    }
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCallSpecificWithHeaders = async (endpoint, id) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const postCallWithHeaders = async (endpoint, data) => {
  console.log(data);
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "post",
      url: `${baseURI}/${endpoint}`,
      data: data,
    });
    console.log("aoi reponse", apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const postCallWithoutHeaders = async (endpoint, data) => {
  try {
    let apiResponse = await axios({
      method: "post",
      url: `${baseURI}/${endpoint}`,
      data: data,
    });
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const editCallWithHeaders = async (endpoint, id, data) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "put",
      url: `${baseURI}/${endpoint}/${id}`,
      data: data,
    });
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const editCallWithoutHeaders = async (endpoint, id, data) => {
  try {
    let apiResponse = await axios({
      method: "put",
      url: `${baseURI}/${endpoint}/${id}`,
      data: data,
    });
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCallWithHeaders = async (
  endpoint,
  id,
  refresh,
  setRefresh,
  setLoading
) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "delete",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    if (!apiResponse.data.error) {
      setLoading(false);
      setRefresh(!refresh);
    } else {
      failureNotification(apiResponse.data.msg);
      setLoading(false);
      setRefresh(!refresh);
    }
    return apiResponse.data;
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
