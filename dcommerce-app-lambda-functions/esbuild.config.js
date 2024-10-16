const glob = require("glob");
const path = require("path");

const src = path.resolve(__dirname, "functions");

const entries = () => {
  const files = glob.sync(`${src}/**/*`);
  return files
    .filter((file) => file.indexOf("index.ts") > -1)
    .map((file) => `./${path.relative(path.resolve(__dirname), file)}`);
};

require("esbuild").build({
  entryPoints: entries(),
  bundle: true,
  outbase: "./functions",
  outdir: "dist",
  platform: "node",
  target: "node16",
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
});
