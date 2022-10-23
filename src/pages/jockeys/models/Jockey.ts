import { Instance, types } from "mobx-state-tree";

const Jockey = types.model({
  firstName: types.string,
  lastName: types.string,
  birth: types.string,
  gender: types.string,
});

export type JockeyType = Instance<typeof Jockey>;

export const Store = types
  .model({
    jockeys: types.optional(types.array(Jockey), []),
  })
  .actions((self) => ({
    create(jockey: JockeyType) {
      console.log("Create: ", jockey);
      self.jockeys.push(jockey)
    },
  }))
  .views((self) => ({
    getJockeys() {
      return self.jockeys;
    },
  }));

export const store = Store.create();

export type StoreType = Instance<typeof Store>;
