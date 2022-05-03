import Button from "components/Button";
import FormContainer from "components/FormContainer";
import InputField from "components/InputField";
import cookie from "cookie";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { reset } from "service/auth.service";
import { getErrorMessage, getUserType } from "utils";
import { resetInitialValues } from "utils/initialValues";
import preventForm from "utils/preventForm";
import { resetSchema } from "utils/validations";

const Reset = () => {
  const [, setLoading] = useState(false);
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = (values) => {
    setLoading(true);
    toast.promise(reset(values), {
      loading: "Reset password...",
      success: () => {
        localStorage.removeItem("resetToken");
        formRef.current?.resetForm();
        router.push("/auth/login");
        setLoading(false);
        return "Successfully reset";
      },
      error: (e) => {
        setLoading(false);
        return getErrorMessage(e);
      }
    });
  };

  preventForm(formRef);

  return (
    <FormContainer formTitle="Forgot your password?">
      <p className=" mb-4">Enter your new password below.</p>
      <Formik
        validationSchema={resetSchema}
        initialValues={resetInitialValues}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ values, touched, handleBlur, handleChange, errors }) => (
          <Form>
            <InputField
              lsbel="Password"
              applyStar
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.password && Boolean(errors.password)}
            />

            <InputField
              label="Confirm Password"
              applyStar
              name="confirmPassword"
              type="password"
              placeholder="Enter your password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.confirmPassword && Boolean(errors.confirmPassword)}
            />

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                customStyle="mx-auto py-3 md:py-3 lg:py-3 px-9 md:px-12 lg:px-14 md:text-base"
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

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

Reset.seo = {
  title: "Reset",
  description: " Reset page description"
};

Reset.blueKiHeight = "h-[20rem]";

export default Reset;
