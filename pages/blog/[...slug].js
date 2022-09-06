import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useDispatch } from "react-redux";
import { changeFilterState } from "../../redux/dataSlice";
import { useRouter } from "next/router";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import SvgGithub from "../../public/icons/Github";
import SvgFacebook from "../../public/icons/Facebook";
import SvgLinkedin from "../../public/icons/Linkedin";
import SvgTwitter from "../../public/icons/Twitter";
import Comment from "../../components/Comment";
import { useAuth0 } from "@auth0/auth0-react";
import UnComment from "../../components/UnComment";
export default function BlogPost({ post }) {
  const content = useHydrate(post, {
    components: mdxComponents,
  });
  const dispach = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <>
      <div>
        <h3 className="space-x-3 flex">
          {post.frontMatter.category.map((ctgy, index) => {
            return index === 0 ? (
              <a
                key={index}
                onClick={() => {
                  dispach(changeFilterState(ctgy));
                  router.replace("/blog");
                }}
                className="text-xs text-neutral-darkGrey"
              >
                #{ctgy}
              </a>
            ) : null;
          })}
        </h3>
        <article>
          <h1 className="text-primary-grey  text-2xl my-6">
            {post.frontMatter.title}
          </h1>
          <div className="flex text-neutral-darkGrey text-xs space-x-[4px]">
            <h3>{post.frontMatter.date}</h3>
            <div>|</div>
            <h3>{post.frontMatter.author}</h3>
          </div>
          <div className="my-12">{post.frontMatter.excerpt}</div>
          <hr className="solid " />
          <div className="my-12 prose">{content}</div>
        </article>

        <div className="flex">
          {post.frontMatter.category.map((ctgy, index) => {
            return index === 0 ? null : index ===
              post.frontMatter.category.length - 1 ? null : (
              <div key={index} className="flex  m-1">
                <button
                  onClick={() => {
                    dispach(changeFilterState(ctgy));
                    router.replace("/blog");
                  }}
                  className="px-4 py-2 bg-neutral-lightGrey rounded max-h-10"
                >
                  <a className="text-xs text-primary-grey">#{ctgy}</a>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex space-x-[24px] mt-11 mb-7 items-center">
          <h3 className="text-xs text-primary-grey">Share</h3>
          <SvgFacebook />
          <SvgGithub />
          <SvgLinkedin />
          <SvgTwitter />
        </div>
        <hr className="solid mb-12" />

        {isAuthenticated ? (
          <Comment callbackurl={post.url} />
        ) : (
          <UnComment callbackurl={post.url} />
        )}
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
