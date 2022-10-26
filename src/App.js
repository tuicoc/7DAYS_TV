import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieInfoComponent from "./components/MovieInfoComponent";
import MovieComponent from "./components/MovieComponents";
//styled must be imported before using
export const API_KEY = "d6ec59d1";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: papayawhip;
  color: black;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 80px;
  height: 60px;
  margin: 10px;
`;
//in4 in
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 135;
  height: 120px;
  margin: 350px;
 opacity:20%;
 align-items:center;

`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  }; //bring the typing or the searchString to the root of api

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId); //return only 1 value per 1 typing value
    updateSearchQuery(e.target.value);
    //change the value of text in the box
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout); //type return value in fetchData above
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/logoteam.png" />
          
        </AppName>
        7DAYS TV
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange} /* ontextchange change text on searchbar*/
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/logoteam.png" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;