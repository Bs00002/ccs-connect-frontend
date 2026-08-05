const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'menu-items');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // We want to replace `url: '/something'` with `url: '/app/something'`
    // But be careful not to replace `url: '/app/...` if it already exists, or `http` links.
    // Also, Login is an exception: `url: '/login'` is correct because LoginRoutes manages it?
    // Let's check LoginRoutes path.
    content = content.replace(/url:\s*'\/([^']+)'/g, (match, p1) => {
      if (p1.startsWith('app/') || p1 === 'login' || p1 === 'register' || p1.startsWith('forgot-password')) {
        return `url: '/${p1}'`;
      }
      return `url: '/app/${p1}'`;
    });
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Fixed menu items URLs");
