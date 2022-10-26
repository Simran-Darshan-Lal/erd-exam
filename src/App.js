import React, { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Story from "./Story";
import Search from "../src/Search.js";


const Story_API_URL = "https://hn.algolia.com/api/v1/search?query=hello&page=0";


const initialState = {
  loading: true,
  stories: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_Story_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_STORY_SUCCESS":
      return {
        ...state,
        loading: false,
        stories: action.payload
      };
    case "SEARCH_STORIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "DEL_ITEM":
      return {
        ...state,
        items: [state.items.filter((item) => item.id !== action.payload)],
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    fetch(Story_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {

        dispatch({
          type: "SEARCH_STORIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);
  const search = searchValue => {
    dispatch({
      type: "SEARCH_STORIES_REQUEST"
    });

    fetch(`https://hn.algolia.com/api/v1/search?query=hello&page=0`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_STORIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_STORIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { stories, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="My Hacker Story" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite stories</p>
      <div className="stories">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          stories.map((story) => (
            <Story key={`${story.story_title}`} story={story} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;