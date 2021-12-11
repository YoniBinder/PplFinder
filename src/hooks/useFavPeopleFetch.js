import { useState, useEffect } from "react";

export const useFavPeopleFetch = () => {

  const [favUsers, setFavUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavUsers();
  }, []);

  function fetchFavUsers() {
    setIsLoading(true);
    const response = JSON.parse(localStorage.getItem('favorites'))||[];
    setIsLoading(false);
    setFavUsers(response);
  }

  return { favUsers,isLoading, fetchFavUsers };

};
