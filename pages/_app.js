import clsx from "clsx";
import HeadManager from "components/HeadManager";
import Navbar from "components/Navbar";
import Cookies from "js-cookie"; // Video to understand cookies -> https://www.youtube.com/watch?v=w8n7Soz7khw
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import toast, { Toaster } from "react-hot-toast";
import "styles/globals.css";
import { removeUserFromLocal } from "utils";

const MyApp = ({ Component, pageProps }) => {
  // For adding GTM
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-KTG8BX5" });
  }, []);
  const router = useRouter();

  // Step 1 -> We are creating a useState in which we are setting user to null
  // Step 2 -> After logging in we are saving cookies user to our user variable.
  // Reason -> Because we will be sending this user information to our navbar component as a prop.
  const [user, setUser] = useState(null);

  // Step 3 -> useEffect will the first hook that will run. And It will check whether the cookies are set or not.
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, [Cookies.get("user")]);

  // step 4 -> After logout we are again setting the user to null
  const handleLogout = () => {
    removeUserFromLocal();
    setUser(null);
    router.push("/");

    toast((t) => (
      <div className="relative w-full max-w-lg rounded-md bg-white pt-1">
        <span className="text-xl text-primary-light_blue">Logout</span>
        <p className="mt-2 text-primary-medium_blue">You have successfully logged out.</p>
        <div
          onClick={() => toast.dismiss(t.id)}
          className="absolute -right-2 -top-2 cursor-pointer text-lg font-bold"
        >
          X
        </div>
      </div>
    ));
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Jobs for candidates" />
        <meta name="author" content="Shakes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Job Portal! Recruiters can create and candidates can apply"
        ></meta>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Job portal" />
        <meta name="twitter:description" content="Job portal for candidates." />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/46968256/156498053-a5347b74-9c00-48cd-940c-4bf24b39e173.png"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Job Portal" />
        <meta
          property="og:description"
          content="Job Portal! Recruiters can create and candidates can apply"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/46968256/156498053-a5347b74-9c00-48cd-940c-4bf24b39e173.png"
        />
        <meta
          property="og:image:url"
          content="https://user-images.githubusercontent.com/46968256/156498053-a5347b74-9c00-48cd-940c-4bf24b39e173.png"
        />
        <meta property="og:image:alt" content="Job portal" />
        {/* <meta property="og:image:type" content="images/svg" /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <HeadManager {...(Component.seo || {})} />

      <div
        className={clsx(
          " absolute w-full bg-gradient-to-l from-primary-medium_blue  to-primary-dark_blue  ",
          Component.blueKiHeight
            ? Component.blueKiHeight
            : "h-[26rem] sm:h-[20rem] md:h-[30rem] lg:h-[26rem]"
        )}
      ></div>

      <div className="container z-10 px-2">
        <Navbar handleLogout={handleLogout} user={user} />

        <main className="px-3 sm:px-10  lg:px-20 xl:px-32">
          <Component {...pageProps} />
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 800 }}
        containerStyle={{ top: "80px", right: "50px" }}
      />
    </>
  );
};

export default MyApp;
