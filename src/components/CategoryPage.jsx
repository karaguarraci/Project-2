import { useEffect, useState } from "react";
import axios from "axios";
import { X_API_URL } from "../../const";
import { APIkey } from "../../const";
import { Link } from "react-router-dom";
import { categories } from "../../const";
// import { imageURL } from "../../const";

const CategoryPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${X_API_URL}/trivia?limit=15`, {
        headers: { "X-Api-Key": APIkey },
      });
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="category-page page">
        <h1>Categories</h1>
        <div className="category-page__container">
          <ul>
            {categories.map((category) => (
              <Link
                to={`/questions/${category.slug}`}
                state={{ displayName: category.displayName }}
              >
                <button className="category-page__button">
                  <li>{category.displayName}</li>
                </button>
              </Link>
            ))}
          </ul>
        </div>
        {/* <img src={imageURL} alt="" className="category__image" /> */}
      </div>
    </>
  );
};

export default CategoryPage;
