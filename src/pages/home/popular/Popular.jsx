import { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs />
      </ContentWrapper>
    </div>
  );
};

export default Popular;
