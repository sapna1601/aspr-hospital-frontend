import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { Menu, ExitToApp } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "src/hooks";
import { Text } from ".";
interface IProps {
  onHamburgIconClick?: () => void;
  showHamburgerIcon?: boolean;
}

const Header: React.FC<IProps> = ({
  onHamburgIconClick,
  showHamburgerIcon = true,
}) => {
  const navigation = useNavigate();
  const session = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-background">
          {showHamburgerIcon && (
            <IconButton color="secondary" edge="start">
              <Menu onClick={onHamburgIconClick} />
            </IconButton>
          )}
          <Text variant="h4" color="textPrimary">
            ASPR Health
          </Text>
          <Box className="justify-end flex items-center" sx={{ flexGrow: 1 }}>
            <Text
              variant={"h5"}
              onClick={() => navigation("/")}
              className="px-5 text-primary cursor-pointer"
            >
              Home
            </Text>
            <Text
              variant={"h5"}
              onClick={() => navigation("/about")}
              className="px-5 text-primary cursor-pointer"
            >
              About
            </Text>
            <Text
              variant={"h5"}
              onClick={() => navigation("/contact-us")}
              className="px-5 text-primary cursor-pointer"
            >
              Contact Us
            </Text>
            <IconButton onClick={() => session.logout()}>
              <ExitToApp fontSize="large" className="text-primary font-bold" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
