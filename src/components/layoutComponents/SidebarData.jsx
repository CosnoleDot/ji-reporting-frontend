import UpdateProfile  from "../../pages/UpdateProfile"
export const SidebarData = [
  {
    title: "New Report",

    subRoute: [
      {
        title: "Halqa",
        link: "/halqa",
      },
      {
        title: "Maqam",
        link: "/maqam",
      },
      {
        title: "Division",
        link: "/division",
      },
    ],
  },
  {
    title: "Dashboard",
    link: "dashboard",
  },
  {
    title: "New User Requests",
    link: "/user-requests",
  },
  {
    title: "Edit Your Profile",
    link: "/update-profile",
  },
  {
    title: "Edit Halqa Details",
    Role: [
      {
        title: "Halqa Data",
        access: {
          ro: ["halqa", "maqam", "tehsil", "district", "division"],
          rw: ["province"],
        },
        link: "/halqa",
      },
    ],
  },
  {
    title: "Reports Comparison",
    link: "/",
  },
  {
    title: "Edit User Data",
    Role: [
      {
        title: "Halqa Detail",
        access: {
          ro: ["halqa", "maqam", "tehsil", "district", "division"],
          rw: ["province"],
        },
        link: "/halqa",
      },
      {
        title: "Maqam Detail",
        access: {
          ro: ["halqa", "maqam", "tehsil", "district", "division"],
          rw: ["province"],
        },
        link: "/Maqam",
      },
      {
        title: "Division Detail",
        access: {
          ro: ["halqa", "maqam", "tehsil", "district", "division"],
          rw: ["province"],
        },
        link: "/Division",
      },
    ],
  },
];
