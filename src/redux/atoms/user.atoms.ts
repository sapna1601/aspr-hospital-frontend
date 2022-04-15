import { atom, selectorFamily } from "recoil";
import { LoggedInUser } from "src/model";

export const loggedInUserAtom = atom<LoggedInUser | null>({
  key: "loggedInUserAtom",
  default: null,
});

export const myMultipliedState = selectorFamily({
  key: "MyMultipliedNumber",
  get: (userId) => async () => {},

  // optional set
  //   set:
  //     (multiplier) =>
  //     ({ set }, newValue) => {
  //       set(myNumberState, newValue / multiplier);
  //     },
});
