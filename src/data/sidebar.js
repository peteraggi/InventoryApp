import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "My Businesses",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "New Business",
        path: "/new-business",
      },
      {
        title: "Businesses",
        path: "/businesses",
      },
    ],
  },
  {
    title: "Account",
    icon: <BiImageAdd />,
    childrens: [
      {
        title: "My Profile",
        path: "/my-profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
