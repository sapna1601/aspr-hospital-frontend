import React, { useState } from "react";
import { Header, SideDrawer } from "src/common/components";

// type IProps = React.ComponentProps<typeof Header> &
//   React.ComponentProps<typeof SideDrawer> & {};
interface IProps {
  showHamburgerIcon?: boolean;
}

const HeaderAndDrawer: React.FC<IProps> = ({ showHamburgerIcon = true }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Header
        showHamburgerIcon={showHamburgerIcon}
        onHamburgIconClick={() => setDrawerOpen(true)}
      />
      <SideDrawer
        open={drawerOpen}
        onDrawerToggle={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default HeaderAndDrawer;
