import React, { useEffect, useState } from "react";
import axios from "../../Axios/axios";
import { ACCESS_TOKEN, imageUrl, baseUrl } from "../Constants/constants";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [youtubeUrlForFirstRow, setYoutubeUrlForFirstRow] = useState();
  const [youtubeUrlForSecondRow, setYoutubeUrlForSecondRow] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      url: `${baseUrl}/search/movie`,
      params: {
        query: "1",
        include_adult: "false",
        page: props.firstRow ? "10" : "2",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClickOnCard = (movieTitle, row) => {
    movieTrailer(movieTitle)
      .then((response) => {
        const responseParts = response.split("=");
        if (row === "firstRow") {
          setYoutubeUrlForFirstRow(responseParts[1]);
        } else if (row === "secondRow") {
          setYoutubeUrlForSecondRow(responseParts[1]);
        }
      })
      .catch((err) => {
        console.log(`an error`, err);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white ml-5 mb-2 mt-5">
        {props.title}
      </h2>
      <div className="cards">
        {movies?.map((obj, index) => {
          return (
            obj.backdrop_path && (
              <div
                key={index}
                onClick={() => {
                  props.firstRow
                    ? handleClickOnCard(obj.title, "firstRow")
                    : handleClickOnCard(obj.title, "secondRow");
                }}
              >
                <div
                  className={
                    props.firstRow
                      ? "movie-card transition-transform duration-300 ease-in-out transform hover:scale-125 bg-cover bg-center ml-1"
                      : "category-card transition-transform duration-300 ease-in-out transform hover:scale-125 bg-cover bg-center ml-1"
                  }
                  style={{
                    backgroundImage: `url(${imageUrl + obj.backdrop_path})`,
                  }}
                >
                  <h1
                    style={{ color: "white" }}
                    className={
                      props.firstRow ? "absolute mt-28" : "absolute mt-60"
                    }
                  >
                    {obj.title ? obj.title : ""}
                  </h1>
                </div>
              </div>
            )
          );
        })}
      </div>
      {props.firstRow && youtubeUrlForFirstRow && (
        <>
          <div
            onClick={() => setYoutubeUrlForFirstRow("")}
            className="flex justify-end items-center me-5"
          >
            <i className="fa-solid fa-times text-white"></i>
          </div>
          <YouTube videoId={youtubeUrlForFirstRow} opts={opts} />
        </>
      )}
      {!props.firstRow && youtubeUrlForSecondRow && (
        <>
          <div
            onClick={() => setYoutubeUrlForSecondRow("")}
            className="flex justify-end items-center me-5"
          >
            <i className="fa-solid fa-times text-white"></i>
          </div>
          <YouTube videoId={youtubeUrlForSecondRow} opts={opts} />
        </>
      )}
    </div>
  );
}

export default Row;
