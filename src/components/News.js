import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { country, category, apikey, setProgress, pageSize } = props;

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    setProgress(50);
    let parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - Spider News`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page+1}&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
  };

  // const handleNext = () => {
  //   setPage(page+1)
  //   updateNews();
  // };

  // const handlePrev = () => {
  //   setPage(page-1)
  //   updateNews();
  // };

  return (
    <div>
      <>
        <h2 className="text-center" style={{ margin: "30px 0px", marginTop: "90px" }}>
          Spider News - Top {capitalizeFirstLetter(category)} Headlines
        </h2>

        {/* {!loading && (
            <div className="row">
            {articles.map((art) => {
              return (
                <div className="col-md-4 my-2" key={art.url}>
                    <NewsItems
                      title={art.title}
                      description={art.description}
                      imageUrl={art.urlToImage}
                      newsUrl={art.url}
                      author={art.author}
                      date={art.publishedAt}
                      source={art.source.name}
                    />
                  </div>
                );
              })}
            </div>
          )} */}

        {/* Infinite Scroll */}
        {loading && <Loader />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {articles.map((art, index) => {
                return (
                  <div className="col-md-4 my-2" key={index}>
                    <NewsItems
                      title={art.title}
                      description={art.description}
                      imageUrl={art.urlToImage}
                      newsUrl={art.url}
                      author={art.author}
                      date={art.publishedAt}
                      source={art.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container my-2 d-flex justify-content-between">
            <button
              onClick={this.handlePrev}
              disabled={page <= 1}
              type="button"
              className="btn btn-dark"
            >
              &larr; Prev
            </button>
            <button
              disabled={
                page >= Math.ceil(totalResults / 9)
              }
              onClick={this.handleNext}
              type="button"
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
      </>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
