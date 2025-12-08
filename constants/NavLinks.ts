export const Nav_Links = [
  { href: "/", key: "home", label: "Home" },
  { href: "/explore-uae", key: "explore-uae", label: "Explore UAE" },
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

  { href: "/about", key: "about", label: "About" },
  { href: "/contact", key: "contact", label: "Contact" },
  {
    key: "more",
    label: "More",
    submenu: [
      { href: "/more/corporate-travel", label: "Corporate Travel" },
      { href: "/more/monthly-long-stay", label: "Monthly/Long Stay" },
    ],
  },
];
