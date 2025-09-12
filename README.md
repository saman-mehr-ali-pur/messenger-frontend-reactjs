# Messenger Frontend ReactJS

A modern messenger frontend built with ReactJS, inspired by Telegram’s split layout.

## Features

- Split page layout (chat list & chat window)
- Dynamic search and selection of chat rooms
- Real-time messaging with WebSocket (STOMP)
- Profile and contact management
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
npm install
```
or
```bash
yarn install
```

### Running the App

```bash
npm start
```
or
```bash
yarn start
```

The app will run at [http://localhost:3000](http://localhost:3000).

### Configuration

- The backend server URL is set to `http://localhost:8080` by default.  
  You can change it in the source files if needed.

## Project Structure

```
src/
  ├── mainPage/
  ├── profileBar/
  ├── resultSearch/
  ├── signin/
  ├── assets/
  └── ...
```

## Customization

- **Styles:** Edit `src/mainPage/css/mainPage.module.css` for layout and design.
- **Assets:** Replace images in `src/assets/` for custom avatars or icons.

## License

MIT

---

**Made with ❤️