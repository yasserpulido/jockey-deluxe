import { flow, Instance, types } from "mobx-state-tree";
import { Entry as api } from "../../../apis";

const Competitor = types.model({
  id: types.identifier,
  horse: types.string,
  jockey: types.string,
  number: types.number,
  position: types.number,
  stud: types.string,
  trainer: types.string,
  jockeyWeight: types.number,
  horseWeight: types.number,
  odds: types.number,
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
  country: types.string,
  track: types.string,
  races: types.array(Race),
});

export type EntryType = Instance<typeof Entry>;

export const Store = types
  .model({
    entry: types.maybe(Entry),
    entries: types.array(Entry),
  })
  .actions((self) => ({
    getEntries: flow(function* getEntries() {
      const entries = yield api.getEntries();
      self.entries = entries;
    }),
    createEntry: flow(function* createEntry(entry: EntryType) {
      const result = yield api.createEntry(entry);
      self.entries.push(result);
    }),
    deleteEntry: flow(function* deleteEntry(id: string) {
      const result = yield api.deleteEntry(id);
      console.log(result);
    }),
  }));

export const store = Store.create();

export type StoreType = Instance<typeof Store>;
