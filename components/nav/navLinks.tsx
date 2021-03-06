import { v4 as uuidv4 } from "uuid";

export const navLinks = [
  { path: "/Main", name: "home", id: uuidv4() },
  { path: "/music", name: "music", id: uuidv4() },
  { path: "/Videos", name: "videos", id: uuidv4() },
  // { path: "/Devils", name: "devils", id: uuidv4() },
  { path: "/SongBook", name: "songbook", id: uuidv4() },
  { path: "/shop", name: "shop", id: uuidv4() },
  { path: "/About", name: "about", id: uuidv4() },
];
