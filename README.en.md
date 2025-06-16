🇯🇵 Japanese | 🇺🇸 English

# 🎮 OBS Scoreboard App - White Bear Panel (for Yu-Gi-Oh! Master Duel Streams)
![obs](https://github.com/user-attachments/assets/f8e27867-c428-4f24-aec7-9d49f5dbf537)

Make your Yu-Gi-Oh! Master Duel streams easier to follow.  
Display first/second turns and match results in real time so your audience can instantly grasp your current status during matches.

## 📦 Download

👉 Get the latest release  
➡ [Download](https://github.com/gamiP/obs-scoreboard-whitebear/releases/latest)

---

## 🧩 Features

- Display the scoreboard using **OBS Window Capture**
- Use a separate **control panel window** to:
  - Toggle between background colors and chroma key mode
  - Switch text color (white / black)
  - Input first / second turn
  - Input win / loss
  - Input coin toss result (heads / tails)
- Automatically calculates and displays total matches and win rate
- English language support
- Choose from 4 layout styles (including default)
- Clean UI that blends well with any stream overlay

---

## 🖥️ How to Use

### 🎥 Displaying in OBS
![スクリーンショット 2025-06-17 042848](https://github.com/user-attachments/assets/10de1647-d0e0-4a41-8dbc-4c9dd21c7642)

1. Launch the app
2. In OBS, add a **Window Capture** source and select "White Bear Panel"
3. Adjust the position and size freely in OBS

### 🎛️ Using the Control Panel
![スクリーンショット 2025-06-17 042529](https://github.com/user-attachments/assets/a87d7cd8-0f6d-4729-bbba-05f460ac655f)

- The control panel opens in a separate window and lets you:
  - Switch between Japanese and English from the menu bar
  - Toggle between white/black backgrounds or enable chroma key (menu bar)
  - Switch among 4 layout types (menu bar)
  - Input `Heads` / `Tails` for coin toss
  - Input `First` / `Second` turn
  - Input `Win` / `Loss`  
    → Match count and win rate are updated automatically
  - Reset button  
    → Clears all data (can be undone using the undo button)
  - Undo button  
    → Reverts the previous action. The app keeps track of history from the initial launch.

---

### 📱 Layout Options
For chroma key use, we recommend hiding the background color and enabling green screen mode in OBS.

#### Wide Layout

![スクリーンショット 2025-06-16 232639](https://github.com/user-attachments/assets/77cde0f5-8c98-4d09-9e82-4e078c5b9475)

#### Long Layout

![スクリーンショット 2025-06-16 232618](https://github.com/user-attachments/assets/aa08a75a-5e0f-4ab3-8c3b-d3d44853f302)

#### Compact Layout
  
![スクリーンショット 2025-06-17 042633](https://github.com/user-attachments/assets/e1b7fa55-be3e-4ffd-b310-bbaf1c2f5c3c)

---

### 🇺🇸 English Support
You can switch both the control panel and display window to English individually.

![スクリーンショット 2025-06-17 042529](https://github.com/user-attachments/assets/4eb0aa43-bad2-489e-9730-1fc27d061add)

![スクリーンショット 2025-06-17 042848](https://github.com/user-attachments/assets/3ab95432-0934-4482-9da9-9c544ecd9a89)

---

## 💡 Coming Soon

- Customizable UI themes (colors, fonts)
- Match history saving
- macOS version support

---

## 🛠️ Dev Info

- Electron + React + Vite
- Node.js v24.2.0
- Built for Windows using `electron-builder`

---

## 📷 Screenshots

![obs2](https://github.com/user-attachments/assets/c33b1f5d-87c5-46fe-97ac-83ef185c0bfb)
![2](https://github.com/user-attachments/assets/7ad40bf3-610c-495d-bfb5-c3c3bb1f4d5c)

--- 
## 💬 Feedback

Feel free to DM me on X (formerly Twitter) for feedback or feature requests:  
[**GamiP @30yugioh**](https://x.com/30yugioh)

---

## 📝 License

MIT License – see the [LICENSE](./LICENSE) file for details.

---
