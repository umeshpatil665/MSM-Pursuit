import React, { useEffect, useState } from "react";
import HomeLayout from "./Component/HomeLayout";
import { Card } from "@/components/ui/card";
import { ConnectionDropDown, homeItems } from "./Component/modules";
import { cn } from "@/lib/utils";
import Connections from "./Component/Connections";
import Sujjetion from "./Component/Sujjetion";
import Invitations from "./Component/Invitations";
import Sents from "./Component/Sents";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Home = () => {
  const [tabValue, setTabvalue] = useState({
    name: "Connections",
    value: "connections",
  });
  const [connectionCount, setConnectionCount] = useState(0);
  const [dropDownVal, setDropVal] = useState<string>("");
  const [_id, setId] = useState<any>();
  const switchingComponent = (val: string) => {
    switch (val) {
      case "connections":
        return <Connections _id={_id} setConnectionCount={setConnectionCount}/>;
      case "suggestions":
        return <Sujjetion setConnectionCount={setConnectionCount} _id={_id} />;
      case "invitations":
        return <Invitations _id={_id} />;
      case "sents":
        return <Sents setConnectionCount={setConnectionCount} _id={_id}/>;
      default:
        return <Connections _id={_id} setConnectionCount={setConnectionCount}/>;
    }
  };
  const { search } = useLocation();

  useEffect(() => {
    const params = search && search?.split("?")[1].split("&");

    let searchParams: any = {};

    params &&
      params.forEach((o: any) => {
        let splitParam = o?.split("=");
        searchParams[splitParam[0]] = splitParam[1];
      });

    setId({ id: searchParams?.id });
    return () => {};
  }, [search]);

  console.log(_id);
  return (
    
    <div className="w-full p-2 flex flex-col h-full">
      
 <Card className="w-full p-2">
        <HomeLayout tabValue={tabValue} _id={_id?.id}/>
        <hr className="w-full border border-violet-600/10 mt-2" />
        <div className="w-full flex items-center space-x-4 mt-2">
          {homeItems?.map(
            (
              cur: {
                name: string;
                value: string;
              },
              index: number
            ) => (
              <div
                key={index} // Add a key to avoid React warnings
                className={cn("text-black p-2 font-medium cursor-pointer", {
                  "text-white border font-bold rounded-md border-blue-600 bg-blue-600":
                    cur?.value === tabValue?.value,
                })}
                onClick={() => setTabvalue(cur)}
              >
                {cur?.name}
              </div>
            )
          )}
        </div>
      </Card>
      
     
      <div className="w-full   my-2">
        <div className="w-full h-full flex">
          <Card
            className="w-[70%] h-[500px]  px-4" 
          >
            <div className="w-full flex justify-between items-center">
              <h1 className="text-sm font-normal text-gray-600">
                {connectionCount} Connection
              </h1>
              <div className="w-[200px]">

                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex justify-center items-center space-x-2 whitespace-nowrap">
                      <div className="text-sm font-normal">Sort By:</div>
                      <Button
                        variant="outline"
                        className="border-none text-sm flex items-center space-x-1"
                      >
                        {" "}
                        <span className="font-bold">Recently Added</span>
                        <ChevronDown fill="#000000" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <ul>
                      {ConnectionDropDown.map((cur: any, index: number) => (
                        <li key={index} className="ml-4 text-sm font-normal">
                          {cur?.label}
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-full h-[430px] z-50">
              {switchingComponent && switchingComponent(tabValue?.value)}
            </div>
          </Card>


          <div
            className="w-[30%] h-full  overflow-y-auto no-scrollbar pl-4" // Optional: Sidebar for content
            // style={{ maxHeight: "calc(100vh - 300px)" }} // Adjust max height dynamically
          >
            {/* Add optional sidebar content here */}
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Home;
