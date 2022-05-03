import CandidateCard from "components/CandidateCard";
import Pagination from "components/Pagination";
import cookie from "cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { applyJob, showJobsAvailable } from "service/candidate.service";
import { getErrorMessage } from "utils";

const Dashboard = ({ page }) => {
  const router = useRouter();
  // Making a loading state to disbale apply buuton
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(true);

  // Setting up pagination default state
  const [pagination, setPagination] = useState({
    currPage: page || 1,
    total: 1,
    limit: 1,
    totalPages: 1
  });

  // This funct will be executed when we click on apply
  const shallowFetch = async () => {
    const { data } = await showJobsAvailable(pagination.currPage);
    if (data) {
      setJobs(data);
    } else {
      if ((!data || jobs.length === 20) && pagination.currPage !== 1) {
        setPagination((p) => ({ ...p, currPage: p.currPage - 1 }));
      }
    }
  };

  // First use effect to fetch user data and metadata for pagination
  useEffect(async () => {
    setLoader(true);
    const { data, metadata } = await showJobsAvailable(pagination.currPage);
    setJobs(data);
    setLoader(false);

    try {
      setPagination((pagination) => ({
        ...pagination,
        total: metadata.count,
        limit: metadata.limit,
        totalPages: Math.ceil(metadata.count / metadata.limit)
      }));
    } catch (e) {
      getErrorMessage(e);
    }
  }, [pagination.currPage]);

  // Func for apply button
  const handleApply = async (jobId) => {
    try {
      setLoading(true);
      await applyJob(jobId);
      await shallowFetch();
      toast.success("Applied successfully");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <>
      <div className="  mt-4">
        <div className="flex items-center">
          <img className="mr-1 h-3 w-3" src="/assets/icons/home.svg" alt="Home icon" />
          <p className="cursor-pointer pr-2 text-xs text-white">Home</p>
        </div>

        <h2 className="pt-6 text-xl text-white  md:text-2xl">Jobs for you</h2>
      </div>

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

      {jobs?.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {jobs?.map((job) => {
            return (
              <CandidateCard
                key={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                id={job.id}
                visible
                onApply={(jobId) => {
                  handleApply(jobId);
                }}
                loading={loading}
              />
            );
          })}
        </div>
      )}

      {jobs && jobs?.length > 0 && (
        <Pagination
          onPageChange={(pageNumber) => {
            setPagination((p) => ({ ...p, currPage: pageNumber.selected + 1 }));
            router.push(
              {
                pathname: "/candidate",
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
    props: { page: context.query?.page || null }
  };
};

Dashboard.seo = {
  title: "Candidate jobs",
  description: " Show all jobs for candidate"
};

Dashboard.blueKiHeight = "h-52";
Dashboard.showAppliedJobs = true;

export default Dashboard;
