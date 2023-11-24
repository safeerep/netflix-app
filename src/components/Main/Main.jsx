import React, { useEffect, useState } from "react";
import axios from "../../Axios/axios";
import { ACCESS_TOKEN, imageUrl } from "../Constants/constants";
import "./Main.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Main() {
  const [movieForBanner, setMovieForBanner] = useState();
  const [MainVideo, setMainVideo] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/day",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieForBanner(response.data.results[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const playVideoOnMainScreen = (movieTitle) => {
    movieTrailer(movieTitle).then((response) => {
      const splittedResponse = response.split("=");
      setMainVideo(splittedResponse[1]);
    });
  };

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return MainVideo ? (
    <>
      <div onClick={() => setMainVideo('')} className="flex justify-end items-center me-5">
        <i className="fa-solid fa-times text-white"></i>
      </div>
      <YouTube videoId={MainVideo} opts={opts} />
    </>
  ) : (
    <div
      className="bg-cover bg-center outer-div"
      style={{
        backgroundImage: `url(${imageUrl + movieForBanner?.backdrop_path})`,
      }}
    >
      <h2 className="absolute mt-72 ml-28 text-xl bg-black text-white">
        {movieForBanner?.original_title}
      </h2>
      <div className="absolute mt-80 ml-24 bg-transparent">
        <button
          onClick={() => {
            playVideoOnMainScreen(movieForBanner?.original_title);
          }}
          className="border-0 rounded text-white p-2 bg-white bg-opacity-20 hover:bg-gray-600"
        >
          <i className="mr-3 fa-solid fa-play bg-transparent"></i>Play
        </button>
        <button className="ml-12 p-2 border-0 rounded text-white bg-white bg-opacity-20 hover:bg-gray-600">
          <i className="mr-3 fa-solid fa-plus bg-transparent"></i>My List
        </button>
      </div>
      <h3 className="absolute mt-96 ml-20 text-white">
        Watch in Tamil, Telugu, Kannada and Malayalam audio
      </h3>
    </div>
  );
}

export default Main;
