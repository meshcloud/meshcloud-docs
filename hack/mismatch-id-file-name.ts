import * as fs from "fs";
import * as path from "path";

const docsDir = path.resolve(__dirname, "../docs");

// --- Helper to recursively list .md files ---
function listMdFiles(dir: string): string[] {
    const result: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            result.push(...listMdFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
            result.push(fullPath);
        }
    }

    return result;
}

// --- Helper to extract front-matter ID ---
function extractFrontmatterId(content: string): string | null {
    if (!content.startsWith("---")) return null;
    const end = content.indexOf("\n---", 3);
    if (end === -1) return null;
    const yaml = content.slice(3, end);
    const match = yaml.match(/^\s*id\s*:\s*["']?([^"'\n#]+)["']?\s*$/m);
    return match ? match[1].trim() : null;
}

// --- Main check ---
function main() {
    const files = listMdFiles(docsDir);
    const errors: string[] = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const id = extractFrontmatterId(content);

        if (!id) continue; // Skip files without an ID

        const fileName = path.basename(file, path.extname(file));

        if (id !== fileName) {
            errors.push(`${path.relative(docsDir, file)} → frontmatter id="${id}"`);
        }
    }

    if (errors.length > 0) {
        console.error("❌ Front-matter ID mismatch found in the following files:");
        errors.forEach((e) => console.error("  " + e));
        process.exit(1);
    }

    console.log("✅ All front-matter IDs match their filenames.");
}

main();