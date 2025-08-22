/**
 * Clean up .md files in the docs folder that are not part of sidebars.ts
 */

import fs from "fs";
import path from "path";
import sidebars from "../sidebars";

const filesToIgnore = ['apis.index.md'];

const docsDir = path.join(__dirname, "..", "docs");

// --- Step 1: Extract all .md references from sidebar.ts ---
let sidebarIds = [];
for (const node of sidebars['docs']) {
    collectSidebarIds(node);
}

function collectSidebarIds(node) {
    if (node.type === 'doc') {
        sidebarIds.push(node.id);
    } else if (node.type === 'category') {
        if (typeof node.items[0] === 'string') {
            // This is a flat list of doc IDs
            node.items.forEach(id => sidebarIds.push(id));
        } else {
            // This is a nested category
            node.items.forEach(subNode => collectSidebarIds(subNode));
        }
    }
}

const referencedFiles = new Set();

sidebarIds.forEach((id) => {
    referencedFiles.add(`${id}.md`); // Add .md extension for matching
});

// --- Step 2: Recursively collect all .md files in docs/ ---
function getAllMarkdownFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(filePath));
        } else if (file.endsWith(".md")) {
            results.push(filePath);
        }
    });

    return results;
}

const allMdFiles = getAllMarkdownFiles(docsDir);

// --- Step 3: Delete files not in sidebar ---
let deleted = 0;
allMdFiles.forEach((filePath) => {
    const relative = path.relative(docsDir, filePath);
    if (!referencedFiles.has(relative) && !filesToIgnore.includes(relative)) {
        fs.unlinkSync(filePath); // Comment this line to avoid actual deletion if you want to do a dry run
        console.log("Deleted:", relative);
        deleted++;
    }
});

console.log(`✅ Cleanup complete. Deleted ${deleted} orphan .md files.`);