export const Side_Links = [
  { key: "overview", label: "Overview", href: "/dashboard" },

  {
    key: "hero-sections",
    label: "Hero Sections",
    href: "/dashboard/hero",
    submenu: [
      { label: "All Hero", href: "/dashboard/hero" },
      { label: "Add Hero", href: "/dashboard/hero/add" },
    ],
  },

  {
    key: "destinations",
    label: "Destinations",
    href: "/dashboard/destinations",
    submenu: [
      { label: "All Destinations", href: "/dashboard/destinations" },
      { label: "Add Destination", href: "/dashboard/destinations/add" },
    ],
  },

  {
    key: "packages",
    label: "Packages",
    href: "/dashboard/packages",
    submenu: [
      { label: "All Packages", href: "/dashboard/packages" },
      { label: "Add Package", href: "/dashboard/packages/add" },
    ],
  },

  {
    key: "bookings",
    label: "Bookings",
    href: "/dashboard/bookings",
  },

  {
    key: "inquiries",
    label: "Inquiries",
    href: "/dashboard/inquiries",
  },

  {
    key: "users",
    label: "Users",
    href: "/dashboard/users",
  },

  {
    key: "settings",
    label: "Settings",
    href: "/dashboard/settings",
  },

  {
    key: "logout",
    label: "Logout",
    href: "/logout",
  },
];
