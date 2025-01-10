import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { connectionRequest, sujjectionApi } from "@/services/services";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
interface SujjectioProps {
  setConnectionCount: React.Dispatch<React.SetStateAction<any>>;
  _id:any
}
const Sujjetion = ({ setConnectionCount ,_id}: SujjectioProps) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [connectionReqLoading, setconnectionReqLoading] = useState(false);
  const fetchSearchResults = async (postData: any) => {
    setLoading(true);

    try {
      let apiResp = await sujjectionApi(postData);
      console.log(apiResp);
      if (apiResp.status === 200) {
        console.log(apiResp?.data?.recordsCount);
        setData(apiResp?.data?.records);
        setConnectionCount && setConnectionCount(apiResp?.data?.recordsCount);
      } else {
        toast.error(apiResp.data?.message);
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

  const fetchConnectionRequest = async (postData: any) => {
    setconnectionReqLoading(true);

    try {
      let apiResp = await connectionRequest(postData);
      console.log(apiResp);
      if (apiResp.status === 200) {
        console.log(apiResp?.data?.recordsCount);
        toast.success(apiResp?.data?.message)
      } else {
        toast.error(apiResp.data?.message);
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
        setconnectionReqLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };

  useEffect(() => {
    fetchSearchResults &&
      fetchSearchResults({ _id: _id?.id });
  }, []);
  return (
    <div className="w-full h-full gap-2 grid grid-cols-4 z-10 overflow-y-scroll no-scrollbar ">
      {Array.isArray(data) && data?.length > 0 ? (
        data.map((cur: any, index: number) => (
          <div>
            <Card className="h-[250px] space-y-2 p-2">
              <div className="flex justify-center ">
                <img
                  src={cur?.profileImage}
                  alt={cur?.firstname}
                  className="w-[80px] h-[80px] rounded-full"
                />
              </div>
              <div className="space-y-[2px]">
                <div className="text-center text-lg font-bold text-gray-700">
                  {cur?.firstname} {cur?.lastname}
                </div>
              
                <div className="text-center text-sm text-gray-700 font-medium">
                  {cur?.designation}
                </div>
                <p className="text-center text-xs font-normal text-gray-600">
                  2 subscription
                </p>
                <div className="  flex space-x-1 items-center justify-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    alt="Profile 1"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                    alt="Profile 2"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center space-x-2 text-sm">
                <Button className="h-8 w-[60px] text-sm font-semibold" disabled={connectionReqLoading} onClick={()=>fetchConnectionRequest({
                       receiverId: cur?._id,
                       senderId: _id?.id,
                })}>{connectionReqLoading?"Wait...":"Accept"}</Button>
                <Link to={"#"} className="hover:underline hover:underline-offset-4 font-medium text-gray-600">Dismiss</Link>
              </div>
            </Card>
          </div>
          
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-lg font-medium"></div>
      )}
    </div>
  );
};

export default Sujjetion;
