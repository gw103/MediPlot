# MediPlot AI 🧬

**Advanced formalin test analysis for pain behavior research**

A comprehensive web application for analyzing formalin test data in rodents, featuring automated data processing, statistical analysis, and AI-powered insights.

![MediPlot AI](https://img.shields.io/badge/MediPlot-AI-blue?style=for-the-badge&logo=microscope)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-English%20%7C%20中文-orange?style=for-the-badge)

## 🌟 Features

### 📊 **Comprehensive Analysis Modes**
- **MPE Analysis**: Maximum Possible Effect calculations with error bars
- **Phase Comparison**: Acute (0-10 min) vs Chronic (11-60 min) pain responses
- **Time Series Plot**: Average jumps over 60 minutes with group filtering
- **Distribution of Samples**: Individual mouse data visualization with dot plots

### 🤖 **AI-Powered Insights**
- **Interactive Chatbot**: Real-time analysis assistance using Google Gemini AI
- **Automated Reports**: Comprehensive downloadable analysis reports
- **Context-Aware Analysis**: AI understands your experimental setup and data

### 🌍 **Multilingual Support**
- **English & Chinese**: Full interface translation
- **Persistent Preferences**: Remembers your language choice
- **Professional Terminology**: Accurate medical research translations

### 📈 **Advanced Data Processing**
- **Multi-sheet Excel/CSV Support**: Automatic group detection from sheet names
- **Custom Group Names**: User-defined labels for better presentation
- **Statistical Calculations**: Mean, standard deviation, MPE values
- **Real-time Filtering**: Show/hide groups dynamically

### 🎨 **Modern User Interface**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Drag & Drop Upload**: Easy file handling
- **Interactive Plots**: Canvas-based visualizations
- **Professional Styling**: Clean, research-grade presentation

## 🚀 Quick Start

### **Live Demo**
Visit the live application: [MediPlot AI Demo](https://your-username.github.io/MediPlot)

### **Local Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/MediPlot.git
   cd MediPlot
   ```

2. **Start a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**: Navigate to `http://localhost:8000`

## 📋 Data Format Requirements

### **Excel/CSV Structure**
Your data file should contain multiple sheets named starting with "Group":

```
📁 Your Data File
├── 📄 Group1 (Sheet)
│   ├── Column: "Date = 09_25_24 Time = 10:08:04 ID = 1 Study # = 20240925"
│   ├── Column: "Date = 09_25_24 Time = 10:08:04 ID = 2 Study # = 20240925"
│   └── ... (8 mice per group)
├── 📄 Group2 (Sheet)
│   └── ... (8 mice per group)
└── 📄 Group3 (Sheet)
    └── ... (8 mice per group)
```

### **Data Processing Rules**
- **First 60 rows**: Represent 60 minutes of observation
- **Each cell**: Number of jumps for that mouse at that minute
- **Group assignment**: 
  - IDs 1-6: Belong to the group
  - ID 7: Assigned to Vehicle group
  - ID 8: Assigned to Sham group

## 🧪 Analysis Types

### **1. MPE Analysis**
- Calculates Maximum Possible Effect for each group
- Compares treatment groups against Vehicle and Sham controls
- Generates bar plots with standard deviation error bars
- Provides detailed statistical tables

### **2. Phase Comparison**
- **Phase I (0-10 minutes)**: Acute pain response
- **Phase II (11-60 minutes)**: Chronic pain response
- **Phase IIa (11-40 minutes)**: Early chronic phase
- **Phase IIb (41-60 minutes)**: Late chronic phase
- Generates comparative tables with averages and standard deviations

### **3. Time Series Plot**
- Shows average jumps per minute for each group
- Includes error bands (mean ± standard deviation)
- Interactive group selection
- Phase indicators for easy interpretation

### **4. Distribution of Samples**
- Individual mouse data as dot plots
- Mean lines and error bars for each group
- Visual distribution comparison
- Statistical summary in legend

## 🤖 AI Features

### **Interactive Chatbot**
- Ask questions about your data
- Get statistical explanations
- Receive methodology guidance
- Draggable and resizable interface

### **Automated Reports**
- Comprehensive analysis summary
- Statistical interpretations
- Downloadable HTML reports
- Professional formatting

## 🌐 Language Support

Switch between English and Chinese using the language selector in the top-right corner:

- **English**: Full interface in English
- **中文**: Complete Chinese translation with medical terminology

## 📊 Output Formats

### **Visualizations**
- **Canvas-based plots**: High-quality, scalable graphics
- **Interactive elements**: Zoom, pan, and selection capabilities
- **Professional styling**: Publication-ready figures

### **Reports**
- **HTML reports**: Comprehensive analysis summaries
- **PowerPoint presentations**: Multi-slide presentations
- **Statistical tables**: Detailed numerical results

## 🔧 Technical Details

### **Technologies Used**
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Processing**: XLSX.js for Excel/CSV parsing
- **Visualization**: Canvas API for custom plots
- **AI Integration**: Google Gemini API (free tier)
- **Styling**: Modern CSS with glassmorphism effects

### **Browser Compatibility**
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📝 Usage Examples

### **Basic Analysis Workflow**
1. Upload your Excel/CSV file with Group sheets
2. Enter custom group names (optional)
3. Select analysis mode (MPE, Phase Comparison, etc.)
4. Generate plots and tables
5. Use AI chatbot for insights
6. Download reports and presentations

### **Advanced Features**
- **Group filtering**: Show/hide specific groups in plots
- **Custom naming**: Use meaningful group labels
- **AI assistance**: Get real-time analysis help
- **Multi-language**: Switch between English and Chinese

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Setup**
```bash
git clone https://github.com/your-username/MediPlot.git
cd MediPlot
# Start local server and begin development
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing intelligent analysis capabilities
- **XLSX.js** for Excel/CSV file processing
- **Font Awesome** for beautiful icons
- **Inter Font** for clean typography

## 📞 Support

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/your-username/MediPlot/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/your-username/MediPlot/discussions)
- **Documentation**: Check the [Wiki](https://github.com/your-username/MediPlot/wiki) for detailed guides

## 🔮 Roadmap

- [ ] Additional pain models (Hot Plate, Tail Flick, Rotarod)
- [ ] Advanced statistical tests (ANOVA, t-tests)
- [ ] Export to various formats (PDF, PNG, SVG)
- [ ] Collaborative features
- [ ] Mobile app version

---

**Made with ❤️ for the pain research community**

*MediPlot AI - Simplifying formalin test analysis for researchers worldwide*
