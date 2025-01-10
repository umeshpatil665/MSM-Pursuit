import { Bell, BoomBox, Briefcase, BriefcaseBusiness, FileText, Globe, Home, House, LayoutDashboard, LineChart, Mail, MessageCircle, Network, PenTool, ShoppingCart, SlidersHorizontal, Store, Wrench } from "lucide-react";

export interface IMenuItem {
    name: string,
    iconName: any,
    path: string,
    options?: Array<{
        name: string,
        // iconName: any,
        path: string,
    }>
}

export const Menu: IMenuItem[] = [
    {
      name: "Addvance",
      iconName: (className: string) => <SlidersHorizontal   className={className} color="#ef4444"/>,
      path: "/pages/dashboard",
    },
    {
      name: "Network",
      iconName: (className: string) => <Network  className={className} color="#ef4444"/>,
      path: "/pages/dashboard",
    },
    {
      name: "Home",
      iconName: (className: string) => <House  className={className} fill="#ef4444"/>,
      path: "/home",
    },
    {
      name: "AIME",
      iconName: (className: string) => <Globe   className={className} fill="#ef4444"/>,
      path: "/aime",
    },
    {
      name: "Market",
      iconName: (className: string) => <Store  className={className} fill="#ef4444"/>,
      path: "/market",
    },
    {
      name: "Job",
      iconName: (className: string) => <BriefcaseBusiness  className={className} fill="#ef4444"/>,
      path: "/job",
    },
    {
      name: "Application",
      iconName: (className: string) => <FileText  className={className} fill="#ef4444"/>,
      path: "/application",
    },
    {
      name: "Tools",
      iconName: (className: string) => <Wrench  className={className} fill="#ef4444"/>,
      path: "/tools",
      options: [
        {
          name: "Action",
         
          path: "/tools/action",
        },
        {
          name: "Another Action",
         
          path: "/tools/another-action",
        },
        {
          name: "Something Else Here",
        
          path: "/tools/something-else",
        },
      ]
    },
    {
      name: "23.35",
      iconName: (className: string) => <BoomBox  className={className} fill="#ef4444"/>,
      path: "/23-35",
      options: [
        {
          name: "Action",
         
          path: "/tools/action",
        },
        {
          name: "Another Action",
         
          path: "/tools/another-action",
        },
        {
          name: "Something Else Here",
        
          path: "/tools/something-else",
        },
      ]
    },
    {
      name: "Notifications",
      iconName: (className: string) => <Bell  className={className} fill="#ef4444"/>,
      path: "/notifications",
    },
    {
      name: "Message",
      iconName: (className: string) => <Mail  className={className} fill="#ef4444"/>,
      path: "/message",
    },
    {
        name: "EN",
        iconName: (className: string) => <BoomBox  className={className} fill="#ef4444"/>,
        path: "/en",
        options: [
          {
            name: "Action",
           
            path: "/tools/action",
          },
          {
            name: "Another Action",
           
            path: "/tools/another-action",
          },
          {
            name: "Something Else Here",
          
            path: "/tools/something-else",
          },
        ]
      },
  ];