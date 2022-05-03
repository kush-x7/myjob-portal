import Button from "components/Button";
import CandidateCard from "components/CandidateCard";
import Pagination from "components/Pagination";
import ROUTES from "constants/routes";
import cookie from "cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showJobsApplied } from "service/candidate.service";

const JobsApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // Setting up pagination default state
  const [pagination, setPagination] = useState({
    currPage: 1,
    total: 1,
    limit: 20,
    totalPages: 1
  });

  const setPaginatedData = () => {
    setJobs(
      appliedJobs.slice(
        pagination.currPage * pagination.limit - pagination.limit,
        pagination.currPage * pagination.limit
      )
    );
  };

  // First use effect to fetch user data and metadata for pagination
  useEffect(async () => {
    const { data = [] } = await showJobsApplied();
    setLoader(true);
    setAppliedJobs(data);
    setLoader(false);
    // Because Api se  data aane ke badd we want to show page one data
    // So we are calling this funct
    // setPaginatedData();
    const length = data.length;
    setPagination({
      ...pagination,
      total: length,
      totalPages: Math.ceil(length / 20)
    });
  }, []);

  useEffect(() => {
    setPaginatedData();
  }, [pagination.currPage, appliedJobs]);

  const handlePageChange = (pageNumber) => {
    setPagination((p) => ({ ...p, currPage: pageNumber.selected + 1 }));
  };

  // first get all data in an array then break the data in half when clicked on pagination

  const handleClick = () => {
    router.push("/candidate");
  };

  return (
    <>
      {/* Loader  */}
      {loader && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black/50">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden bg-black text-black"></span>
          </div>
        </div>
      )}

      <div className="  mt-4">
        <div className="flex items-center">
          <img className="mr-1 h-3 w-3" src="/assets/icons/home.svg" alt="Home icon" />
          <div className="flex">
            <Link href={ROUTES.CANDIDATE}>
              <p className="cursor-pointer pr-2 text-xs text-white">Home</p>
            </Link>
            <p className="pr-2 text-xs text-white"> {`>`}</p>
            <p className="pr-2 text-xs text-white">Applied Jobs</p>
          </div>
        </div>

        <h2 className="pt-6 text-xl text-white  md:text-2xl">Jobs applied by you</h2>
      </div>

      {!jobs?.length > 0 && (
        <div className="flex h-[80vh] flex-col items-center justify-center text-white ">
          <img className="mb-4 h-[106px] w-[106]" src="/assets/icons/notepad.svg" alt="icon" />
          <p className="mb-10 text-xl text-[#303F60]/80">Your applied jobs will show here!</p>
          <Button className="!px-[24px] !text-base" onClick={handleClick}>
            See all jobs
          </Button>
        </div>
      )}

      {jobs?.length >= 0 && (
        <div className="  mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {jobs?.map((job) => {
            return (
              <CandidateCard
                key={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                id={job.id}
              />
            );
          })}
        </div>
      )}

      {appliedJobs && appliedJobs.length > 0 && (
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pagination.totalPages}
          pageNumber={pagination.totalPages}
          forcePage={pagination.currPage - 1}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { user } = cookie.parse(context.req.headers.cookie || "");

  let userRole = null;
  if (user) {
    userRole = JSON.parse(user).userRole;
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: `/`
      }
    };
  } else if (user && userRole.toString() === "0") {
    return {
      redirect: {
        permanent: false,
        destination: `/recruiter`
      }
    };
  }

  return {
    props: {}
  };
};

JobsApplied.seo = {
  title: "Applied Jobs",
  description: " Show all jobs applied by the candidate"
};

JobsApplied.blueKiHeight = "h-52";
JobsApplied.showAppliedJobs = true;

export default JobsApplied;
