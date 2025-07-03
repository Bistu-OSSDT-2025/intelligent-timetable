const { contextBridge, ipcRenderer } = require('electron');

// 暴露保护的方法给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 获取应用版本
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    
    // 显示消息框
    showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
    
    // 显示保存对话框
    showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
    
    // 显示打开对话框
    showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
    
    // 平台检测
    platform: process.platform,
    
    // 检查是否在Electron环境中运行
    isElectron: true
});

// 为向后兼容性设置window.isElectron
window.addEventListener('DOMContentLoaded', () => {
    window.isElectron = true;
}); 