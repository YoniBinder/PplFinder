import React, { useState, useEffect } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const FavoritesList = () => {


  const [favUsersList, setFavUsersList] = useState([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavUsersList(response);
  }, []);

  function handleFavorite(index) {
    let arr = [...favUsersList];
    arr.splice(index, 1);

    localStorage.setItem("favorites", JSON.stringify(arr));
    setFavUsersList(arr);
  }


  return (
    <S.UserList>
      <S.List>
        {favUsersList.map((user, index) => {
          return (
            <S.User
              key={index}
              onClick={() => handleFavorite(index)}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={true}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.UserList>
  );
};

export default FavoritesList;
