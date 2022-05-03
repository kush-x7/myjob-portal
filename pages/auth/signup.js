import clsx from "clsx";
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
import { signUp } from "service/auth.service";
import { formatError, getErrorMessage, getUserType, saveUserToLocal } from "utils";
import { signupInitialValues } from "utils/initialValues";
import preventForm from "utils/preventForm";
import { signupSchema } from "utils/validations";

const Signup = () => {
  const formRef = useRef();
  const router = useRouter();

  // loading state is used for button disabling
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    // On clicking button we are setting loading to true which will disable the button
    setLoading(true);

    try {
      const dataFetched = await signUp(values);
      // Saving user to cookies
      saveUserToLocal(dataFetched);

      const user = Cookies.get("user");
      const parsedUser = JSON.parse(user);
      router.push(`/${getUserType(parsedUser.userRole)}`);
      formRef.current?.resetForm();
      setLoading(false);
    } catch (e) {
      const formattedError = formatError(e);
      if (formattedError) {
        formRef.current.setErrors(formattedError);
      } else {
        toast.error(getErrorMessage(e));
      }

      setLoading(false);
    }
  };

  preventForm(formRef);

  return (
    <div className="-translate-y-16">
      <FormContainer formTitle="Signup">
        <Formik
          validationSchema={signupSchema}
          initialValues={signupInitialValues}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, resetForm }) => (
            <Form>
              <p className="text-sm font-light ">
                {`I'm a`} <span className="text-red-500 ">*</span>
              </p>
              <div className="mb-4 mt-3 flex" role="group" aria-labelledby="my-radio-group">
                <div
                  className={clsx(
                    "mr-4 flex h-11 w-32 cursor-pointer items-center justify-center rounded-md bg-primary-light_blue text-xs text-secondary-light md:text-base",
                    {
                      "border-[#C6C6C6] !bg-[#E8E8E833]  !text-[#303F60]": +values.userRole !== 0
                    }
                  )}
                  htmlFor="userRole"
                  onClick={() => {
                    if (values.userRole === 1) {
                      resetForm();
                    }
                    setFieldValue("userRole", 0);
                  }}
                >
                  <img
                    className={clsx("mr-2 w-5 ", {
                      blue_svg: values.userRole === 1
                    })}
                    src="/assets/icons/single-person.svg"
                    alt="recruiter image"
                  />
                  Recruiter
                </div>
                <div
                  className={clsx(
                    "mr-4 flex h-11 w-32 cursor-pointer items-center justify-center rounded-md bg-primary-light_blue text-xs text-secondary-light md:text-base",
                    {
                      "border-[#C6C6C6] !bg-[#E8E8E833]  !text-[#303F60]": +values.userRole !== 1
                    }
                  )}
                  htmlFor="userRole"
                  onClick={() => {
                    if (values.userRole === 0) {
                      resetForm();
                    }
                    setFieldValue("userRole", 1);
                  }}
                >
                  <img
                    className={clsx("mr-2 w-5 ", {
                      blue_svg: values.userRole === 0
                    })}
                    src="/assets/icons/single-person.svg"
                    alt="recruiter image"
                  />
                  Candidate
                </div>
              </div>

              <InputField
                label="Full Name"
                applyStar
                name="name"
                type="name"
                value={values.name}
                placeholder="Enter your full name"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.name && Boolean(errors.name)}
              />
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
              <div className="justify-between md:flex">
                <div className="md:w-1/2 md:pr-4">
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
                <div className="md:w-1/2 md:pl-4">
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
                </div>
              </div>
              <InputField
                label="Skills"
                applyStar={values.userRole === 1}
                name="skills"
                type="skills"
                value={values.skills}
                placeholder="Enter comma separated skills"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.skills && Boolean(errors.skills)}
              />
              <div className="mt-8 flex justify-center">
                <Button
                  loading={loading}
                  type="submit"
                  customStyle="mx-auto py-3 md:py-3 lg:py-3 px-9 md:px-12 lg:px-14 md:text-base"
                >
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-12 text-center text-base ">
          Have an account?{" "}
          <Link href={ROUTES.LOGIN}>
            <span className="inline-block cursor-pointer text-primary-light_blue">Login</span>
          </Link>
        </p>
      </FormContainer>
    </div>
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

Signup.seo = {
  title: "Signup",
  description: " Signup page description"
};

Signup.blueKiHeight = "h-[20rem]";

export default Signup;
