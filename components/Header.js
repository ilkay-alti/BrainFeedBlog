import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

const Header = () => {
  const router = useRouter();
  const [route, setRoute] = React.useState(["/", "/blog", "/about"]);

  return (
    <div className="flex items-center justify-between h-[40px]">
      <div>İlkay</div>

      <div className="space-x-[48px]">
        <Link href="/">
          <a
            className={classNames(
              router.asPath === "/"
                ? "underline underline-offset-8 decoration-solid decoration-neutral-darkGrey decoration-4 text-primary-grey"
                : "text-neutral-darkGrey"
            )}
          >
            Home
          </a>
        </Link>
        <Link href="/blog">
          <a
            className={classNames(
              router.asPath === "/blog"
                ? "underline underline-offset-8 decoration-solid decoration-neutral-darkGrey decoration-4 text-primary-grey"
                : "text-neutral-darkGrey"
            )}
          >
            Blog
          </a>
        </Link>
        <Link href="/contact">
          <a
            className={classNames(
              router.asPath === "/contact"
                ? "underline underline-offset-8 decoration-solid decoration-neutral-darkGrey  decoration-4 text-primary-grey"
                : "text-neutral-darkGrey"
            )}
          >
            Contact
          </a>
        </Link>
      </div>
      <div>Search</div>
    </div>
  );
};

export default Header;
