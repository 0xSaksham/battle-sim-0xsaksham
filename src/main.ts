import { Fighter } from "./models/Fighter.js";
import { BattleArena } from "./core/BattleArena.js";

(async () => {
  const knight = new Fighter("A", "Knight");
  const orc = new Fighter("B", "Orc");

  const arena = new BattleArena(knight, orc);
  await arena.startBattle();
})();
