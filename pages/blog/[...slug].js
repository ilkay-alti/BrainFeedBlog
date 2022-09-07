import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterState, changeUrlState } from "../../redux/dataSlice";
import { useRouter } from "next/router";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import SvgGithub from "../../public/icons/Github";
import SvgFacebook from "../../public/icons/Facebook";
import SvgLinkedin from "../../public/icons/Linkedin";
import SvgTwitter from "../../public/icons/Twitter";
import { useAuth0 } from "@auth0/auth0-react";
import UnComment from "../../components/UnComment";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function BlogPost({ post }) {
  const content = useHydrate(post, {
    components: mdxComponents,
  });

  const router = useRouter();
  const { isAuthenticated } = useAuth0();
  const dispach = useDispatch();
  const url = useSelector((state) => state.data.url);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { logout, getAccessTokenSilently } = useAuth0();

  const fetchComment = async () => {
    const query = new URLSearchParams({ url });
    const newUrl = `/api/commentApi?${query.toString()}`;
    const response = await fetch(newUrl, {
      method: "GET",
    });
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    if (!url) return;
    fetchComment();
  }, [url]);

  useEffect(() => {
    dispach(changeUrlState(window.location.origin + window.location.pathname));
    fetchComment();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const response = await fetch("/api/commentApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        url,
        token,
      }),
    });
    const data = await response.json();
    fetchComment();
    setText("");
  };
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
          <div className="mb-16">
            <h2 className="text-xl text-primary-grey mb-12">Add a Comment</h2>
            <div>
              <h4 className="text-base text-primary-grey">Message</h4>
              <textarea
                onChange={(e) => setText(e.target.value)}
                className="rounded-sm row-span-2 backdrop-brightness-50 w-full min-h-24 outline-none bg-neutral-lightGrey p-3 "
                placeholder="Hi there"
                value={text}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleSubmit}
                  className="w-20 h-11 bg-primary-grey text-neutral-white text-base mt-6"
                >
                  Post
                </button>

                <button
                  onClick={() => {
                    logout();
                    {
                      returnTo: process.env.NEXT_PUBLIC_URL + "/blog";
                    }
                  }}
                  className="w-20 h-11 bg-semantic-errorState text-neutral-white text-base mt-6"
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UnComment />
        )}
        {comments.map((comment, index) => {
          return (
            <>
              <div key={index} className="flex ">
                <img
                  src={comment.user.picture}
                  alt="user"
                  className="max-w-[70px] max-h-[70px] mr-6"
                />
                <div>
                  <div className="flex gap-6">
                    <h3 className="text-sm text-primary-grey">
                      {comment.user.name}
                    </h3>
                    <time>
                      {DateTime.fromMillis(comment.createdAt).toRelative()}
                    </time>
                  </div>
                  <p className=" text-primary-grey">{comment.text}</p>
                </div>
              </div>
              <hr className="solid mb-12 my-8" />
            </>
          );
        })}
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
