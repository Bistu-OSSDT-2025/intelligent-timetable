const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let mainWindow;

// 是否为开发模式
const isDev = process.argv.includes('--dev');

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'build/icon.png'),
        title: '智能课表 - Intellectual Timetable',
        titleBarStyle: 'default',
        show: false, // 窗口创建后不立即显示
        backgroundColor: '#ffffff'
    });

    // 加载应用的 index.html
    mainWindow.loadFile('index.html');

    // 当window对象准备好显示时显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // 开发模式下打开开发者工具
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
    });

    // 当window被关闭，这个事件会被发出
    mainWindow.on('closed', () => {
        // 取消引用window对象，如果你的应用支持多窗口的话，
        // 通常会把多个window对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWindow = null;
    });

    // 处理外部链接
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // 阻止导航到外部链接
    mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        
        if (parsedUrl.origin !== 'file://') {
            event.preventDefault();
            shell.openExternal(navigationUrl);
        }
    });

    // 设置窗口菜单
    createMenu();
}

// 创建应用菜单
function createMenu() {
    const template = [
        {
            label: '文件',
            submenu: [
                {
                    label: '导入课表',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        importTimetable();
                    }
                },
                {
                    label: '导出课表',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        exportTimetable();
                    }
                },
                { type: 'separator' },
                {
                    label: '退出',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: '视图',
            submenu: [
                {
                    label: '刷新',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.webContents.reload();
                    }
                },
                {
                    label: '切换主题',
                    accelerator: 'CmdOrCtrl+T',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.timetableApp.toggleTheme()');
                    }
                },
                {
                    label: '设置',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.timetableApp.openSettings()');
                    }
                },
                { type: 'separator' },
                {
                    label: '全屏',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+Cmd+F' : 'F11',
                    click: () => {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                }
            ]
        },
        {
            label: '课程',
            submenu: [
                {
                    label: '添加课程',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.timetableApp.addCourse()');
                    }
                },
                {
                    label: '上一周',
                    accelerator: 'Left',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.timetableApp.changeWeek(-1)');
                    }
                },
                {
                    label: '下一周',
                    accelerator: 'Right',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.timetableApp.changeWeek(1)');
                    }
                }
            ]
        },
        {
            label: '帮助',
            submenu: [
                {
                    label: '关于智能课表',
                    click: () => {
                        showAboutDialog();
                    }
                },
                {
                    label: '用户手册',
                    click: () => {
                        shell.openExternal('https://github.com/yourusername/intellectual-timetable#readme');
                    }
                },
                { type: 'separator' },
                {
                    label: '反馈问题',
                    click: () => {
                        shell.openExternal('https://github.com/yourusername/intellectual-timetable/issues');
                    }
                }
            ]
        }
    ];

    // macOS 特殊处理
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: '关于 ' + app.getName(),
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: '服务',
                    role: 'services',
                    submenu: []
                },
                { type: 'separator' },
                {
                    label: '隐藏 ' + app.getName(),
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: '隐藏其他',
                    accelerator: 'Command+Shift+H',
                    role: 'hideothers'
                },
                {
                    label: '显示全部',
                    role: 'unhide'
                },
                { type: 'separator' },
                {
                    label: '退出',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// 导入课表
async function importTimetable() {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: '选择课表文件',
        filters: [
            { name: 'Excel文件', extensions: ['xlsx', 'xls'] },
            { name: 'CSV文件', extensions: ['csv'] },
            { name: '所有文件', extensions: ['*'] }
        ],
        properties: ['openFile']
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        
        try {
            // 读取文件并发送到渲染进程
            const fileData = fs.readFileSync(filePath);
            const fileName = path.basename(filePath);
            
            mainWindow.webContents.executeJavaScript(`
                window.timetableApp.handleImportedFile('${fileName}', '${fileData.toString('base64')}');
            `);
        } catch (error) {
            dialog.showErrorBox('导入失败', `无法读取文件：${error.message}`);
        }
    }
}

// 导出课表
async function exportTimetable() {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: '导出课表',
        defaultPath: `课表_${new Date().toISOString().split('T')[0]}.json`,
        filters: [
            { name: 'JSON文件', extensions: ['json'] },
            { name: '所有文件', extensions: ['*'] }
        ]
    });

    if (!result.canceled) {
        try {
            // 从渲染进程获取课表数据
            const data = await mainWindow.webContents.executeJavaScript('window.timetableApp.exportData()');
            fs.writeFileSync(result.filePath, JSON.stringify(data, null, 2));
            
            dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: '导出成功',
                message: '课表已成功导出！',
                detail: `文件保存在：${result.filePath}`
            });
        } catch (error) {
            dialog.showErrorBox('导出失败', `无法保存文件：${error.message}`);
        }
    }
}

// 显示关于对话框
function showAboutDialog() {
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: '关于智能课表',
        message: '智能课表 v1.0.0',
        detail: `
一个现代化的智能课表管理系统

特性：
• 简洁美观的界面设计
• 支持多周课表管理
• 个性化主题定制
• 响应式布局设计
• 数据导入导出功能

开发团队：智能课表开发团队
许可证：MIT License

© 2024 Intellectual Timetable. All rights reserved.
        `.trim(),
        buttons: ['确定', '访问项目主页'],
        defaultId: 0,
        cancelId: 0
    }).then((result) => {
        if (result.response === 1) {
            shell.openExternal('https://github.com/yourusername/intellectual-timetable');
        }
    });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法
// 部分 API 在 ready 事件触发后才能使用
app.whenReady().then(createWindow);

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

// 处理来自渲染进程的IPC消息
ipcMain.handle('get-app-version', () => {
    return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
    const result = await dialog.showMessageBox(mainWindow, options);
    return result;
});

ipcMain.handle('show-save-dialog', async (event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, options);
    return result;
});

ipcMain.handle('show-open-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, options);
    return result;
});

// 设置应用用户模型ID（Windows）
if (process.platform === 'win32') {
    app.setAppUserModelId('com.timetable.intellectual');
}

// 阻止应用创建多个实例
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        // 当运行第二个实例时，将会聚焦到主窗口
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
} 