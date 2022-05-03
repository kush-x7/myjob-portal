// We are using jsCookie to store the user in cookies
import jsCookie from "js-cookie";

// Function to set the user from the cookies
export const saveUserToLocal = (userData) => {
  // We are using jsCookie to store the user in cookies
  // JSON.stringify is used to convert the userData to string
  jsCookie.set("user", JSON.stringify(userData), {
    expires: 10
  });
};

// Function to remove the user from the cookies
export const removeUserFromLocal = () => {
  jsCookie.remove("user");
};

export const getUserType = (userRole) => {
  if (userRole === 0) {
    return "recruiter";
  } else {
    return "candidate";
  }
};

// TODO: shift this function to input field
export const getErrorMessage = (error) => {
  return error?.response?.data?.message || "something went wrong";
};

// TODO: learn an easy way to do this
export const formatError = (e) => {
  return e.response?.data?.errors?.reduce((acc, err) => ({ ...acc, ...err }), {});
};
