import { Fighter, Action } from "../models/Fighter.js";

interface BattleLogEntry {
  actorId: string;
  action: string;
  amount: number;
}

interface BattleResult {
  winner: string;
  log: BattleLogEntry[];
}

export class BattleArena {
  fighterA: Fighter;
  fighterB: Fighter;
  log: BattleLogEntry[] = [];

  constructor(fighterA: Fighter, fighterB: Fighter) {
    this.fighterA = fighterA;
    this.fighterB = fighterB;
  }

  async startBattle(): Promise<BattleResult> {
    const MAX_TURNS = 10;
    console.log(
      `⚔️  Battle begins: ${this.fighterA.name} vs ${this.fighterB.name}\n`
    );

    let attacker = this.fighterA;
    let defender = this.fighterB;
    let turn = 1;

    while (this.fighterA.hp > 0 && this.fighterB.hp > 0 && turn <= MAX_TURNS) {
      console.log(`🕓 Turn ${turn}: ${attacker.name}'s move...`);

      const action = await attacker.act();
      attacker.applyAction(action, defender);

      this.recordAction(attacker, action);
      this.printTurn(attacker, defender, action);

      if (defender.hp <= 0) break;

      [attacker, defender] = [defender, attacker];
      turn++;
    }

    const winner = this.fighterA.hp > 0 ? this.fighterA : this.fighterB;

    console.log(`\n🏆 Winner: ${winner.name} 🏆`);
    console.table(this.log);

    if (turn > MAX_TURNS) {
      console.log("\n⚠️ Battle ended because max turns reached.");
      return { winner: "No winner (timeout)", log: this.log };
    }

    return { winner: winner.name, log: this.log };
  }

  private recordAction(actor: Fighter, action: Action): void {
    this.log.push({
      actorId: actor.id,
      action: action.type,
      amount: action.amount,
    });
  }

  private printTurn(
    attacker: Fighter,
    defender: Fighter,
    action: Action
  ): void {
    if (action.type === "attack") {
      console.log(
        `💥 ${attacker.name} attacks ${defender.name} for ${action.amount} damage.`
      );
    } else if (action.type === "heal") {
      console.log(`💖 ${attacker.name} heals for ${action.amount} HP.`);
    }

    console.log(
      `🩸 ${attacker.name}: ${attacker.hp} HP | ${defender.name}: ${defender.hp} HP\n`
    );
  }
}
