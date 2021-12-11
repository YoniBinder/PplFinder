
import React from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import * as S from "./style";

const Favorites = () => {
    
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFavorites
          </Text>
           </S.Header>
           <FavoritesList />
       </S.Content>
     </S.Home>
  );
};

export default Favorites;
