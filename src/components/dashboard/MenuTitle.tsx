"use client";

import { usePathname } from "next/navigation";

const MenuTitle = () => {
  const pathname = usePathname().replace("/dashboard", "/");


  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{pathname == "/" ? "Home" : pathname}</h1>
    </div>
  );
};

export default MenuTitle;
