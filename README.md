# Warcraft Item Browser

A web application for browsing, searching, and exploring items from a Warcraft-inspired universe. Built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

## Features

- Browse a searchable, filterable list of items
- View detailed information about each item, including components, crafting tree, and sources
- Visualize item crafting trees interactively
- Fast, modern UI with React and TailwindCSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone https://github.com/p1nwl/item-list.git
cd warcraft-items
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Lint

To check code quality:

```sh
npm run lint
```

## Project Structure

- `src/` — Main source code
  - `components/` — React UI components
  - `pages/` — Page-level components (routing targets)
  - `data/` — Item data (JSON files)
  - `types/` — TypeScript type definitions
  - `utils/` — Utility functions
- `public/` — Static assets (icons, images)
- `index.html` — Main HTML entry point

## Data Model

Each item is defined by the [`Item`](src/types/Item.ts) interface:

```ts
export interface Item {
  id: string;
  name: string;
  description?: string;
  droppedBy?: string[];
  components?: string[];
  craftsInto?: string[];
  boughtFrom?: string;
  icon?: string;
}
```

## License

MIT

---

_Made with ❤️ using React, TypeScript, and Vite._
