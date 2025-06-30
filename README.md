
# 🤣 RandomJokes

Effortless humor at one click – powered by [JokeAPI](https://v2.jokeapi.dev/joke/)

![Joke UI](https://res.cloudinary.com/dmg30zh6b/image/upload/v1751310848/Screenshot_from_2025-07-01_00-29-51_ort3un.png)

---

## ✨ Features

- 🎲 Get a random joke instantly with one click
- 🛠️ Fully customizable joke preferences
- 💬 Supports **single-line** and **two-part jokes**
- 🚀 Built with **Next.js**, **Tailwind CSS**, **ShadCN**, and **TypeScript**

---

## 📸 Screenshots & Functionality

### 🎯 Main Interface – Instant Joke Generator


When the user clicks on the **"Random Joke"** button:
- A joke is fetched from [JokeAPI](https://v2.jokeapi.dev/)
- If it’s a two-part joke, both the **setup** and **punchline** are shown.
- Smooth, centered UI with Tailwind and ShadCN components.

---

### ⚙️ Customize Joke Settings – Dialog Modal

This modal lets users customize:
![Dialog Model](https://res.cloudinary.com/dmg30zh6b/image/upload/v1751310848/Screenshot_from_2025-07-01_00-30-08_jfhxly.png)

- **Category**: Choose from programming, dark, pun, etc.
- **Blacklist Flags**: Filter out sensitive content (e.g., NSFW, religious, sexist).
- **Joke Type**: Pick between *single* or *twopart* jokes.
- **Amount**: Specify how many jokes to fetch at once.

---

## 🧱 Tech Stack

- **Next.js** – React Framework
- **Tailwind CSS** – Utility-first CSS
- **ShadCN** – Prebuilt UI components
- **TypeScript** – Type-safe logic
- **JokeAPI** – External joke source

---

## 📦 Installation

```bash
git clone https://github.com/sujanthapa01/random-jokes-app
cd random-jokes-app
npm install
npm run dev
