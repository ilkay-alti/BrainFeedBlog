import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterState } from "../../redux/dataSlice";
import { useRouter } from "next/router";

export default function BlogPost({ post }) {
  const [filters, setFilters] = useState(
    useSelector((state) => state.data.filter)
  );
  const dispach = useDispatch();
  const router = useRouter();
  return (
    <>
      <div>
        <h3 className="space-x-3">
          {post.frontMatter.category.map((ctgy) => {
            return (
              <a
                onClick={() => {
                  dispach(changeFilterState(ctgy));
                  router.replace("/blog");
                }}
                className="text-sm text-primary-grey"
              >
                {ctgy}
              </a>
            );
          })}
        </h3>

        <h1></h1>
        <div>
          <h3></h3>
          <h3></h3>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context);

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
}
