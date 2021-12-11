
import React from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import { useFavPeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
    
  const {favUsers} = useFavPeopleFetch() 

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFavorites
          </Text>
           </S.Header>
           <FavoritesList favUsers={favUsers} />
       </S.Content>
     </S.Home>
  );
};

export default Favorites;
