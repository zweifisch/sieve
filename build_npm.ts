import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";


await emptyDir("./npm")

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "@zf/sieve",
    version: Deno.args[0],
    description: "sieve: a simple yet efficient cache",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/zweifisch/sieve.git",
    },
    bugs: {
      url: "https://github.com/zweifisch/sieve/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE")
    Deno.copyFileSync("README.md", "npm/README.md")
  },
})
