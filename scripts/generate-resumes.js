const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const FONT_REGULAR = 'C:/Windows/Fonts/msyh.ttc';
const FONT_BOLD = 'C:/Windows/Fonts/msyhbd.ttc';

const MARGIN = 50;
const PAGE_WIDTH = 595.28; // A4
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function createResume(locale) {
  const messages = require(`../src/i18n/messages/${locale}.json`);
  const outputPath = path.join(__dirname, '..', 'public', locale === 'zh' ? 'Longyu_Xu_Resume_ZH.pdf' : 'Longyu_Xu_Resume.pdf');

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 45, bottom: 45, left: MARGIN, right: MARGIN },
  });

  doc.pipe(fs.createWriteStream(outputPath));

  // Register fonts
  doc.registerFont('Regular', FONT_REGULAR);
  doc.registerFont('Bold', FONT_BOLD);

  const colors = {
    black: '#1a1a1a',
    gray: '#4a4a4a',
    lightGray: '#6b7280',
    primary: '#3b82f6',
    line: '#d1d5db',
  };

  let y = doc.y;

  // === HEADER ===
  doc.font('Bold').fontSize(22).fillColor(colors.black);
  if (locale === 'zh') {
    doc.text('徐砻毓', MARGIN, y, { align: 'center' });
  } else {
    doc.text('Longyu Xu', MARGIN, y, { align: 'center' });
  }
  y = doc.y + 6;

  doc.font('Regular').fontSize(9).fillColor(colors.lightGray);
  doc.text('longyu.xu@edhec.com  |  +86 188 2127 1689  |  Shanghai / Paris  |  github.com/shuaigexly', MARGIN, y, { align: 'center' });
  y = doc.y + 4;

  doc.font('Regular').fontSize(9).fillColor(colors.primary);
  const objective = locale === 'zh'
    ? '寻求2026年夏季产品运营实习机会（北京/上海/深圳）'
    : 'Seeking Product Operations Intern — Summer 2026 (Beijing/Shanghai/Shenzhen)';
  doc.text(objective, MARGIN, y, { align: 'center' });
  y = doc.y + 8;

  // Divider
  function drawDivider() {
    doc.moveTo(MARGIN, y).lineTo(PAGE_WIDTH - MARGIN, y).strokeColor(colors.line).lineWidth(0.5).stroke();
    y += 8;
  }

  // Section header
  function sectionHeader(title) {
    doc.font('Bold').fontSize(11).fillColor(colors.black);
    doc.text(title, MARGIN, y);
    y = doc.y + 3;
    doc.moveTo(MARGIN, y).lineTo(PAGE_WIDTH - MARGIN, y).strokeColor(colors.primary).lineWidth(1).stroke();
    y += 7;
  }

  // Check page break
  function checkPageBreak(needed) {
    if (y + needed > 780) {
      doc.addPage();
      y = 45;
    }
  }

  drawDivider();

  // === EDUCATION ===
  sectionHeader(messages.education.title);

  const eduItems = [messages.education.edhec, messages.education.sjtu];
  for (const edu of eduItems) {
    checkPageBreak(45);
    doc.font('Bold').fontSize(9.5).fillColor(colors.black);
    doc.text(edu.school, MARGIN, y, { width: CONTENT_WIDTH * 0.65, continued: false });
    doc.font('Regular').fontSize(8.5).fillColor(colors.lightGray);
    doc.text(edu.period, MARGIN, y, { width: CONTENT_WIDTH, align: 'right' });
    y = doc.y + 2;

    doc.font('Regular').fontSize(9).fillColor(colors.gray);
    doc.text(edu.degree, MARGIN, y);
    y = doc.y;

    if (edu.details) {
      doc.font('Regular').fontSize(8.5).fillColor(colors.primary);
      doc.text(edu.details, MARGIN, y + 1);
      y = doc.y;
    }
    y += 6;
  }

  // === EXPERIENCE ===
  sectionHeader(messages.experience.title);

  const expKeys = ['natixis', 'geVernova', 'allinpay'];
  for (const key of expKeys) {
    const exp = messages.experience[key];
    checkPageBreak(100);

    // Company + Period
    doc.font('Bold').fontSize(9.5).fillColor(colors.black);
    doc.text(exp.company, MARGIN, y, { width: CONTENT_WIDTH * 0.65, continued: false });
    doc.font('Regular').fontSize(8.5).fillColor(colors.lightGray);
    doc.text(exp.period, MARGIN, y, { width: CONTENT_WIDTH, align: 'right' });
    y = doc.y + 1;

    // Role
    doc.font('Regular').fontSize(9).fillColor(colors.gray);
    doc.text(exp.role, MARGIN, y);
    y = doc.y + 3;

    // Bullets
    for (const bullet of exp.bullets) {
      checkPageBreak(35);
      doc.font('Regular').fontSize(8.5).fillColor(colors.gray);
      const bulletText = `•  ${bullet}`;
      doc.text(bulletText, MARGIN + 8, y, { width: CONTENT_WIDTH - 12 });
      y = doc.y + 2;
    }
    y += 5;
  }

  // === SKILLS ===
  checkPageBreak(80);
  sectionHeader(messages.skills.title);

  const skillKeys = ['productOperations', 'dataTools', 'languages'];
  for (const key of skillKeys) {
    const cat = messages.skills.categories[key];
    checkPageBreak(25);
    doc.font('Bold').fontSize(8.5).fillColor(colors.black);
    doc.text(cat.title + ':', MARGIN, y, { continued: true });
    doc.font('Regular').fontSize(8.5).fillColor(colors.gray);
    doc.text('  ' + cat.items.join('  |  '), { continued: false });
    y = doc.y + 4;
  }
  y += 3;

  // === LEADERSHIP ===
  checkPageBreak(60);
  sectionHeader(messages.leadership.title);

  doc.font('Bold').fontSize(9.5).fillColor(colors.black);
  doc.text(messages.leadership.role, MARGIN, y, { width: CONTENT_WIDTH * 0.65, continued: false });
  doc.font('Regular').fontSize(8.5).fillColor(colors.lightGray);
  doc.text(messages.leadership.period, MARGIN, y, { width: CONTENT_WIDTH, align: 'right' });
  y = doc.y + 2;

  doc.font('Regular').fontSize(8.5).fillColor(colors.gray);
  doc.text(messages.leadership.description, MARGIN, y, { width: CONTENT_WIDTH });
  y = doc.y + 8;

  // === PROJECTS ===
  checkPageBreak(80);
  sectionHeader(locale === 'zh' ? '项目经验' : 'Projects');

  const projectItems = Object.values(messages.projects.items);
  for (const proj of projectItems) {
    checkPageBreak(40);
    doc.font('Bold').fontSize(9).fillColor(colors.black);
    doc.text(proj.title, MARGIN, y, { continued: true });
    doc.font('Regular').fontSize(8.5).fillColor(colors.lightGray);
    doc.text('  —  ' + proj.tags.map(t => messages.projects.tags[t] || t).slice(0, 4).join(', '), { continued: false });
    y = doc.y + 2;

    doc.font('Regular').fontSize(8.5).fillColor(colors.gray);
    doc.text(proj.summary, MARGIN + 8, y, { width: CONTENT_WIDTH - 12 });
    y = doc.y + 6;
  }

  doc.end();
  console.log(`Generated: ${outputPath}`);
}

createResume('en');
createResume('zh');
console.log('Done!');
