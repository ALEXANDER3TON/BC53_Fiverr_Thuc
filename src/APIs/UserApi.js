import fetcher from "./fetcher";

export const registerAPI = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signup", payload);
    console.log("response", response);
    return response.data.content;
  } catch (error) {
    throw alert("loi~");
  }
};


