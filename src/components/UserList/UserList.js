import React, { useState, useEffect } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [clickedUserId, setClickedUserId] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState();
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountries] = useState([
    { value: "BR", label: "Brazil", isChecked: false },
    { value: "AU", label: "Australia", isChecked: false },
    { value: "CA", label: "Canada", isChecked: false },
    { value: "DE", label: "Germany", isChecked: false },
    { value: "SP", label: "Spain", isChecked: false },
  ]);

  // get users
  useEffect(() => {
    setUsersList(users);
  }, [users]);

  //list filter
  useEffect(() => {
    let newUserList = [];

    for (let i = 0; i < users.length; i++)
      for (let j = 0; j < countries.length; j++)
        if (
          countries[j].isChecked === true &&
          users[i].location.country === countries[j].label
        ) {
          newUserList.push(users[i]);
          break;
        }
    if (newUserList.length !== 0) setUsersList(newUserList);
    else setUsersList(users);
  }, [countries]);

  //favorites
  function handleFavorite(index) {
    let clicked = [...clickedUserId];
    let favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!clickedUserId.includes(index)) {
      favoriteList.push(usersList[index]);
      clicked.push(index);
    } else {
      favoriteList = usersList.filter((user) => {
        user !== usersList[index];
      });
      clicked = clickedUserId.filter((click) => {
        click !== index;
      });
    }
    setClickedUserId(clicked);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  function filterList(value, isChecked) {
    let idx = countries.findIndex((country) => country["value"] === value);
    let newList = [...countries];
    newList[idx].isChecked = isChecked;
    setCountries(newList);
  }

  return (
    <S.UserList>
      <S.Filters>
        {countries.map((country, idx) => {
          return (
            <CheckBox
              key={idx}
              isChecked={country.isChecked}
              onChange={filterList}
              value={country.value}
              label={country.label}
            />
          );
        })}
      </S.Filters>
      <S.List>
        {usersList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={(event) => handleFavorite(index, event)}
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
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || clickedUserId.includes(index)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
