import React, { useState, useEffect } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const FavoritesList = ({favUsers}) => {


  const [favUsersList, setFavUsersList] = useState([]);

  useEffect(() => {
    setFavUsersList(favUsers);
  }, [favUsers]);

  function removeFavorite(index) {
    let newFavList = [...favUsersList];
    newFavList.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(newFavList));
    setFavUsersList(newFavList);
  }


  return (
    <S.UserList>
      <S.List>
        {favUsersList.map((user, index) => {
          return (
            <S.User
              key={index}
              onClick={() => removeFavorite(index)}
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
