const baseUrl = "https://jsonplaceholder.typicode.com";

class AjaxHelper {
  getData = async (endpoint = "") => {
    const response = await fetch(baseUrl + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  postData = async (endpoint = "", data = {}) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  putData = async (endpoint = "", data = {}) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  deleteData = async (endpoint = "") => {
    const response = await fetch(baseUrl + endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };
}

export default AjaxHelper;
