import { getMdxNode, getMdxPaths } from "next-mdx/server";

export default function BlogPost({ post }) {
  console.log(post);
  return <div>aaaa</div>;
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
