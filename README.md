# Minecraft Coordinate Converter (UI-Only Prototype)

This project is a Minecraft-themed web application that provides a fully functional user interface and UX for converting coordinates between the Nether and the Overworld.
**Note:** The actual coordinate conversion logic is intentionally not implemented. The app uses placeholder results only.

---

## Features

### Minecraft-Themed UI

* Pixel/block-inspired X, Y, Z labels
* Minecraft-styled button, textures, borders, and color palette
* Header styled like in-game signage
* In-game–inspired result/info panel
* Matching themed footer

### Functional UX (Without Real Math)

* Toggle to switch between **Nether → Overworld** and **Overworld → Nether**
* Inputs for each coordinate update internal state
* “Convert” button triggers a placeholder handler
* Dynamic placeholder output displayed in the result panel
* Loading/processing visual feedback (e.g., pixel shimmer, block pulse)
* Input validation feedback (highlighting missing fields)

### Restrictions

* No real coordinate conversion calculations
* No backend
* No abstract UX strategy—only visible, practical UX behavior

---

## Tech Stack

* **Next.js**
* **React**
* **Tailwind CSS**

---

## Project Structure

* Full Next.js component structure
* Tailwind-styled JSX interface
* React state handling for toggles, inputs, placeholders, and visual responses

---

## Setup & Development

1. Install dependencies:

   ```bash
   npm install
   ```
2. Run the development server:

   ```bash
   npm run dev
   ```
3. Open the app at:

   ```
   http://localhost:3000
   ```

---

## Notes

This project is intended as a UI/UX prototype.
You can integrate your own coordinate conversion logic later inside the placeholder handler tied to the Convert button.
