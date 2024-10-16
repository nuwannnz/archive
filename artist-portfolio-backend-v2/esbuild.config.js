const glob = require("glob");
const path = require("path");

const src = path.resolve(__dirname, "./src/functions");

const entries = () => {
  const files = glob.sync(`${src}/**/*`);

  return files
    .filter(
      (file) => file.indexOf(".ts") > -1 && file.indexOf(".service.") === -1
    )
    .map((file) => `./${path.relative(path.resolve(__dirname), file)}`);
};

require("esbuild").build({
  entryPoints: entries(),
  bundle: true,
  outdir: "dist",
  platform: "node",
  target: "node20",
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
});
