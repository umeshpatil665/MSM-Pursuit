import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useFormik } from "formik";
import { ILoginValues, LoginProps, LoginSchema } from "./modules";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUsernamePasswordApi } from "@/services/services";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateLoginData } from "@/redux/Slicer/loginSlicer";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch=useDispatch()
  const formik = useFormik<LoginProps>({
    initialValues: ILoginValues,
    onSubmit: async (values) => {
      henadleSendOtpApi(values);
    },
    validationSchema: LoginSchema,
  });

  const henadleSendOtpApi = async (postData: any) => {
    setLoading(true);
    try {
      let apiResp = await loginUsernamePasswordApi(postData);
console.log(apiResp)
      if (apiResp.status === 200) {
        const userId = apiResp.userid
        navigate(`/pages/dashboard?id=${userId}`);

        toast.success(apiResp.message);
        formik.resetForm();
      } else {
        toast.error(apiResp.message);
      }
      return apiResp.data;
    } catch (err) {
      let error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200 ">
      <Card className="w-[400px] p-4 space-y-2">
        <h1 className="text-center text-3xl font-semibold text-[#333333]">
          Login
        </h1>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <Label
              className="text-sm font-medium mb-1 ml-2 text-[#555555]"
              htmlFor="email"
            >
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formik.values?.email}
              onChange={(e: any) =>
                formik.setFieldValue("email", e?.target?.value)
              }
              onBlur={formik.handleBlur}
            />
            <p
              className="text-sm text-red-600 ml-2 font-medium"
              data-testid={"l-errorMess"}
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </p>
          </div>

          <div>
            <Label
              className="text-sm font-medium mb-1 ml-2 text-[#555555]"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values?.password}
              onChange={(e: any) =>
                formik.setFieldValue("password", e?.target?.value)
              }
              onBlur={formik.handleBlur}
            />
            <p
              className="text-sm text-red-600 ml-2 font-medium"
              data-testid={"l-errorMess"}
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </p>
          </div>

          <Button
            className="w-full bg-[#DD0F72] hover:bg-[#DD0F72] text-base"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
