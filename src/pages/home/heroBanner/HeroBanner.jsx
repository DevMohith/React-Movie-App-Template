import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const  { url } = useSelector((state) => state.home);
  const [query, setQuery] = useState("");

  const searchQueryHandler = (event) => { 
   console.log(event.key);
   if(event.key === "Enter" && query.length > 0) {
    navigate(`/search/${query}`);
   }
  };

  useEffect(() => {
  //Create a bg
  const bg = url.backdrop + data?.results?.[Math.floor(Math.random()* 20)]?.backdrop_path;
  console.log(bg);
  // set the bg
  setBackground(bg);
  },[data]);

  return (
    <div className="heroBanner">

      {!loading && (
        <div className="backdrop-img">
          <img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              // event hadler
              onChange={(e) => setQuery(e.target.value)}
              // event hadler
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
