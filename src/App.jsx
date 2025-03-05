import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { useEffect } from "react";
 
import { fetchDataFromApi } from "./utils/api";
import { setApiConfiguration, setGenres } from "./store/homeSlice";
import { useDispatch } from "react-redux";
 

function App() {
  const dispatch = useDispatch();
 //Testing token
 //execute as soon the application starts
 // useEffect -> didComponentMount []

 useEffect (()=>{
 //Fetching of data from imdb api
 // 1. fetch the configurations from tmdb
  fetchApiConfig ();
 // 2. fetch the list of genres required
genresCall();
}, []);

  const genresCall = async() => {
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    let promises = []

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

   const data = await Promise.all(promises);
   
   data.forEach(({genres})=> {
    genres.forEach((item)=> (allGenres[item.id] = item));
   });
   
   // update our store
   dispatch(setGenres(allGenres));
  };


 const fetchApiConfig = () => {
  fetchDataFromApi("/configuration").then((res) => {
   // need to do some cosmetics
   const url = {
    backdrop: res.images.secure_base_url + "original",
    poster: res.images.secure_base_url + "original",
    profile: res.images.secure_base_url + "original",
   };
   // update our store
   dispatch(setApiConfiguration(url));
  });
 };



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        {/* Below route is HomeWork, nav components */}
        <Route path="/explore/:mediaType" element={<Explore />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
