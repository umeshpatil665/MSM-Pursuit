import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Import ShadCN Input component
import { Send, Paperclip, Smile, Mic, Image } from "lucide-react";
interface ChatScreenProps{
    open:boolean;
    setOpen:(val:boolean)=>void
    userDetails:any
}
const ChatScreen = ({open,setOpen,userDetails}:ChatScreenProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}  >
         <DialogContent className="sm:max-w-[450px] h-[500px] flex flex-col p-0  border border-blue-800">
   
         <DialogHeader className="">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-800 text-white rounded-t-md">
        <div className="text-lg font-semibold">{userDetails?.firstname||"-"} {userDetails?.lastname||""}</div>
        {/* <button className="p-1 hover:bg-blue-700 rounded-full">
          <Send className="w-5 h-5" />
        </button> */}
      </div>

   
      </DialogHeader>
      <DialogDescription className="flex-1 overflow-y-auto no-scrollbar">
           {/* Chat Messages */}
      <div className=" p-4 space-y-4 bg-white">
        {/* Sender message */}
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>

        {/* Receiver message */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>
                {/* Sender message */}
                <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>

        {/* Receiver message */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>

                {/* Sender message */}
                <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>

        {/* Receiver message */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs text-sm">
            Do you have these notes from class? I had to miss it, so I'm going
            around asking everyone about it. It would help a lot if you have
            it.
          </div>
        </div>
        
      </div>
      </DialogDescription>
      {/* Input Field */}
       <DialogFooter className="w-full">
      <div className="w-full flex items-center border-t bg-blue-800 rounded-b-md p-1">
      <div className="flex-1 mx-2">
          <Input type="text" placeholder="Type your message..." />
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
      

        <button className="p-2 text-white">
          <Send className="w-5 h-5" />
        </button>
      </div>
      </DialogFooter>
    
    
    </DialogContent>
    </Dialog>
  );
};

export default ChatScreen;
