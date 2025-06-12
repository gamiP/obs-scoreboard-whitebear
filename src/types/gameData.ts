export interface GameData {
  
  // 勝敗結果
  matchResults: {
    wins: number;    // 勝ち数
    losses: number;  // 負け数
    total: number;   // 全体の試合数
    winRate: number; // 勝率（%）
  };
  
  // 先攻後攻
  turnResults: {
    first: number;   // 先攻の数
    second: number;  // 後攻の数
  };
}

// 初期値
export const initialGameData: GameData = {
  matchResults: {
    wins: 0,
    losses: 0,
    total: 0,
    winRate: 0
  },
  turnResults: {
    first: 0,
    second: 0
  }
}; 