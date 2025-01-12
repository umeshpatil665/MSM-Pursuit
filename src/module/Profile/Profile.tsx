import { Card } from "@/components/ui/card";
import { profileRequest } from "@/services/services";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { search } = useLocation();
  const [_id, setId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
const naviigate=useNavigate()
  // Parse query params from URL
  useEffect(() => {
    const params:any = search && search.split("?")[1]?.split("&");
    let searchParams: any = {};

    params?.forEach((param: string) => {
      const [key, value] = param.split("=");
      searchParams[key] = value;
    });

    setId(searchParams?.id || null);
  }, [search]);

  // Fetch profile data
  const fetchProfile = async (id: string) => {
    setLoading(true);
    try {
      const apiResp: any = await profileRequest({ _id: id });
      if (apiResp.status === 200) {
        setData(apiResp?.data?.Userdetails);
      } else {
        toast.error(apiResp?.data?.message || "Failed to fetch profile data");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (axios.isAxiosError(err)) {
        // toast.error(err.response?.data?.message || "Error fetching profile data");
      } else {
        // toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      fetchProfile(_id);
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-600 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-semibold">
          No profile data available. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100 py-8">
      <Card className="w-[70%] shadow-lg rounded-lg bg-white p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-6 mb-6">
          <img
            // src={data.profileImage}
            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
            alt={`${data.firstname} ${data.lastname}`}
            className="w-24 h-24 rounded-full border-4 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              {data.firstname} {data.lastname}
            </h1>
            <p className="text-gray-600">{data.designation}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Contact Information
            </h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <span className="text-gray-600">{data.email}</span>
              </li>
              <li>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                <span className="text-gray-600">
                  {data.countrycode} {data.phonenumber}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-700">Country:</span>{" "}
                <span className="text-gray-600">{data.country}</span>
              </li>
            </ul>
          </div>

          {/* Referral Info */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Referral Information
            </h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-gray-700">Referred From:</span>{" "}
                <span className="text-gray-600">{data.referredfrom}</span>
              </li>
              <li>
                <span className="font-medium text-gray-700">Referred By:</span>{" "}
                <span className="text-gray-600">{data.referredby}</span>
              </li>
              <li>
                <span className="font-medium text-gray-700">Referral ID:</span>{" "}
                <span className="text-gray-600">{data.referrelid}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-end text-sm underline underline-offset-4 cursor-pointer" onClick={()=>naviigate(`/pages/dashboard?id=${_id}`)}>Back</div>
      </Card>
    </div>
  );
};

export default Profile;
