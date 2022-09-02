import React, { useState } from "react";
import classNames from "classnames";
import { getAllNodes } from "next-mdx/server";
import Link from "next/link";

const index = ({ posts }) => {
  const [category, setCategory] = useState(["All", "Tech", "User Interface"]);
  const [filters, setFilters] = useState("All");

  return (
    <div>
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
              <article className="my-12 min-h-[94px]">
                <h3 className="text-neutral-darkGrey mb-6 text-xs ">
                  {filtredPost.frontMatter.date}
                </h3>
                <div className="flex justify-between ">
                  <Link href={filtredPost.url}>
                    <a className="text-xl ">{filtredPost.frontMatter.title}</a>
                  </Link>

                  <div className="grid grid-cols-2 ">
                    {filtredPost.frontMatter.category.map((ctgy, index) => {
                      return (
                        <div className="grid gap-2 m-2">
                          <span className="px-4 py-2 bg-neutral-lightGrey rounded">
                            {ctgy === "All" ? (
                              " "
                            ) : (
                              <a className="text-xs text-primary-grey">
                                # {ctgy}
                              </a>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
              <hr className="solid " />
            </div>
          );
        })}
    </div>
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
