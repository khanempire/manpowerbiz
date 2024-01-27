export const backendURL = () => {
  if (window.location.origin.includes("localhost")) {
    //return `http://localhost:8080/api/v1`;
    return "https://man-powerbiz-30154af295df.herokuapp.com/api/v1";
  } else {
    return `https://man-powerbiz-30154af295df.herokuapp.com/api/v1`;
  }
};
