import { atom } from "recoil";

export const MeAtom = atom({
  key: "MeAtom",
  default: undefined,
});

export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false,
});

export const selectedCharacterGlbNameIndex = atom({
  key: "selectedCharacterGlbNameIndex",
  default: 0,
});
