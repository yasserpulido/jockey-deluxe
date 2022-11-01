import { Instance, types } from "mobx-state-tree";

export const Jockey = types.model("Jockey", {
  id: types.optional(types.identifier, ""),
  firstName: types.optional(types.string, ""),
  lastName: types.optional(types.string, ""),
  birth: types.optional(types.string, ""),
  gender: types.optional(types.string, "Male"),
});

export type JockeyType = Instance<typeof Jockey>;
