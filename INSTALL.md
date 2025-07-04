# 智能课表系统 - 安装指南

## 📋 系统要求

### 基础要求
- **操作系统**: Windows 7/10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Python版本**: 3.7 或更高版本
- **内存**: 至少 2GB RAM
- **存储空间**: 至少 100MB 可用空间

### 推荐配置
- **操作系统**: Windows 10/11
- **Python版本**: 3.8 - 3.12
- **内存**: 4GB RAM 或更多
- **存储空间**: 500MB 可用空间

## 🚀 快速安装

### 方法一：一键安装（推荐）

1. **下载项目**
   ```bash
   git clone https://github.com/yourusername/intellectual-timetable.git
   cd intellectual-timetable
   ```

2. **运行安装脚本**
   ```bash
   # Windows
   python install.py
   
   # 或双击运行
   安装智能课表.bat
   ```

3. **启动系统**
   ```bash
   python 启动智能课表系统.py
   ```

### 方法二：手动安装

#### 1. 安装Python依赖

```bash
# 安装基础依赖
pip install -r requirements.txt

# 或手动安装主要依赖
pip install tkinter
pip install tkcalendar
pip install openpyxl
pip install sqlite3
pip install kivy
pip install plyer
```

#### 2. 安装可选依赖

```bash
# 数据库支持（可选）
pip install pymysql

# 开发工具（可选）
pip install pytest
pip install black
pip install flake8
```

#### 3. 验证安装

```bash
# 检查Python版本
python --version

# 检查依赖
python -c "import tkinter; print('tkinter: OK')"
python -c "import tkcalendar; print('tkcalendar: OK')"
python -c "import openpyxl; print('openpyxl: OK')"
```

## 📁 目录结构

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
├── requirements.txt         # Python依赖列表
└── README.md               # 项目说明
```

## 🔧 配置说明

### 数据库配置

#### SQLite数据库（默认）
- 文件位置: `backend_programs(3)/smart_timetable.db`
- 无需额外配置，自动创建

#### MySQL数据库（可选）
1. 安装MySQL服务器
2. 创建数据库: `CREATE DATABASE smart_timetable;`
3. 修改配置文件: `top/backend/config.py`

```python
DATABASE_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "your_username",
    "password": "your_password",
    "database": "smart_timetable",
    "charset": "utf8mb4"
}
```

### 网络配置

#### Web服务器
- 默认端口: 8080
- 访问地址: http://localhost:8080
- 修改端口: 编辑 `top/backend/config.py`

```python
WEB_SERVER_CONFIG = {
    "host": "localhost",
    "port": 8080,  # 修改此端口
    "debug": True
}
```

## 🐛 故障排除

### 常见问题

#### 1. Python版本不兼容
**问题**: `SyntaxError` 或模块导入失败
**解决**: 升级到Python 3.7+

#### 2. 依赖包安装失败
**问题**: `pip install` 失败
**解决**: 
```bash
# 升级pip
python -m pip install --upgrade pip

# 使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package_name
```

#### 3. tkinter模块缺失
**问题**: `ModuleNotFoundError: No module named 'tkinter'`
**解决**: 
```bash
# Ubuntu/Debian
sudo apt-get install python3-tk

# CentOS/RHEL
sudo yum install tkinter

# macOS
brew install python-tk
```

#### 4. 数据库连接失败
**问题**: 无法连接数据库
**解决**: 
- 检查数据库文件权限
- 确认数据库服务运行状态
- 验证连接参数

#### 5. 端口被占用
**问题**: Web服务器启动失败
**解决**: 
- 修改配置文件中的端口号
- 关闭占用端口的其他程序

### 日志文件

- **应用日志**: `backend_programs(3)/app.log`
- **调试日志**: `backend_programs(3)/debug.log`
- **API日志**: `backend_programs(3)/course_api.log`
- **Web日志**: `top/backend/web_api.log`

## 🔄 更新安装

### 自动更新
```bash
# 拉取最新代码
git pull origin main

# 更新依赖
pip install -r requirements.txt --upgrade

# 重启服务
python 启动智能课表系统.py
```

### 手动更新
1. 备份数据库文件
2. 下载新版本
3. 替换程序文件
4. 更新依赖包
5. 恢复数据库

## 📦 打包部署

### 桌面应用打包
```bash
# 安装打包工具
pip install pyinstaller

# 打包桌面版
pyinstaller --onefile --windowed 智能课表.py

# 打包Web版
cd top
pyinstaller --onefile --add-data "index.html;." --add-data "styles.css;." --add-data "script.js;." main.py
```

### Docker部署
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8080

CMD ["python", "top/backend/web_api.py"]
```

## 📞 技术支持

### 获取帮助
- **文档**: 查看 `docs/` 目录
- **FAQ**: 查看 `docs/FAQ.md`
- **问题反馈**: 提交GitHub Issue
- **邮件支持**: support@timetable.com

### 社区支持
- **GitHub**: https://github.com/yourusername/intellectual-timetable
- **讨论区**: https://github.com/yourusername/intellectual-timetable/discussions
- **Wiki**: https://github.com/yourusername/intellectual-timetable/wiki

---

**安装完成后，请查看 `docs/README.md` 了解如何使用系统。** 