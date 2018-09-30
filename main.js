const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const {
  default: installExtension,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: "#FFFFFF",
    icon: `file://${__dirname}/dist/FSM/favicon.ico`
  });
  win.setMenu(null);

  win.loadURL(`file://${__dirname}/dist/FSM/index.html`);

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  let shortcutsEnabled = false;

  ipcMain.on("enable", event => {
    shortcutsEnabled = true;
  });

  ipcMain.on("disable", event => {
    shortcutsEnabled = false;
  });

  ipcMain.on("add-shortcut", (event, shortcut) => {
    if (shortcut.type == "lock") {
      globalShortcut.register(shortcut.shortcut, () => {
        if (!shortcutsEnabled) {
          return;
        }
        win.webContents.send("lock-volume", {
          volumeId: shortcut.volumeId
        });
      });
    } else if (shortcut.type == "unlock") {
      globalShortcut.register(shortcut.shortcut, () => {
        if (!shortcutsEnabled) {
          return;
        }
        win.webContents.send("unlock-volume", {
          volumeId: shortcut.volumeId
        });
      });
    }
  });

  ipcMain.on("remove-shortcut", (event, shortcut) => {
    globalShortcut.unregister(shortcut.shortcut);
  });

  ipcMain.on("focus", event => {
    if (win == null) {
      return;
    }
    win.focus();
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
