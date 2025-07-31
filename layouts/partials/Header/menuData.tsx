import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Dashboard",
    path: "/dashboard",
    newTab: false,
  },
  {
    id: 3,
    title: "Enrollment",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Candidate",
        path: "/candidate",
        newTab: false,
      },
      {
        id: 42,
        title: "Company",
        path: "/company",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 5,
    title: "FAQ",
    path: "/terms-policy",
    newTab: false,
  },
  {
    id: 6,
    title: "Support",
    path: "/contact",
    newTab: false,
  }
];
export default menuData;
