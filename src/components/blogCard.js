import React from "react";
import "./blogCard.scss";
import JwtImg from "../images/jwt.PNG";

function BlogCard() {
  return (
    <>
      <div className="blog-card">
        <a
          href="https://medium.com/@NimeshaKahingala/understanding-jwt-the-basics-of-json-web-tokens-54f3ccc1c4b2"
          target="_blank">
          <div className="img-wrap">
            <img className="image" src={JwtImg} alt="JWT"></img>
          </div>
          <p className="description">
            Understanding JWT: The Basics of JSON Web Tokens
          </p>
        </a>
      </div>
    </>
  );
}
export default BlogCard;
