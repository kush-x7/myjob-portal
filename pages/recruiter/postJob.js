import Button from "components/Button";
import FormContainer from "components/FormContainer";
import InputField from "components/InputField";
import ROUTES from "constants/routes";
import cookie from "cookie";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { postJob } from "service/recruiter.service";
import { getErrorMessage } from "utils";
import preventForm from "utils/preventForm";
import * as Yup from "yup";

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = (values) => {
    setLoading(true);
    toast.promise(postJob(values), {
      loading: "Posting...",
      success: () => {
        formRef.current?.resetForm();
        setLoading(false);
        return "Posted your job";
      },
      error: (e) => {
        getErrorMessage(e);
        setLoading(false);
      }
    });
  };

  // Using yup for validation
  const validationSchema = Yup.object({
    title: Yup.string().required("Required").trim(),
    description: Yup.string().required("Required").trim(),
    location: Yup.string().required("Required").trim()
  });

  preventForm(formRef);

  return (
    <>
      <div className="  mt-4">
        <div className="flex items-center">
          <img className="mr-1 h-3 w-3" src="/assets/icons/home.svg" alt="Home icon" />

          <Link href={ROUTES.RECRUITER}>
            <p className="cursor-pointer pr-2 text-xs text-white">Home</p>
          </Link>
        </div>
      </div>
      <FormContainer formTitle="Post a job">
        <Formik
          // This validation Schema is for yup validation
          validationSchema={validationSchema}
          initialValues={{
            title: "",
            description: "",
            location: ""
          }}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ values, touched, handleBlur, handleChange, resetForm }) => (
            <Form>
              <InputField
                label="Job Title"
                applyStar
                name="title"
                type="text"
                value={values.title}
                placeholder="Enter job title"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
              />

              <InputField
                label="Description"
                applyStar
                name="description"
                type="text"
                value={values.description}
                placeholder="Enter job description"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
              />

              <InputField
                label="Location"
                applyStar
                name="location"
                type="text"
                value={values.location}
                placeholder="Enter location"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
              />

              <div className="mt-8 flex justify-center">
                <Button
                  loading={loading}
                  type="submit"
                  customStyle="mx-auto py-3 md:py-3 lg:py-3 px-9 md:px-12 lg:px-14 md:text-base"
                >
                  Post
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </FormContainer>
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
    props: {}
  };
};

PostJob.seo = {
  title: "Post Jobs",
  description: " post your jobs"
};

export default PostJob;
