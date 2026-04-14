# Rennu

![Rennu cover](./public/og/rennu-og.png)

**Rennu** is a free Japanese-inspired grainy gradient generator for designers.
Create atmospheric, noise-textured gradients for backgrounds, wallpapers, UI design, branding, and visual experiments.

## Live

- App: [rennu.vercel.app](https://rennu.vercel.app)

## What It Does

- Generate grainy cinematic gradients in real time
- Start from curated presets or build gradients from scratch
- Reorder, add, delete, and recolor gradient stops
- Control blur, noise, and gradient direction
- Randomize full compositions instantly
- Export images as PNG or JPG at different scales and aspect ratios

## Features

- 25+ preset palettes
- Smooth canvas-based rendering
- Radial and linear gradient modes
- Mobile-friendly sidebar workflow
- Keyboard shortcut: `Space` to randomize
- Theme-aware favicon and social sharing metadata

## Preview

Rennu focuses on fast exploration: tweak colors, test structure, add texture, and export polished visuals in seconds.

## Tech Stack

- React 19
- TypeScript
- Vite
- Sass
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open the local app in your browser after Vite starts.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  components/ui/   Reusable UI primitives
  styles/          Global tokens and shared styles
  App.tsx          Main application logic and sidebar controls
public/
  og/              Social preview images
  logo/            Brand assets
```

## Export Options

- PNG or JPG
- Multiple aspect ratios
- Adjustable scale for larger output sizes

## Use Cases

- Landing page backgrounds
- Posters and wallpapers
- UI hero sections
- Brand explorations
- Motion and visual concept work

## Deployment

The project is ready to deploy on Vercel or any static hosting platform that supports Vite builds.

```bash
npm run build
```

The production bundle will be generated in `dist/`.

## License

Private project.
