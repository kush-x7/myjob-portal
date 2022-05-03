import Button from "components/Button";
import FormContainer from "components/FormContainer";
import InputField from "components/InputField";
import ROUTES from "constants/routes";
import cookie from "cookie";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { login } from "service/auth.service";
import { formatError, getErrorMessage, getUserType, saveUserToLocal } from "utils";
import { loginInitialValues } from "utils/initialValues";
import preventForm from "utils/preventForm";
import { loginSchema } from "utils/validations";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const dataFetched = await login(values);
      // Saving user to cookies
      saveUserToLocal(dataFetched);

      const user = Cookies.get("user");
      const parsedUser = JSON.parse(user);
      formRef.current?.resetForm();
      setLoading(false);
      if (dataFetched) {
        toast.success("Login Successful");
        router.push(`/${getUserType(parsedUser.userRole)}`);
      }
    } catch (e) {
      setLoading(false);
      if (e.response.data.message === "Wrong Email or Password") {
        formRef.current.setErrors({
          password: "Incorrect email address or password",
          email: " "
        });
      } else {
        const formattedError = formatError(e);
        if (formattedError) {
          formRef.current.setErrors(formattedError);
        } else {
          toast.error(getErrorMessage(e));
        }
      }
    }
  };

  preventForm(formRef);

  return (
    <FormContainer formTitle="Login">
      <Formik
        validationSchema={loginSchema} // This validation Schema is for yup validation
        initialValues={loginInitialValues} // This is for initial values which we are passing from the utils/initialValues
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

            <div>
              <p className="absolute right-0 top-[0.3rem]  text-xs font-medium text-primary-light_blue">
                <Link href={ROUTES.FORGOT}>Forgot your password?</Link>
              </p>
              <InputField
                label="Password"
                applyStar
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.password && Boolean(errors.password)}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                loading={loading}
                type="submit"
                customStyle="mx-auto py-3 md:py-3 lg:py-3 px-9 md:px-12 lg:px-14 md:text-base"
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="mt-12 text-center  text-xs font-normal sm:text-base ">
        New to MyJobs?{" "}
        <Link href={ROUTES.SIGNUP}>
          <span className="inline-block cursor-pointer text-primary-light_blue">
            Create an account
          </span>
        </Link>
      </p>
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

Login.seo = {
  title: "Login",
  description: " Login to MyJobs"
};

Login.blueKiHeight = "h-[20rem]";

export default Login;
