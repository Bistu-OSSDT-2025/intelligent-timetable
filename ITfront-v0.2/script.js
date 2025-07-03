// 智能课表应用类
class TimetableApp {
    constructor() {
        this.currentWeek = 1;
        this.currentTheme = 'light';
        this.settings = {
            themeColor: '#007bff',
            fontColor: '#333333',
            backgroundImage: null,
            blurIntensity: 10,
            cardOpacity: 0.9,
            weekFormat: 'chinese'
        };
        this.courseColors = {};
        this.apiBaseUrl = '/api'; // 后端API基础URL
        
        this.init();
    }

    // 初始化应用
    init() {
        this.initElements();
        this.bindEvents();
        this.loadSettings();
        this.updateDateTime();
        this.updateWeekDisplay();
        
        // 每分钟更新一次时间
        setInterval(() => this.updateDateTime(), 60000);
    }

    // 初始化DOM元素引用
    initElements() {
        // 主要功能按钮
        this.themeToggle = document.getElementById('themeToggle');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.closeSettings = document.getElementById('closeSettings');
        this.overlay = document.getElementById('overlay');
        
        // 功能按钮
        this.addCourseBtn = document.getElementById('addCourse');
        this.deleteCourseBtn = document.getElementById('deleteCourse');
        this.importScheduleBtn = document.getElementById('importSchedule');
        this.refreshBtn = document.getElementById('refresh');
        
        // 周切换
        this.prevWeekBtn = document.getElementById('prevWeek');
        this.nextWeekBtn = document.getElementById('nextWeek');
        this.weekDisplay = document.getElementById('weekDisplay');
        
        // 设置项
        this.themeColorInput = document.getElementById('themeColor');
        this.fontColorInput = document.getElementById('fontColor');
        this.backgroundImageInput = document.getElementById('backgroundImage');
        this.blurIntensityInput = document.getElementById('blurIntensity');
        this.cardOpacityInput = document.getElementById('cardOpacity');
        
        // 课程相关
        this.courseModal = document.getElementById('courseModal');
        this.closeModal = document.getElementById('closeModal');
        this.courseColorPicker = document.getElementById('courseColorPicker');
        
        // 其他元素
        this.currentDate = document.getElementById('currentDate');
        this.dayHeaders = document.getElementById('dayHeaders');
        this.courseGrid = document.getElementById('courseGrid');
        
        // 获取所有课程卡片
        this.courseCards = document.querySelectorAll('.course-card');
    }

    // 绑定事件监听器
    bindEvents() {
        // 主题切换
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // 设置面板
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettings.addEventListener('click', () => this.closeSettingsPanel());
        this.overlay.addEventListener('click', () => this.closeAllModals());
        
        // 周切换
        this.prevWeekBtn.addEventListener('click', () => this.changeWeek(-1));
        this.nextWeekBtn.addEventListener('click', () => this.changeWeek(1));
        
        // 功能按钮
        this.addCourseBtn.addEventListener('click', () => this.addCourse());
        this.deleteCourseBtn.addEventListener('click', () => this.deleteCourse());
        this.importScheduleBtn.addEventListener('click', () => this.importSchedule());
        this.refreshBtn.addEventListener('click', () => this.refresh());
        
        // 设置项变化
        this.themeColorInput.addEventListener('change', (e) => this.updateThemeColor(e.target.value));
        this.fontColorInput.addEventListener('change', (e) => this.updateFontColor(e.target.value));
        this.backgroundImageInput.addEventListener('change', (e) => this.updateBackgroundImage(e));
        this.blurIntensityInput.addEventListener('input', (e) => this.updateBlurIntensity(e.target.value));
        this.cardOpacityInput.addEventListener('input', (e) => this.updateCardOpacity(e.target.value));
        
        // 星期格式切换
        document.querySelectorAll('input[name="weekFormat"]').forEach(radio => {
            radio.addEventListener('change', (e) => this.updateWeekFormat(e.target.value));
        });
        
        // 课程卡片点击
        this.courseCards.forEach(card => {
            card.addEventListener('click', () => this.showCourseModal(card));
        });
        
        // 课程弹窗
        this.closeModal.addEventListener('click', () => this.closeCourseModal());
        this.courseColorPicker.addEventListener('change', (e) => this.updateCourseColor(e.target.value));
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // 触摸滑动支持
        this.initTouchSwipe();
    }

    // 更新日期时间显示
    updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        
        this.currentDate.textContent = now.toLocaleDateString('zh-CN', options);
        
        // 更新当前星期几
        const dayOfWeek = now.getDay();
        const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
        document.querySelector('.current-day').textContent = `星期${dayNames[dayOfWeek]}`;
        
        // 更新表头日期
        this.updateHeaderDates();
    }

    // 更新表头日期
    updateHeaderDates() {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1); // 获取本周一
        
        const dayHeaders = this.dayHeaders.querySelectorAll('.day-header');
        dayHeaders.forEach((header, index) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            
            const dateSub = header.querySelector('.date-sub');
            if (dateSub) {
                dateSub.textContent = `${date.getMonth() + 1}/${date.getDate()}`;
            }
        });
    }

    // 切换主题
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.saveSettings();
    }

    // 打开设置面板
    openSettings() {
        this.settingsPanel.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭设置面板
    closeSettingsPanel() {
        this.settingsPanel.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 关闭所有弹窗
    closeAllModals() {
        this.closeSettingsPanel();
        this.closeCourseModal();
    }

    // 显示课程详情弹窗
    showCourseModal(courseCard) {
        const courseInfo = JSON.parse(courseCard.dataset.courseInfo);
        
        document.getElementById('modalCourseName').textContent = courseInfo.name;
        document.getElementById('modalCourseNameValue').textContent = courseInfo.name;
        document.getElementById('modalWeeks').textContent = courseInfo.weeks;
        document.getElementById('modalTeacher').textContent = courseInfo.teacher;
        document.getElementById('modalLocation').textContent = courseInfo.location;
        
        // 获取课程在网格中的位置信息
        const gridColumn = courseCard.style.gridColumn;
        const gridRow = courseCard.style.gridRow;
        document.getElementById('modalPeriods').textContent = `第${gridColumn}天, ${gridRow}`;
        
        // 设置当前课程颜色
        const currentColor = this.courseColors[courseInfo.name] || '#007bff';
        this.courseColorPicker.value = currentColor;
        
        this.courseModal.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 存储当前编辑的课程
        this.currentEditingCourse = courseCard;
    }

    // 关闭课程详情弹窗
    closeCourseModal() {
        this.courseModal.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEditingCourse = null;
    }

    // 更新课程颜色
    updateCourseColor(color) {
        if (this.currentEditingCourse) {
            const courseInfo = JSON.parse(this.currentEditingCourse.dataset.courseInfo);
            this.courseColors[courseInfo.name] = color;
            this.currentEditingCourse.style.background = color;
            this.saveSettings();
        }
    }

    // 切换周数
    changeWeek(direction) {
        this.currentWeek += direction;
        if (this.currentWeek < 1) this.currentWeek = 1;
        if (this.currentWeek > 20) this.currentWeek = 20;
        
        this.updateWeekDisplay();
        this.loadWeekSchedule();
    }

    // 更新周数显示
    updateWeekDisplay() {
        this.weekDisplay.textContent = `第${this.currentWeek}周`;
        document.querySelector('.current-week').textContent = `第${this.currentWeek}周`;
    }

    // 更新主题颜色
    updateThemeColor(color) {
        this.settings.themeColor = color;
        document.documentElement.style.setProperty('--primary-color', color);
        this.saveSettings();
    }

    // 更新字体颜色
    updateFontColor(color) {
        this.settings.fontColor = color;
        document.documentElement.style.setProperty('--text-color', color);
        this.saveSettings();
    }

    // 更新背景图片
    updateBackgroundImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                document.body.style.backgroundImage = `url(${imageUrl})`;
                document.body.classList.add('has-background');
                this.settings.backgroundImage = imageUrl;
                this.saveSettings();
            };
            reader.readAsDataURL(file);
        }
    }

    // 更新毛玻璃强度
    updateBlurIntensity(value) {
        this.settings.blurIntensity = value;
        document.documentElement.style.setProperty('--blur-intensity', `${value}px`);
        
        // 更新显示值
        const rangeValue = this.blurIntensityInput.nextElementSibling;
        rangeValue.textContent = `${value}px`;
        
        this.saveSettings();
    }

    // 更新卡片透明度
    updateCardOpacity(value) {
        this.settings.cardOpacity = value;
        document.documentElement.style.setProperty('--card-opacity', value);
        
        // 更新显示值
        const rangeValue = this.cardOpacityInput.nextElementSibling;
        rangeValue.textContent = `${Math.round(value * 100)}%`;
        
        this.saveSettings();
    }

    // 更新星期显示格式
    updateWeekFormat(format) {
        this.settings.weekFormat = format;
        
        const dayHeaders = this.dayHeaders.querySelectorAll('.day-header');
        const formats = {
            chinese: ['一', '二', '三', '四', '五', '六', '日'],
            number: ['1', '2', '3', '4', '5', '6', '7'],
            roman: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']
        };
        
        dayHeaders.forEach((header, index) => {
            const textNode = header.firstChild;
            textNode.textContent = formats[format][index];
        });
        
        this.saveSettings();
    }

    // 键盘事件处理
    handleKeydown(event) {
        // ESC关闭弹窗
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
        
        // 左右箭头切换周数
        if (event.key === 'ArrowLeft') {
            this.changeWeek(-1);
        } else if (event.key === 'ArrowRight') {
            this.changeWeek(1);
        }
        
        // Ctrl+S 打开设置
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.openSettings();
        }
        
        // Ctrl+T 切换主题
        if (event.ctrlKey && event.key === 't') {
            event.preventDefault();
            this.toggleTheme();
        }
    }

    // 初始化触摸滑动
    initTouchSwipe() {
        let startX = 0;
        let startY = 0;
        
        const scrollContainer = document.querySelector('.scroll-container');
        
        scrollContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            // 不阻止垂直滚动，只在水平滑动时阻止
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const deltaX = Math.abs(currentX - startX);
            const deltaY = Math.abs(currentY - startY);
            
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault(); // 只在水平滑动时阻止默认行为
            }
        });
        
        scrollContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // 判断是否为水平滑动
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.changeWeek(-1); // 向右滑动，上一周
                } else {
                    this.changeWeek(1); // 向左滑动，下一周
                }
            }
        });
    }

    // 功能方法 - 添加课程
    async addCourse() {
        try {
            // 这里会调用后端API
            const response = await this.apiCall('/courses', 'POST', {
                week: this.currentWeek,
                // 其他课程数据
            });
            
            if (response.success) {
                this.showMessage('课程添加成功');
                this.loadWeekSchedule();
            }
        } catch (error) {
            this.showMessage('添加课程失败: ' + error.message, 'error');
        }
    }

    // 功能方法 - 删除课程
    async deleteCourse() {
        if (this.currentEditingCourse) {
            try {
                const courseInfo = JSON.parse(this.currentEditingCourse.dataset.courseInfo);
                const response = await this.apiCall(`/courses/${courseInfo.id}`, 'DELETE');
                
                if (response.success) {
                    this.currentEditingCourse.remove();
                    this.closeCourseModal();
                    this.showMessage('课程删除成功');
                }
            } catch (error) {
                this.showMessage('删除课程失败: ' + error.message, 'error');
            }
        }
    }

    // 功能方法 - 导入课表
    async importSchedule() {
        try {
            // 创建文件输入框
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.xlsx,.xls,.csv';
            
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    const response = await this.apiCall('/import', 'POST', formData);
                    
                    if (response.success) {
                        this.showMessage('课表导入成功');
                        this.loadWeekSchedule();
                    }
                }
            };
            
            input.click();
        } catch (error) {
            this.showMessage('导入课表失败: ' + error.message, 'error');
        }
    }

    // 功能方法 - 刷新
    async refresh() {
        try {
            this.refreshBtn.querySelector('i').style.animation = 'rotate 1s linear infinite';
            
            await this.loadWeekSchedule();
            this.updateDateTime();
            
            this.showMessage('刷新成功');
        } catch (error) {
            this.showMessage('刷新失败: ' + error.message, 'error');
        } finally {
            this.refreshBtn.querySelector('i').style.animation = '';
        }
    }

    // 加载指定周的课表数据
    async loadWeekSchedule() {
        try {
            const response = await this.apiCall(`/schedule/${this.currentWeek}`);
            
            if (response.success) {
                this.renderSchedule(response.data);
            }
        } catch (error) {
            console.error('加载课表失败:', error);
        }
    }

    // 渲染课表
    renderSchedule(scheduleData) {
        // 清空现有课程
        this.courseGrid.innerHTML = '';
        
        // 渲染新课程
        scheduleData.courses?.forEach(course => {
            const courseCard = this.createCourseCard(course);
            this.courseGrid.appendChild(courseCard);
        });
    }

    // 创建课程卡片
    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = `course-card ${course.category || 'default'}`;
        card.style.gridColumn = course.dayOfWeek;
        card.style.gridRow = `${course.startPeriod} / ${course.endPeriod + 1}`;
        card.dataset.courseInfo = JSON.stringify(course);
        
        // 应用自定义颜色
        if (this.courseColors[course.name]) {
            card.style.background = this.courseColors[course.name];
        }
        
        card.innerHTML = `
            <div class="course-name">${course.name}</div>
            <div class="course-location">${course.location}</div>
            <div class="course-teacher">${course.teacher}</div>
        `;
        
        // 添加点击事件
        card.addEventListener('click', () => this.showCourseModal(card));
        
        return card;
    }

    // API调用封装
    async apiCall(endpoint, method = 'GET', data = null) {
        const url = this.apiBaseUrl + endpoint;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data && !(data instanceof FormData)) {
            options.body = JSON.stringify(data);
        } else if (data instanceof FormData) {
            delete options.headers['Content-Type'];
            options.body = data;
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

    // 显示消息提示
    showMessage(message, type = 'success') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'error' ? '#dc3545' : '#28a745'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // 3秒后移除
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 3000);
    }

    // 保存设置到本地存储
    saveSettings() {
        const settingsData = {
            currentTheme: this.currentTheme,
            settings: this.settings,
            courseColors: this.courseColors
        };
        
        localStorage.setItem('timetable-settings', JSON.stringify(settingsData));
    }

    // 从本地存储加载设置
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('timetable-settings');
            if (savedSettings) {
                const data = JSON.parse(savedSettings);
                
                // 应用主题
                if (data.currentTheme) {
                    this.currentTheme = data.currentTheme;
                    document.body.setAttribute('data-theme', this.currentTheme);
                    const icon = this.themeToggle.querySelector('i');
                    icon.className = this.currentTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
                }
                
                // 应用设置
                if (data.settings) {
                    this.settings = { ...this.settings, ...data.settings };
                    this.applySettings();
                }
                
                // 应用课程颜色
                if (data.courseColors) {
                    this.courseColors = data.courseColors;
                }
            }
        } catch (error) {
            console.error('加载设置失败:', error);
        }
    }

    // 应用设置
    applySettings() {
        // 应用主题颜色
        document.documentElement.style.setProperty('--primary-color', this.settings.themeColor);
        this.themeColorInput.value = this.settings.themeColor;
        
        // 应用字体颜色
        document.documentElement.style.setProperty('--text-color', this.settings.fontColor);
        this.fontColorInput.value = this.settings.fontColor;
        
        // 应用背景图片
        if (this.settings.backgroundImage) {
            document.body.style.backgroundImage = `url(${this.settings.backgroundImage})`;
            document.body.classList.add('has-background');
        }
        
        // 应用毛玻璃强度
        document.documentElement.style.setProperty('--blur-intensity', `${this.settings.blurIntensity}px`);
        this.blurIntensityInput.value = this.settings.blurIntensity;
        this.blurIntensityInput.nextElementSibling.textContent = `${this.settings.blurIntensity}px`;
        
        // 应用卡片透明度
        document.documentElement.style.setProperty('--card-opacity', this.settings.cardOpacity);
        this.cardOpacityInput.value = this.settings.cardOpacity;
        this.cardOpacityInput.nextElementSibling.textContent = `${Math.round(this.settings.cardOpacity * 100)}%`;
        
        // 应用星期格式
        const weekFormatRadio = document.querySelector(`input[name="weekFormat"][value="${this.settings.weekFormat}"]`);
        if (weekFormatRadio) {
            weekFormatRadio.checked = true;
            this.updateWeekFormat(this.settings.weekFormat);
        }
    }
}

// 添加旋转动画
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 应用初始化
document.addEventListener('DOMContentLoaded', () => {
    window.timetableApp = new TimetableApp();
});

// 导出类供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimetableApp;
} 