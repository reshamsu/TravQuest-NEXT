export const Nav_Links = [
  { href: "/", key: "home", label: "Home" },
  // { href: "/explore-uae", key: "explore-uae", label: "Explore UAE" },
  {
    key: "explore_uae",
    label: "Explore UAE",
    submenu: [
      { href: "/destinations/abu-dhabi", label: "Abu Dhabi" },
      { href: "/destinations/dubai", label: "Dubai" },
      { href: "/destinations/fujairah", label: "Fujairah" },
      { href: "/destinations/ras-al-khaimah", label: "Ras Al Khaimah" },
    ],
  },
  {
    key: "destinations",
    label: "Destinations",
    submenu: [
      { href: "/destinations/sri-lanka", label: "Sri Lanka" },
      { href: "/destinations/maldives", label: "Maldives" },
      { href: "/destinations/singapore", label: "Singapore" },
      { href: "/destinations/thailand", label: "Thailand" },
    ],
  },
  {
    key: "more",
    label: "More",
    submenu: [
      { href: "/more/corporate-travel", label: "Corporate Travel" },
      { href: "/more/monthly-long-stay", label: "Monthly/Long Stay" },
    ],
  },
  { href: "/about", key: "about", label: "About" },
  { href: "/contact", key: "contact", label: "Contact" },
];
