export const fetchData = async (requestBody, token) => {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed!");
    }

    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};
