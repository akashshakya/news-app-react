import React from "react";

const NewsItems = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <span className="badge badge-danger">{source}</span>
        <div className="card">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.dnaindia.com/sites/default/files/styles/half/public/2022/09/25/2541404-2540449-untitled-design.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 45) : ""}...</h5>
            <p className="card-text">
              {description ? description.slice(0, 88) : ""}...
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:"anonymous"} on {new Date(date).toDateString()}</small></p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );

  }


export default NewsItems;
