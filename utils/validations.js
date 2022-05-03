import * as Yup from "yup";

export const forgotSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required")
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().min(6, "minimum 6 characters required").required("Password Required")
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .required("No password provided.")
    .matches(new RegExp("^[^ \n]*$"), `can't contain blank spaces`)
    .min(6, "Password is too short - should be 6 chars minimum."),
  confirmPassword: Yup.string()
    .required("No password provided.")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .matches(new RegExp("^[^ \n]*$"), `can't contain blank spaces`)
});

export const signupSchema = Yup.object({
  userRole: Yup.number().required("Required"),
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("This field is mandatory")
    .matches(/^[a-zA-Z ]+$/, "Name must be alphabets only"),
  email: Yup.string().email("Invalid email address").required("This field is mandatory"),
  password: Yup.string()
    .required("No password provided.")
    .matches(new RegExp("^[^ \n]*$"), `can't contain blank spaces`)
    .min(6, "minimum 6 characters required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .matches(new RegExp("^[^ \n]*$"), `can't contain blank spaces`)
    .min(6, "minimum 6 characters required")
    .required("No password provided."),
  skills: Yup.string().when("userRole", {
    is: 1,
    then: Yup.string().required("The field is mandatory")
  })
});
