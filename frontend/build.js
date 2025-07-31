import { build } from "vite";

(async () => {
  try {
    await build();
    console.log("✅ Build complete!");
  } catch (err) {
    console.error("❌ Build failed:", err);
    process.exit(1);
  }
})();
