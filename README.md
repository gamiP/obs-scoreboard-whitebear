# 🎮 OBSスコアボードアプリ 白熊パネル（Yu-Gi-Oh! Master Duel 配信向け）
![obs](https://github.com/user-attachments/assets/f8e27867-c428-4f24-aec7-9d49f5dbf537)

OBSでの遊戯王マスターデュエル配信をもっとわかりやすく。  
先攻・後攻や試合結果をリアルタイムに表示し、視聴者にもプレイ状況が一目で伝わるスコアボードアプリです。

## 📦 ダウンロード / Download

👉 最新リリースはこちら  
➡ [リリースページを見る]([https://github.com/gamiP/obs-scoreboard-whitebear/releases/latest]

---

## 🧩 主な機能 / Features

- OBSの**ウィンドウキャプチャ機能**でスコアボードを表示
- 別ウィンドウの**操作パネル**から下記の設定が可能：
  - 背景色とクロマキー背景の切り替え
  - 文字色（白 / 黒）の切り替え
  - 先攻 / 後攻 の入力
  - 勝ち / 負け の入力
- 自動で試合数と勝率を計算・表示
- シンプルで配信に馴染むUI

---

## 🖥️ 使い方 / How to Use

### 🎥 OBSへの表示方法
![1](https://github.com/user-attachments/assets/11f5601a-5486-4fa8-9daa-0cfc6c515f19)
1. アプリを起動
2. **OBSの「ウィンドウキャプチャ」ソース**で「白熊パネル」を選択
3. OBS内で自由に位置やサイズを調整

### 🎛️ 操作パネルの使い方
![5f4bd1b6d34b459d](https://github.com/user-attachments/assets/e3d8a6a5-f8ee-43ac-be15-2891080418e2)

- 別ウィンドウとして表示される操作パネルで以下の操作が可能：
  - `白/黒切り替え` ボタンで文字色を変更
  - `背景色切り替え` または `クロマキー背景` を選択
  - `先攻` / `後攻` の入力
  - `勝ち` / `負け` の入力  
    → 自動で試合数と勝率が更新されます
  - リセットボタン
    → 全ての情報がリセットされます。（戻るボタンで戻せます）
  - 一つ戻るボタン
    → 一つ前の操作を戻します。起動時の情報が初期値として操作を一つずつ戻せます。

---

## 💡 今後の予定 / Coming Soon

- UIテーマのカスタマイズ（色、フォント）
- 多言語対応
- 対戦ログ保存機能
- macOS対応
- レイアウト変更（選択）

---

## 🛠️ 開発環境 / Dev Info

- Electron + React + Vite
- Node.js v24.2.0
- Windowsビルド用：electron-builder

---

## 📷 スクリーンショット / Screenshots

![obs2](https://github.com/user-attachments/assets/c33b1f5d-87c5-46fe-97ac-83ef185c0bfb)
![2](https://github.com/user-attachments/assets/7ad40bf3-610c-495d-bfb5-c3c3bb1f4d5c)

--- 
## 実装してほしい事とかある場合はXのDMまでお願いします。

[ガミP @30yugioh](https://x.com/30yugioh)

---
## 📝 ライセンス / License

MIT License – see the [LICENSE](./LICENSE) file for details.

---

