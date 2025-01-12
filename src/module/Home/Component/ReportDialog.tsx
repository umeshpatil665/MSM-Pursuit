import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { reportUserApi } from "@/services/services";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
interface ReportDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  id:string;
  userDetails:any
}
const ReportDialog = ({ open, setOpen,id,userDetails }: ReportDialogProps) => {
  const reportOptions = [
    { value: "Breaks rules of the group", label: "Breaks rules of the group" },
    { value: "Harassment", label: "Harassment" },
    { value: "Threatening violence", label: "Threatening violence" },
    { value: "Hate", label: "Hate" },
    { value: "Abuse", label: "Abuse" },
    { value: "Impersonation", label: "Impersonation" },
    { value: "Copyright violation", label: "Copyright violation" },
    { value: "Trademark violation", label: "Trademark violation" },
    { value: "Self-harm/suicide", label: "Self-harm/suicide" },
    { value: "Spam", label: "Spam" },
  ];
  const [value, setValue] = useState(reportOptions[0]?.value);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setCheck] = useState();

  const reportFetching = async (postData: any) => {
    setLoading(true);

    try {
      let apiResp = await reportUserApi(postData);
      console.log(apiResp);
      if (apiResp.status === 201) {
        // console.log(apiResp?.data?.recordsCount);
        toast.success('Reported Succesfully');
        
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
      return apiResp.data;
    } catch (err) {
      let error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        toast.error('An unexpected error occurred. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
        setLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };
console.log(userDetails)
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
      <Button variant="outline">Edit Profile</Button>
    </DialogTrigger> */}
        <DialogContent className="w-full sm:max-w-[425px] h-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Report
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <div className="text-sm font-normal">
                Thanks for looking out for yourself and fellow students by
                reporting things that break the rules. Let us know what's
                happening and we'll look into it.
              </div>
              <div className="space-y-2">
                <RadioGroup
                  defaultValue={reportOptions[0]?.value}
                  onValueChange={(e: string) => setValue(e)}
                >
                  {reportOptions?.map(
                    (
                      { value, label }: { value: string; label: string },
                      index: number
                    ) => (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem value={value} id={`r-${index}`} />
                        <Label htmlFor={`r-${index}`}>{label}</Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
              <div className=" bg-gray-100 flex items-center space-x-2 px-2 py-3 rounded-lg">
                <div className="w-5 h-5 rounded-full border-[2px] border-blue-600 flex items-center justify-center text-xs font-bold text-blue-600">
                  i
                </div>
                <div className="w-full text-sm font-medium">
                  <div className="font-normal">
                    Not sure if something is breaking the rules?
                  </div>
                  <div className="text-blue-500">
                    Review MSMP’s Content Policy and the groups rules
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="w-full text-base font-bold bg-blue-950 hover:bg-blue-800"
              disabled={!value || value === undefined || loading}
              onClick={() =>
                reportFetching({
                  reportedPerson: userDetails?._id,
                  reportedBy: id,
                  comment: value,
                })
              }
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportDialog;
