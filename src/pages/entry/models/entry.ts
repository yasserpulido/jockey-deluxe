import { Instance, types } from "mobx-state-tree";

const Competitor = types.model({
  horse: types.string,
  jockey: types.string,
});

const Race = types.model({
  id: types.identifier,
  name: types.string,
  time: types.string,
  distance: types.number,
  surface: types.string,
  condition: types.string,
  competitors: types.array(Competitor),
});

const Entry = types.model({
  id: types.identifier,
  name: types.string,
  date: types.string,
  place: types.string,
  races: types.array(Race),
});

export type EntryType = Instance<typeof Entry>;

export const Store = types
  .model({
    entries: types.array(Entry),
  })
  .actions((self) => ({
    createEntry(entry: EntryType) {
      console.log("Create: ", entry);
    },
  }))
  .views((self) => ({
    // getJockeys() {
    //   return self.jockeys;
    // },
  }));

export const store = Store.create();

export type StoreType = Instance<typeof Store>;
