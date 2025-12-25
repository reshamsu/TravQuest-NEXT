export const Side_Links = [
  { key: "overview", label: "Overview", href: "/dashboard" },

  {
    key: "hero-sections",
    label: "Hero Sections",
    href: "/dashboard/hero",
    submenu: [
      { label: "All Hero", href: "/dashboard/hero/all" },
      { label: "Add Hero", href: "/dashboard/hero/add" },
    ],
  },

  {
    key: "destinations",
    label: "Destinations",
    href: "/dashboard/destinations",
    submenu: [
      { label: "All Destinations", href: "/dashboard/destinations/all" },
      { label: "Add Destination", href: "/dashboard/destinations/add" },
    ],
  },

  {
    key: "discovery",
    label: "Discovery",
    href: "/dashboard/discovery",
    submenu: [
      { label: "All Discovery", href: "/dashboard/discovery/all" },
      { label: "Add Discovery", href: "/dashboard/discovery/add" },
    ],
  },

  {
    key: "packages",
    label: "Packages",
    href: "/dashboard/packages",
    submenu: [
      { label: "All Packages", href: "/dashboard/packages/all" },
      { label: "Add Package", href: "/dashboard/packages/add" },
    ],
  },

  {
    key: "hotels",
    label: "Hotels",
    href: "/dashboard/hotels",
    submenu: [
      { label: "All Hotels", href: "/dashboard/hotels/all" },
      { label: "Add Hotels", href: "/dashboard/hotels/add" },
    ],
  },

  {
    key: "bookings",
    label: "Bookings",
    href: "/dashboard/bookings",
  },

  {
    key: "users",
    label: "Users",
    href: "/dashboard/users",
  },

  {
    key: "logout",
    label: "Logout",
    href: "/logout",
  },
];
