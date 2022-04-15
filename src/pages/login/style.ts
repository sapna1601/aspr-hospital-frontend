import styled from "styled-components";
import { styled as MStyled } from "@material-ui/core";
import { Box } from "@material-ui/core";

export const InputContainer = MStyled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
}));
