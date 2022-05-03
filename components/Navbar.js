import ROUTES from "constants/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { getUserType } from "utils";
import { useOnClickOutside } from "usehooks-ts";

const Navbar = ({ user, handleLogout }) => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  const isOnLoginPage = router.pathname === ROUTES.LOGIN;
  const isOnPostAJobPage = router.pathname.split("/").includes("postJob");
  const isOnJobsAppliedPage = router.pathname.split("/").includes("jobsApplied");

  const handleClick = () => {
    setShowLogout((prevState) => !prevState);
  };

  useOnClickOutside(logoutRef, () => setShowLogout(false));

  return (
    <nav className="mx-4 flex items-center justify-between border-b border-secondary-light/30 py-3 text-white lg:mx-8">
      <Link href={ROUTES.HOME}>
        <p className="cursor-pointer font-semibold lg:text-xl">
          My<span className="text-primary-light_blue">Jobs</span>
        </p>
      </Link>

      {!user && !isOnLoginPage && (
        <Link href={ROUTES.LOGIN}>
          <div className="flex h-11 w-36 cursor-pointer items-center justify-center truncate whitespace-nowrap rounded border border-primary-light_blue bg-nav-btn-bg  px-4 text-base ">
            Login/Signup
          </div>
        </Link>
      )}

      {user && (
        <>
          <div className="flex cursor-auto items-center">
            <Link
              href={
                getUserType(user?.userRole) === "recruiter"
                  ? ROUTES.RECRUITER_JOBS_POSTED
                  : ROUTES.CANDIDATE_APPLIED_JOBS
              }
            >
              <a>
                <p className="cursor-pointer text-white">
                  {user?.userRole === 1 ? `Applied Jobs` : "Post a job"}
                </p>
                {(isOnJobsAppliedPage || isOnPostAJobPage) && (
                  <span className="absolute top-[2.5rem] w-full rounded-md border-b-2 border-primary-light_blue md:top-[2.75rem]"></span>
                )}
              </a>
            </Link>

            <div onClick={handleClick}>
              <div className="flex items-center justify-between">
                <div className=" ml-9 mr-1  flex h-8  w-8 cursor-pointer items-center justify-center rounded-3xl bg-[#D9EFFF] text-[#303F60] md:h-11 md:w-11">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <img
                  className="h-2 w-3 cursor-pointer"
                  src="/assets/icons/down-arrow.svg"
                  alt="downwards arrow"
                />
              </div>

              {showLogout && (
                <div
                  ref={logoutRef}
                  onClick={handleLogout}
                  className="absolute bottom-0 right-0 z-20 flex h-10 w-20 translate-y-14 cursor-pointer items-center justify-center rounded-md bg-white"
                >
                  <p className="text-black">Logout</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
