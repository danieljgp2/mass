import axios from "axios";

export const METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

function getHeaders({ useBaseHeaders = false } = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (useBaseHeaders) {
    return headers;
  }

  const token = JSON.parse(localStorage.getItem('vuex'))?.user.data.token;
  const tokenHeader = token ? { Authorization: `${token}` } : {};

  return {
    ...headers,
    ...tokenHeader
  };
}

export const doRequest = (
  {
    method = METHOD.GET,
    path,
    content = {},
    headers = {},
    config = {
      useBaseHeaders: false
    }
  }
) => {
  if (!path) {
    throw new Error('path is required');
  }
  const domain = `${process.env.VUE_APP_API_URL}/`;
  const url = `${domain}${path}`;
  const allHeaders = {
    ...getHeaders(config),
    ...headers
  };
  const data = method !== METHOD.GET ? content : null;

  return axios({
    method,
    url,
    headers: allHeaders,
    data
  })
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      throw err.response.data;
    });
}
