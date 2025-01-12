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
import React from "react";
interface ReportDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const ReportDialog = ({ open, setOpen }: ReportDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
      <Button variant="outline">Edit Profile</Button>
    </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] h-[600px]">
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
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Breaks rules of the group
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">Harassment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Threatening violence
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">Hate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">Abuse</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Impersonation
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Copyright violation
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Trademark violation
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">
                    Self-harm/suicide
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" />
                  <span className="text-sm font-medium -mt-1">Spam</span>
                </div>
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
            <Button className="w-full text-base font-bold bg-blue-950 hover:bg-blue-800">Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportDialog;
