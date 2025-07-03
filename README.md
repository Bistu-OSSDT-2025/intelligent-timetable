# 智能课表 - 安装使用指南

## 🚀 快速开始

### 方法一：直接使用（推荐新手）
1. 下载所有项目文件到同一文件夹
2. 双击 `index.html` 文件
3. 应用将在浏览器中打开，立即可用！

### 方法二：打包为桌面应用（推荐）

#### 前提条件
- 安装 [Node.js](https://nodejs.org/) (版本 16 或更高)
- Windows/macOS/Linux 操作系统

#### 安装步骤
1. **下载项目文件**
   ```bash
   # 如果有git，可以克隆仓库
   git clone https://github.com/yourusername/intellectual-timetable.git
   cd intellectual-timetable
   
   # 或者直接下载ZIP文件并解压
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **运行开发版本**
   ```bash
   npm start
   ```

4. **打包为可执行文件**
   ```bash
   # 仅打包Windows版本
   npm run dist-win
   
   # 打包所有平台版本
   npm run dist-all
   ```

5. **查找打包结果**
   - 打包完成后，在 `dist/` 文件夹中找到可执行文件
   - Windows: `智能课表-1.0.0-setup.exe` 或 `智能课表-1.0.0-portable.exe`
   - macOS: `智能课表-1.0.0.dmg`
   - Linux: `intellectual-timetable_1.0.0_amd64.deb` 或 `智能课表-1.0.0.AppImage`

## 📋 系统要求

### 浏览器版本（方法一）
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### 桌面应用版本（方法二）
- **Windows**: Windows 7 或更高版本
- **macOS**: macOS 10.11 或更高版本
- **Linux**: Ubuntu 16.04 或等效的其他发行版

## 🔧 开发环境搭建

如果您想参与开发或自定义功能：

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/intellectual-timetable.git
   cd intellectual-timetable
   ```

2. **安装开发依赖**
   ```bash
   npm install
   ```

3. **启动开发模式**
   ```bash
   npm run dev
   ```

4. **代码结构**
   ```
   ITfront-v0.2/
   ├── index.html          # 主页面
   ├── styles.css          # 样式文件
   ├── script.js          # 主要功能逻辑
   ├── main.js            # Electron主进程
   ├── preload.js         # Electron预加载脚本
   ├── package.json       # 项目配置
   ├── README.md          # 项目说明
   └── INSTALL.md         # 安装说明
   ```

## 🎯 功能概览

### 核心功能
- ✅ 课程时间表显示
- ✅ 多周切换浏览
- ✅ 课程详情查看
- ✅ 主题切换（日间/夜间）
- ✅ 个性化设置
- ✅ 响应式设计

### 设置功能
- ✅ 主题颜色调整
- ✅ 字体颜色设置
- ✅ 背景图片自定义
- ✅ 毛玻璃效果调节
- ✅ 卡片透明度控制
- ✅ 星期显示格式切换

### 快捷键
- `Ctrl+T`: 切换主题
- `Ctrl+S`: 打开设置
- `ESC`: 关闭弹窗
- `←/→`: 切换周数
- `Ctrl+O`: 导入课表（桌面版）
- `Ctrl+R`: 刷新页面

## 🔄 后端对接

### API接口预留
系统已为Python后端预留了以下API接口：

```javascript
// 课程管理
GET    /api/schedule/{week}     // 获取指定周课表
POST   /api/courses            // 添加课程
PUT    /api/courses/{id}       // 更新课程
DELETE /api/courses/{id}       // 删除课程

// 数据管理
POST   /api/import             // 导入课表文件
GET    /api/export             // 导出课表数据
GET    /api/settings          // 获取用户设置
POST   /api/settings          // 保存用户设置
```

### 数据格式示例
```json
{
  "name": "高等数学",
  "teacher": "张教授",
  "location": "教学楼A101",
  "dayOfWeek": 1,
  "startPeriod": 1,
  "endPeriod": 2,
  "weeks": "1-16周",
  "category": "math"
}
```

## 🐛 常见问题

### 问题1：无法打开HTML文件
**解决方案**：
- 确保所有文件在同一文件夹中
- 尝试右键点击 → "打开方式" → 选择浏览器

### 问题2：Electron打包失败
**解决方案**：
```bash
# 清理缓存重新安装
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run dist
```

### 问题3：课程卡片不显示
**解决方案**：
- 检查浏览器控制台是否有JavaScript错误
- 确保网络连接正常（需要加载Font Awesome图标）

### 问题4：设置无法保存
**解决方案**：
- 确保浏览器允许本地存储
- 在浏览器隐私设置中允许localStorage

## 📞 获取帮助

如果遇到问题或需要帮助：

1. **查阅文档**：先查看 [README.md](README.md) 了解详细功能
2. **搜索问题**：在 [Issues](https://github.com/yourusername/intellectual-timetable/issues) 中搜索类似问题
3. **提交问题**：创建新的Issue描述您遇到的具体问题
4. **参与讨论**：在 [Discussions](https://github.com/yourusername/intellectual-timetable/discussions) 中参与功能讨论

## 🤝 贡献代码

欢迎贡献代码！请遵循以下步骤：

1. Fork 此仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

**享受使用智能课表！** 🎓📚 
