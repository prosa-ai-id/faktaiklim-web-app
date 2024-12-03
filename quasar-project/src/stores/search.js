import { defineStore } from "pinia";

export const searchStore = defineStore("search", {
  state: () => ({
    keywords: "",
  }),
});
