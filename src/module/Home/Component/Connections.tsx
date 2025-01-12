import React, { useEffect, useState } from "react";
import { ConnectionDropDown } from "./modules";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { disconnectUserApi, getConnection } from "@/services/services";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Ban, ClipboardMinus, MessageSquareMore, Power } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ReportDialog from "./ReportDialog";
import ChatScreen from "./Chat";
interface ConnectionsProps {
  _id: any;
  setConnectionCount: React.Dispatch<React.SetStateAction<any>>;
}

const Connections = ({ _id, setConnectionCount }: ConnectionsProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [connectionData, setConnectionData] = useState<any>();
  const fetchSearchConnection = async (postData: any) => {
    setLoading(true);

    try {
      let apiResp = await getConnection(postData);

      if (apiResp.status === 200) {
        console.log(apiResp?.data?.users);
        setData(apiResp?.data?.users);
        console.log(apiResp?.data?.users?.length);
        const coount =
          Array.isArray(apiResp?.data?.users) &&
          apiResp?.data?.users?.length > 0
            ? apiResp?.data?.users?.length
            : 0;
        setConnectionCount && setConnectionCount(coount);
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
    if (_id?.id) {
      fetchSearchConnection &&
        fetchSearchConnection({
          id: _id?.id,
        });
    } else return;
  }, [_id?.id]);

  const options = [
    { value: "disconnection", label: "Disconnection" },
    { value: "block", label: "Block" },
    { value: "report", label: "Report" },
    { value: "view_more", label: "View More" },
  ];

  const disconnectUser = async (postData: any) => {
    // setLoading(true);

    try {
      let apiResp = await disconnectUserApi(postData);

      if (apiResp.status === 201) {
        toast.success("Disconnect Succesfully");
        fetchSearchConnection &&
        fetchSearchConnection({
          id: _id?.id,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      return apiResp.data;
    } catch (err) {
      let error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        toast.error("An unexpected error occurred. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      // setLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };

  return (
    <div className="w-full  mx-auto ">
      {loading ? (
        <div>Loading ...</div>
      ) : Array.isArray(data) && data?.length > 0 ? (
        <ul className=" w-full divide-y divide-gray-200 px-4 z-10 overflow-y-scroll no-scrollbar">
          {data.map((user: any) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profileImage}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-600">{user.designation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-center border-none font-bold text-lg h-6"
                      >
                        ...
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <ul className="space-y-1">
                        <li>
                          {" "}
                          <Button
                            variant={"outline"}
                            className="w-full border-none flex justify-start items-center  px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 cursor-pointer"
                            onClick={() =>
                              disconnectUser({
                                _id: _id?.id,
                                disconnected_user: user._id,
                              })
                            }
                          >
                            <span>
                              <Power />{" "}
                            </span>
                            <span>Disconnection</span>
                          </Button>
                        </li>

                        <li>
                          <Button
                            variant={"outline"}
                            className="w-full border-none flex justify-start items-center  px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 cursor-pointer"
                            // onClick={() => handleOptionClick(option.value)}
                          >
                            <span>
                              <Ban />
                            </span>{" "}
                            <span>Block</span>
                          </Button>
                        </li>
                        <li>
                          <Button
                            variant={"outline"}
                            className="w-full border-none flex justify-start items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 cursor-pointer"
                            onClick={() => {
                              setReportOpen(!reportOpen);
                              setConnectionData(user);
                            }}
                          >
                            <span>
                              <ClipboardMinus />
                            </span>
                            <span>Report</span>
                          </Button>
                        </li>
                        {/* <li>
                          <Button
                           variant={'outline'}
                            className="w-full border-none flex justify-start px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800 cursor-pointer"
                            // onClick={() => handleOptionClick(option.value)}
                          >
                           View More
                          </Button>
                        </li> */}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <MessageSquareMore
                    onClick={() => {
                      setChatOpen(!chatOpen);
                      setConnectionData(user);
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No Connection available</div>
      )}

      <ReportDialog
        open={reportOpen}
        setOpen={setReportOpen}
        id={_id?.id}
        userDetails={connectionData && connectionData}
      />
      <ChatScreen
        open={chatOpen}
        setOpen={setChatOpen}
        userDetails={connectionData && connectionData}
        id={_id?.id}
      />
    </div>
  );
};

export default Connections;
