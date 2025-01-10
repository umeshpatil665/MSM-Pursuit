import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// @ts-ignore
import debounce from "lodash.debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { serachFilterApi } from "@/services/services";
import { Link } from "react-router-dom";
interface HomeLayoutProps{
    tabValue:any
}
const HomeLayout = ({tabValue}:HomeLayoutProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
const [open,setOpen]=useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const value = e.target.value;
    if (value) {
      let obj = {
        query: value,
      };
      fetchSearchResults(obj);
    } else {
      setResults([]);
    }
  };
  const fetchSearchResults = debounce(async (postData: any) => {
    // setLoading(true);
    try {
      let apiResp = await serachFilterApi(postData);

      if (apiResp.status === 200) {
        setResults(apiResp?.data?.data);
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
  },500);

  return (
    <div className="w-full ">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-bold ">{tabValue?.name}</h1>
        <div className=" space-x-3">
          <Popover open={open}>
            <PopoverTrigger >
              <div className="w-full relative flex justify-between items-center">
            <Input
                  id="width"
                  placeholder="Search Users"
                  className="w-[250px] h-10"
                  value={searchValue}
                  onChange={handleInputChange}
                  // onClick={()=>setOpen(true)}
onFocus={()=>setOpen(true)}
                />
                <Search className="w-[24px] h-[24px] text-blue-600 absolute ml-[85%] "/>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80"
           onPointerDownOutside={()=>setOpen(false)}
            >
              <div>

                <div className="h-[200px] overflow-auto mt-2">
                  <ul className="space-y-2">
                    {Array.isArray(results)&&results?.length>0?results.map((item: any, index) => (
                      <li key={index} className="text-xs font-medium flex items-center space-x-2">
                        {/* <img src={item.profileImage} alt={item.name} /> */}
                       <span>{item.name} - {item.designation}</span> 
                      </li>
                    )):<li></li>}
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Link to={'#'} className="text-blue-600 text-base whitespace-nowrap font-normal underline underline-offset-4">Search with filters</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
