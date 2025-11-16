// MediPlot AI - Main JavaScript File

// Global variables
let selectedFile = null;
let currentFunction = 'description';
let processedData = null;
let vehicleGroup = [];
let shamGroup = [];
let groupData = {};
let currentMode = 'mpe';
let customGroupNames = {};
let currentLanguage = 'en';

// Translation object
const translations = {
    en: {
        app_title: "MediPlot AI",
        app_tagline: "Advanced formalin test analysis for pain behavior research",
        nav_home: "Home",
        nav_select_experiment: "Select Experiment",
        welcome_title: "Welcome to MediPlot AI",
        welcome_subtitle: "Select an experiment type to begin your analysis",
        experiment_formalin_title: "Formalin Test",
        experiment_formalin_desc: "Comprehensive analysis of formalin-induced pain behavior in rodents",
        experiment_default: "Default",
        btn_start_analysis: "Start Formalin Test Analysis",
        footer_tagline: "Advanced medical research tools.",
        // Formalin test page translations
        formalin_description: "Description",
        formalin_description_content: "The formalin test is a widely used animal model for studying pain and analgesia. It involves injecting a small amount of formalin (diluted formaldehyde) into the hind paw of a rodent, which produces a characteristic biphasic pain response.",
        phase_i_title: "Phase I (0-10 minutes)",
        phase_i_desc: "Acute pain response due to direct chemical stimulation of nociceptors.",
        phase_ii_title: "Phase II (11-60 minutes)",
        phase_ii_desc: "Chronic pain response involving inflammatory processes and central sensitization.",
        make_plots: "Generate Plots",
        upload_data: "Upload Data File",
        ai_analyze: "AI Analyze",
        make_ppt: "Make PPT",
        overview_title: "Overview",
        test_phases_title: "Test Phases",
        // Plots panel
        upload_your_data_file: "Upload Your Data File",
        drag_drop_description: "Drag and drop your CSV or Excel file here, or click to browse",
        browse_files: "Browse Files",
        group_names_optional: "Group Names (Optional)",
        group_names_description: "Enter custom names for your experimental groups. Leave blank to use default names.",
        select_analysis_mode: "Select Analysis Mode",
        mpe_analysis: "MPE Analysis",
        phase_comparison: "Phase Comparison",
        time_series_plot: "Time Series Plot",
        distribution_samples: "Distribution of Samples",
        generate_plots: "Generate Plots",
        help_button: "Help",
        // AI Analysis panel
        ai_analysis_powered: "AI Analysis powered by Google Gemini",
        advanced_biomedical: "Advanced biomedical analysis of your formalin test data",
        ai_chatbot_title: "AI Chatbot",
        interactive_conversation: "Interactive conversation about your data",
        start_chat: "Start Chat",
        ai_report_title: "AI Report",
        download_comprehensive: "Download comprehensive analysis report",
        generate_report: "Generate Report",
        // PPT panel
        ppt_intro: "Create professional PowerPoint presentations for your research findings",
        choose_template: "Choose Template",
        academic: "Academic",
        professional_academic: "Professional academic presentation",
        corporate: "Corporate",
        business_focused: "Business-focused presentation",
        data_driven: "Data-Driven",
        statistics_charts: "Statistics and charts focused",
        content_options: "Content Options",
        include_plots: "Include Plots",
        statistical_analysis: "Statistical Analysis",
        ai_insights: "AI Insights",
        methodology: "Methodology",
        customization: "Customization",
        lab_name: "Lab Name",
        enter_lab_name: "Enter lab name",
        researcher_name: "Researcher Name",
        enter_researcher_name: "Enter researcher name",
        experiment_date: "Experiment Date",
        // Group selection
        select_groups_to_display: "Select Groups to Display",
        choose_groups_description: "Choose which groups to show in the plot. Uncheck groups to hide their data.",
        vehicle: "Vehicle",
        sham: "Sham",
        select_all: "Select All",
        deselect_all: "Deselect All",
        // Dynamic button texts
        generate_mpe_analysis: "Generate MPE Analysis",
        generate_phase_comparison: "Generate Phase Comparison",
        generate_time_series_plot: "Generate Time Series Plot",
        generate_distribution_plot: "Generate Distribution Plot",
        // AI Analysis sections
        data_quality_assessment: "Data Quality Assessment",
        automated_data_validation: "Automated data validation and quality checks",
        statistical_analysis_title: "Statistical Analysis",
        advanced_statistical_analysis: "Advanced statistical analysis and significance testing",
        biological_interpretation: "Biological Interpretation",
        biological_significance: "Biological significance and mechanistic insights",
        summary_report: "Summary Report",
        comprehensive_analysis_report: "Comprehensive analysis report with recommendations",
        // Chatbot
        ai_research_assistant: "AI Research Assistant",
        chatbot_welcome: "Hello! I'm your AI research assistant. I can help you analyze your formalin test data, explain statistical concepts, interpret results, and answer questions about pain behavior research. What would you like to know?",
        chat_placeholder: "Ask me about your data, statistics, or research methodology...",
        ask_about_data: "Ask about my data",
        statistical_help: "Statistical help",
        methodology_help: "Methodology",
        generating_presentation: "Generating Presentation",
        please_wait_presentation: "Please wait while we create your PowerPoint presentation...",
        // Phase Configuration
        phase_config_title: "Phase Configuration",
        phase_config_desc: "Customize the time ranges for each phase of the formalin test.",
        phase_1_label: "Phase 1 Start:",
        phase_1_end_label: "Phase 1 End / Phase 2a Start:",
        phase_2a_end_label: "Phase 2a End / Phase 2b Start:",
        phase_2b_end_label: "Phase 2b End:",
        minutes: "minutes",
        apply_config: "Apply Configuration",
        phase_i_desc: "Acute pain response caused by direct stimulation of nociceptors.",
        phase_2a_desc: "Early chronic pain response with inflammatory processes.",
        phase_2b_desc: "Late chronic pain response with central sensitization.",
        // Custom Phase Mode
        standard_mode: "Standard Mode (3 Phases)",
        custom_mode: "Custom Mode",
        custom_phase_desc: "Define your own phases with custom boundaries.",
        num_phases_label: "Number of Phases:",
        continue_btn: "Continue",
        back_btn: "Back",
        define_boundaries_desc: "Define the boundary for each consecutive phase."
    },
    zh: {
        app_title: "MediPlot AI",
        app_tagline: "先进的福尔马林测试分析，用于疼痛行为研究",
        nav_home: "首页",
        nav_select_experiment: "选择实验",
        welcome_title: "欢迎使用 MediPlot AI",
        welcome_subtitle: "选择实验类型开始您的分析",
        experiment_formalin_title: "福尔马林测试",
        experiment_formalin_desc: "福尔马林诱导疼痛行为的综合分析",
        experiment_default: "默认",
        btn_start_analysis: "开始福尔马林测试分析",
        footer_tagline: "先进的医学研究工具。",
        // Formalin test page translations
        formalin_description: "描述",
        formalin_description_content: "福尔马林测试是研究疼痛和镇痛的广泛使用的动物模型。它涉及向啮齿动物的后爪注射少量福尔马林（稀释甲醛），这会产生特征性的双相疼痛反应。",
        phase_i_title: "第一阶段（0-10分钟）",
        phase_i_desc: "由于直接化学刺激伤害感受器而产生的急性疼痛反应。",
        phase_ii_title: "第二阶段（11-60分钟）",
        phase_ii_desc: "涉及炎症过程和中枢敏化的慢性疼痛反应。",
        make_plots: "生成图表",
        upload_data: "上传数据文件",
        ai_analyze: "AI分析",
        make_ppt: "制作PPT",
        overview_title: "概述",
        test_phases_title: "测试阶段",
        // Plots panel
        upload_your_data_file: "上传数据文件",
        drag_drop_description: "将CSV或Excel文件拖放到此处，或点击浏览",
        browse_files: "浏览文件",
        group_names_optional: "组名（可选）",
        group_names_description: "为您的实验组输入自定义名称。留空则使用默认名称。",
        select_analysis_mode: "选择分析模式",
        mpe_analysis: "MPE分析",
        phase_comparison: "阶段对比",
        time_series_plot: "时间序列图",
        distribution_samples: "样本分布",
        generate_plots: "生成图表",
        help_button: "帮助",
        // AI Analysis panel
        ai_analysis_powered: "AI分析由Google Gemini提供支持",
        advanced_biomedical: "先进的福尔马林测试数据生物医学分析",
        ai_chatbot_title: "AI聊天机器人",
        interactive_conversation: "关于您数据的互动对话",
        start_chat: "开始聊天",
        ai_report_title: "AI报告",
        download_comprehensive: "下载综合分析报告",
        generate_report: "生成报告",
        // PPT panel
        ppt_intro: "为您的研究发现创建专业的PowerPoint演示文稿",
        choose_template: "选择模板",
        academic: "学术",
        professional_academic: "专业学术演示",
        corporate: "企业",
        business_focused: "商务导向演示",
        data_driven: "数据驱动",
        statistics_charts: "统计和图表导向",
        content_options: "内容选项",
        include_plots: "包含图表",
        statistical_analysis: "统计分析",
        ai_insights: "AI洞察",
        methodology: "方法论",
        customization: "自定义",
        lab_name: "实验室名称",
        enter_lab_name: "输入实验室名称",
        researcher_name: "研究人员姓名",
        enter_researcher_name: "输入研究人员姓名",
        experiment_date: "实验日期",
        // Group selection
        select_groups_to_display: "选择要显示的组",
        choose_groups_description: "选择要在图表中显示的组。取消选中组以隐藏其数据。",
        vehicle: "载体",
        sham: "假手术",
        select_all: "全选",
        deselect_all: "取消全选",
        // Dynamic button texts
        generate_mpe_analysis: "生成MPE分析",
        generate_phase_comparison: "生成阶段对比",
        generate_time_series_plot: "生成时间序列图",
        generate_distribution_plot: "生成分布图",
        // AI Analysis sections
        data_quality_assessment: "数据质量评估",
        automated_data_validation: "自动化数据验证和质量检查",
        statistical_analysis_title: "统计分析",
        advanced_statistical_analysis: "高级统计分析和显著性检验",
        biological_interpretation: "生物学解释",
        biological_significance: "生物学意义和机制洞察",
        summary_report: "总结报告",
        comprehensive_analysis_report: "包含建议的综合分析报告",
        // Chatbot
        ai_research_assistant: "AI研究助手",
        chatbot_welcome: "您好！我是您的AI研究助手。我可以帮助您分析福尔马林测试数据、解释统计概念、解释结果，并回答关于疼痛行为研究的问题。您想了解什么？",
        chat_placeholder: "询问我关于您的数据、统计或研究方法学...",
        ask_about_data: "询问我的数据",
        statistical_help: "统计帮助",
        methodology_help: "方法学",
        generating_presentation: "正在生成演示文稿",
        please_wait_presentation: "请稍候，我们正在为您创建PowerPoint演示文稿...",
        // Phase Configuration
        phase_config_title: "阶段配置",
        phase_config_desc: "自定义福尔马林测试每个阶段的时间范围。",
        phase_1_label: "阶段1 开始：",
        phase_1_end_label: "阶段1 结束 / 阶段2a 开始：",
        phase_2a_end_label: "阶段2a 结束 / 阶段2b 开始：",
        phase_2b_end_label: "阶段2b 结束：",
        minutes: "分钟",
        apply_config: "应用配置",
        phase_i_desc: "由伤害感受器直接刺激引起的急性疼痛反应。",
        phase_2a_desc: "早期慢性疼痛反应，涉及炎症过程。",
        phase_2b_desc: "晚期慢性疼痛反应，涉及中枢敏化。",
        // Custom Phase Mode
        standard_mode: "标准模式（3个阶段）",
        custom_mode: "自定义模式",
        custom_phase_desc: "使用自定义边界定义您自己的阶段。",
        num_phases_label: "阶段数量：",
        continue_btn: "继续",
        back_btn: "返回",
        define_boundaries_desc: "定义每个连续阶段的边界。"
    }
};

// Phase Configuration Variables
let phaseConfig = {
    phase1: { start: 0, end: 10 },
    phase2a: { start: 11, end: 40 },
    phase2b: { start: 41, end: 60 }
};

let customPhases = [];
let phaseMode = 'standard'; // 'standard' or 'custom'

// Switch Phase Mode
function switchPhaseMode(mode) {
    phaseMode = mode;
    const standardConfig = document.getElementById('standard-phase-config');
    const customConfig = document.getElementById('custom-phase-config');
    
    if (mode === 'standard') {
        standardConfig.style.display = 'block';
        customConfig.style.display = 'none';
    } else {
        standardConfig.style.display = 'none';
        customConfig.style.display = 'block';
        // Reset to step 1
        document.getElementById('custom-phase-step1').style.display = 'block';
        document.getElementById('custom-phase-step2').style.display = 'none';
    }
}

// Proceed to Step 2: Define Phase Boundaries
function proceedToCustomPhaseStep2() {
    const numPhases = parseInt(document.getElementById('num-phases').value) || 3;
    
    if (numPhases < 2 || numPhases > 10) {
        alert('Please enter a number between 2 and 10.');
        return;
    }
    
    // Initialize custom phases
    customPhases = [];
    const interval = 60 / numPhases;
    for (let i = 0; i < numPhases; i++) {
        customPhases.push({
            phaseNum: i + 1,
            start: Math.round(i * interval),
            end: Math.round((i + 1) * interval)
        });
    }
    customPhases[customPhases.length - 1].end = 60; // Ensure last phase ends at 60
    
    // Show step 2 and hide step 1
    document.getElementById('custom-phase-step1').style.display = 'none';
    document.getElementById('custom-phase-step2').style.display = 'block';
    
    // Generate boundary input fields
    generateCustomPhaseBoundaries();
}

// Back to Step 1
function backToCustomPhaseStep1() {
    document.getElementById('custom-phase-step2').style.display = 'none';
    document.getElementById('custom-phase-step1').style.display = 'block';
}

// Generate Custom Phase Boundaries
function generateCustomPhaseBoundaries() {
    const boundariesContainer = document.getElementById('custom-phase-boundaries');
    
    let html = '<div class="custom-phase-grid">';
    
    // Generate input for each consecutive phase boundary
    for (let i = 0; i < customPhases.length - 1; i++) {
        html += `
            <div class="phase-config-item">
                <label>Phase ${i + 1} End / Phase ${i + 2} Start:</label>
                <input type="number" id="custom-phase-${i}-boundary" 
                       value="${customPhases[i].end}" min="0" max="60" 
                       class="phase-input" 
                       onchange="updateCustomPhaseBoundary(${i})">
                <span>minutes</span>
            </div>
        `;
    }
    
    html += '</div>';
    
    boundariesContainer.innerHTML = html;
}

// Update Custom Phase Boundary
function updateCustomPhaseBoundary(index) {
    const value = parseInt(document.getElementById(`custom-phase-${index}-boundary`).value);
    
    if (value < 0 || value > 60) {
        alert('Boundary value must be between 0 and 60.');
        return;
    }
    
    // Update the boundary for this phase and the next phase
    customPhases[index].end = value;
    if (index < customPhases.length - 1) {
        customPhases[index + 1].start = value;
    }
}

// Apply Custom Phase Configuration
function applyCustomPhaseConfig() {
    // Validate custom phases
    for (let i = 0; i < customPhases.length - 1; i++) {
        if (customPhases[i].end > customPhases[i + 1].start) {
            alert('Invalid phase configuration. Please ensure phases do not overlap and are in correct order.');
            return;
        }
    }
    
    // Convert custom phases to standard format for compatibility
    if (customPhases.length >= 3) {
        phaseConfig.phase1 = { start: customPhases[0].start, end: customPhases[0].end };
        phaseConfig.phase2a = { start: customPhases[1].start, end: customPhases[1].end };
        phaseConfig.phase2b = { start: customPhases[2].start, end: customPhases[2].end };
    }
    
    // Update display
    updatePhaseDisplay();
    
    // Show success message
    showNotification('Phase configuration updated successfully!', 'success');
}

// Sync Phase Boundaries
function syncPhaseBoundaries() {
    const phase1Start = parseInt(document.getElementById('phase1-start').value);
    const phase1End = parseInt(document.getElementById('phase1-end').value);
    const phase2aEnd = parseInt(document.getElementById('phase2a-end').value);
    const phase2bEnd = parseInt(document.getElementById('phase2b-end').value);
    
    // Validate inputs
    if (phase1Start >= phase1End || phase1End >= phase2aEnd || phase2aEnd >= phase2bEnd) {
        return; // Invalid configuration, don't sync
    }
}

// Apply Phase Configuration
function applyPhaseConfig() {
    if (phaseMode === 'standard') {
        // Standard mode
        const phase1Start = parseInt(document.getElementById('phase1-start').value);
        const phase1End = parseInt(document.getElementById('phase1-end').value);
        const phase2aEnd = parseInt(document.getElementById('phase2a-end').value);
        const phase2bEnd = parseInt(document.getElementById('phase2b-end').value);
        
        // Validate inputs
        if (phase1Start >= phase1End || phase1End >= phase2aEnd || phase2aEnd >= phase2bEnd) {
            alert('Invalid phase configuration. Please ensure phases do not overlap and are in correct order.');
            return;
        }
        
        // Update configuration (boundaries are shared)
        phaseConfig.phase1 = { start: phase1Start, end: phase1End };
        phaseConfig.phase2a = { start: phase1End, end: phase2aEnd };
        phaseConfig.phase2b = { start: phase2aEnd, end: phase2bEnd };
    } else {
        // Custom mode
        // Validate custom phases
        for (let i = 0; i < customPhases.length - 1; i++) {
            if (customPhases[i].end > customPhases[i + 1].start) {
                alert('Invalid phase configuration. Please ensure phases do not overlap and are in correct order.');
                return;
            }
        }
        
        // Convert custom phases to standard format for compatibility
        if (customPhases.length >= 3) {
            phaseConfig.phase1 = { start: customPhases[0].start, end: customPhases[0].end };
            phaseConfig.phase2a = { start: customPhases[1].start, end: customPhases[1].end };
            phaseConfig.phase2b = { start: customPhases[2].start, end: customPhases[2].end };
        }
    }
    
    // Update display
    updatePhaseDisplay();
    
    // Show success message
    showNotification('Phase configuration updated successfully!', 'success');
}

// Update Phase Display
function updatePhaseDisplay() {
    const phase1Title = document.getElementById('phase1-title');
    const phase1Duration = document.getElementById('phase1-duration');
    const phase2aTitle = document.getElementById('phase2a-title');
    const phase2aDuration = document.getElementById('phase2a-duration');
    const phase2bTitle = document.getElementById('phase2b-title');
    const phase2bDuration = document.getElementById('phase2b-duration');
    
    if (currentLanguage === 'zh') {
        phase1Title.textContent = `测试阶段1 (${phaseConfig.phase1.start}-${phaseConfig.phase1.end}分钟)`;
        phase1Duration.textContent = `${phaseConfig.phase1.start}-${phaseConfig.phase1.end} 分钟`;
        phase2aTitle.textContent = `测试阶段2a (${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end}分钟)`;
        phase2aDuration.textContent = `${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} 分钟`;
        phase2bTitle.textContent = `测试阶段2b (${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end}分钟)`;
        phase2bDuration.textContent = `${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} 分钟`;
    } else {
        phase1Title.textContent = `Phase 1 (${phaseConfig.phase1.start}-${phaseConfig.phase1.end} minutes)`;
        phase1Duration.textContent = `${phaseConfig.phase1.start}-${phaseConfig.phase1.end} min`;
        phase2aTitle.textContent = `Phase 2a (${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} minutes)`;
        phase2aDuration.textContent = `${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} min`;
        phase2bTitle.textContent = `Phase 2b (${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} minutes)`;
        phase2bDuration.textContent = `${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} min`;
    }
}

// Language switching functions
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Translate all elements with data-translate-placeholder attribute
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Update page title if needed
    if (lang === 'zh') {
        document.title = '福尔马林测试分析 - MediPlot AI';
    } else {
        document.title = 'Formalin Test Analysis - MediPlot AI';
    }
    
    // Update phase display
    updatePhaseDisplay();
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && translations[savedLang]) {
        switchLanguage(savedLang);
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadLanguagePreference();
});

// Initialize Application
function initializeApp() {
    // Check if we're on the formalin test page
    if (window.location.pathname.includes('formalin-test.html')) {
        initializeFormalinPage();
    } else {
        initializeHomePage();
    }
}

// Initialize Home Page
function initializeHomePage() {
    const experimentCards = document.querySelectorAll('.experiment-card');
    
    experimentCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            experimentCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update start button text
            const experimentName = this.querySelector('h3').textContent;
            const startBtn = document.querySelector('.start-btn');
            startBtn.innerHTML = `<i class="fas fa-play"></i> Start ${experimentName} Analysis`;
        });
    });
}

// Initialize Formalin Test Page
function initializeFormalinPage() {
    setupFunctionNavigation();
    setupFileUpload();
    setupEventListeners();
    setupGroupNames();
}

// Setup Function Navigation
function setupFunctionNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const panels = document.querySelectorAll('.function-panel');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const functionName = this.getAttribute('data-function');
            switchFunction(functionName);
        });
    });
}

// Switch Function Panel
function switchFunction(functionName) {
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-function="${functionName}"]`).classList.add('active');
    
    // Update panels
    const panels = document.querySelectorAll('.function-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(`${functionName}-panel`).classList.add('active');
    
    currentFunction = functionName;
    
    // Translate visible content when panels are switched
    translateVisibleContent();
}

// Translate visible content when panels are switched
function translateVisibleContent() {
    // Update generate button text for current mode
    updateGenerateButtonText(currentMode);
    
    // Update group selection if visible
    const groupSelectionSection = document.getElementById('group-selection-section');
    if (groupSelectionSection && groupSelectionSection.style.display !== 'none') {
        setupGroupSelection();
    }
}

// Setup File Upload
function setupFileUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    if (!uploadArea || !fileInput) return;
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Click to upload
    uploadArea.addEventListener('click', () => fileInput.click());
}

// Handle Drag Over
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
}

// Handle Drag Leave
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
}

// Handle Drop
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// Handle File Select
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// Process Selected File
function processFile(file) {
    // Validate file type
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
        alert('Please select a CSV or Excel file (.csv, .xlsx, .xls)');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }
    
    selectedFile = file;
    displayFileInfo(file);
}

// Display File Information
function displayFileInfo(file) {
    const uploadArea = document.getElementById('upload-area');
    const fileInfo = document.getElementById('file-info');
    const fileName = fileInfo.querySelector('.file-name');
    const fileSize = fileInfo.querySelector('.file-size');
    
    uploadArea.style.display = 'none';
    fileInfo.style.display = 'flex';
    
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
}

// Remove File
function removeFile() {
    selectedFile = null;
    
    const uploadArea = document.getElementById('upload-area');
    const fileInfo = document.getElementById('file-info');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.style.display = 'block';
    fileInfo.style.display = 'none';
    fileInput.value = '';
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Setup Event Listeners
function setupEventListeners() {
    // Add any additional event listeners here
    setupTemplateSelection();
}

// Setup Group Names - Initially hidden until file is processed
function setupGroupNames() {
    const groupNamesSection = document.querySelector('.group-names-section');
    if (groupNamesSection) {
        groupNamesSection.style.display = 'none';
    }
}

// Create Group Name Inputs based on detected groups
function createGroupNameInputs() {
    const groupNamesGrid = document.getElementById('group-names-grid');
    const groupNamesSection = document.querySelector('.group-names-section');
    
    if (!groupNamesGrid || !groupNamesSection) return;
    
    const sanitizeId = (name) => {
        return `group-${normalizeGroupLabel(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'unnamed'}`;
    };
    
    // Clear existing inputs
    groupNamesGrid.innerHTML = '';
    
    // Get detected group names from processed data
    const detectedGroups = Object.keys(groupData).sort();
    
    if (detectedGroups.length === 0) {
        groupNamesSection.style.display = 'none';
        return;
    }
    
    // Show the section
    groupNamesSection.style.display = 'block';
    
    // Create input for each detected group
    detectedGroups.forEach(groupName => {
        const inputId = sanitizeId(groupName);
        const groupField = document.createElement('div');
        groupField.className = 'group-name-field';
        groupField.innerHTML = `
            <label for="${inputId}">${groupName} Name</label>
            <input type="text" id="${inputId}" data-group-key="${groupName}" placeholder="Enter custom name for ${groupName} (optional)" onchange="updateGroupNames()">
        `;
        groupNamesGrid.appendChild(groupField);
    });
    
    // Also create inputs for Vehicle and Sham groups
    const vehicleField = document.createElement('div');
    vehicleField.className = 'group-name-field';
    vehicleField.innerHTML = `
        <label for="vehicle-name">Vehicle Group Name</label>
        <input type="text" id="vehicle-name" placeholder="Enter custom name for Vehicle group (optional)" onchange="updateGroupNames()">
    `;
    groupNamesGrid.appendChild(vehicleField);
    
    const shamField = document.createElement('div');
    shamField.className = 'group-name-field';
    shamField.innerHTML = `
        <label for="sham-name">Sham Group Name</label>
        <input type="text" id="sham-name" placeholder="Enter custom name for Sham group (optional)" onchange="updateGroupNames()">
    `;
    groupNamesGrid.appendChild(shamField);
}

// Update Group Names
function updateGroupNames() {
    customGroupNames = {};
    
    // Update experimental groups
    const groupInputs = document.querySelectorAll('input[data-group-key]');
    groupInputs.forEach(input => {
        const groupKey = input.getAttribute('data-group-key');
        if (!groupKey) return;
        if (input.value && input.value.trim()) {
            customGroupNames[groupKey] = input.value.trim();
        }
    });
    
    // Update Vehicle group
    const vehicleInput = document.getElementById('vehicle-name');
    if (vehicleInput && vehicleInput.value.trim()) {
        customGroupNames['Vehicle'] = vehicleInput.value.trim();
    }
    
    // Update Sham group
    const shamInput = document.getElementById('sham-name');
    if (shamInput && shamInput.value.trim()) {
        customGroupNames['Sham'] = shamInput.value.trim();
    }
}

// Get Display Name for Group
function getDisplayName(groupName) {
    return customGroupNames[groupName] || groupName;
}

// Setup Template Selection
function setupTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            templateCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            this.classList.add('selected');
        });
    });
}

// Start Experiment (Home Page)
function startExperiment() {
    const activeCard = document.querySelector('.experiment-card.active');
    const experimentType = activeCard.getAttribute('data-experiment');
    
    if (experimentType === 'formalin') {
        window.location.href = 'formalin-test.html';
    } else {
        alert('This experiment type is coming soon!');
    }
}

// Select Analysis Mode
function selectMode(mode) {
    currentMode = mode;
    
    // Update button states
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide group selection section for time series and distribution
    const groupSelectionSection = document.getElementById('group-selection-section');
    if (mode === 'time-series' || mode === 'distribution') {
        groupSelectionSection.style.display = 'block';
        setupGroupSelection();
    } else {
        groupSelectionSection.style.display = 'none';
    }
    
    // Update generate button text
    updateGenerateButtonText(mode);
    
    // Auto-generate plots/tables if data has been processed
    if (processedData || (vehicleGroup.length > 0 || Object.keys(groupData).length > 0)) {
        generateModeContent(mode);
    }
}

// Update Generate Button Text
function updateGenerateButtonText(mode) {
    const generateBtn = document.getElementById('generate-plots');
    if (!generateBtn) return;
    
    const modeNames = {
        'mpe': translations[currentLanguage].generate_mpe_analysis,
        'phase-comparison': translations[currentLanguage].generate_phase_comparison,
        'time-series': translations[currentLanguage].generate_time_series_plot,
        'distribution': translations[currentLanguage].generate_distribution_plot
    };
    generateBtn.innerHTML = `<i class="fas fa-chart-bar"></i> ${modeNames[mode]}`;
}

// Generate content for specific mode
function generateModeContent(mode) {
    // Clear existing plots
    const plotsContainer = document.getElementById('plots-container');
    plotsContainer.innerHTML = '<h4>Generated Analysis</h4>';
    
    // Generate based on selected mode
    switch(mode) {
        case 'mpe':
            generateMPEPlot();
            generateDataTables();
            break;
        case 'phase-comparison':
            generatePhaseComparisonTable();
            // Only generate Phase IIa and IIb tables in standard mode
            if (phaseMode === 'standard') {
                generatePhaseIIaTable();
                generatePhaseIIbTable();
            }
            break;
        case 'time-series':
            generateTimeSeriesPlotFiltered();
            break;
        case 'distribution':
            generateDistributionPlot();
            break;
    }
    
    // Show plots container
    plotsContainer.style.display = 'block';
}

// Generate Plots
async function generatePlots() {
    if (!selectedFile) {
        alert('Please upload a data file first.');
        return;
    }
    
    // Show loading state
    const generateBtn = document.getElementById('generate-plots');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Data...';
    generateBtn.disabled = true;
    
    try {
        // Process the uploaded file
        await processFormalinData(selectedFile);
        
        // Generate content for current mode
        generateModeContent(currentMode);
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        
        // Scroll to plots
        const plotsContainer = document.getElementById('plots-container');
        plotsContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        showNotification('Analysis generated successfully!', 'success');
        
    } catch (error) {
        console.error('Plot generation error:', error);
        showNotification('Error processing data: ' + error.message, 'error');
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }
}

// Global variables for chatbot
let chatHistory = [];
let isTyping = false;

// Chatbot drag and zoom variables
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialX = 0;
let initialY = 0;
let currentZoom = 1;
let isModalCentered = true;

// Group selection variables
let selectedGroupsForPlot = new Set();
let allGroups = new Set();

function ensureAllGroupsSelected() {
    selectedGroupsForPlot.clear();
    const combinedGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    Object.keys(combinedGroups).forEach(groupName => {
        const groupMice = combinedGroups[groupName];
        if (Array.isArray(groupMice) && groupMice.length > 0) {
            selectedGroupsForPlot.add(groupName);
        }
    });

    const checkboxes = document.querySelectorAll('#group-selection-grid input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const groupName = checkbox.getAttribute('data-group-name') || checkbox.dataset.groupName || checkbox.id.replace('select-', '');
        checkbox.checked = selectedGroupsForPlot.has(groupName);
    });
}

// Open Chatbot Modal
function openChatbot() {
    if (!selectedFile) {
        alert('Please upload a data file first.');
        return;
    }
    
    const chatbotModal = document.getElementById('chatbot-modal');
    const chatbotContent = document.getElementById('chatbot-content');
    const chatbotHeader = document.getElementById('chatbot-header');
    
    chatbotModal.classList.add('show');
    
    // Reset zoom and position
    currentZoom = 1;
    isModalCentered = true;
    chatbotContent.style.transform = 'scale(1)';
    chatbotContent.style.position = 'relative';
    chatbotContent.style.left = 'auto';
    chatbotContent.style.top = 'auto';
    chatbotContent.style.margin = 'auto';
    
    // Set up drag functionality
    setupChatbotDrag();
    
    // Clear previous chat if any
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message ai-message">
            <div class="message-content">
                <i class="fas fa-robot"></i>
                <p>Hello! I'm your AI research assistant. I can help you analyze your formalin test data, explain statistical concepts, interpret results, and answer questions about pain behavior research. What would you like to know?</p>
            </div>
        </div>
    `;
    
    // Reset chat history
    chatHistory = [];
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('chat-input').focus();
    }, 100);
}

// Close Chatbot Modal
function closeChatbot() {
    const chatbotModal = document.getElementById('chatbot-modal');
    chatbotModal.classList.remove('show');
}

// Setup Chatbot Drag Functionality
function setupChatbotDrag() {
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotContent = document.getElementById('chatbot-content');
    
    // Remove existing event listeners
    chatbotHeader.removeEventListener('mousedown', startDrag);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    
    // Add drag event listeners
    chatbotHeader.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}

// Start dragging
function startDrag(e) {
    // Don't drag if clicking on buttons
    if (e.target.closest('button')) return;
    
    isDragging = true;
    const chatbotContent = document.getElementById('chatbot-content');
    
    // Get initial positions
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    // Get current position
    const rect = chatbotContent.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    // Change positioning from centered to absolute
    if (isModalCentered) {
        chatbotContent.style.position = 'fixed';
        chatbotContent.style.left = initialX + 'px';
        chatbotContent.style.top = initialY + 'px';
        chatbotContent.style.margin = '0';
        isModalCentered = false;
    }
    
    chatbotContent.classList.add('dragging');
    e.preventDefault();
}

// Handle dragging
function drag(e) {
    if (!isDragging) return;
    
    const chatbotContent = document.getElementById('chatbot-content');
    
    // Calculate new position
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;
    
    // Keep modal within viewport bounds
    const rect = chatbotContent.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const boundedX = Math.max(0, Math.min(newX, viewportWidth - rect.width));
    const boundedY = Math.max(0, Math.min(newY, viewportHeight - rect.height));
    
    chatbotContent.style.left = boundedX + 'px';
    chatbotContent.style.top = boundedY + 'px';
}

// End dragging
function endDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    const chatbotContent = document.getElementById('chatbot-content');
    chatbotContent.classList.remove('dragging');
}

// Zoom Chatbot
function zoomChatbot(direction) {
    const chatbotContent = document.getElementById('chatbot-content');
    
    const zoomStep = 0.1;
    const minZoom = 0.5;
    const maxZoom = 2.0;
    
    if (direction === 'in') {
        currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
    } else if (direction === 'out') {
        currentZoom = Math.max(currentZoom - zoomStep, minZoom);
    }
    
    // Apply zoom while maintaining fixed dimensions
    chatbotContent.style.transform = `scale(${currentZoom})`;
    chatbotContent.style.transformOrigin = 'center center';
    chatbotContent.classList.add('zoomed');
    
    // Ensure the modal maintains its base size
    chatbotContent.style.width = '90%';
    chatbotContent.style.maxWidth = '800px';
    chatbotContent.style.height = '600px';
    
    // Adjust position if needed to keep modal visible
    if (!isModalCentered) {
        adjustPositionAfterZoom();
    }
}

// Reset Chatbot Size
function resetChatbotSize() {
    const chatbotContent = document.getElementById('chatbot-content');
    
    currentZoom = 1;
    chatbotContent.style.transform = 'scale(1)';
    chatbotContent.style.transformOrigin = 'center center';
    chatbotContent.classList.remove('zoomed');
    
    // Maintain fixed dimensions
    chatbotContent.style.width = '90%';
    chatbotContent.style.maxWidth = '800px';
    chatbotContent.style.height = '600px';
    
    // Reset to centered position
    chatbotContent.style.position = 'relative';
    chatbotContent.style.left = 'auto';
    chatbotContent.style.top = 'auto';
    chatbotContent.style.margin = 'auto';
    isModalCentered = true;
}

// Adjust position after zoom to keep modal in view
function adjustPositionAfterZoom() {
    const chatbotContent = document.getElementById('chatbot-content');
    const rect = chatbotContent.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let newX = parseInt(chatbotContent.style.left);
    let newY = parseInt(chatbotContent.style.top);
    
    // Adjust if modal goes outside viewport
    if (rect.right > viewportWidth) {
        newX = viewportWidth - rect.width;
    }
    if (rect.bottom > viewportHeight) {
        newY = viewportHeight - rect.height;
    }
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    
    chatbotContent.style.left = newX + 'px';
    chatbotContent.style.top = newY + 'px';
}

// Handle Enter key in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Send Chat Message
async function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Prepare context for AI
        const contextData = prepareChatContext();
        
        // Call AI with chat context
        const aiResponse = await callChatbotAI(message, contextData);
        
        // Remove typing indicator and add AI response
        removeTypingIndicator();
        addMessageToChat(aiResponse, 'ai');
        
        // Update chat history
        chatHistory.push({ role: 'user', content: message });
        chatHistory.push({ role: 'assistant', content: aiResponse });
        
    } catch (error) {
        console.error('Chatbot error:', error);
        removeTypingIndicator();
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'ai');
    }
}

// Add message to chat
function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const icon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="${icon}"></i>
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-robot"></i>
            <div class="typing-indicator">
                <span>AI is typing</span>
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    isTyping = true;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Prepare chat context
function prepareChatContext() {
    if (Object.keys(groupData).length === 0) {
        return {
            hasData: false,
            fileName: selectedFile ? selectedFile.name : 'No file uploaded'
        };
    }
    
    const mpeData = calculateMPEValues();
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    
    return {
        hasData: true,
        fileName: selectedFile.name,
        totalMice: Object.values(allGroups).reduce((sum, group) => sum + group.length, 0),
        groupNames: Object.keys(allGroups).map(name => getDisplayName(name)),
        vehicleAverage: mpeData.vehicleAverage.toFixed(1),
        shamAverage: mpeData.shamAverage.toFixed(1),
        mpeResults: Object.keys(mpeData.groupMPEs).reduce((acc, group) => {
            acc[getDisplayName(group)] = {
                mpe: mpeData.groupMPEs[group].groupMPE.toFixed(3),
                stdDev: mpeData.groupMPEs[group].stdDev.toFixed(3),
                n: mpeData.groupMPEs[group].mouseMPEs.length
            };
            return acc;
        }, {})
    };
}

// Call Chatbot AI
async function callChatbotAI(userMessage, contextData) {
    const apiKey = 'AIzaSyBkw6dqrouC-Jl8Xe3QiyP83lOQTPdWYmQ';
    
    // Build context-aware prompt
    let contextPrompt = '';
    if (contextData.hasData) {
        contextPrompt = `
CONTEXT - User's Formal Test Data:
- File: ${contextData.fileName}
- Total Mice: ${contextData.totalMice}
- Groups: ${contextData.groupNames.join(', ')}
- Vehicle Average: ${contextData.vehicleAverage} jumps
- Sham Average: ${contextData.shamAverage} jumps

MPE Results:
${Object.entries(contextData.mpeResults).map(([group, data]) => 
    `- ${group}: MPE = ${data.mpe} ± ${data.stdDev} (n=${data.n})`
).join('\n')}

`;
    } else {
        contextPrompt = `
CONTEXT - No data uploaded yet. The user has uploaded file: ${contextData.fileName} but data hasn't been processed yet.
`;
    }
    
    const prompt = `${contextPrompt}
You are an expert biomedical research assistant specializing in pain behavior studies and formalin tests. The user is asking: "${userMessage}"

Please provide a helpful, accurate, and conversational response. If they're asking about their data, reference the specific values provided in the context. If they're asking general questions about formalin tests, statistics, or pain research, provide expert guidance.

Keep responses concise but informative (2-3 paragraphs max). Be encouraging and supportive of their research.
`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 32,
                    topP: 1,
                    maxOutputTokens: 512,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from AI API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Chatbot API error:', error);
        throw error;
    }
}

// Quick action buttons
function askAboutData() {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = 'Can you analyze my formalin test data and explain what the results mean?';
    sendChatMessage();
}

function askAboutStatistics() {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = 'Can you explain the MPE calculation and what the values mean for my study?';
    sendChatMessage();
}

function askAboutMethodology() {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = 'Can you explain the formalin test methodology and the different phases of pain response?';
    sendChatMessage();
}

// Generate AI Report (Download)
async function generateAIReport() {
    const apiKey = 'AIzaSyBkw6dqrouC-Jl8Xe3QiyP83lOQTPdWYmQ';
    
    if (!selectedFile) {
        alert('Please upload a data file first.');
        return;
    }
    
    // Show loading state
    const reportBtn = document.querySelector('.report-btn');
    const originalText = reportBtn.innerHTML;
    reportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    reportBtn.disabled = true;
    
    try {
        // Process the data first if not already done
        if (Object.keys(groupData).length === 0) {
            await processFormalinData(selectedFile);
        }
        
        // Prepare analysis data
        const analysisData = prepareAnalysisData();
        
        // Call Gemini AI API for comprehensive report
        const reportContent = await callGeminiAI(apiKey, analysisData);
        
        // Generate downloadable report
        generateDownloadableReport(reportContent, analysisData);
        
        showNotification('AI Report generated successfully!', 'success');
        
    } catch (error) {
        console.error('Report generation error:', error);
        showNotification('Report generation failed: ' + error.message, 'error');
    } finally {
        // Reset button
        reportBtn.innerHTML = originalText;
        reportBtn.disabled = false;
    }
}

// Generate downloadable report
function generateDownloadableReport(aiContent, analysisData) {
    const timestamp = new Date().toLocaleString();
    const reportContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Analysis Report - ${analysisData.fileName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .report-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .report-header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #667eea; }
        .report-header h1 { color: #2c3e50; margin-bottom: 10px; }
        .report-header p { color: #666; margin: 5px 0; }
        .report-content { line-height: 1.8; color: #333; }
        .report-content h2 { color: #667eea; margin-top: 30px; margin-bottom: 15px; }
        .report-content h3 { color: #2c3e50; margin-top: 25px; margin-bottom: 10px; }
        .report-content p { margin-bottom: 15px; }
        .report-content ul { margin-bottom: 20px; }
        .report-content li { margin-bottom: 8px; }
        .data-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
        @media print { body { background: white; } .report-container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1>AI Analysis Report</h1>
            <h2>Formalin Test Data Analysis</h2>
            <p><strong>File:</strong> ${analysisData.fileName}</p>
            <p><strong>Generated:</strong> ${timestamp}</p>
            <p><strong>Analysis Engine:</strong> Google Gemini AI</p>
        </div>
        
        <div class="data-summary">
            <h3>Experimental Summary</h3>
            <p><strong>Total Mice:</strong> ${analysisData.totalMice}</p>
            <p><strong>Groups:</strong> ${analysisData.groupNames.join(', ')}</p>
            <p><strong>Vehicle Control:</strong> ${analysisData.vehicleAverage} jumps (60 min)</p>
            <p><strong>Sham Control:</strong> ${analysisData.shamAverage} jumps (60 min)</p>
        </div>
        
        <div class="report-content">
            ${aiContent.replace(/\n/g, '<br>')}
        </div>
        
        <div class="footer">
            <p>This report was generated using MediPlot AI - Advanced Medical Research Tools</p>
            <p>Powered by Google Gemini AI for comprehensive biomedical analysis</p>
        </div>
    </div>
</body>
</html>
    `;
    
    // Download the report
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Analysis_Report_${analysisData.fileName.replace(/\.[^/.]+$/, '')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Prepare analysis data for AI
function prepareAnalysisData() {
    const mpeData = calculateMPEValues();
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    
    // Calculate phase data
    const phaseData = {};
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const phaseI = groupMice.reduce((sum, mouse) => sum + mouse.phaseI, 0) / groupMice.length;
        const phaseII = groupMice.reduce((sum, mouse) => sum + mouse.phaseII, 0) / groupMice.length;
        const phaseIIa = groupMice.reduce((sum, mouse) => sum + mouse.phaseIIa, 0) / groupMice.length;
        const phaseIIb = groupMice.reduce((sum, mouse) => sum + mouse.phaseIIb, 0) / groupMice.length;
        
        phaseData[getDisplayName(groupName)] = {
            phaseI: phaseI.toFixed(1),
            phaseII: phaseII.toFixed(1),
            phaseIIa: phaseIIa.toFixed(1),
            phaseIIb: phaseIIb.toFixed(1),
            totalJumps: groupMice.reduce((sum, mouse) => sum + mouse.totalJumps, 0) / groupMice.length
        };
    });
    
    return {
        fileName: selectedFile.name,
        groupNames: Object.keys(allGroups).map(name => getDisplayName(name)),
        vehicleAverage: mpeData.vehicleAverage.toFixed(1),
        shamAverage: mpeData.shamAverage.toFixed(1),
        mpeResults: Object.keys(mpeData.groupMPEs).reduce((acc, group) => {
            acc[getDisplayName(group)] = {
                mpe: mpeData.groupMPEs[group].groupMPE.toFixed(3),
                stdDev: mpeData.groupMPEs[group].stdDev.toFixed(3),
                n: mpeData.groupMPEs[group].mouseMPEs.length
            };
            return acc;
        }, {}),
        phaseData: phaseData,
        totalMice: Object.values(allGroups).reduce((sum, group) => sum + group.length, 0)
    };
}

// Read File Content
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        if (file.type === 'text/csv') {
            reader.readAsText(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });
}

// Call Gemini AI API (Free Tier)
async function callGeminiAI(apiKey, analysisData) {
    const prompt = `
You are a biomedical research analyst specializing in pain behavior studies. Analyze the following formalin test data and provide a comprehensive scientific report.

**EXPERIMENTAL DATA:**
File: ${analysisData.fileName}
Total Mice: ${analysisData.totalMice}
Groups: ${analysisData.groupNames.join(', ')}

**CONTROL GROUP AVERAGES:**
- Vehicle Group: ${analysisData.vehicleAverage} jumps (60 min)
- Sham Group: ${analysisData.shamAverage} jumps (60 min)

**MPE (Maximum Possible Effect) ANALYSIS:**
${Object.entries(analysisData.mpeResults).map(([group, data]) => 
    `- ${group}: MPE = ${data.mpe} ± ${data.stdDev} (n=${data.n})`
).join('\n')}

**PHASE ANALYSIS:**
${Object.entries(analysisData.phaseData).map(([group, data]) => 
    `- ${group}: Phase I (0-10min) = ${data.phaseI}, Phase II (11-60min) = ${data.phaseII}, Phase IIa (11-40min) = ${data.phaseIIa}, Phase IIb (41-60min) = ${data.phaseIIb}`
).join('\n')}

Please provide a comprehensive analysis including:

1. **DATA QUALITY ASSESSMENT**
   - Sample size adequacy
   - Data completeness and reliability
   - Statistical power considerations

2. **STATISTICAL ANALYSIS SUMMARY**
   - MPE interpretation and significance
   - Phase comparison analysis
   - Effect size calculations
   - Variability assessment

3. **BIOLOGICAL INTERPRETATION**
   - Pain response mechanisms
   - Phase-specific effects
   - Treatment efficacy assessment
   - Clinical relevance

4. **KEY FINDINGS & RECOMMENDATIONS**
   - Primary conclusions
   - Statistical significance
   - Future research directions
   - Clinical implications

Format the response in clear sections with scientific rigor appropriate for peer-reviewed research.
    `;
    
    try {
        // Using free tier Gemini API endpoint
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 32,
                    topP: 1,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from AI API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

// Display Analysis Results
function displayAnalysisResults(result) {
    const resultsContent = document.querySelector('.results-content');
    
    // Remove loading spinner
    const loadingSpinner = resultsContent.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
    
    // Create results display
    const resultsDisplay = document.createElement('div');
    resultsDisplay.className = 'analysis-text';
    resultsDisplay.innerHTML = `
        <div class="analysis-content">
            <pre>${result}</pre>
        </div>
    `;
    
    resultsContent.appendChild(resultsDisplay);
}

// Generate PowerPoint
async function generatePPT() {
    const labName = document.getElementById('lab-name').value.trim() || 'Research Laboratory';
    const researcherName = document.getElementById('researcher-name').value.trim() || 'Researcher';
    const experimentDate = document.getElementById('experiment-date').value || new Date().toISOString().split('T')[0];
    
    if (!selectedFile) {
        alert('Please upload a data file first.');
        return;
    }
    
    // Check if data has been processed
    if (Object.keys(groupData).length === 0) {
        alert('Please generate plots first to include data in the presentation.');
        return;
    }
    
    // Show status panel
    const pptStatus = document.getElementById('ppt-status');
    pptStatus.style.display = 'block';
    
    try {
        // Prepare presentation data
        const presentationData = await preparePresentationData(labName, researcherName, experimentDate);
        const plotImages = await capturePlotSnapshots();
        
        // Generate PowerPoint content
        const pptContent = generatePowerPointContent(presentationData, plotImages);
        
        // Create and download the presentation
        downloadPresentation(pptContent, `Formalin_Test_Analysis_${experimentDate.replace(/-/g, '_')}.html`);
        
        // Hide status panel
        pptStatus.style.display = 'none';
        
        // Show success message
        showNotification('PowerPoint presentation generated successfully!', 'success');
        
    } catch (error) {
        console.error('PPT generation error:', error);
        showNotification('PPT generation failed: ' + error.message, 'error');
        pptStatus.style.display = 'none';
    }
}

async function capturePlotSnapshots() {
    const plotsContainer = document.getElementById('plots-container');
    if (!plotsContainer) {
        return [];
    }

    const snapshots = [];
    const originalMode = currentMode;
    const originalVisibility = plotsContainer.style.visibility;
    const originalScroll = window.scrollY;

    const plotConfigs = [
        {
            mode: 'mpe',
            canvasId: 'mpe-plot',
            title: 'MPE (Maximum Possible Effect) Bar Plot',
            description: 'Maximum Possible Effect comparison across all experimental groups.'
        },
        {
            mode: 'time-series',
            canvasId: 'time-series-plot',
            title: 'Time Series Analysis (Selected Groups)',
            description: 'Average jumps per minute for selected groups over the 60-minute observation period.'
        },
        {
            mode: 'distribution',
            canvasId: 'distribution-plot',
            title: 'Distribution of Samples',
            description: 'Individual mouse total jumps with mean and variability visualization.'
        }
    ];

    plotsContainer.style.visibility = 'hidden';

    for (const config of plotConfigs) {
        selectMode(config.mode);
        if (config.mode === 'time-series' || config.mode === 'distribution') {
            ensureAllGroupsSelected();
        }
        generateModeContent(config.mode);

        // Wait for canvas to be drawn, especially for MPE plot which uses setTimeout
        if (config.mode === 'mpe') {
            // For MPE plot, wait for canvas to exist and be drawn
            let canvas = document.getElementById(config.canvasId);
            let attempts = 0;
            while ((!canvas || !canvas.getContext) && attempts < 10) {
                await new Promise(resolve => setTimeout(resolve, 50));
                canvas = document.getElementById(config.canvasId);
                attempts++;
            }
            // Wait for the MPE plot to be drawn (it uses setTimeout with 100ms delay)
            await new Promise(resolve => setTimeout(resolve, 200));
        } else {
            // Small delay for other plots to ensure they're rendered
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        const canvas = document.getElementById(config.canvasId);
        if (canvas && typeof canvas.toDataURL === 'function') {
            try {
                // For MPE plot, ensure it's drawn by calling drawMPEPlot directly if needed
                if (config.mode === 'mpe') {
                    const mpeData = calculateMPEValues();
                    drawMPEPlot(mpeData);
                    // Wait a bit more to ensure drawing is complete
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                // Check if canvas has content by checking if it's not blank
                const ctx = canvas.getContext('2d');
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const hasContent = imageData.data.some((val, idx) => idx % 4 !== 3 && val !== 0);
                
                if (hasContent) {
                    const dataUrl = canvas.toDataURL('image/png');
                    snapshots.push({
                        id: config.canvasId,
                        title: config.title,
                        description: config.description,
                        dataUrl
                    });
                } else {
                    console.warn(`Canvas "${config.canvasId}" appears to be blank`);
                }
            } catch (error) {
                console.warn(`Unable to capture plot "${config.canvasId}":`, error);
            }
        }
    }

    selectMode(originalMode);
    generateModeContent(originalMode);

    plotsContainer.style.visibility = originalVisibility;
    window.scrollTo(0, originalScroll);

    return snapshots;
}

// Prepare presentation data
async function preparePresentationData(labName, researcherName, experimentDate) {
    const mpeData = calculateMPEValues();
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    
    // Calculate summary statistics
    const summaryStats = {};
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const displayName = getDisplayName(groupName);
        
        summaryStats[displayName] = {
            n: groupMice.length,
            totalJumps: (groupMice.reduce((sum, mouse) => sum + mouse.totalJumps, 0) / groupMice.length).toFixed(1),
            phaseI: (groupMice.reduce((sum, mouse) => sum + mouse.phaseI, 0) / groupMice.length).toFixed(1),
            phaseII: (groupMice.reduce((sum, mouse) => sum + mouse.phaseII, 0) / groupMice.length).toFixed(1),
            phaseIIa: (groupMice.reduce((sum, mouse) => sum + mouse.phaseIIa, 0) / groupMice.length).toFixed(1),
            phaseIIb: (groupMice.reduce((sum, mouse) => sum + mouse.phaseIIb, 0) / groupMice.length).toFixed(1),
            mpe: mpeData.groupMPEs[groupName] ? mpeData.groupMPEs[groupName].groupMPE.toFixed(3) : 'N/A'
        };
    });
    
    return {
        labName,
        researcherName,
        experimentDate,
        fileName: selectedFile.name,
        totalMice: Object.values(allGroups).reduce((sum, group) => sum + group.length, 0),
        vehicleAverage: mpeData.vehicleAverage.toFixed(1),
        shamAverage: mpeData.shamAverage.toFixed(1),
        summaryStats,
        groupNames: Object.keys(allGroups).map(name => getDisplayName(name))
    };
}

// Generate PowerPoint HTML content
function generatePowerPointContent(data, plotImages = []) {
    const timestamp = new Date().toLocaleString();
    
    const plotSlides = plotImages.map(image => `
    <div class="slide">
        <h2>${image.title}</h2>
        ${
            image.dataUrl
                ? `<div class="plot-image">
                        <img src="${image.dataUrl}" alt="${image.title}">
                        <p class="plot-caption">${image.description}</p>
                   </div>`
                : `<div class="plot-placeholder">
                        <span class="placeholder-icon">📊</span>
                        <p>Plot image unavailable.</p>
                        <p class="plot-caption">${image.description}</p>
                   </div>`
        }
    </div>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formalin Test Analysis - ${data.labName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 800px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; page-break-after: always; }
        .slide h1 { color: #2c3e50; text-align: center; margin-bottom: 30px; }
        .slide h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .slide h3 { color: #2c3e50; margin-top: 25px; }
        .slide p { line-height: 1.6; color: #555; }
        .slide ul { color: #555; }
        .slide li { margin-bottom: 8px; }
        .data-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .data-table th, .data-table td { border: 1px solid #ddd; padding: 12px; text-align: center; }
        .data-table th { background: #3498db; color: white; }
        .data-table tr:nth-child(even) { background: #f9f9f9; }
        .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #3498db; margin: 15px 0; }
        .footer { text-align: center; color: #7f8c8d; font-size: 0.9em; margin-top: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { background: #ecf0f1; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-card h4 { margin: 0 0 10px 0; color: #2c3e50; }
        .stat-card p { margin: 0; font-size: 1.2em; font-weight: bold; color: #3498db; }
        .plot-image { margin: 30px auto; text-align: center; }
        .plot-image img { max-width: 100%; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border: 1px solid #d0d7de; }
        .plot-caption { margin-top: 12px; color: #5f738c; font-size: 0.95em; }
        .plot-placeholder { margin: 30px auto; padding: 32px; border: 2px dashed #d0d7de; border-radius: 12px; text-align: center; color: #5f738c; background: #f8fafc; }
        .plot-placeholder .placeholder-icon { font-size: 2.4rem; margin-bottom: 12px; display: block; }
        @media print { .slide { page-break-after: always; } }
    </style>
</head>
<body>
    <div class="slide">
        <h1>Formalin Test Analysis</h1>
        <h2>Pain Behavior Research Study</h2>
        <div class="highlight">
            <p><strong>Laboratory:</strong> ${data.labName}</p>
            <p><strong>Researcher:</strong> ${data.researcherName}</p>
            <p><strong>Experiment Date:</strong> ${data.experimentDate}</p>
            <p><strong>Data File:</strong> ${data.fileName}</p>
            <p><strong>Generated:</strong> ${timestamp}</p>
        </div>
        <div class="footer">
            <p>Generated by MediPlot AI - Advanced Medical Research Tools</p>
        </div>
    </div>

    <div class="slide">
        <h2>Study Overview</h2>
        <h3>Experimental Design</h3>
        <ul>
            <li><strong>Test Type:</strong> Formalin Test for Pain Behavior Assessment</li>
            <li><strong>Total Animals:</strong> ${data.totalMice} mice</li>
            <li><strong>Experimental Groups:</strong> ${data.groupNames.length}</li>
            <li><strong>Observation Period:</strong> 60 minutes</li>
            <li><strong>Data Collection:</strong> Jump frequency per minute</li>
        </ul>
        
        <h3>Group Composition</h3>
        <ul>
            ${data.groupNames.map(name => `<li><strong>${name}:</strong> ${data.summaryStats[name] ? data.summaryStats[name].n : 0} mice</li>`).join('')}
        </ul>
        
        <div class="highlight">
            <p><strong>Control Groups:</strong> Vehicle (${data.summaryStats.Vehicle ? data.summaryStats.Vehicle.n : 0} mice), Sham (${data.summaryStats.Sham ? data.summaryStats.Sham.n : 0} mice)</p>
        </div>
    </div>

    <div class="slide">
        <h2>Methodology</h2>
        <h3>Formalin Test Protocol</h3>
        <ul>
            <li><strong>Formalin Injection:</strong> Subcutaneous injection into hind paw</li>
            <li><strong>Observation Period:</strong> 60 minutes continuous monitoring</li>
            <li><strong>Behavioral Measure:</strong> Jump frequency as pain response indicator</li>
            <li><strong>Phase Analysis:</strong> Acute (0-10 min) vs Chronic (11-60 min) pain response</li>
        </ul>
        
        <h3>Statistical Analysis</h3>
        <ul>
            <li><strong>MPE Calculation:</strong> Maximum Possible Effect = (Vehicle Avg - Group Avg) / (Vehicle Avg - Sham Avg)</li>
            <li><strong>Phase Analysis:</strong> Phase I (0-10 min), Phase IIa (11-40 min), Phase IIb (41-60 min)</li>
            <li><strong>Statistical Measures:</strong> Mean ± Standard Deviation</li>
        </ul>
    </div>

    <div class="slide">
        <h2>Results Summary</h2>
        <h3>Control Group Performance</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <h4>Vehicle Group</h4>
                <p>${data.vehicleAverage} jumps</p>
            </div>
            <div class="stat-card">
                <h4>Sham Group</h4>
                <p>${data.shamAverage} jumps</p>
            </div>
        </div>
        
        <h3>Group Performance Summary</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>N</th>
                    <th>Total Jumps (60 min)</th>
                    <th>Phase I (0-10 min)</th>
                    <th>Phase II (11-60 min)</th>
                    <th>MPE</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(data.summaryStats).map(([group, stats]) => `
                    <tr>
                        <td>${group}</td>
                        <td>${stats.n}</td>
                        <td>${stats.totalJumps}</td>
                        <td>${stats.phaseI}</td>
                        <td>${stats.phaseII}</td>
                        <td>${stats.mpe}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="slide">
        <h2>Phase Analysis Results</h2>
        <h3>Phase-Specific Performance</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>Phase I (0-10 min)</th>
                    <th>Phase IIa (11-40 min)</th>
                    <th>Phase IIb (41-60 min)</th>
                    <th>Total Phase II (11-60 min)</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(data.summaryStats).map(([group, stats]) => `
                    <tr>
                        <td>${group}</td>
                        <td>${stats.phaseI}</td>
                        <td>${stats.phaseIIa}</td>
                        <td>${stats.phaseIIb}</td>
                        <td>${stats.phaseII}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="highlight">
            <p><strong>Phase Interpretation:</strong> Phase I represents acute pain response, while Phase II represents chronic inflammatory pain response. Phase IIa (11-40 min) and Phase IIb (41-60 min) provide detailed temporal analysis of chronic pain progression.</p>
        </div>
    </div>

    <div class="slide">
        <h2>Maximum Possible Effect (MPE) Analysis</h2>
        <h3>Treatment Efficacy Assessment</h3>
        <div class="highlight">
            <p><strong>MPE Interpretation:</strong> Values closer to 1.0 indicate greater pain relief (fewer jumps compared to vehicle control). Values closer to 0.0 indicate minimal treatment effect.</p>
        </div>
        
        <table class="data-table">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>MPE Value</th>
                    <th>Interpretation</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(data.summaryStats).filter(([group]) => group !== 'Vehicle' && group !== 'Sham').map(([group, stats]) => `
                    <tr>
                        <td>${group}</td>
                        <td>${stats.mpe}</td>
                        <td>${parseFloat(stats.mpe) > 0.5 ? 'High efficacy' : parseFloat(stats.mpe) > 0.2 ? 'Moderate efficacy' : 'Low efficacy'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="slide">
        <h2>Conclusions and Recommendations</h2>
        <h3>Key Findings</h3>
        <ul>
            <li>Formalin test successfully demonstrated differential pain responses across treatment groups</li>
            <li>Phase-specific analysis revealed temporal patterns in pain behavior</li>
            <li>MPE analysis provided quantitative assessment of treatment efficacy</li>
            <li>Statistical analysis supports data reliability and reproducibility</li>
        </ul>
        
        <h3>Clinical Implications</h3>
        <ul>
            <li>Results support further investigation of promising treatments</li>
            <li>Phase-specific effects may inform dosing strategies</li>
            <li>MPE values guide efficacy comparisons between treatments</li>
            <li>Data quality supports peer-reviewed publication</li>
        </ul>
        
        <h3>Future Directions</h3>
        <ul>
            <li>Replicate findings in larger sample sizes</li>
            <li>Investigate mechanism of action for effective treatments</li>
            <li>Explore dose-response relationships</li>
            <li>Consider combination therapy approaches</li>
        </ul>
        
        <div class="footer">
            <p>This analysis was generated using MediPlot AI - Advanced Medical Research Tools</p>
            <p>Generated on ${timestamp} by ${data.researcherName} at ${data.labName}</p>
        </div>
    </div>

    ${plotSlides}
</body>
</html>
    `;
}

// Download presentation
function downloadPresentation(content, filename) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add slideOut animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// Process Formalin Test Data
async function processFormalinData(file) {
    console.log('Processing formalin test data...');
    
    // Reset global variables
    vehicleGroup = [];
    shamGroup = [];
    groupData = {};
    
    try {
        if (file.name.toLowerCase().endsWith('.csv')) {
            await processCSVFile(file);
        } else {
            await processExcelFile(file);
        }
        
        console.log('Data processing completed');
        console.log('Vehicle group:', vehicleGroup);
        console.log('Sham group:', shamGroup);
        console.log('Group data:', groupData);
        
        // Create group name inputs based on detected groups
        createGroupNameInputs();
        
    } catch (error) {
        console.error('Error processing formalin data:', error);
        throw error;
    }
}

// Process CSV File
async function processCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const csvText = e.target.result;
                const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
                const sheetData = lines.map(line => line.split(',').map(cell => cell.trim()));
                
                processSheetData(sheetData, 'CSV');
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read CSV file'));
        };
        
        reader.readAsText(file);
    });
}

// Process Excel File
async function processExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
                    throw new Error('No sheets found in the Excel file');
                }
                
                let totalProcessedSamples = 0;
                const targetSheets = workbook.SheetNames.filter(name => name && name.trim() === '数据处理');
                
                if (targetSheets.length === 0) {
                    throw new Error('Sheet named "数据处理" was not found in the Excel file.');
                }
                
                targetSheets.forEach(sheetName => {
                    try {
                        const worksheet = workbook.Sheets[sheetName];
                        if (!worksheet) return;
                        
                        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
                        const processedCount = processSheetData(sheetData, sheetName);
                        totalProcessedSamples += processedCount;
                    } catch (error) {
                        console.warn(`Warning: Sheet ${sheetName} could not be processed (${error.message})`);
                        showNotification(`Warning: Sheet ${sheetName} could not be processed (${error.message})`, 'warning');
                    }
                });
                
                if (totalProcessedSamples === 0) {
                    throw new Error('No usable data columns were detected in the Excel file.');
                }
                
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read Excel file'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

// Helpers for merged formalin sheets
function isMetadataCell(value) {
    if (typeof value !== 'string') return false;
    const normalized = value.replace(/；/g, ';').toLowerCase();
    const collapsed = normalized.replace(/\s+/g, '');
    return collapsed.includes('date=') && collapsed.includes('time=') && collapsed.includes('id=') && collapsed.includes('study');
}

function parseMetadataCell(value) {
    if (typeof value !== 'string') return {};
    const normalized = value.replace(/；/g, ';').replace(/\r/g, '\n');
    const tokens = normalized.split(/[\n;]+/).map(token => token.trim()).filter(token => token.length > 0);
    const metadata = {};
    let pendingKey = null;
    
    tokens.forEach(token => {
        if (token.includes('=')) {
            const [rawKey, rawVal] = token.split('=');
            const key = rawKey ? rawKey.trim().toLowerCase() : '';
            const valuePart = rawVal ? rawVal.trim() : '';
            
            if (key && valuePart) {
                if (key === 'date') metadata.date = valuePart;
                if (key === 'time') metadata.time = valuePart;
                if (key === 'id' || key === 'id#') metadata.id = valuePart;
                if (key === 'study#' || key === 'study') metadata.study = valuePart;
                pendingKey = null;
            } else if (key && !valuePart) {
                pendingKey = key;
            }
        } else if (pendingKey) {
            if (pendingKey === 'date') metadata.date = token;
            if (pendingKey === 'time') metadata.time = token;
            if (pendingKey === 'id' || pendingKey === 'id#') metadata.id = token;
            if (pendingKey === 'study#' || pendingKey === 'study') metadata.study = token;
            pendingKey = null;
        }
    });
        
    if (pendingKey) {
        // Last token might be the value when no delimiter exists
        const lastToken = tokens[tokens.length - 1];
        if (lastToken) {
            if (pendingKey === 'date') metadata.date = lastToken;
            if (pendingKey === 'time') metadata.time = lastToken;
            if (pendingKey === 'id' || pendingKey === 'id#') metadata.id = lastToken;
            if (pendingKey === 'study#' || pendingKey === 'study') metadata.study = lastToken;
        }
    }
    
    return metadata;
}

function normalizeGroupLabel(labelText) {
    if (!labelText && labelText !== 0) return 'Unlabeled Group';
    return String(labelText).trim() || 'Unlabeled Group';
}

function classifyGroupLabel(labelText) {
    const normalized = normalizeGroupLabel(labelText).toLowerCase();
    
    if (normalized.includes('vehicle') || normalized.includes('载体')) {
        return 'vehicle';
    }
    if (normalized.includes('sham') || normalized.includes('假手术')) {
        return 'sham';
    }
    
    return 'experiment';
}

function ensureGroupEntry(labelText) {
    const label = normalizeGroupLabel(labelText);
    if (!groupData[label]) {
        groupData[label] = [];
    }
    return label;
}

function extractJumpDataFromColumn(sheetData, columnIndex) {
    const jumpData = [];
    let totalJumps = 0;
    
    for (let row = 1; row < sheetData.length; row++) {
        const rowCells = sheetData[row] || [];
        let rawValue = rowCells[columnIndex];
        
        if (rawValue === null || rawValue === undefined || rawValue === '') {
            jumpData.push(0);
            continue;
        }
        
        if (typeof rawValue === 'string') {
            rawValue = rawValue.replace(/,/g, '.').trim();
        }
        
        const numericValue = parseFloat(rawValue);
        if (isNaN(numericValue)) {
            jumpData.push(0);
            continue;
        }
        
        jumpData.push(numericValue);
        totalJumps += numericValue;
    }
    
    return { jumpData, totalJumps };
}

function calculatePhaseSum(jumpData, start, end) {
    if (!Array.isArray(jumpData) || jumpData.length === 0) return 0;
    const safeStart = Math.max(start, 0);
    const safeEnd = Math.min(end, jumpData.length - 1);
    
    if (safeStart > safeEnd) return 0;
    
    let sum = 0;
    for (let i = safeStart; i <= safeEnd; i++) {
        sum += jumpData[i] || 0;
    }
    return sum;
}

function buildSampleFromColumn(sheetData, columnIndex, groupLabel, metadataText) {
    const label = normalizeGroupLabel(groupLabel);
    const metadata = metadataText ? parseMetadataCell(metadataText) : {};
    const { jumpData, totalJumps } = extractJumpDataFromColumn(sheetData, columnIndex);
    
    if (!jumpData.some(value => value !== 0)) {
        return null;
    }
    
    const phaseI = calculatePhaseSum(jumpData, phaseConfig.phase1.start, phaseConfig.phase1.end);
    const phaseIIa = calculatePhaseSum(jumpData, phaseConfig.phase2a.start, phaseConfig.phase2a.end);
    const phaseIIb = calculatePhaseSum(jumpData, phaseConfig.phase2b.start, phaseConfig.phase2b.end);
    const phaseII = phaseIIa + phaseIIb;
    
    let customPhaseData = [];
    if (phaseMode === 'custom' && customPhases.length > 0) {
        customPhaseData = customPhases.map(phase => calculatePhaseSum(jumpData, phase.start, phase.end));
    }
    
    const rawId = metadata.id || `${label}-C${columnIndex + 1}`;
    const numericId = parseInt(rawId, 10);
    const sampleId = isNaN(numericId) ? rawId : numericId;
    
    return {
        id: sampleId,
        totalJumps,
        jumpData,
        phaseI,
        phaseII,
        phaseIIa,
        phaseIIb,
        customPhases: customPhaseData,
        metadata: {
            ...metadata,
            group: label,
            columnIndex
        }
    };
}

function addSampleToCollections(sample, groupLabel) {
    if (!sample) return 0;
    
    const classification = classifyGroupLabel(groupLabel);
    
    if (classification === 'vehicle') {
        vehicleGroup.push(sample);
        return 1;
    }
    
    if (classification === 'sham') {
        shamGroup.push(sample);
        return 1;
    }
    
    const label = ensureGroupEntry(groupLabel);
    groupData[label].push(sample);
    return 1;
}

// Process Individual Sheet Data
function processSheetData(sheetData, sheetName) {
    if (!sheetData || sheetData.length < 2) {
        throw new Error(`Sheet ${sheetName} has insufficient data (need headers and at least one data row)`);
    }
    
    const totalColumns = sheetData.reduce((max, row) => {
        if (!row) return max;
        return Math.max(max, row.length);
    }, 0);
    
    if (totalColumns === 0) {
        throw new Error(`Sheet ${sheetName} does not contain any columns to process`);
    }
    
    const headerRow = sheetData[0] || [];
    let currentGroupLabel = null;
    let processedSampleCount = 0;
    
    for (let col = 0; col < totalColumns; col++) {
        const headerCell = headerRow[col];
        const hasHeaderText = headerCell !== null && headerCell !== undefined && headerCell !== '';
        const headerText = hasHeaderText ? String(headerCell).trim() : '';
        const columnHasMetadata = isMetadataCell(headerText);
        
        if (hasHeaderText && !columnHasMetadata) {
            currentGroupLabel = normalizeGroupLabel(headerText);
        }
        
        const labelForColumn = currentGroupLabel || normalizeGroupLabel('');
        const sample = buildSampleFromColumn(
            sheetData,
            col,
            labelForColumn,
            columnHasMetadata ? headerText : null
        );
        
        if (sample) {
            processedSampleCount += addSampleToCollections(sample, labelForColumn);
        }
    }
    
    return processedSampleCount;
}

// Calculate MPE Values
function calculateMPEValues() {
    // Calculate averages for vehicle and sham groups
    const vehicleAverage = vehicleGroup.reduce((sum, mouse) => sum + mouse.totalJumps, 0) / vehicleGroup.length;
    const shamAverage = shamGroup.reduce((sum, mouse) => sum + mouse.totalJumps, 0) / shamGroup.length;
    
    console.log('Vehicle average:', vehicleAverage);
    console.log('Sham average:', shamAverage);
    
    // Calculate MPE for each group
    const groupMPEs = {};
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const mouseMPEs = groupMice.map(mouse => {
            const mpe = (vehicleAverage - mouse.totalJumps) / (vehicleAverage - shamAverage);
            return {
                id: mouse.id,
                totalJumps: mouse.totalJumps,
                mpe: mpe
            };
        });
        
        const groupMPE = mouseMPEs.reduce((sum, mouse) => sum + mouse.mpe, 0) / mouseMPEs.length;
        
        // Calculate standard deviation for MPE values
        const mpeValues = mouseMPEs.map(mouse => mouse.mpe);
        const variance = mpeValues.reduce((sum, mpe) => sum + Math.pow(mpe - groupMPE, 2), 0) / mpeValues.length;
        const stdDev = Math.sqrt(variance);
        
        groupMPEs[groupName] = {
            groupMPE: groupMPE,
            stdDev: stdDev,
            mouseMPEs: mouseMPEs
        };
    });
    
    return {
        vehicleAverage: vehicleAverage,
        shamAverage: shamAverage,
        groupMPEs: groupMPEs
    };
}

// Calculate appropriate tick step (20, 200, 2000, 20000, etc.) based on range
function calculateTickStep(minValue, maxValue) {
    const range = maxValue - minValue;
    if (range <= 0) return 20;
    
    // Calculate desired number of ticks (5-10 ticks)
    const desiredTicks = 6;
    let idealStep = range / desiredTicks;
    
    // Find the order of magnitude
    const orderOfMagnitude = Math.floor(Math.log10(idealStep));
    const base = Math.pow(10, orderOfMagnitude);
    
    // Try to use 2 * 10^n (20, 200, 2000, etc.) as preferred
    const step20 = 2 * base;  // 20, 200, 2000, 20000, etc.
    const step10 = 1 * base;  // 10, 100, 1000, etc.
    const step50 = 5 * base;  // 50, 500, 5000, etc.
    const step200 = 20 * base; // 200, 2000, 20000, etc.
    
    // Calculate number of ticks for each option
    const ticks20 = Math.ceil(range / step20);
    const ticks10 = Math.ceil(range / step10);
    const ticks50 = Math.ceil(range / step50);
    const ticks200 = Math.ceil(range / step200);
    
    // Prefer 2 * 10^n (20, 200, 2000, etc.) if it gives reasonable number of ticks (3-15)
    if (ticks20 >= 3 && ticks20 <= 15) {
        return step20;
    }
    
    // If 2 * 10^n gives too many ticks, try 20 * 10^n
    if (ticks20 > 15 && ticks200 >= 3 && ticks200 <= 15) {
        return step200;
    }
    
    // If 2 * 10^n gives too few ticks, try 1 * 10^n or 5 * 10^n
    if (ticks20 < 3) {
        if (ticks10 >= 3 && ticks10 <= 15) {
            return step10;
        }
        if (ticks50 >= 3 && ticks50 <= 15) {
            return step50;
        }
    }
    
    // Fallback: use the one that gives closest to desired number of ticks
    const options = [
        { step: step20, ticks: ticks20 },
        { step: step10, ticks: ticks10 },
        { step: step50, ticks: ticks50 },
        { step: step200, ticks: ticks200 }
    ];
    
    // Find option with ticks closest to desiredTicks
    const bestOption = options.reduce((best, current) => {
        const bestDiff = Math.abs(best.ticks - desiredTicks);
        const currentDiff = Math.abs(current.ticks - desiredTicks);
        return currentDiff < bestDiff ? current : best;
    });
    
    return bestOption.step;
}

// Generate MPE Plot
function generateMPEPlot() {
    const mpeData = calculateMPEValues();
    const plotsContainer = document.getElementById('plots-container');
    
    // Create plot container
    const plotContainer = document.createElement('div');
    plotContainer.className = 'plot-container';
    plotContainer.innerHTML = `
        <div class="plot-header">
            <h4>MPE (Maximum Possible Effect) Bar Plot</h4>
            <p>Group-wise MPE comparison (values shown as percentages)</p>
        </div>
        <div class="plot-content">
            <canvas id="mpe-plot" width="800" height="400"></canvas>
        </div>
    `;
    
    // Remove existing MPE plot if any
    const existingPlot = document.getElementById('mpe-plot');
    if (existingPlot) {
        existingPlot.parentElement.parentElement.remove();
    }
    
    plotsContainer.appendChild(plotContainer);
    
    // Generate the actual plot using Canvas
    setTimeout(() => {
        drawMPEPlot(mpeData);
    }, 100);
}

// Draw MPE Plot on Canvas
function drawMPEPlot(mpeData) {
    const canvas = document.getElementById('mpe-plot');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const margin = { top: 50, right: 40, bottom: 60, left: 80 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get group names and MPE values
    const groups = Object.keys(mpeData.groupMPEs);
    const mpePercentValues = groups.map(group => mpeData.groupMPEs[group].groupMPE * 100);
    const stdDevPercentValues = groups.map(group => mpeData.groupMPEs[group].stdDev * 100);

    // Assign colors (controls fixed, drug groups varied)
    const controlColors = {
        'Vehicle': '#4CAF50',
        'Sham': '#2196F3'
    };
    const experimentalPalette = [
        '#e74c3c',
        '#9b59b6',
        '#f39c12',
        '#16a085',
        '#e67e22',
        '#34495e',
        '#1abc9c',
        '#d35400'
    ];
    let experimentalIndex = 0;
    const groupColors = {};

    groups.forEach(group => {
        if (controlColors[group]) {
            groupColors[group] = controlColors[group];
        } else {
            groupColors[group] = experimentalPalette[experimentalIndex % experimentalPalette.length];
            experimentalIndex += 1;
        }
    });
    
    // Calculate bar width and spacing
    const barWidth = plotWidth / (groups.length + 1);
    const barSpacing = barWidth * 0.2;
    const actualBarWidth = barWidth - barSpacing;
    
    // Find min and max values for scaling (including error bars)
    const maxWithError = Math.max(...mpePercentValues.map((val, idx) => val + stdDevPercentValues[idx]));
    const minWithError = Math.min(...mpePercentValues.map((val, idx) => val - stdDevPercentValues[idx]));
    const minMPE = Math.min(0, minWithError);
    const maxMPE = Math.max(100, maxWithError);
    const range = maxMPE - minMPE;
    const padding = Math.max(5, range * 0.05);
    
    // Scale function
    const scaleY = (value) => {
        return margin.top + plotHeight - ((value - minMPE + padding) / (range + 2 * padding)) * plotHeight;
    };
    
    // Draw bars
    groups.forEach((group, index) => {
        const x = margin.left + index * barWidth + barSpacing / 2;
        const barHeight = (mpePercentValues[index] - minMPE + padding) / (range + 2 * padding) * plotHeight;
        const y = scaleY(mpePercentValues[index]);
        const color = groupColors[group];
        
        // Draw bar
        ctx.fillStyle = color;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
        
        // Draw error bars (standard deviation)
        const stdDev = stdDevPercentValues[index];
        const topY = scaleY(mpePercentValues[index] + stdDev);
        const bottomY = scaleY(mpePercentValues[index] - stdDev);
        const centerX = x + actualBarWidth / 2;
        const errorBarWidth = actualBarWidth * 0.3;
        const capWidth = 6;
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // Vertical line
        ctx.beginPath();
        ctx.moveTo(centerX, topY);
        ctx.lineTo(centerX, bottomY);
        ctx.stroke();
        
        // Top cap
        ctx.beginPath();
        ctx.moveTo(centerX - capWidth / 2, topY);
        ctx.lineTo(centerX + capWidth / 2, topY);
        ctx.stroke();
        
        // Bottom cap
        ctx.beginPath();
        ctx.moveTo(centerX - capWidth / 2, bottomY);
        ctx.lineTo(centerX + capWidth / 2, bottomY);
        ctx.stroke();
        
        // Add MPE value on top of error bar
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(`${mpePercentValues[index].toFixed(1)}%`, x + actualBarWidth / 2, topY - 5);
    });
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.stroke();
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('MPE (%)', 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Groups', width / 2, height - 10);
    
    // Add Y-axis ticks and labels (multiples of 20, 200, 2000, etc. based on range)
    const tickStep = calculateTickStep(minMPE - padding, maxMPE + padding);
    const minTick = Math.floor((minMPE - padding) / tickStep) * tickStep;
    const maxTick = Math.ceil((maxMPE + padding) / tickStep) * tickStep;
    
    for (let value = minTick; value <= maxTick; value += tickStep) {
        const y = scaleY(value);
        
        // Draw tick
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin.left - 5, y);
        ctx.lineTo(margin.left, y);
        ctx.stroke();
        
        // Draw tick label
        ctx.fillStyle = '#666';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        // Format based on magnitude
        const label = value >= 1000 ? value.toFixed(0) : value.toFixed(value % 1 === 0 ? 0 : 1);
        ctx.fillText(`${label}%`, margin.left - 10, y + 4);
    }
    
    // Add legend
    const legendX = width - margin.right - 180;
    let legendY = margin.top + 10;
    ctx.font = '12px Inter';
    ctx.textAlign = 'left';
    
    groups.forEach((group, index) => {
        ctx.fillStyle = groupColors[group];
        ctx.fillRect(legendX, legendY + index * 20, 15, 15);
        ctx.fillStyle = '#333';
        ctx.fillText(getDisplayName(group), legendX + 20, legendY + index * 20 + 12);
    });
}

// Generate Data Tables
function generateDataTables() {
    const mpeData = calculateMPEValues();
    const plotsContainer = document.getElementById('plots-container');
    
    // Create data tables container
    const dataTablesContainer = document.createElement('div');
    dataTablesContainer.className = 'data-tables';
    dataTablesContainer.innerHTML = `
        <div class="tables-header">
            <h4>Data Analysis Tables</h4>
        </div>
        <div class="tables-content">
            <div class="summary-tables">
                <div class="table-container averages-table">
                    <h5><i class="fas fa-calculator"></i> Control Group Averages</h5>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Group</th>
                                <th>Average Total Jumps</th>
                                <th>Number of Mice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vehicle</td>
                                <td>${mpeData.vehicleAverage.toFixed(1)}</td>
                                <td>${vehicleGroup.length}</td>
                            </tr>
                            <tr>
                                <td>Sham</td>
                                <td>${mpeData.shamAverage.toFixed(1)}</td>
                                <td>${shamGroup.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="group-tables">
                ${Object.keys(mpeData.groupMPEs).map(groupName => `
                    <div class="table-container">
                        <h5><i class="fas fa-users"></i> ${getDisplayName(groupName)} Group Statistics</h5>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Mouse ID</th>
                                    <th>Total Jumps</th>
                                    <th>MPE Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${mpeData.groupMPEs[groupName].mouseMPEs.map(mouse => `
                                    <tr>
                                        <td>${mouse.id}</td>
                                        <td>${mouse.totalJumps.toFixed(1)}</td>
                                        <td>${mouse.mpe.toFixed(3)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="table-summary">
                            <p><strong>Group MPE:</strong> ${mpeData.groupMPEs[groupName].groupMPE.toFixed(3)}</p>
                            <p><strong>Standard Deviation:</strong> ${mpeData.groupMPEs[groupName].stdDev.toFixed(3)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    plotsContainer.appendChild(dataTablesContainer);
}

// Generate Phase Comparison Table
function generatePhaseComparisonTable() {
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const plotsContainer = document.getElementById('plots-container');
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    
    // Determine which phases to display
    let phasesToDisplay = [];
    if (phaseMode === 'custom' && customPhases.length > 0) {
        // Use custom phases
        phasesToDisplay = customPhases;
    } else {
        // Use standard phases (only Phase I and Phase II)
        phasesToDisplay = [
            { phaseNum: 1, start: phaseConfig.phase1.start, end: phaseConfig.phase1.end },
            { phaseNum: 'II', start: phaseConfig.phase2a.start, end: phaseConfig.phase2b.end }
        ];
    }
    
    // Generate table header
    let tableHeader = '<tr><th>Group</th>';
    phasesToDisplay.forEach(phase => {
        tableHeader += `<th>Phase ${phase.phaseNum} (${phase.start}-${phase.end} min)<br>Average Jumps ± SD</th>`;
    });
    tableHeader += '<th>Number of Mice</th></tr>';
    
    // Generate table rows
    let tableRows = '';
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        let row = `<td>${getDisplayName(groupName)}</td>`;
        
        phasesToDisplay.forEach((phase, index) => {
            // Calculate average and std dev for this phase
            let phaseValues = [];
            if (phaseMode === 'custom') {
                // For custom phases, calculate based on custom phase data
                phaseValues = groupMice.map(mouse => {
                    const phaseData = mouse.customPhases ? mouse.customPhases[index] : 0;
                    return phaseData;
                });
            } else {
                // For standard mode
                if (index === 0) {
                    phaseValues = groupMice.map(mouse => mouse.phaseI);
                } else {
                    phaseValues = groupMice.map(mouse => mouse.phaseII);
                }
            }
            
            const avg = phaseValues.reduce((sum, val) => sum + val, 0) / phaseValues.length;
            const stdDev = Math.sqrt(phaseValues.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / phaseValues.length);
            
            row += `<td>${avg.toFixed(1)} ± ${stdDev.toFixed(1)}</td>`;
        });
        
        row += `<td>${groupMice.length}</td>`;
        tableRows += `<tr>${row}</tr>`;
    });
    
    // Generate phase definitions
    let phaseDefinitions = '';
    phasesToDisplay.forEach(phase => {
        phaseDefinitions += `<p><strong>Phase ${phase.phaseNum}:</strong> Minutes ${phase.start}-${phase.end}</p>`;
    });
    
    tableContainer.innerHTML = `
        <h5><i class="fas fa-balance-scale"></i> Phase Comparison Analysis</h5>
        <table class="data-table">
            <thead>
                ${tableHeader}
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        
        <div class="table-summary">
            <h6>Phase Definitions:</h6>
            ${phaseDefinitions}
            <p><strong>Calculation:</strong> Sum of jumps within each time period</p>
        </div>
    `;
    
    plotsContainer.appendChild(tableContainer);
}

// Generate Phase IIa Table
function generatePhaseIIaTable() {
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const plotsContainer = document.getElementById('plots-container');
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    
    let tableRows = '';
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const phaseIIaAvg = groupMice.reduce((sum, mouse) => sum + mouse.phaseIIa, 0) / groupMice.length;
        
        const phaseIIaValues = groupMice.map(mouse => mouse.phaseIIa);
        const variance = phaseIIaValues.reduce((sum, val) => sum + Math.pow(val - phaseIIaAvg, 2), 0) / phaseIIaValues.length;
        const stdDev = Math.sqrt(variance);
        
        tableRows += `
            <tr>
                <td>${getDisplayName(groupName)}</td>
                <td>${phaseIIaAvg.toFixed(1)} ± ${stdDev.toFixed(1)}</td>
                <td>${groupMice.length}</td>
            </tr>
        `;
    });
    
    tableContainer.innerHTML = `
        <h5><i class="fas fa-clock"></i> Phase IIa Analysis (${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} minutes)</h5>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>Phase IIa (${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} min)<br>Average Jumps ± SD</th>
                    <th>Number of Mice</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        
        <div class="table-summary">
            <h6>Phase IIa Details:</h6>
            <p><strong>Time Period:</strong> Minutes ${phaseConfig.phase2a.start}-${phaseConfig.phase2a.end} (${phaseConfig.phase2a.end - phaseConfig.phase2a.start} minutes)</p>
            <p><strong>Biological Significance:</strong> Early chronic pain response</p>
            <p><strong>Calculation:</strong> Sum of jumps from minute ${phaseConfig.phase2a.start} to minute ${phaseConfig.phase2a.end}</p>
        </div>
    `;
    
    plotsContainer.appendChild(tableContainer);
}

// Generate Phase IIb Table
function generatePhaseIIbTable() {
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const plotsContainer = document.getElementById('plots-container');
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    
    let tableRows = '';
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const phaseIIbAvg = groupMice.reduce((sum, mouse) => sum + mouse.phaseIIb, 0) / groupMice.length;
        
        const phaseIIbValues = groupMice.map(mouse => mouse.phaseIIb);
        const variance = phaseIIbValues.reduce((sum, val) => sum + Math.pow(val - phaseIIbAvg, 2), 0) / phaseIIbValues.length;
        const stdDev = Math.sqrt(variance);
        
        tableRows += `
            <tr>
                <td>${getDisplayName(groupName)}</td>
                <td>${phaseIIbAvg.toFixed(1)} ± ${stdDev.toFixed(1)}</td>
                <td>${groupMice.length}</td>
            </tr>
        `;
    });
    
    tableContainer.innerHTML = `
        <h5><i class="fas fa-stopwatch"></i> Phase IIb Analysis (${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} minutes)</h5>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>Phase IIb (${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} min)<br>Average Jumps ± SD</th>
                    <th>Number of Mice</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        
        <div class="table-summary">
            <h6>Phase IIb Details:</h6>
            <p><strong>Time Period:</strong> Minutes ${phaseConfig.phase2b.start}-${phaseConfig.phase2b.end} (${phaseConfig.phase2b.end - phaseConfig.phase2b.start} minutes)</p>
            <p><strong>Biological Significance:</strong> Late chronic pain response</p>
            <p><strong>Calculation:</strong> Sum of jumps from minute ${phaseConfig.phase2b.start} to minute ${phaseConfig.phase2b.end}</p>
        </div>
    `;
    
    plotsContainer.appendChild(tableContainer);
}

// Generate Time Series Plot
function generateTimeSeriesPlot() {
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const plotsContainer = document.getElementById('plots-container');
    
    // Create plot container
    const plotContainer = document.createElement('div');
    plotContainer.className = 'plot-container';
    plotContainer.innerHTML = `
        <div class="plot-header">
            <h4>Time Series Plot - Average Jumps Over 60 Minutes</h4>
            <p>Comparison of pain response across groups over time</p>
        </div>
        <div class="plot-content">
            <canvas id="time-series-plot" width="900" height="500"></canvas>
        </div>
    `;
    
    plotsContainer.appendChild(plotContainer);
    
    // Generate the actual plot using Canvas
    setTimeout(() => {
        drawTimeSeriesPlot(allGroups);
    }, 100);
}

// Draw Time Series Plot on Canvas
function drawTimeSeriesPlot(allGroups) {
    const canvas = document.getElementById('time-series-plot');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const margin = { top: 50, right: 80, bottom: 60, left: 80 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate time series data for each group
    const timeSeriesData = {};
    Object.keys(allGroups).forEach(groupName => {
        const groupMice = allGroups[groupName];
        const timePoints = [];
        
        // Calculate average jumps for each minute (0-59)
        for (let minute = 0; minute < 60; minute++) {
            const minuteJumps = groupMice.map(mouse => mouse.jumpData[minute] || 0);
            const averageJumps = minuteJumps.reduce((sum, val) => sum + val, 0) / minuteJumps.length;
            timePoints.push({
                minute: minute,
                averageJumps: averageJumps,
                stdDev: Math.sqrt(minuteJumps.reduce((sum, val) => sum + Math.pow(val - averageJumps, 2), 0) / minuteJumps.length)
            });
        }
        timeSeriesData[groupName] = timePoints;
    });
    
    // Find min and max values for scaling
    const allValues = Object.values(timeSeriesData).flat().map(point => point.averageJumps + point.stdDev);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue;
    const padding = range * 0.1;
    
    // Scale functions
    const scaleX = (minute) => margin.left + (minute / 59) * plotWidth;
    const scaleY = (value) => margin.top + plotHeight - ((value - minValue + padding) / (range + 2 * padding)) * plotHeight;
    
    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines (every 10 minutes)
    for (let i = 0; i <= 60; i += 10) {
        const x = scaleX(i);
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, height - margin.bottom);
        ctx.stroke();
    }
    
    // Horizontal grid lines (multiples of 20, 200, 2000, etc. based on range)
    const gridTickStep = calculateTickStep(minValue - padding, maxValue + padding);
    const gridMinTick = Math.floor((minValue - padding) / gridTickStep) * gridTickStep;
    const gridMaxTick = Math.ceil((maxValue + padding) / gridTickStep) * gridTickStep;
    
    for (let value = gridMinTick; value <= gridMaxTick; value += gridTickStep) {
        const y = scaleY(value);
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();
    }
    
    // Draw time series lines for each group
    const colors = {
        'Vehicle': '#4CAF50',
        'Sham': '#2196F3',
        'Group1': '#667eea',
        'Group2': '#9c27b0',
        'Group3': '#ff9800',
        'Group4': '#f44336'
    };
    
    Object.keys(timeSeriesData).forEach(groupName => {
        const data = timeSeriesData[groupName];
        const color = colors[groupName] || '#666';
        
        // Draw main line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = scaleX(point.minute);
            const y = scaleY(point.averageJumps);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = color;
        data.forEach(point => {
            const x = scaleX(point.minute);
            const y = scaleY(point.averageJumps);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    });
    
    // Draw phase backgrounds and labels
    const phaseColors = ['rgba(255, 107, 107, 0.2)', 'rgba(107, 142, 234, 0.2)', 'rgba(255, 206, 84, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
    const phaseBorderColors = ['#ff6b6b', '#6b8eea', '#ffce54', '#4bc0c0', '#9966ff', '#ff9f40', '#c7c7c7', '#5366ff', '#ff6384', '#36a2eb'];
    
    if (phaseMode === 'custom' && customPhases.length > 0) {
        // Draw custom phase backgrounds
        customPhases.forEach((phase, index) => {
            const xStart = scaleX(phase.start);
            const xEnd = scaleX(phase.end);
            const phaseWidth = xEnd - xStart;
            
            // Draw background
            ctx.fillStyle = phaseColors[index % phaseColors.length];
            ctx.fillRect(xStart, margin.top, phaseWidth, plotHeight);
            
            // Draw border
            ctx.strokeStyle = phaseBorderColors[index % phaseBorderColors.length];
            ctx.lineWidth = 2;
            ctx.strokeRect(xStart, margin.top, phaseWidth, plotHeight);
            
            // Draw phase label
            ctx.fillStyle = '#333';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const labelX = xStart + phaseWidth / 2;
            const labelY = margin.top + 20;
            ctx.fillText(`Phase ${phase.phaseNum}`, labelX, labelY);
            
            // Draw time range
            ctx.font = '10px Inter';
            ctx.fillText(`${phase.start}-${phase.end} min`, labelX, labelY + 15);
        });
    } else {
        // Draw standard phase backgrounds
        const phases = [
            { name: 'Phase I', start: phaseConfig.phase1.start, end: phaseConfig.phase1.end },
            { name: 'Phase IIa', start: phaseConfig.phase2a.start, end: phaseConfig.phase2a.end },
            { name: 'Phase IIb', start: phaseConfig.phase2b.start, end: phaseConfig.phase2b.end }
        ];
        
        phases.forEach((phase, index) => {
            const xStart = scaleX(phase.start);
            const xEnd = scaleX(phase.end);
            const phaseWidth = xEnd - xStart;
            
            // Draw background
            ctx.fillStyle = phaseColors[index % phaseColors.length];
            ctx.fillRect(xStart, margin.top, phaseWidth, plotHeight);
            
            // Draw border
            ctx.strokeStyle = phaseBorderColors[index % phaseBorderColors.length];
            ctx.lineWidth = 2;
            ctx.strokeRect(xStart, margin.top, phaseWidth, plotHeight);
            
            // Draw phase label
            ctx.fillStyle = '#333';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const labelX = xStart + phaseWidth / 2;
            const labelY = margin.top + 20;
            ctx.fillText(phase.name, labelX, labelY);
            
            // Draw time range
            ctx.font = '10px Inter';
            ctx.fillText(`${phase.start}-${phase.end} min`, labelX, labelY + 15);
        });
    }
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.stroke();
    
    // X-axis labels (every 10 minutes)
    ctx.fillStyle = '#333';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 60; i += 10) {
        const x = scaleX(i);
        ctx.fillText(`${i}`, x, height - margin.bottom + 20);
    }
    
    // Y-axis labels (multiples of 20, 200, 2000, etc. based on range)
    ctx.textAlign = 'right';
    const tickStep = calculateTickStep(minValue - padding, maxValue + padding);
    const minTick = Math.floor((minValue - padding) / tickStep) * tickStep;
    const maxTick = Math.ceil((maxValue + padding) / tickStep) * tickStep;
    
    for (let value = minTick; value <= maxTick; value += tickStep) {
        const y = scaleY(value);
        // Format based on magnitude
        const label = value >= 1000 ? value.toFixed(0) : value.toFixed(value % 1 === 0 ? 0 : 1);
        ctx.fillText(label, margin.left - 10, y + 4);
    }
    
    // Axis labels
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Average Jumps per Minute', 0, 0);
    ctx.restore();
    
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Time (Minutes)', width / 2, height - 10);
    
    // Add legend
    const legendY = margin.top + 20;
    const legendX = width - margin.right - 200;
    let legendIndex = 0;
    
    Object.keys(timeSeriesData).forEach(groupName => {
        const color = colors[groupName] || '#666';
        
        // Draw legend line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY + legendIndex * 25 + 10);
        ctx.lineTo(legendX + 20, legendY + legendIndex * 25 + 10);
        ctx.stroke();
        
        // Draw legend text
        ctx.fillStyle = '#333';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(getDisplayName(groupName), legendX + 25, legendY + legendIndex * 25 + 15);
        
        legendIndex++;
    });
    
    // Add phase indicators
    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
    ctx.fillRect(scaleX(0), margin.top, scaleX(10) - scaleX(0), plotHeight);
    
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.fillRect(scaleX(10), margin.top, scaleX(60) - scaleX(10), plotHeight);
    
    // Phase labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Phase I', scaleX(5), margin.top + 20);
    ctx.fillText('Phase II', scaleX(35), margin.top + 20);
}

// Help Modal Functions
function toggleHelp() {
    const helpModal = document.getElementById('help-modal');
    helpModal.classList.toggle('show');
}

function updateHelpContent(selectedAnalyses) {
    const helpBody = document.getElementById('help-body');
    
    let helpContent = '';
    
    if (selectedAnalyses.includes('mpe')) {
        helpContent += `
            <div class="help-section">
                <h4><i class="fas fa-chart-bar"></i> MPE (Maximum Possible Effect) Calculation</h4>
                <p>The MPE is calculated for each mouse using the formula:</p>
                <div class="help-formula">
                    MPE = (Vehicle Average - Mouse Total Jumps) / (Vehicle Average - Sham Average)
                </div>
                <p>Where:</p>
                <ul class="help-list">
                    <li><code>Vehicle Average</code>: Mean of all vehicle group mice total jumps</li>
                    <li><code>Sham Average</code>: Mean of all sham group mice total jumps</li>
                    <li><code>Mouse Total Jumps</code>: Sum of all 60 minutes of jumps for individual mouse</li>
                </ul>
                <div class="help-note">
                    <strong>Note:</strong> MPE values range from 0 to 1, where higher values indicate greater pain relief (fewer jumps compared to vehicle).
                </div>
            </div>
        `;
    }
    
    if (selectedAnalyses.includes('phase-comparison')) {
        helpContent += `
            <div class="help-section">
                <h4><i class="fas fa-balance-scale"></i> Phase Comparison Calculation</h4>
                <p>Formalin test responses are divided into two main phases:</p>
                <ul class="help-list">
                    <li><strong>Phase I (0-10 minutes):</strong> Acute pain response</li>
                    <li><strong>Phase II (11-60 minutes):</strong> Chronic pain response</li>
                </ul>
                <div class="help-formula">
                    Phase I = Sum of jumps from minute 0 to minute 10<br>
                    Phase II = Sum of jumps from minute 11 to minute 60
                </div>
                <p>Standard deviation is calculated for each phase within each group.</p>
            </div>
        `;
    }
    
    if (selectedAnalyses.includes('phase-iia')) {
        helpContent += `
            <div class="help-section">
                <h4><i class="fas fa-clock"></i> Phase IIa Calculation (11-40 minutes)</h4>
                <p>Phase IIa represents the early chronic pain response:</p>
                <div class="help-formula">
                    Phase IIa = Sum of jumps from minute 11 to minute 40
                </div>
                <p>This 30-minute period captures the early phase of the chronic pain response following the acute phase.</p>
                <div class="help-note">
                    <strong>Biological Significance:</strong> Early chronic pain response, often associated with inflammatory processes.
                </div>
            </div>
        `;
    }
    
    if (selectedAnalyses.includes('phase-iib')) {
        helpContent += `
            <div class="help-section">
                <h4><i class="fas fa-stopwatch"></i> Phase IIb Calculation (41-60 minutes)</h4>
                <p>Phase IIb represents the late chronic pain response:</p>
                <div class="help-formula">
                    Phase IIb = Sum of jumps from minute 41 to minute 60
                </div>
                <p>This 20-minute period captures the late phase of the chronic pain response.</p>
                <div class="help-note">
                    <strong>Biological Significance:</strong> Late chronic pain response, often associated with central sensitization.
                </div>
            </div>
        `;
    }
    
    helpContent += `
        <div class="help-section">
            <h4><i class="fas fa-info-circle"></i> General Information</h4>
            <p><strong>Data Processing:</strong></p>
            <ul class="help-list">
                <li>Each mouse's data is processed for 60 minutes (60 rows)</li>
                <li>Jumps are summed for each time period</li>
                <li>Group averages and standard deviations are calculated</li>
                <li>Vehicle and Sham groups are extracted from Group sheets (IDs 7 and 8 respectively)</li>
            </ul>
            <p><strong>Statistical Measures:</strong></p>
            <div class="help-formula">
                Mean = Σ(values) / n<br>
                Standard Deviation = √(Σ(value - mean)² / n)
            </div>
        </div>
    `;
    
    helpBody.innerHTML = helpContent;
}

// Group Selection Functions
function setupGroupSelection() {
    const groupSelectionGrid = document.getElementById('group-selection-grid');
    if (!groupSelectionGrid) return;
    
    // Clear existing checkboxes
    groupSelectionGrid.innerHTML = '';
    
    // Get all groups from processed data
    const allGroupsData = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const groupNames = Object.keys(allGroupsData);
    
    // Initialize selected groups (select all by default)
    if (selectedGroupsForPlot.size === 0) {
        groupNames.forEach(group => selectedGroupsForPlot.add(group));
    }
    
    // Create checkboxes for each group
    groupNames.forEach(groupName => {
        const displayName = getDisplayName(groupName);
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'group-selection-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="select-${groupName}" 
                   data-group-name="${groupName}"
                   ${selectedGroupsForPlot.has(groupName) ? 'checked' : ''} 
                   onchange="toggleGroupSelection('${groupName}')">
            <label for="select-${groupName}">${displayName}</label>
        `;
        groupSelectionGrid.appendChild(checkboxItem);
    });
}

function toggleGroupSelection(groupName) {
    const checkbox = document.getElementById(`select-${groupName}`);
    if (checkbox.checked) {
        selectedGroupsForPlot.add(groupName);
    } else {
        selectedGroupsForPlot.delete(groupName);
    }
    
    // Automatically update the plot when selection changes
    if (currentMode === 'time-series' || currentMode === 'distribution') {
        updateTimeSeriesPlot();
    }
}

function selectAllGroups() {
    const allGroupsData = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    Object.keys(allGroupsData).forEach(groupName => {
        selectedGroupsForPlot.add(groupName);
        const checkbox = document.getElementById(`select-${groupName}`);
        if (checkbox) checkbox.checked = true;
    });
    
    // Automatically update the plot when selection changes
    if (currentMode === 'time-series' || currentMode === 'distribution') {
        updateTimeSeriesPlot();
    }
}

function deselectAllGroups() {
    selectedGroupsForPlot.clear();
    const checkboxes = document.querySelectorAll('#group-selection-grid input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Automatically update the plot when selection changes
    if (currentMode === 'time-series' || currentMode === 'distribution') {
        updateTimeSeriesPlot();
    }
}

function updateTimeSeriesPlot() {
    if (selectedGroupsForPlot.size === 0) {
        // Clear existing plots if no groups selected
        const plotsContainer = document.getElementById('plots-container');
        if (plotsContainer) {
            // Remove existing time series or distribution plot
            const existingPlot = plotsContainer.querySelector('#time-series-plot, #distribution-plot');
            if (existingPlot) {
                existingPlot.parentElement.parentElement.remove();
            }
        }
        return;
    }
    
    // Clear existing plot
    const plotsContainer = document.getElementById('plots-container');
    if (plotsContainer) {
        const existingPlot = plotsContainer.querySelector('#time-series-plot, #distribution-plot');
        if (existingPlot) {
            existingPlot.parentElement.parentElement.remove();
        }
    }
    
    // Generate new plot with selected groups based on current mode
    if (currentMode === 'time-series') {
        generateTimeSeriesPlotFiltered();
    } else if (currentMode === 'distribution') {
        generateDistributionPlot();
    }
}

// Modified Time Series Plot Generation with filtering
function generateTimeSeriesPlotFiltered() {
    const plotsContainer = document.getElementById('plots-container');
    
    // Create plot container
    const plotContainer = document.createElement('div');
    plotContainer.className = 'plot-container';
    plotContainer.innerHTML = `
        <div class="plot-header">
            <h4><i class="fas fa-chart-line"></i> Time Series Analysis (Selected Groups)</h4>
            <p>Average jumps per minute for selected groups over 60 minutes</p>
        </div>
        <div class="plot-content">
            <canvas id="time-series-plot" width="800" height="400"></canvas>
        </div>
    `;
    
    plotsContainer.appendChild(plotContainer);
    
    // Prepare data for selected groups only
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const filteredGroups = {};
    
    selectedGroupsForPlot.forEach(groupName => {
        if (allGroups[groupName]) {
            filteredGroups[groupName] = allGroups[groupName];
        }
    });
    
    // Draw the plot with filtered groups
    drawTimeSeriesPlot(filteredGroups);
}

// Generate Distribution Plot
function generateDistributionPlot() {
    const plotsContainer = document.getElementById('plots-container');
    
    // Create plot container
    const plotContainer = document.createElement('div');
    plotContainer.className = 'plot-container';
    plotContainer.innerHTML = `
        <div class="plot-header">
            <h4><i class="fas fa-circle"></i> Distribution of Samples</h4>
            <p>Individual mice total jumps over 60 minutes with error bars</p>
        </div>
        <div class="plot-content">
            <canvas id="distribution-plot" width="800" height="400"></canvas>
        </div>
    `;
    
    plotsContainer.appendChild(plotContainer);
    
    // Prepare data for selected groups only
    const allGroups = { ...groupData, 'Vehicle': vehicleGroup, 'Sham': shamGroup };
    const filteredGroups = {};
    
    selectedGroupsForPlot.forEach(groupName => {
        if (allGroups[groupName]) {
            filteredGroups[groupName] = allGroups[groupName];
        }
    });
    
    // Draw the distribution plot
    drawDistributionPlot(filteredGroups);
}

// Draw Distribution Plot
function drawDistributionPlot(allGroups) {
    const canvas = document.getElementById('distribution-plot');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const margin = { top: 50, right: 80, bottom: 60, left: 80 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate data for each group
    const groupNames = Object.keys(allGroups);
    if (groupNames.length === 0) return;
    
    const groupData = {};
    let maxValue = 0;
    let minValue = Infinity;
    
    groupNames.forEach(groupName => {
        const groupMice = allGroups[groupName];
        const totalJumps = groupMice.map(mouse => {
            const total = mouse.jumpData.reduce((sum, val) => sum + (val || 0), 0);
            return total;
        });
        
        const mean = totalJumps.reduce((sum, val) => sum + val, 0) / totalJumps.length;
        const stdDev = Math.sqrt(totalJumps.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / totalJumps.length);
        
        groupData[groupName] = {
            values: totalJumps,
            mean: mean,
            stdDev: stdDev
        };
        
        maxValue = Math.max(maxValue, ...totalJumps);
        minValue = Math.min(minValue, ...totalJumps);
    });
    
    // Add some padding to the y-axis
    const yPadding = (maxValue - minValue) * 0.1;
    const yMin = Math.max(0, minValue - yPadding);
    const yMax = maxValue + yPadding;
    
    // Calculate positions
    const groupSpacing = plotWidth / (groupNames.length + 1);
    const dotRadius = 4;
    const colors = ['#667eea', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#ffecd2'];
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines (multiples of 20, 200, 2000, etc. based on range)
    const distTickStep = calculateTickStep(yMin, yMax);
    const distMinTick = Math.floor(yMin / distTickStep) * distTickStep;
    const distMaxTick = Math.ceil(yMax / distTickStep) * distTickStep;
    
    for (let value = distMinTick; value <= distMaxTick; value += distTickStep) {
        const y = margin.top + plotHeight - ((value - yMin) / (yMax - yMin)) * plotHeight;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + plotWidth, y);
        ctx.stroke();
    }
    
    // Draw groups
    groupNames.forEach((groupName, groupIndex) => {
        const groupCenterX = margin.left + groupSpacing * (groupIndex + 1);
        const data = groupData[groupName];
        const color = colors[groupIndex % colors.length];
        
        // Draw individual dots with jitter
        data.values.forEach((value, mouseIndex) => {
            const x = groupCenterX + (Math.random() - 0.5) * 30; // Jitter
            const y = margin.top + plotHeight - ((value - yMin) / (yMax - yMin)) * plotHeight;
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw mean line
        const meanY = margin.top + plotHeight - ((data.mean - yMin) / (yMax - yMin)) * plotHeight;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(groupCenterX - 20, meanY);
        ctx.lineTo(groupCenterX + 20, meanY);
        ctx.stroke();
        
        // Draw error bars (mean ± stdDev)
        const errorTop = margin.top + plotHeight - (((data.mean + data.stdDev) - yMin) / (yMax - yMin)) * plotHeight;
        const errorBottom = margin.top + plotHeight - (((data.mean - data.stdDev) - yMin) / (yMax - yMin)) * plotHeight;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(groupCenterX, errorTop);
        ctx.lineTo(groupCenterX, errorBottom);
        ctx.stroke();
        
        // Draw error bar caps
        ctx.beginPath();
        ctx.moveTo(groupCenterX - 5, errorTop);
        ctx.lineTo(groupCenterX + 5, errorTop);
        ctx.moveTo(groupCenterX - 5, errorBottom);
        ctx.lineTo(groupCenterX + 5, errorBottom);
        ctx.stroke();
    });
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + plotHeight);
    ctx.lineTo(margin.left + plotWidth, margin.top + plotHeight);
    ctx.stroke();
    
    // Draw Y-axis labels (multiples of 20, 200, 2000, etc. based on range)
    ctx.fillStyle = '#333';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    const tickStep = calculateTickStep(yMin, yMax);
    const minTick = Math.floor(yMin / tickStep) * tickStep;
    const maxTick = Math.ceil(yMax / tickStep) * tickStep;
    
    for (let value = minTick; value <= maxTick; value += tickStep) {
        const y = margin.top + plotHeight - ((value - yMin) / (yMax - yMin)) * plotHeight;
        // Format based on magnitude
        const label = value >= 1000 ? value.toFixed(0) : value.toString();
        ctx.fillText(label, margin.left - 10, y);
    }
    
    // Draw X-axis labels (group names)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    groupNames.forEach((groupName, groupIndex) => {
        const x = margin.left + groupSpacing * (groupIndex + 1);
        const y = margin.top + plotHeight + 10;
        const displayName = getDisplayName(groupName);
        ctx.fillText(displayName, x, y);
    });
    
    // Draw title and labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Distribution of Total Jumps Over 60 Minutes', width / 2, 25);
    
    ctx.font = '14px Inter';
    ctx.fillText('Groups', width / 2, height - 10);
    
    // Rotate Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Total Jumps', 0, 0);
    ctx.restore();
    
    // Draw legend
    const legendX = margin.left + plotWidth + 20;
    const legendY = margin.top + 20;
    
    groupNames.forEach((groupName, groupIndex) => {
        const color = colors[groupIndex % colors.length];
        const displayName = getDisplayName(groupName);
        const y = legendY + groupIndex * 25;
        
        // Legend color box
        ctx.fillStyle = color;
        ctx.fillRect(legendX, y - 5, 15, 15);
        
        // Legend text
        ctx.fillStyle = '#333';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName, legendX + 20, y);
        
        // Show mean ± stdDev
        const data = groupData[groupName];
        ctx.font = '10px Inter';
        ctx.fillText(`Mean: ${Math.round(data.mean)} ± ${Math.round(data.stdDev)}`, legendX + 20, y + 12);
    });
}
