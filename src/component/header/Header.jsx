import React  from "react";
import Left from "./parts/Left";
import Right from "./parts/Right"
import Center from "./parts/Center"
 
const Header = () => {
  return (
    <div className="space-x-6 flex min-w-full items-center justify-between p-6 fixed top-0" >
      <Left flex="flex-1"/>
      <Center flex="flex-3"/>
      <Right flex="flex-1"/>
    </div>
  );
};

export default Header;
