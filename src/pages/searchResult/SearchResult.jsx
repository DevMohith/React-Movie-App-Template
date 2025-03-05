import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResultFound from "../../assets/no-results.png";
import { fetchDataFromApi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";



const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();
  

  useEffect(() => {
    //Initial Data call -> for Batman
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    }
  );
  }
  const fetchNextPageData = () => {
   fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
    if(data?.results) {
      setData({...data,results: [...data?.results, ...res.results]});

    }else {
      setData(res);
    }
    setPageNum((prev) => prev + 1);
   }
  );
  };

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll 
              className="content"
              dataLength={data?.results.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
             
            </>
          ) : (
            <>
              <div className="resultNotFound">
                <p>Sorry, Results not found!</p>
                <img className="logo" src={noResultFound} />
              </div>
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
