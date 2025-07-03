# 智能课表 (Intellectual Timetable)

一个现代化的智能课表管理系统，采用简洁的设计和丰富的功能，支持个性化定制。

## 🌟 特性

### 核心功能
- **智能课表显示**：清晰的网格布局，直观显示课程安排
- **多周切换**：支持左右滑动或点击切换不同周的课表
- **课程管理**：添加、删除、编辑课程信息
- **数据导入**：支持从Excel/CSV文件导入课表数据
- **实时刷新**：保持数据最新状态

### 个性化定制
- **主题切换**：日间/夜间模式自由切换
- **颜色定制**：
  - 主题线条颜色调整
  - 字体颜色自定义
  - 课程卡片颜色按类别分类设置
- **背景设置**：
  - 自定义背景图片
  - 毛玻璃效果强度调节
  - 卡片透明度控制
- **显示格式**：星期显示支持中文(一-日)、数字(1-7)、罗马数字(i-vii)

### 用户体验
- **响应式设计**：完美适配桌面端和移动端
- **触摸支持**：移动设备上支持滑动切换周数
- **键盘快捷键**：
  - `Ctrl+T`：切换主题
  - `Ctrl+S`：打开设置
  - `ESC`：关闭弹窗
  - `←/→`：切换周数
- **平滑动画**：所有交互都有流畅的过渡效果

## 🚀 快速开始

### 在线使用
直接打开 `index.html` 文件即可在浏览器中使用。

### 本地部署
1. 克隆或下载项目文件
2. 确保所有文件在同一目录下：
   - `index.html`
   - `styles.css`
   - `script.js`
3. 双击 `index.html` 或在浏览器中打开

### 服务器部署
将所有文件上传到Web服务器即可访问。

## 📁 项目结构

```
ITfront-v0.2/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js          # JavaScript功能文件
├── README.md          # 项目说明
└── package.json       # 打包配置(可选)
```

## 🎨 界面说明

### 主界面布局
```
┌─────────────────────────────────────────────────┐
│ 日期显示 | 主题切换 | 功能按钮区                    │
├─────────────────────────────────────────────────┤
│ ← 第N周 →                                        │
├─────────────────────────────────────────────────┤
│ 时间 │ 一 │ 二 │ 三 │ 四 │ 五 │ 六 │ 日 │       │
├──────┼────┼────┼────┼────┼────┼────┼────┤
│  1   │    │    │课程│    │    │    │    │       │
│ 8:00 │    │    │卡片│    │    │    │    │       │
├──────┼────┼────┼────┼────┼────┼────┼────┤
│ ...  │    │    │    │    │    │    │    │       │
└─────────────────────────────────────────────────┘
                                        ⚙️ 设置按钮
```

### 功能按钮
- **➕ 添加课程**：新增课程到当前周
- **🗑️ 删除课程**：删除选中的课程
- **📤 导入课表**：从文件导入课表数据
- **🔄 刷新**：更新全局数据

### 课程卡片
- 显示课程名称、地点、教师
- 点击查看详细信息
- 支持颜色自定义
- 可编辑和删除

## 🔧 后端对接

### API接口设计

系统已预留后端接口，Python后端需要实现以下API：

#### 课程管理
```python
# 获取指定周的课表
GET /api/schedule/{week_number}

# 添加课程
POST /api/courses
{
    "name": "课程名称",
    "teacher": "教师姓名", 
    "location": "上课地点",
    "dayOfWeek": 1,         # 1-7 代表周一到周日
    "startPeriod": 1,       # 开始节次
    "endPeriod": 2,         # 结束节次
    "weeks": "1-16周",      # 上课周数
    "category": "math"      # 课程类别
}

# 删除课程
DELETE /api/courses/{course_id}

# 更新课程
PUT /api/courses/{course_id}
```

#### 数据导入
```python
# 导入课表文件
POST /api/import
Content-Type: multipart/form-data
# 上传Excel或CSV文件
```

#### 设置管理
```python
# 保存用户设置
POST /api/settings
{
    "theme": "light/dark",
    "themeColor": "#007bff",
    "weekFormat": "chinese"
    # 其他设置项...
}

# 获取用户设置
GET /api/settings
```

### 数据库设计建议

```sql
-- 课程表
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teacher VARCHAR(50),
    location VARCHAR(100),
    day_of_week INTEGER,     -- 1-7
    start_period INTEGER,    -- 1-14
    end_period INTEGER,      -- 1-14
    weeks VARCHAR(50),       -- "1-16周"
    category VARCHAR(20),    -- math, physics, etc.
    color VARCHAR(7),        -- 自定义颜色
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 用户设置表
CREATE TABLE user_settings (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    setting_key VARCHAR(50),
    setting_value TEXT,
    updated_at TIMESTAMP
);
```

## 📱 打包为EXE

### 使用Electron打包
1. 安装Node.js和npm
2. 创建package.json：
```json
{
  "name": "intellectual-timetable",
  "version": "1.0.0",
  "description": "智能课表管理系统",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "dist": "electron-builder --publish=never"
  },
  "devDependencies": {
    "electron": "^latest",
    "electron-builder": "^latest"
  },
  "build": {
    "appId": "com.timetable.app",
    "productName": "智能课表",
    "directories": {
      "output": "dist"
    },
    "files": [
      "index.html",
      "styles.css", 
      "script.js",
      "main.js"
    ],
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    }
  }
}
```

3. 创建main.js（Electron主进程）
4. 运行打包命令：`npm run dist`

### 使用Tauri打包（推荐）
Tauri是更轻量级的替代方案，生成的exe文件更小。

## 🎯 开发计划

### 已完成功能
- ✅ 基础UI界面设计
- ✅ 响应式布局
- ✅ 主题切换系统
- ✅ 设置面板
- ✅ 课程卡片交互
- ✅ 周切换功能
- ✅ 本地设置存储

### 待开发功能
- 🔄 后端API集成
- 🔄 课程编辑表单
- 🔄 课表导入功能
- 🔄 数据持久化
- 🔄 用户认证系统
- 🔄 多学期支持
- 🔄 课程提醒功能
- 🔄 统计分析面板

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 文本编辑器（VS Code推荐）
- 基础的HTML/CSS/JavaScript知识

### 代码规范
- 使用ES6+语法
- 保持代码注释清晰
- 遵循响应式设计原则
- 注重用户体验

## 📄 许可证

MIT License - 详见LICENSE文件

## 🔗 相关链接

- [项目主页](#)
- [在线演示](#)
- [问题反馈](https://github.com/yourusername/intellectual-timetable/issues)
- [功能建议](https://github.com/yourusername/intellectual-timetable/discussions)

---

如有任何问题或建议，欢迎联系开发团队！ 