export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // our release commits use the "release" type
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "revert",
        "release",
      ],
    ],
    "header-max-length": [2, "always", 72],
    // one-line messages only: no body
    "body-empty": [2, "always"],
    "footer-empty": [2, "always"],
  },
};
