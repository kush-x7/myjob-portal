import { Close, Content, Overlay, Root } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { viewApplication } from "service/recruiter.service";
import { getErrorMessage } from "utils";

const Modal = ({ open, onClose, jobId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await viewApplication(jobId);
        setCandidates(data);
        setLoading(false);
      } catch (e) {
        getErrorMessage(e);
        setLoading(false);
      }
    };
    if (jobId) fetchCandidates();
  }, [jobId]);

  const CandidateCard = ({ name, email, skills }) => {
    return (
      <div className="text-blue-dark flex h-full w-full flex-col rounded border-[1.5px] border-gray-400/80 bg-white p-2">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light_blue/30">
            {name.charAt(0).toUpperCase() || "X"}
          </div>
          <div className="w-full max-w-[13rem]">
            <p className="text-blue-dark/90 w-full truncate font-medium capitalize">{name}</p>
            <p className="text-blue-light/90 w-full truncate text-sm font-light">{email}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium text-primary-dark_blue/90">Skills</p>
          <p className="text-sm font-light text-primary-dark_blue/90 line-clamp-2">{skills}</p>
        </div>
      </div>
    );
  };

  return (
    <Root open={open} onOpenChange={onClose}>
      {/* Overlay will blur the elements which are present outside the modal */}
      <Overlay className="fixed inset-0 h-screen w-full bg-gray-900 bg-opacity-20" />

      <Content className="flex items-center justify-center">
        <div className="fixed left-1/2 top-1/2 mx-auto flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform items-center justify-center sm:rounded-3xl">
          <div className="text-blue-dark flex-1 rounded-xl bg-white p-5">
            <div className="flex items-center justify-between border-b border-b-gray-300 pb-4">
              <span className="text-lg font-medium">Applicants for this job</span>

              <Close asChild>
                <span className="cursor-pointer rounded-md p-1 transition-all hover:bg-slate-200/80">
                  X
                </span>
              </Close>
            </div>

            <div className="mt-2 mb-2 text-sm">
              Total {candidates ? candidates.length : 0} applications
            </div>

            <div className="h-[68vh] min-h-[20rem] overflow-y-auto rounded-lg bg-gray-200 p-2 shadow-inner">
              {loading && (
                <div className="flex h-full flex-1 items-center justify-center">Loading...</div>
              )}

              {!loading && (!candidates || candidates.length === 0) && (
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-4">
                  <img
                    className="mb-4 h-[106px] w-[106]"
                    src="/assets/icons/notepad.svg"
                    alt="icon"
                  />
                  <span className="text-not-dark-blue">No applications available!</span>
                </div>
              )}

              {!loading && candidates && candidates.length && (
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default Modal;
