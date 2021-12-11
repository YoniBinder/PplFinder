import { useState, useEffect } from "react";

export const useFavPeopleFetch = () => {

  const [favUsers, setFavUsers] = useState([]);

  useEffect(() => {
    fetchFavUsers();
  }, []);

  async function fetchFavUsers() {
    const response = await JSON.parse(localStorage.getItem('favorites'))||[];
    setFavUsers(response);
  }

  return { favUsers,fetchFavUsers };

};
