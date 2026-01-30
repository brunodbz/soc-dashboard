import * as fs from 'fs';
import * as path from 'path';

const postcssConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

fs.writeFileSync(
  path.join(process.cwd(), 'postcss.config.js'),
  `export default ${JSON.stringify(postcssConfig, null, 2)}`
);
