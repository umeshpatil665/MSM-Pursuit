import { Input } from "@/components/ui/input";
import { ChevronDown, Search, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMenuItem, Menu } from "./modules";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { getGlobalSearchApi, profileRequest } from "@/services/services";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
// @ts-ignore
import debounce from "lodash.debounce";
const Navbar = () => {
  const { search } = useLocation();
  const [_id, setId] = useState<any>();
  const [data, setData] = useState<any>();
  const [open,setOpen]=useState(false)
  const [searchValue, setSearchValue] = useState("");
   const [results, setResults] = useState<any[]>([]);
   const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const value = e.target.value;
    if (value) {
      let obj = {
        query: value,
      };
    const query=`q=${value}&page=1&limit=10&_id=${ _id?.id}`
      fetchSearchResults(query);
    } else {
      setResults([]);
    }
  };

  const fetchSearchResults = debounce(async (postData: any) => {
    setLoading(true);
    try {
      let apiResp = await getGlobalSearchApi(postData);

      if (apiResp.status === 200) {

        setResults(apiResp?.data?.data);
      } else {
        // toast.error(apiResp.data?.message);
      }
      return apiResp.data;
    } catch (err) {
      let error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        // toast.error(error.response?.data.message);
      } else {
        // toast.error(error.message);
      }
    } finally {
        setLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  },500);

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

  const menu = Menu;

  const profileRequestRequest = async (postData: any) => {
    // setconnectionReqLoading(true);

    try {
      let apiResp: any = await profileRequest(postData);
      console.log(apiResp);
      if (apiResp.status === 200) {
        setData(apiResp?.data?.Userdetails);

        // toast.success(apiResp?.data?.message)
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
      // setconnectionReqLoading(false); // Set loading state to false when request completes (whether success or failure)
    }
  };
  console.log(data);
  return (
    <nav className="w-full flex justify-between items-center py-3 bg-[#f8f9fa] border-b border-black/10 px-2">
      <div className="w-[25%] flex items-center space-x-2">
        <Link to="/" className="text-lg font-bold text-black">
          MSM Pursuit
        </Link>

        <div className="w-[60%] relative flex items-center">
          {/* <Input placeholder="Search" aria-label="Search" className=" w-full" />
          <Search className="absolute w-5 h-5 ml-[80%] text-red-500" /> */}

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
                            {
                              loading?<div>Loading...</div>:         <ul className="space-y-2">
                              {Array.isArray(results)&&results?.length>0?results.map((item: any, index) => (
                                <li key={index} className="text-xs font-medium flex items-center space-x-2">
                                  
                                 <span>{item.firstname} - {item.lastname}</span> 
                                </li>
                              )):<li></li>}
                            </ul>
                            }
                   

                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
        </div>
      </div>
      <div className="w-[65%]">


        <NavigationMenu className="flex justify-end max-w-5xl">
          <NavigationMenuList className="w-full bg-gray-100 flex items-center">
            {menu.map((cur: IMenuItem, index: number) =>
              cur?.options && cur?.options ? (
                <NavigationMenuItem className="">
                  <NavigationMenuTrigger className="flex flex-col items-center space-y-1 bg-gray-100 rounded-none">
                    <div>
                      {cur?.iconName &&
                        cur?.iconName(`w-[24px] h-[24px] text-white mt-1`)}
                    </div>
                    <div className="text-[10px] font-normal text-gray-500 flex items-center"><span>{cur?.name}</span>
                    <span><ChevronDown className="w-4 h-4"/></span></div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[250px] flex flex-col justify-center p-4">
                      {cur?.options.map((item: any, ind: number) => (
                        <li className="ml-4 text-sm font-normal">
                          <NavigationMenuLink asChild>
                            <a href="#">
                            {item?.name}
                            </a>
                            
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem className="bg-gray-100 rounded-none">
                  {/* <Link href="/docs" legacyBehavior passHref> */}
                  <NavigationMenuLink className={`bg-gray-100 rounded-none ${navigationMenuTriggerStyle()}`}>
                    <div  className="flex flex-col items-center ">
                    <div>  {cur?.iconName &&
                        cur?.iconName(`w-[24px] h-[24px] text-white mt-1`)}</div>
                    <div className="text-[10px] font-normal text-gray-500">{cur?.name}</div>
                    </div>
              
                  </NavigationMenuLink>
                  {/* </Link> */}
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-[10%] flex justify-end text-gray-500">
        <Popover>
          <PopoverTrigger
            asChild
            onClick={() => profileRequestRequest({ _id: _id?.id })}
          >
            <Button
              variant="outline"
              className="border-none hover:bg-[#f8f9fa] bg-[#f8f9fa]"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center space-x-1",
                  {}
                )}
              >
                <span className="flex justify-center items-center w-8 h-8 rounded-full border border-gray-500">
                  {/* <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                    className="rounded-full"
                    style={{ width: "30px", height: "30px" }}
                    alt="Avatar"
                  /> */}
                  <User className="w-6 h-6 text-black" />
                </span>
                <span className="flex items-center space-x-2">
                  <span className=" text-[10px] ">Me</span>
                  <ChevronDown className=" mt-1" />
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={data?.profileImage}
                  alt={data?.firstname}
                />
                <div className="space-y-1">
                  <div className="font-bold text-lg text-black">
                    {data?.firstname || "-"} {data?.lastname || "-"}
                  </div>
                  <div className="font-normal text-sm">
                    {data?.designation || "-"}
                  </div>
                </div>
              </div>

              <Button
                className="w-full border border-blue-600 rounded-full text-xs h-6"
                variant={"outline"}
                onClick={() => {
                  navigate(`/pages/profile?id=${_id?.id}`);
                }}
              >
                View Profile
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
