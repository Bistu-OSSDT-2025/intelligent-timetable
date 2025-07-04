# 智能课表系统

<div align="center">

![智能课表系统](https://img.shields.io/badge/智能课表系统-v2.0.0-blue)
![Python](https://img.shields.io/badge/Python-3.7+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Android-lightgrey)

**现代化的多端课程管理系统**

[🚀 快速开始](#快速开始) • [📖 使用说明](#使用说明) • [🔧 安装指南](INSTALL.md) • [❓ 常见问题](FAQ.md)

</div>

---

## 📋 项目简介

智能课表系统是一个功能强大的现代化课程管理工具，支持桌面版、Web版和安卓版，为用户提供便捷的课程管理体验。

### ✨ 主要特性

- 🖥️ **多端支持**: 桌面版、Web版、安卓版统一体验
- 📚 **课程管理**: 添加、编辑、删除课程信息
- 📅 **课表显示**: 直观的网格化课表界面
- 🔔 **智能提醒**: 课程开始前自动提醒
- 📁 **数据导入**: 支持Excel/CSV文件导入
- 💾 **数据备份**: 自动备份和恢复功能
- 🎨 **界面美化**: 现代化UI设计
- 🔄 **数据同步**: 多端数据实时同步

### 🎯 适用场景

- 🎓 **学生**: 管理个人课程安排
- 👨‍🏫 **教师**: 查看教学计划
- 🏫 **学校**: 课程管理系统
- 💼 **企业**: 培训课程管理

---

## 🚀 快速开始

### 系统要求

- **操作系统**: Windows 7/10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Python版本**: 3.7 或更高版本
- **内存**: 至少 2GB RAM
- **存储空间**: 至少 100MB 可用空间

### 快速安装

1. **下载项目**
   ```bash
   git clone https://github.com/yourusername/intellectual-timetable.git
   cd intellectual-timetable
   ```

2. **安装依赖**
   ```bash
   pip install -r requirements.txt
   ```

3. **启动系统**
   ```bash
   python 启动智能课表系统.py
   ```

### 一键启动

- **Windows**: 双击 `启动智能课表.bat`
- **其他系统**: 运行 `python 启动智能课表系统.py`

---

## 📖 使用说明

### 桌面版使用

#### 基本操作
1. **添加课程**: 点击课表空白处，填写课程信息
2. **编辑课程**: 双击课程，修改相关信息
3. **删除课程**: 右键课程，选择删除
4. **切换周次**: 使用左右箭头按钮

#### 高级功能
- **导入文件**: 支持Excel/CSV格式课表导入
- **提醒设置**: 设置课程开始前提醒时间
- **数据导出**: 导出课程数据为CSV格式
- **界面主题**: 切换日间/夜间模式

### Web版使用

#### 访问方式
1. 启动Web API服务
2. 在浏览器中访问: `http://localhost:8080`
3. 享受现代化的Web界面

#### 特色功能
- **响应式设计**: 适配各种屏幕尺寸
- **实时更新**: 数据实时同步
- **拖拽操作**: 支持课程拖拽调整
- **快捷键**: 提高操作效率

### 安卓版使用

#### 安装方式
1. 安装Python和Kivy框架
2. 运行 `python 启动安卓端课表.py`
3. 享受移动端体验

#### 移动特色
- **触摸优化**: 针对触摸屏优化
- **手势操作**: 支持滑动切换
- **离线使用**: 无需网络连接
- **省电模式**: 优化电池使用

---

## 🏗️ 系统架构

### 技术栈

#### 后端技术
- **Python**: 主要开发语言
- **SQLite**: 轻量级数据库
- **Flask**: Web API框架
- **tkinter**: 桌面GUI框架
- **Kivy**: 移动端框架

#### 前端技术
- **HTML5**: 页面结构
- **CSS3**: 样式设计
- **JavaScript**: 交互逻辑
- **响应式设计**: 多设备适配

### 目录结构

```
intellectual-timetable/
├── backend_programs(3)/     # 后端程序
│   ├── 智能课表.py          # 桌面版主程序
│   ├── course_api.py        # 课程API模块
│   ├── smart_timetable.db   # SQLite数据库
│   └── 启动智能课表.bat     # Windows启动脚本
├── top/                     # 前端程序
│   ├── index.html           # Web界面
│   ├── styles.css           # 样式文件
│   ├── script.js            # JavaScript功能
│   ├── backend/             # Web后端
│   └── 启动智能课表系统.py   # 统一启动脚本
├── docs/                    # 文档目录
│   ├── INSTALL.md           # 安装指南
│   ├── FAQ.md               # 常见问题
│   ├── CREDITS.md           # 贡献者名单
│   ├── HISTORY.md           # 发展历史
│   ├── LICENSE              # 许可证
│   └── README.md            # 项目说明
├── requirements.txt         # Python依赖列表
└── README.md               # 项目说明
```

---

## 🔧 配置说明

### 数据库配置

#### SQLite数据库（默认）
- 文件位置: `backend_programs(3)/smart_timetable.db`
- 无需额外配置，自动创建

#### MySQL数据库（可选）
1. 安装MySQL服务器
2. 创建数据库: `CREATE DATABASE smart_timetable;`
3. 修改配置文件: `top/backend/config.py`

### 网络配置

#### Web服务器
- 默认端口: 8080
- 访问地址: http://localhost:8080
- 修改端口: 编辑 `top/backend/config.py`

---

## 🐛 故障排除

### 常见问题

#### 1. 程序启动失败
- 检查Python版本是否为3.7+
- 确保已安装所需依赖包
- 查看错误日志文件

#### 2. 数据库连接失败
- 检查数据库文件权限
- 确认数据库服务运行状态
- 验证连接参数

#### 3. 端口被占用
- 修改配置文件中的端口号
- 关闭占用端口的其他程序

### 获取帮助

- **文档**: 查看 `docs/` 目录
- **FAQ**: 查看 [常见问题解答](FAQ.md)
- **安装**: 查看 [安装指南](INSTALL.md)
- **GitHub**: 提交Issue获取帮助

---

## 🤝 贡献指南

### 如何贡献

1. **Fork项目**
2. **创建功能分支**: `git checkout -b feature/AmazingFeature`
3. **提交更改**: `git commit -m 'Add some AmazingFeature'`
4. **推送到分支**: `git push origin feature/AmazingFeature`
5. **创建Pull Request**

### 贡献类型

- 🐛 **Bug修复**: 报告和修复问题
- ✨ **新功能**: 添加新功能
- 📚 **文档**: 改进文档
- 🎨 **界面**: 优化用户界面
- ⚡ **性能**: 提升系统性能

---

## 📄 许可证

本项目采用 [MIT许可证](LICENSE) - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

感谢所有为智能课表系统做出贡献的开发者！

- **核心团队**: 项目架构和开发
- **贡献者**: 功能改进和Bug修复
- **用户**: 反馈和建议
- **开源社区**: 技术支持和指导

---

## 📞 联系我们

- **项目地址**: https://github.com/yourusername/intellectual-timetable
- **问题反馈**: https://github.com/yourusername/intellectual-timetable/issues
- **邮件联系**: support@timetable.com
- **讨论区**: https://github.com/yourusername/intellectual-timetable/discussions

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个星标！**

</div> 
