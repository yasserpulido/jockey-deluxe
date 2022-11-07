import { destroy, Instance, types } from "mobx-state-tree";
import { jockeys } from "../../../mocks";
import { Jockey, JockeyType } from "./Jockey";

export const Store = types
  .model({
    jockeys: types.optional(types.array(Jockey), []),
    jockey: types.optional(Jockey, {}),
  })
  .actions((self) => ({
    save(jockey: JockeyType) {
      if (!jockey.id) {
        self.jockeys.push({
          ...jockey,
          id: Math.floor(Math.random() * 100).toString(),
        });
      } else {
        const index = self.jockeys.findIndex((j) => j.id === jockey.id);
        self.jockeys[index] = jockey;
        destroy(self.jockey);
      }
    },
    edit(jockey: JockeyType) {
      self.jockey = { ...jockey };
    },
    remove(id: string) {
      const result = self.jockeys.filter((jockey) => jockey.id !== id);
      self.jockeys.replace(result);
    },
  }));

export const store = Store.create({
  jockeys: jockeys,
});

export type StoreType = Instance<typeof Store>;
