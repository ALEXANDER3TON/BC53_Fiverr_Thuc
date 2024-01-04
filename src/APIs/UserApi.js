import fetcher from "./fetcher";

export const registerAPI = async (payload) => {
console.log('payload', payload)
  try {
    const response = await fetcher.post("/users", payload);
  
    return response.data.content;
  } catch (error) {
    throw alert("loi~");
  }
};


