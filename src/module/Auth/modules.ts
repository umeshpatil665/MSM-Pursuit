import * as Yup from "yup";

export interface LoginProps {
email:string,
password:string
}

export const ILoginValues:LoginProps={
email:"",
password:""
}


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address") // Validates the email format
      .required("Email is required"), // Ensures the field is not empty
  
    password: Yup.string()
      .required("Password is required") // Ensures the field is not empty
    //   .min(8, "Password must be at least 8 characters") // Ensures a minimum length
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Lowercase requirement
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Uppercase requirement
    //   .matches(/[0-9]/, "Password must contain at least one number") // Number requirement
    //   .matches(/[@$!%*?&]/, "Password must contain at least one special character"), // Special character requirement
  });