const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, '.cv-build');

const documents = [
  { source: 'CV_ELIAS_URRUTIA_ES.md', output: 'CV_ELIAS_URRUTIA_ES.html', lang: 'es', title: 'CV Elias Urrutia — Español' },
  { source: 'CV_ELIAS_URRUTIA_EN.md', output: 'CV_ELIAS_URRUTIA_EN.html', lang: 'en', title: 'Elias Urrutia Resume — English' },
];

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const inline = value => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[(.+?)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');

function renderBody(lines) {
  const html = [];
  let inList = false;

  const closeList = () => {
    if (inList) html.push('</ul>');
    inList = false;
  };

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      if (!inList) html.push('<ul>');
      inList = true;
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      html.push(`<p>${inline(line)}</p>`);
    }
  }

  closeList();
  return html.join('\n');
}

function renderDocument(document) {
  const markdown = fs.readFileSync(path.join(root, document.source), 'utf8').replace(/^\uFEFF/, '');
  const lines = markdown.split(/\r?\n/);
  const firstSection = lines.findIndex(line => line.startsWith('## '));
  const header = lines.slice(0, firstSection).filter(Boolean);
  const name = header[0].replace(/^#\s+/, '');
  const role = header[1].replace(/^\*\*|\*\*$/g, '');
  const location = header[2];
  const profiles = header[3];
  const body = renderBody(lines.slice(firstSection));

  return `<!doctype html>
<html lang="${document.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${document.title}</title>
  <style>
    @page { size: A4; margin: 10mm 12mm 11mm; }
    * { box-sizing: border-box; }
    html { background: #fff; }
    body {
      margin: 0;
      color: #17201d;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 8.6pt;
      line-height: 1.32;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cv-header {
      border-top: 5px solid #a7e22e;
      border-bottom: 1px solid #cad3cf;
      padding: 5mm 0 3.5mm;
      margin-bottom: 3.5mm;
    }
    h1 { margin: 0 0 1mm; color: #0c1411; font-size: 24pt; line-height: 1; letter-spacing: -.5px; }
    .role { margin: 0 0 2.2mm; color: #315c18; font-size: 11pt; font-weight: 700; }
    .contact { display: flex; flex-wrap: wrap; gap: 1.2mm 4mm; margin: 0; color: #43504b; }
    .contact + .contact { margin-top: 1mm; }
    h2 {
      margin: 3.4mm 0 1.5mm;
      padding-bottom: .8mm;
      border-bottom: 1px solid #9eaaa5;
      color: #132019;
      font-size: 10.5pt;
      line-height: 1.1;
      letter-spacing: .65px;
      break-after: avoid;
    }
    h3 { margin: 2.3mm 0 .8mm; color: #254c16; font-size: 9.4pt; line-height: 1.15; break-after: avoid; }
    p { margin: 0 0 1.5mm; }
    ul { margin: .7mm 0 1.7mm; padding-left: 4.5mm; }
    li { margin: 0 0 .75mm; padding-left: .5mm; }
    strong { color: #111b17; }
    a { color: #245c1b; text-decoration: none; }
  </style>
</head>
<body>
  <header class="cv-header">
    <h1>${inline(name)}</h1>
    <p class="role">${inline(role)}</p>
    <p class="contact">${inline(location)}</p>
    <p class="contact">${inline(profiles)}</p>
  </header>
  <main>${body}</main>
</body>
</html>`;
}

fs.mkdirSync(buildDir, { recursive: true });
for (const document of documents) {
  fs.writeFileSync(path.join(buildDir, document.output), renderDocument(document), 'utf8');
  process.stdout.write(`${document.output}\n`);
}
