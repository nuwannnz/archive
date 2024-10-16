require("esbuild").build({
  entryPoints: ["./src/lambda/*.ts"],
  bundle: true,
  outdir: "dist",
  platform: "node",
  target: "node18",
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
  external: ["@aws-sdk"],
});
