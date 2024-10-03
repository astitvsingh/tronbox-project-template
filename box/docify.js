/**
 * @file box/docify.js
 * @description Generates documentation for Solidity contracts using `solidity-docgen`. It scans contract files,
 * creates a summary in GitHub-compatible Markdown format, generates an overview in `README.md`,
 * and creates the corresponding documentation pages.
 */

const path = require("path");
const fs = require("fs");
const spawnSync = require("child_process").spawnSync;

// Import configurations from the config file
const {
  NODE_DIR,
  INPUT_DIR,
  DOCGEN_DIR,
  OUTPUT_DIR,
  README_FILE,
  SUMMARY_FILE,
  EXCLUDE_FILE,
} = require("./docgen/config");

const excludeList = lines(EXCLUDE_FILE).map((line) => INPUT_DIR + "/" + line);
const relativePath = path.relative(path.dirname(SUMMARY_FILE), OUTPUT_DIR);

try {
  // Validate if required directories exist.
  validatePathExists(INPUT_DIR);
  validatePathExists(DOCGEN_DIR);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

/**
 * Reads lines from a file.
 * @param {string} pathName - The path of the file to read lines from.
 * @returns {string[]} The array of lines from the file.
 */
function lines(pathName) {
  try {
    return fs
      .readFileSync(pathName, { encoding: "utf8" })
      .split("\r")
      .join("")
      .split("\n");
  } catch (error) {
    console.error(`Error reading file at ${pathName}: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Recursively scans the directory structure to create a documentation summary.
 * @param {string} pathName - The directory path to scan.
 * @param {string} indentation - The current level of indentation in the summary file.
 */
function scan(pathName, indentation) {
  if (!excludeList.includes(pathName)) {
    try {
      if (fs.lstatSync(pathName).isDirectory()) {
        fs.appendFileSync(
          SUMMARY_FILE,
          `${indentation}- ${path.basename(pathName)}\n`
        );
        for (const fileName of fs.readdirSync(pathName))
          scan(pathName + "/" + fileName, indentation + "  ");
      } else if (pathName.endsWith(".sol")) {
        const text = path.basename(pathName).slice(0, -4);
        const link = pathName.slice(INPUT_DIR.length, -4);
        fs.appendFileSync(
          SUMMARY_FILE,
          `${indentation}- [${text}](${relativePath}${link}.md)\n`
        );
      }
    } catch (error) {
      console.error(`Error scanning path ${pathName}: ${error.message}`);
    }
  }
}

/**
 * Recursively fixes Markdown formatting by ensuring consistent spacing between lines.
 * @param {string} pathName - The directory or file path to fix formatting for.
 */
function fix(pathName) {
  try {
    if (fs.lstatSync(pathName).isDirectory()) {
      for (const fileName of fs.readdirSync(pathName))
        fix(pathName + "/" + fileName);
    } else if (pathName.endsWith(".md")) {
      fs.writeFileSync(
        pathName,
        lines(pathName)
          .filter((line) => line.trim().length > 0)
          .join("\n\n")
      );
    }
  } catch (error) {
    console.error(`Error fixing path ${pathName}: ${error.message}`);
  }
}

/**
 * Validates if the provided path exists.
 * @param {string} pathName - The path to validate.
 * @throws Will throw an error if the path does not exist.
 */
function validatePathExists(pathName) {
  if (!fs.existsSync(pathName)) {
    throw new Error(`The required path "${pathName}" does not exist.`);
  }
}

/**
 * Generates the README file with an overview and table of contents.
 */
function generateReadme() {
  try {
    // Overview section
    const overviewContent = `
# Solidity Project

## Overview

This documentation provides details about all Solidity contracts within the project.
The purpose of this documentation is to help developers understand the structure,
usage, and functionality of each contract.

## Table of Contents

- [SUMMARY](./SUMMARY.md)

`;

    // Write to README_FILE
    fs.writeFileSync(README_FILE, overviewContent);
    console.log(`Generated README at ${README_FILE}`);
  } catch (error) {
    console.error(`Error generating README file: ${error.message}`);
    process.exit(1);
  }
}

// Initialize SUMMARY.md and .gitbook.yaml
try {
  fs.writeFileSync(SUMMARY_FILE, "# Summary\n\n");
  fs.writeFileSync(".gitbook.yaml", "root: ./\n");
  fs.appendFileSync(".gitbook.yaml", "structure:\n");
  fs.appendFileSync(".gitbook.yaml", `  readme: ${README_FILE}\n`);
  fs.appendFileSync(".gitbook.yaml", `  summary: ${SUMMARY_FILE}\n`);
} catch (error) {
  console.error(`Error initializing documentation files: ${error.message}`);
  process.exit(1);
}

// Generate README file
generateReadme();

// Scan the input directory to create a summary
scan(INPUT_DIR, "");

// Set up arguments for `solidity-docgen`
const solcModulePath = path.resolve(NODE_DIR, "solc");
let args = [
  path.join(NODE_DIR, "solidity-docgen", "dist", "cli.js"),
  `--input=${INPUT_DIR}`,
  `--output=${OUTPUT_DIR}`,
  `--templates=${DOCGEN_DIR}`,
  `--solc-module=${solcModulePath}`,
  `--solc-settings=${JSON.stringify({
    remappings: ["@openzeppelin/=./node_modules/@openzeppelin/"],
    optimizer: { enabled: true, runs: 200 },
  })}`,
];

// Validate if `solc` is present
try {
  require(solcModulePath);
} catch (e) {
  console.error(
    `Solidity compiler module not found at "${solcModulePath}". Please ensure 'solc' is installed.`
  );
  process.exit(1);
}

// Execute `solidity-docgen` CLI
const result = spawnSync("node", args, {
  stdio: ["inherit", "inherit", "pipe"],
});

if (result.error) {
  console.error(`Error executing solidity-docgen: ${result.error.message}`);
  process.exit(1);
}

if (result.stderr.length > 0) {
  console.error(`Error in solidity-docgen output: ${result.stderr.toString()}`);
  process.exit(1);
}

// Fix the output formatting
fix(OUTPUT_DIR);
