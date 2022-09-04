import { getMdxNode, getMdxPaths } from "next-mdx/server";
import Link from "next/link";

export default function BlogPost({ post }) {
  console.log(post);
  return (
    <>
      <div>
        <h3 className="space-x-3">
          {post.frontMatter.category.map((category) => {
            return (
              <Link href={`/blog`}>
                <button
                  onClick={() => {
                    ctgy === filters ? "" : setFilters(ctgy);
                  }}
                  className="text-sm text-primary-grey"
                >
                  {category}
                </button>
              </Link>
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
