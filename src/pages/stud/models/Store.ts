import { destroy, Instance, types } from "mobx-state-tree";
import { studs } from "../../../mocks/studs";
import { Stud, StudType } from "./Stud";

export const Store = types
  .model({
    studs: types.optional(types.array(Stud), []),
    stud: types.optional(Stud, {}),
  })
  .actions((self) => ({
    save(stud: StudType) {
      if (!stud.id) {
        self.studs.push({
          ...stud,
          id: Math.floor(Math.random() * 100).toString(),
        });
      } else {
        const index = self.studs.findIndex((s) => s.id === stud.id);
        self.studs[index] = stud;
        destroy(self.stud);
      }
    },
    edit(jockey: StudType) {
      self.stud = { ...jockey };
    },
    remove(id: string) {
      const result = self.studs.filter((stud) => stud.id !== id);
      self.studs.replace(result);
    },
  }));

export const store = Store.create({
  studs: studs,
});

export type StoreType = Instance<typeof Store>;
