---
'terracotta': patch
---

Fix the types for CommonJS consumers.

`import` and `require` shared one `.d.ts`, which the package's `"type": "module"`
marks as ESM. TypeScript therefore described the CommonJS build as an ES module
under `moduleResolution: "node16"` and `"nodenext"`. Each condition now has its
own declaration file, `index.d.ts` for `import` and `index.d.cts` for `require`.
