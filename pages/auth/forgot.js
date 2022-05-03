import Button from "components/Button";
import FormContainer from "components/FormContainer";
import InputField from "components/InputField";
import cookie from "cookie";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRef } from "react";
import toast from "react-hot-toast";
import { forget } from "service/auth.service";
import { getErrorMessage, getUserType } from "utils";
import { forgotInitialValues } from "utils/initialValues";
import preventForm from "utils/preventForm";
import { forgotSchema } from "utils/validations";

// TODO: Chnage name of Forgot user to Forgot and change the funct of forgot name to forgot
const Forgot = () => {
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = (values) => {
    toast.promise(forget(values.email), {
      loading: "Checking email",
      success: (token) => {
        localStorage.setItem("resetToken", token);
        formRef.current?.resetForm();
        router.push("/auth/reset");
        return "email sent successfully";
      },
      error: (e) => {
        return getErrorMessage(e);
      }
    });
  };

  preventForm(formRef);

  return (
    <FormContainer formTitle="Forgot your password?">
      <p className=" mb-4 text-sm">
        Enter the email associated with your account and we’ll send you instructions to reset your
        password.
      </p>
      <Formik
        validationSchema={forgotSchema}
        initialValues={forgotInitialValues}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ values, touched, handleBlur, handleChange, errors }) => (
          <Form>
            <InputField
              label="Email Address"
              applyStar
              name="email"
              type="email"
              value={values.email}
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.email && Boolean(errors.email)}
            />

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                customStyle="mx-auto py-3 md:py-3 lg:py-3 px-9 md:px-12 lg:px-14 md:text-base"
              >
                Submit
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

Forgot.seo = {
  title: "Forgot",
  description: " Forgot page description"
};

Forgot.blueKiHeight = "h-[20rem]";

export default Forgot;
