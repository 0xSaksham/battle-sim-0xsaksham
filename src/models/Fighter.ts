import { delay, randomInt } from "../utils/helpers.js";

export type ActionType = "attack" | "heal";

export interface Action {
  type: ActionType;
  amount: number;
}

export class Fighter {
  id: string;
  name: string;
  hp: number;
  maxHp: number;

  constructor(id: string, name: string, hp = 100, maxHp = 100) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
  }

  async act(): Promise<Action> {
    await delay(300 + randomInt(0, 200));

    const shouldHeal = this.hp < 30 && Math.random() < 0.6;
    const actionType: ActionType = shouldHeal ? "heal" : "attack";

    return {
      type: actionType,
      amount: randomInt(8, 18),
    };
  }

  applyAction(action: Action, opponent: Fighter): void {
    if (action.type === "attack") {
      opponent.hp = Math.max(0, opponent.hp - action.amount);
    } else if (action.type === "heal") {
      this.hp = Math.min(this.maxHp, this.hp + action.amount);
    }
  }
}
