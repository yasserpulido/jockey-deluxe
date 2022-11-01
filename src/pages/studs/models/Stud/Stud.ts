import { Instance, types } from "mobx-state-tree";

export const Stud = types.model("Stud", {
  id: types.optional(types.identifier, ""),
  fullName: types.optional(types.string, ""),
});

export type StudType = Instance<typeof Stud>;
