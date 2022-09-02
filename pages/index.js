import React, { useState } from "react";
import classNames from "classnames";

const index = () => {
  const [category, setCategory] = useState(["All", "Tech", "User Interface"]);
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <h1 className="text-[24px] text-primary-grey">Recent Posts</h1>

      <div className="flex items-center space-x-[48px] mt-6 mb-1">
        {category.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                item === filter ? "" : setFilter(item);
              }}
              className={classNames(
                "bg-none border-none",
                filter === item
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

      {/* Post 1 */}
      {data.map((item, index) => {
        console.log(item);
        return (
          <div key={index} className="my-12">
            asd
          </div>
        );
      })}
    </div>
  );
};

export default index;
