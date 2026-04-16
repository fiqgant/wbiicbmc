# BMC Generator

A **Next.js**-based **Business Model Canvas Generator** application that helps users quickly create, visualize, and export business canvases. This project includes a 9-block BMC editor, real-time canvas preview, guided content prompts, multiple visual themes, and export support for **PNG**, **PDF**, and **JSON**.

## Key Features

- Editor for all 9 Business Model Canvas blocks
- Real-time canvas preview
- Business name input
- Block-by-block BMC writing guidance
- Visual themes: **WBI**, **Minimalist**, **Neobrutalism**, and **Corporate**
- Export to **PNG** and **PDF**
- Save and load canvas data in **JSON** format
- Automatic persistence of canvas data, theme, and business name in `localStorage`

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- `html-to-image`
- `jspdf`
- `lucide-react`

## Running the Project

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/         Main pages using the Next.js App Router
components/  Form, canvas, export, guide modal, theme switcher
context/     Global Business Model Canvas state
lib/         Types, themes, default data, storage, guidance
public/      Static assets such as logos
```
