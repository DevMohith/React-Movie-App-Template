import { useState } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResultFound from "../../assets/no-results.png";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters"></div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <div className="content">
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </div>
            ) : (
              <>
                <div className="resultNotFound">
                  <p>Sorry, Results not found!</p>
                  <img className="logo" src={noResultFound} />
                </div>
              </>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
