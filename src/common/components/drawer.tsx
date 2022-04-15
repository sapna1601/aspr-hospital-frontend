import React, { useCallback } from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { SideDrawerConfig } from "src/config";
import { useNavigate } from "react-router-dom";
import Text from "./text";
import { LocalHospital } from "@material-ui/icons";

type Anchor = "top" | "left" | "bottom" | "right";

interface IProps {
  anchor?: Anchor;
  open: boolean;
  onDrawerToggle: () => void;
  style?: React.CSSProperties;
}
const SideDrawer: React.FC<IProps> = ({
  anchor = "left",
  open = false,
  onDrawerToggle,
  style = {},
}) => {
  const navigate = useNavigate();
  const getIcon = useCallback((element: any) => {
    const Icon = element;
    return <Icon />;
  }, []);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <Box className="pt-4 flex gap-2 items-center justify-center">
        <Text className="text-primary font-bold" variant="h5">
          ASPR HOSPITAL
        </Text>
        <LocalHospital className="text-primary" fontSize="large" />
      </Box>
      <List>
        {SideDrawerConfig.map((item) => (
          <ListItem
            onClick={() => {
              navigate(item.redirect);
            }}
            button
            key={item.label}
          >
            <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer
        style={style}
        anchor={anchor}
        open={open}
        onClose={onDrawerToggle}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
