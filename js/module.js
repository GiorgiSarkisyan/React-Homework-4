export const fetchApiFunction = () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ინტერნეტი გიჭედავს");
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.map((item) => ({
          name: item.name,
          username: item.username,
          email: item.email,
          street: item.address.street,
        }));
        return filteredData;
      })
      .catch((error) => {
        console.error("ფეჩმა დაგიერორა სულელოოო და", error);
      });
  };
  