import Button from "components/Button";
import Modal from "components/Modal";
import Pagination from "components/Pagination";
import RecruiterCard from "components/RecruiterCard";
import ROUTES from "constants/routes";
import cookie from "cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showJobsPosted } from "service/recruiter.service";
import { getErrorMessage } from "utils";

const Dashboard = ({ page, jobId }) => {
  const router = useRouter();
  const [jobsPosted, setJobsPosted] = useState([]);
  const [modal, setModal] = useState({ visible: !!jobId, jobId: jobId || " " });
  const [loader, setLoader] = useState(true);

  // Setting up pagination default state
  const [pagination, setPagination] = useState({
    currPage: page || 1,
    total: 1,
    limit: 1,
    totalPages: 1
  });

  // First userEffect to fetch user data and meta data for Pagination
  useEffect(async () => {
    setLoader(true);
    const { data } = await showJobsPosted(pagination.currPage);

    setJobsPosted(data?.data);
    setLoader(false);

    try {
      if (data && data.data.length > 0) {
        setPagination((pagination) => ({
          ...pagination,
          total: data.metadata?.count,
          limit: data.metadata?.limit,
          totalPages: Math.ceil(data.metadata?.count / data.metadata.limit)
        }));
      }
    } catch (e) {
      getErrorMessage(e);
    }
  }, [pagination.currPage]);

  const handleClick = () => {
    router.push(ROUTES.RECRUITER_JOBS_POSTED);
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
          <p className="cursor-pointer pr-2 text-xs text-white">Home</p>
        </div>

        <h2 className="pt-6 text-xl text-white  md:text-2xl">Jobs posted by you</h2>
      </div>

      <div className="  mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {jobsPosted?.length > 0 &&
          jobsPosted?.map((job) => {
            return (
              <RecruiterCard
                key={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                id={job.id}
                visible
                jobId={jobId}
                onViewApplicant={(jobId) => {
                  setModal({ visible: true, jobId });

                  router.push({
                    pathname: "/recruiter",
                    query: {
                      page: pagination.currPage,
                      jobId: jobId
                    }
                  });
                }}
              />
            );
          })}
      </div>

      {!jobsPosted && (
        <div className="flex h-[80vh] flex-col items-center justify-center text-white ">
          <img className="mb-4 h-[106px] w-[106]" src="/assets/icons/notepad.svg" alt="icon" />
          <p className="mb-10 text-xl text-[#303F60]/80">Your posted jobs will show here!</p>
          <Button className="!px-[24px] !text-base" onClick={handleClick}>
            Post a job
          </Button>
        </div>
      )}

      {jobsPosted && jobsPosted.length > 0 && (
        <Pagination
          onPageChange={(pageNumber) => {
            setPagination((p) => ({ ...p, currPage: pageNumber.selected + 1 }));
            router.push(
              {
                pathname: "/recruiter",
                query: {
                  page: pageNumber.selected + 1
                }
              },
              undefined,
              {
                // shallow will change the URL without refreshing the page
                shallow: true,
                scroll: false
              }
            );
          }}
          pageCount={pagination.totalPages}
          pageNumber={pagination.totalPages}
          forcePage={pagination.currPage - 1}
        />
      )}
      {jobId && (
        <Modal
          open={modal.visible}
          onClose={() => {
            setModal({ visible: false, jobId: " " });

            router.push({
              pathname: "/recruiter",
              query: {
                page: pagination.currPage
              }
            });
          }}
          jobId={modal.jobId || " "}
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
  } else if (user && userRole.toString() === "1") {
    return {
      redirect: {
        permanent: false,
        destination: `/candidate`
      }
    };
  }

  return {
    props: { page: context.query?.page || null, jobId: context.query?.jobId || null }
  };
};

Dashboard.seo = {
  title: "Jobs Posted",
  description: " Show all jobs posted by the candidate"
};

Dashboard.blueKiHeight = "h-52";
Dashboard.showAppliedJobs = true;

export default Dashboard;
