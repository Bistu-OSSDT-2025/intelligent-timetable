# 智能课表系统 - 常见问题解答 (FAQ)

## 📋 目录
1. [基础问题](#基础问题)
2. [安装问题](#安装问题)
3. [使用问题](#使用问题)
4. [技术问题](#技术问题)
5. [故障排除](#故障排除)

---

## 🔰 基础问题

### Q1: 什么是智能课表系统？
**A**: 智能课表系统是一个现代化的课程管理工具，支持多种界面版本：
- **桌面版**: 基于tkinter的原生桌面应用
- **Web版**: 现代化的Web界面，支持响应式设计
- **安卓版**: 基于Kivy框架的移动端应用

### Q2: 系统支持哪些操作系统？
**A**: 
- **Windows**: 7/10/11 (推荐)
- **macOS**: 10.14+
- **Linux**: Ubuntu 18.04+, CentOS 7+
- **Android**: 5.0+ (安卓版)

### Q3: 需要什么版本的Python？
**A**: 需要Python 3.7或更高版本，推荐使用Python 3.8-3.12。

### Q4: 系统是免费的吗？
**A**: 是的，智能课表系统是开源免费软件，遵循MIT许可证。

---

## 🔧 安装问题

### Q5: 如何安装智能课表系统？
**A**: 
1. 下载项目文件
2. 安装Python 3.7+
3. 安装依赖包: `pip install -r requirements.txt`
4. 运行启动脚本: `python 启动智能课表系统.py`

### Q6: 安装时提示"ModuleNotFoundError"怎么办？
**A**: 
```bash
# 安装缺失的模块
pip install module_name

# 或使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple module_name
```

### Q7: tkinter模块缺失怎么办？
**A**: 
- **Windows**: 重新安装Python，确保勾选tkinter
- **Ubuntu/Debian**: `sudo apt-get install python3-tk`
- **CentOS/RHEL**: `sudo yum install tkinter`
- **macOS**: `brew install python-tk`

### Q8: 如何验证安装是否成功？
**A**: 
```bash
# 检查Python版本
python --version

# 检查关键模块
python -c "import tkinter; print('tkinter: OK')"
python -c "import tkcalendar; print('tkcalendar: OK')"
python -c "import openpyxl; print('openpyxl: OK')"
```

---

## 💡 使用问题

### Q9: 如何启动系统？
**A**: 
- **统一启动**: `python 启动智能课表系统.py`
- **桌面版**: `python 智能课表.py`
- **Web版**: `python top/backend/web_api.py`
- **安卓版**: `python 启动安卓端课表.py`

### Q10: 如何添加课程？
**A**: 
1. 点击课表空白处或"添加课程"按钮
2. 填写课程信息（名称、教师、地点、时间等）
3. 选择上课周次和节次
4. 点击"保存"

### Q11: 如何导入课表数据？
**A**: 
1. 准备Excel或CSV格式的课表文件
2. 点击"导入文件"按钮
3. 选择文件并确认导入
4. 系统自动解析并导入数据

### Q12: 如何设置课程提醒？
**A**: 
1. 点击"提醒设置"按钮
2. 设置学期开始日期
3. 设置提前提醒时间（分钟）
4. 保存设置

### Q13: 如何切换周次？
**A**: 
- **桌面版**: 使用左右箭头按钮
- **Web版**: 点击周次选择器或使用左右箭头
- **安卓版**: 使用周次选择器

### Q14: 如何备份课程数据？
**A**: 
1. 复制数据库文件: `smart_timetable.db`
2. 导出为CSV格式
3. 定期备份重要文件

---

## 🔬 技术问题

### Q15: 系统使用什么数据库？
**A**: 
- **默认**: SQLite数据库 (`smart_timetable.db`)
- **可选**: MySQL数据库（需要配置）

### Q16: 如何修改数据库配置？
**A**: 编辑 `top/backend/config.py` 文件：
```python
DATABASE_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "your_username",
    "password": "your_password",
    "database": "smart_timetable"
}
```

### Q17: Web版如何访问？
**A**: 
1. 启动Web API服务
2. 在浏览器中访问: `http://localhost:8080`
3. 或使用统一启动脚本自动打开

### Q18: 如何修改Web服务器端口？
**A**: 编辑 `top/backend/config.py` 文件：
```python
WEB_SERVER_CONFIG = {
    "port": 8080  # 修改此端口号
}
```

### Q19: 系统支持哪些文件格式？
**A**: 
- **导入**: Excel (.xlsx), CSV (.csv)
- **导出**: CSV (.csv)
- **数据库**: SQLite (.db), MySQL

### Q20: 如何自定义界面主题？
**A**: 
- **Web版**: 在设置中切换日间/夜间模式
- **桌面版**: 支持基本的界面调整
- **安卓版**: 支持主题切换

---

## 🐛 故障排除

### Q21: 程序启动失败怎么办？
**A**: 
1. 检查Python版本是否为3.7+
2. 确保已安装所需依赖包
3. 查看错误日志文件
4. 尝试重新安装依赖

### Q22: 课程数据丢失了怎么办？
**A**: 
1. 检查数据库文件是否存在
2. 查看备份文件
3. 重新导入课程数据
4. 联系技术支持

### Q23: 提醒功能不工作？
**A**: 
1. 检查程序是否在后台运行
2. 确认系统通知权限
3. 检查提醒设置是否正确
4. 重启程序

### Q24: 数据库连接失败？
**A**: 
1. 检查数据库文件权限
2. 确认数据库服务运行状态
3. 验证连接参数
4. 查看错误日志

### Q25: 端口被占用怎么办？
**A**: 
1. 修改配置文件中的端口号
2. 关闭占用端口的其他程序
3. 使用不同的端口

### Q26: 界面显示异常？
**A**: 
1. 检查屏幕分辨率设置
2. 更新显卡驱动
3. 调整界面缩放比例
4. 重启程序

### Q27: 导入文件失败？
**A**: 
1. 检查文件格式是否正确
2. 确认文件编码为UTF-8
3. 检查文件是否损坏
4. 查看错误日志

### Q28: 多端数据不同步？
**A**: 
1. 确保所有版本使用相同数据库
2. 检查数据库连接参数
3. 重启相关服务
4. 手动同步数据

### Q29: 性能问题？
**A**: 
1. 检查系统资源使用情况
2. 关闭不必要的程序
3. 清理临时文件
4. 升级硬件配置

### Q30: 如何获取技术支持？
**A**: 
1. 查看文档: `docs/` 目录
2. 提交GitHub Issue
3. 发送邮件: support@timetable.com
4. 查看社区讨论

---

## 📞 联系支持

### 获取帮助
- **文档**: 查看 `docs/` 目录
- **GitHub**: https://github.com/yourusername/intellectual-timetable
- **邮件**: support@timetable.com
- **讨论区**: https://github.com/yourusername/intellectual-timetable/discussions

### 报告问题
请提供以下信息：
1. 操作系统和版本
2. Python版本
3. 错误信息
4. 操作步骤
5. 日志文件

---

**如果这里没有找到您的问题答案，请通过上述联系方式获取帮助。** 