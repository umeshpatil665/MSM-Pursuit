import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { invitationRequest, sujjectionApi, updateInvitationRequest } from "@/services/services";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface InvitationsProps {
  _id: any;
}
const Invitations = ({ _id }: InvitationsProps) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
const [upodateLoading,setupdateLoading]=useState(false)
  const fetchInvitationsRequest = async (postData: any) => {
    setLoading(true);

    try {
      let apiResp = await invitationRequest(postData);
      console.log(apiResp);
      if (apiResp.status === 200) {
        console.log(apiResp?.data?.recordsCount);
        setData(apiResp?.data?.connections);
        toast.success(apiResp?.data?.message);
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
  
  useEffect(() => {
    const obj = { receiverId: _id?.id };
    if (obj) {
      fetchInvitationsRequest && fetchInvitationsRequest(obj);
    } else return;
  }, [_id]);

  const updateInvition = async (postData: any) => {
    setupdateLoading(true);

    try {
      let apiResp = await updateInvitationRequest(postData);
      console.log(apiResp);
      if (apiResp.status === 200) {
        // console.log(apiResp?.data?.recordsCount);
        // setData(apiResp?.data?.connections);
        toast.success(apiResp?.data?.message);
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
      setupdateLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };
  return (
    <div className="w-full h-full gap-2 grid grid-cols-4  mt-4">
      {Array.isArray(data) && data?.length > 0 ? (
        data.map((cur: any, index: number) => (
          <div>
            <Card className="h-[250px] space-y-2 p-2">
              <div className="flex justify-center ">
                <img
                  src={cur?.senderDetails?.profileImage}
                  alt={cur?.senderDetails?.firstname}
                  className="w-[80px] h-[80px] rounded-full"
                />
              </div>
              <div className="space-y-[2px]">
                <div className="text-center text-lg font-bold text-gray-700">
                  {cur?.senderDetails.firstname} {cur?.senderDetails.lastname}
                </div>
                {/* <div className="text-center text-sm text-gray-700 font-medium">{cur?.email}</div> */}
                <div className="text-center text-sm text-gray-700 font-medium">
                  {cur?.senderDetails?.designation}
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
                <Button className="h-8 w-[60px] text-sm font-semibold px-2"
                onClick={()=>
                  updateInvition({
                    senderId:cur.senderDetails._id,
                    receiverId:cur.receiver,
                    status:"Accepted"
                  })
                }
                disabled={upodateLoading}
                >
                  Accept
                </Button>
                <Button className="h-8 w-[60px] text-sm font-semibold px-2 bg-red-500 hover:bg-red-500"
                     onClick={()=>
                      updateInvition({
                        senderId:cur.senderDetails._id,
                        receiverId:cur.receiver,
                        status:"Rejected"
                      })
                    }
                    disabled={upodateLoading}
                >
                  Dismiss
                </Button>
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

export default Invitations;
