import {
  IconAdjustmentsHorizontal,
  IconLayoutDashboard,
  IconCategory,
  IconAlignBoxBottomCenter,
  IconVersions,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Shop",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconAdjustmentsHorizontal,
    href: "/settings",
  },
  {
    navlabel: true,
    subheader: "Products",
  },
  {
    id: uniqueId(),
    title: "Categories",
    icon: IconCategory,
    href: "/product-categories",
  },
  {
    id: uniqueId(),
    title: "Attributes",
    icon: IconAlignBoxBottomCenter,
    href: "/product-attributes",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: IconVersions,
    href: "/products",
  },
  {
    navlabel: true,
    subheader: "Orders",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconLayoutDashboard,
    href: "/orders",
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconLayoutDashboard,
    href: "/reports",
  },
];

export default Menuitems;
