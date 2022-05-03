import cookie from "cookie";
import { CardData, logoData } from "data";
import { useRouter } from "next/router";

import Button from "components/Button";
import { getUserType } from "utils";

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/signup");
  };

  return (
    <>
      {/* First Section containing Title and Image  */}
      <div className="my-7 pt-3 sm:mt-11 sm:flex sm:justify-between md:flex-col lg:mt-12 lg:flex-row">
        <div className=" mb-8 flex  flex-col items-center text-center text-white   sm:mt-7 sm:items-start  sm:text-left  md:flex-col md:items-center lg:mt-10 lg:items-start">
          <h1 className=" whitespace-nowrap  text-3xl font-light  md:mb-4 md:text-6xl  lg:mb-10">
            Welcome to{" "}
            <span className="block font-medium leading-[74px] md:inline-block lg:block">
              My<span className="text-primary-light_blue">Jobs</span>
            </span>
          </h1>
          <Button className="!px-[24px] !text-base" onClick={handleClick}>
            Get Started
          </Button>
        </div>

        <div className="mx-3  h-auto w-auto drop-shadow-2xl sm:mx-0 sm:w-80 md:h-auto md:w-full lg:h-[20rem] lg:w-[30rem] xl:h-[22rem] xl:w-[34rem]">
          <img
            className="h-full w-full rounded-2xl"
            src="/assets/images/hero-image.jpg"
            alt="display picture"
          />
        </div>
      </div>

      {/* Second Section for Why us */}
      <div className="mx-3 text-lg  lg:mt-16">
        <h2 className="mb-8 font-normal md:text-3xl">Why Us</h2>

        <div className="lg:flex lg:flex-wrap lg:justify-between">
          {CardData.map((cardValue) => (
            <div
              className="customLineClamp mb-8 rounded-md bg-white p-4 drop-shadow-md lg:w-[32%]"
              key={cardValue.key}
            >
              <h3 className=" customLineClamp customTextRows2 mb-3 h-14 w-32 text-primary-light_blue md:h-16 md:w-44 md:text-2xl">
                {cardValue.title}
              </h3>
              <p className=" customLineClamp customTextRows3 mb-4 h-[4.5rem] text-sm md:text-base">
                {cardValue.paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Third Section for logo  */}
      <div className="mb-3  text-lg lg:mt-16">
        <h2 className="mb-8 font-normal md:text-3xl">Companies Who Trust Us</h2>

        <div className="mb-8 flex h-40 flex-wrap justify-center">
          {logoData.map((logo) => (
            <div key={logo.key} className="h-4 w-[30%] md:h-6 md:w-[25%] lg:h-8 lg:w-[20%]">
              <img className="h-full w-full object-contain" src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

// server side will run first before any use effect . This will help us in redirecting pages
export const getServerSideProps = async (context) => {
  const { user } = cookie.parse(context.req.headers.cookie || "");

  if (user) {
    const { token, userRole } = JSON.parse(user);

    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: `/${getUserType(userRole)}`
        }
      };
    }
  }

  return {
    props: {}
  };
};
