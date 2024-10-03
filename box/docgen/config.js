/**
 * @file box/docgen/config.js
 * @description Configuration file for generating Solidity documentation using `solidity-docgen`.
 */

module.exports = {
  /**
   * Node modules directory for locating dependencies.
   * @type {string}
   */
  NODE_DIR: "node_modules",

  /**
   * Input directory containing the Solidity contracts to be documented.
   * @type {string}
   */
  INPUT_DIR: "box/contracts",

  /**
   * Directory containing docgen templates and configuration settings.
   * @type {string}
   */
  DOCGEN_DIR: "box/docgen",

  /**
   * File containing the list of contracts or paths to exclude from documentation generation.
   * @type {string}
   */
  EXCLUDE_FILE: "box/docgen/exclude.txt",

  /**
   * Output directory for generated documentation in markdown format.
   * @type {string}
   */
  OUTPUT_DIR: "docs/solidity/contracts", // Updated to store documentation in root-level `docs/solidity`

  /**
   * Path to the main README file for documentation.
   * @type {string}
   */
  README_FILE: "docs/solidity/README.md",

  /**
   * Path to the SUMMARY file used for generating the documentation summary.
   * @type {string}
   */
  SUMMARY_FILE: "docs/solidity/SUMMARY.md",
};
