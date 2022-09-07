import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { getAllNodes } from "next-mdx/server";
import Link from "next/link";
import { useSelector } from "react-redux";

const index = ({ posts }) => {
  const [category, setCategory] = useState([]);
  const [filters, setFilters] = useState(
    useSelector((state) => state.data.filter)
  );

  useEffect(() => {
    posts.map((post) => {
      post.frontMatter.category.map((ctgy) => {
        category.includes(ctgy) ? "" : setCategory([...category, ctgy]);
      });
    });
  }, [category]);

  return (
    <>
      <h1 className="text-[24px] text-primary-grey">Recent Posts</h1>

      <div className="flex items-center space-x-[48px] mt-6 mb-1">
        {category.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                item === filters ? "" : setFilters(item);
              }}
              className={classNames(
                "bg-none border-none",
                filters === item
                  ? "underline underline-offset-8 decoration-solid decoration-neutral-darkGrey decoration-4 text-primary-grey"
                  : "text-neutral-darkGrey"
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
      <hr className="solid " />
      {posts
        .filter((post) => post.frontMatter.category.includes(filters))
        .map((filtredPost, index) => {
          return (
            <div key={index}>
              <article className="my-12 max-h-[94px] flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-neutral-darkGrey mb-6 text-xs ">
                    {filtredPost.frontMatter.date}
                  </h3>
                  <Link href={filtredPost.url}>
                    <a className="text-xl ">{filtredPost.frontMatter.title}</a>
                  </Link>
                </div>

                <div className="grid grid-cols-2 ">
                  {filtredPost.frontMatter.category.map((ctgy, index) => {
                    return (
                      <>
                        {ctgy === "All" ? (
                          index >= 4 ? (
                            <div key={index} className="flex  m-1">
                              <button
                                onClick={() => {
                                  ctgy === filters
                                    ? ""
                                    : dispatch(setFilters(ctgy));
                                }}
                                className="px-4 py-2 bg-neutral-lightGrey rounded max-h-10"
                              >
                                <a className="text-xs text-primary-grey">
                                  + {index - 3}
                                </a>
                              </button>
                            </div>
                          ) : (
                            <div key={index}></div>
                          )
                        ) : index < 3 ? (
                          <div key={index} className="flex  m-1">
                            <button
                              onClick={() => {
                                ctgy === filters ? "" : setFilters(ctgy);
                              }}
                              className="px-4 py-2 bg-neutral-lightGrey rounded max-h-10"
                            >
                              <a className="text-xs text-primary-grey">
                                #{ctgy}
                              </a>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </div>
              </article>
              <hr className="solid " />
            </div>
          );
        })}
    </>
  );
};

// get all the mdx files in the pages folder
export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  };
}
export default index;
