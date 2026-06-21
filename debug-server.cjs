const ts = require('typescript');
const fs = require('fs');

const content = fs.readFileSync('server.ts', 'utf8');
const scanner = ts.createScanner(ts.ScriptTarget.Latest, false);
scanner.setText(content);

while (true) {
  const token = scanner.scan();
  if (token === ts.SyntaxKind.EndOfFileToken) break;
  const start = scanner.getTokenPos();
  const end = scanner.getTextPos();
  const text = content.substring(start, end);
  if (text.includes("JSONBin") || text.includes("jsonbin")) {
    console.log(`Token: ${ts.SyntaxKind[token]} (${token}) at ${start}-${end} -> ${JSON.stringify(text)}`);
  }
}
