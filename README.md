🇯🇵 日本語 | 🇺🇸 [English](README.en.md)

# 🎮 OBSスコアボードアプリ 白熊パネル（Yu-Gi-Oh! Master Duel 配信向け）
![obs](https://github.com/user-attachments/assets/f8e27867-c428-4f24-aec7-9d49f5dbf537)

OBSでの遊戯王マスターデュエル配信をもっとわかりやすく。  
先攻・後攻や試合結果をリアルタイムに表示し、視聴者にもプレイ状況が一目で伝わるスコアボードアプリです。

## 📦 ダウンロード / Download

👉 最新リリースはこちら  
➡ [DL](https://github.com/gamiP/obs-scoreboard-whitebear/releases/latest)

---

## 🧩 主な機能 / Features

- OBSの**ウィンドウキャプチャ機能**でスコアボードを表示
- 別ウィンドウの**操作パネル**から下記の設定が可能：
  - 背景色とクロマキー背景の切り替え
  - 文字色（白 / 黒）の切り替え
  - 先攻 / 後攻 の入力
  - 勝ち / 負け の入力
  - コインの裏表の入力
- 自動で試合数と勝率を計算・表示
- 英語表記
- デフォルトを含む4種類のレイアウトの変更
- シンプルで配信に馴染むUI

---

## 🖥️ 使い方 / How to Use

### 🎥 OBSへの表示方法
![1](https://github.com/user-attachments/assets/11f5601a-5486-4fa8-9daa-0cfc6c515f19)

1. アプリを起動
2. **OBSの「ウィンドウキャプチャ」ソース**で「白熊パネル（ディスプレイ）」を選択
3. OBS内で自由に位置やサイズを調整

### 🎛️ 操作パネルの使い方
![スクリーンショット 2025-06-17 042553](https://github.com/user-attachments/assets/0cfcc97c-7ebc-4836-ae55-106b0c2aa582)

- 別ウィンドウとして表示される操作パネルで以下の操作が可能：
  - 日本語と英語表記の切り替え(メニューバー)
  - `白/黒背景色切り替え`(メニューバー) または `クロマキー背景` を選択
  - 4種類のレイアウトの切り替え(メニューバー)
  - コインの`表` / `裏の入力`
  - `先攻` / `後攻` の入力
  - `勝ち` / `負け` の入力  
    → 自動で試合数と勝率が更新されます
  - リセットボタン
    → 全ての情報がリセットされます。（戻るボタンで戻せます）
  - 一つ戻るボタン
    → 一つ前の操作を戻します。起動時の情報が初期値として操作を一つずつ戻せます。
---

### 📱 レイアウトの種類
背景の非表示にしてグリーンバックでOBSへ表示するのがおすすめです。

#### ワイドレイアウト

![スクリーンショット 2025-06-16 232639](https://github.com/user-attachments/assets/77cde0f5-8c98-4d09-9e82-4e078c5b9475)

#### ロングレイアウト

![スクリーンショット 2025-06-16 232618](https://github.com/user-attachments/assets/aa08a75a-5e0f-4ab3-8c3b-d3d44853f302)

#### コンパクトレイアウト
  
![スクリーンショット 2025-06-17 042633](https://github.com/user-attachments/assets/e1b7fa55-be3e-4ffd-b310-bbaf1c2f5c3c)

---

### 🇺🇸 英語表記
コントロールパネルやOBSに表記するそれぞれのウィンドウズ毎に英語表記へ変更できます。

![スクリーンショット 2025-06-17 042529](https://github.com/user-attachments/assets/4eb0aa43-bad2-489e-9730-1fc27d061add)

![スクリーンショット 2025-06-17 042848](https://github.com/user-attachments/assets/3ab95432-0934-4482-9da9-9c544ecd9a89)

---

## 💡 今後の予定 / Coming Soon

- UIテーマのカスタマイズ（色、フォント）
- 対戦ログ保存機能
- macOS対応

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

