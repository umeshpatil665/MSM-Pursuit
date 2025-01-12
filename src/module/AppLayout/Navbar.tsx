import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
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
import { profileRequest } from "@/services/services";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { search } = useLocation();
  const [_id, setId] = useState<any>();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
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
          <Input placeholder="Search" aria-label="Search" className=" w-full" />
          <Search className="absolute w-5 h-5 ml-[80%] text-red-500" />
        </div>
      </div>
      <div className="w-[65%]">
        {/* <ul className="flex items-center space-x-4">
          {menu?.map((menu: IMenuItem, index: number) => (
            <li className="space-y-4 font-medium  text-sm">
              {Array.isArray(menu?.options) && menu?.options?.length > 0 ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-none hover:bg-[#f8f9fa] bg-[#f8f9fa]"
                    >
                      <div
                        key={`${menu?.name}-${index + 1}`}
                        className={cn("flex flex-col items-center justify-center space-x-1", {})}
                      >
                        <span>
                          {menu.iconName &&
                            menu.iconName(
                              `w-[32px] h-[32px] text-white mt-1`
                            )}
                        </span>
                        <span className="text-black flex items-center">
                          <span className="text-xs">{menu?.name}</span>  <ChevronDown className="underline  hover:text-blue-600" />
                        </span>
                       
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <ul>
                      {menu?.options?.map((submenu: any, ind: number) => (
                        <li className="flex items-center  px-4 border-l border-white">
                          <Link
                            to={submenu.path}
                            className={cn(
                              "w-full p-2 ml-2 h-full flex items-center space-x-2"
                            )}
                          >
                            <span>{submenu?.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className={cn("w-full")}>
                  <Link
                    to={`/${menu?.path}?id=${_id?.id&&_id?.id}`}
                    key={`${menu?.name}-${index + 1}`}
                    className={cn("flex flex-col items-center", {})}
                  >
                    <span>
                      {menu.iconName &&
                        menu.iconName(`w-[22px] h-[22px] text-white mt-1`)}
                    </span>
                    <span className=" text-xs">
                      {menu?.name}
                    </span>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul> */}

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
                <span>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                    className="rounded-full"
                    style={{ width: "30px", height: "30px" }}
                    alt="Avatar"
                  />
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
                  src={'https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'}
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
