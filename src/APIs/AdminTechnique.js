import fetcher from "./fetcher";

export const getUserAPI = async () => {
  try {
    const response = await fetcher.get("/users");
    return response.data.content;
  } catch (error) {
    throw alert("Loi~");
  }
};

export const getListUserPagination = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get("/users/phan-trang-tim-kiem", {
      params: {
        keyword: keyword || "",
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
    return response.data.content;
  } catch (error) {}
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await fetcher.delete("/users", {
      params: {
        id: userId,
      },
    });
  } catch (error) {}
};

export const getUserByIdAPI = async (userId) => {
  console.log("userId", userId);
  try {
    const response = await fetcher.get(`/users/${Number(userId)}`);
    console.log("response", response.data.content);
    return response.data.content;
  } catch (error) {}
};

export const UpdateUserData = async ( payload) => {
  
  console.log('payload', payload)
  try {
    const response = await fetcher.put(`/users/${Number(payload.id)}`, payload);
  } catch (error) {}
};
