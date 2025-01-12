import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Import ShadCN Input component
import { chatSendMessageApi, getChaMessageApi } from "../../../services/services";
import axios, { AxiosError } from "axios";
import { Send, Paperclip, Smile, Mic, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface ChatScreenProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  userDetails: any;
  id: string;
}
const ChatScreen = ({ open, setOpen, userDetails, id }: ChatScreenProps) => {
  const [chatData, setChatData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const fetchchatData = async (query: string) => {
    setLoading(true);

    try {
      let apiResp = await getChaMessageApi(query);
      console.log(apiResp);
      if (apiResp.status === 200) {
        // console.log(apiResp?.data?.conversations);
        setChatData(apiResp?.data?.conversations);
        toast.success(apiResp?.data?.message);
        // fetchSearchResults && fetchSearchResults({ _id: _id?.id });
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
  // console.log(`userId=${id}&otherUserId=${userDetails?._id}`)
  useEffect(() => {
    console.log("object");
    if (id && userDetails?._id) {
      let query = `userId=${id}&otherUserId=${userDetails?._id}`;

      fetchchatData && fetchchatData(query);
    } else return;
  }, []);

  const sendChatRequest = async (postData: any) => {
    // setLoading(true);

    try {
      let apiResp = await chatSendMessageApi(postData);
      
      if (apiResp.status === 200) {
        console.log(apiResp?.data?.users);
        // setData(apiResp?.data?.users);
        let query = `userId=${id}&otherUserId=${userDetails?._id}`;

        fetchchatData && fetchchatData(query);
     
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
    //   setLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };
console.log(userDetails)
console.log(id)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] h-[500px] flex flex-col p-0  border border-blue-800">
        <DialogHeader className="">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-blue-800 text-white rounded-t-md">
            <div className="text-lg font-semibold">
              {userDetails?.firstname || "-"} {userDetails?.lastname || ""}
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="flex-1 overflow-y-auto no-scrollbar">
          {/* Chat Messages */}
          <div className=" p-4 space-y-4 bg-white">
            {/* Sender message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-400" />
              <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>

            {/* Receiver message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>
            {/* Sender message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-400" />
              <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>

            {/* Receiver message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>

            {/* Sender message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-400" />
              <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>

            {/* Receiver message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
                Do you have these notes from class? I had to miss it, so I'm
                going around asking everyone about it. It would help a lot if
                you have it.
              </div>
            </div>
          </div>
        </DialogDescription>
        {/* Input Field */}
        <DialogFooter className="w-full">
          <div className="w-full flex items-center border-t bg-blue-800 rounded-b-md p-1">
            <div className="flex-1 mx-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e: any) => setMessage(e?.target?.value)}
              />
            </div>
            <button className="p-2 text-white">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-2 text-white">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-white">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-2 text-white">
              <Image className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-white"
              onClick={() =>
                sendChatRequest({
                    receiverUserId: userDetails?._id,
                  senderUserId: id,
                  message: message,
                })
              }
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatScreen;
