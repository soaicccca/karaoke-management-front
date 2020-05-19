//import { authHeader } from "../_helpers";
import axios from "axios";

export const scheduleService = {
  getAll,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios.get(`/api/schedules/`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/schedules/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(schedule) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(schedule);
  console.log(body);

  return await axios
    .post("/api/schedules", body, requestConfig)
    .then(handleResponse);
}

async function update(id, schedule) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(schedule);
  console.log(body);

  return await axios
    .put(`/api/schedules/${id}`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`/api/schedules/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (response.status === 404) {
    // if (response.status === 401) {
    //   // auto logout if 401 response returned from api
    //   //logout();
    //   location.reload(true);
    // }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}