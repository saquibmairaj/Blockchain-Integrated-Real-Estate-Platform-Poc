module.exports = (e) => {
  try {
    if (typeof e !== "string") {
      console.error("Invalid error format. Expected a string.");
      return;
    }    
  } catch (globalError) {
    console.error("Unexpected error inside errorHandler:", globalError.message);
  }
};