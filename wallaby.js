
module.exports = wallaby => ({
  files: ["src/**/*.ts?(x)"],
  tests: ["tests/**/*.test.ts?(x)"],

  testFramework: "jest",
  env: { type: "node" },
})