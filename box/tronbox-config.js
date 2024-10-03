const port = process.env.HOST_PORT || 9090;

/**
 * TronBox Configuration for various Tron networks.
 * Provides network settings to facilitate the deployment and testing of smart contracts on different Tron networks.
 *
 * Attributes:
 * - `privateKey`: The private key for deploying transactions on the specific network.
 *   (Note: Should never be hardcoded or shared. Use environment variables.)
 * - `userFeePercentage`: The percentage of energy cost to be covered by the contract owner.
 *   (Range: 0-100)
 * - `feeLimit`: The maximum amount of TRX that can be spent on a transaction (in `sun`, where 1 TRX = 1,000,000 sun).
 * - `fullHost`: The full HTTP endpoint to interact with the Tron blockchain node.
 * - `network_id`: The ID of the network; specific to the type of Tron network (e.g., "1" for `mainnet`).
 *
 * Usage: To use any network, set the corresponding private key in an environment variable and use the network flag:
 * ```bash
 * source .env && tronbox migrate --network <network>
 * ```
 */
module.exports = {
  networks: {
    /**
     * Mainnet Configuration for Production Deployment.
     * @type {object}
     */
    mainnet: {
      // Private key for signing transactions on the mainnet
      privateKey: process.env.PRIVATE_KEY_MAINNET,
      /**
       * Create a .env file (it must be gitignored) containing:
       *
       *   export PRIVATE_KEY_MAINNET=<your-mainnet-private-key>
       */
      userFeePercentage: 100, // 100% of energy cost covered by contract owner
      feeLimit: 1000 * 1e6, // Maximum fee for transactions in `sun` (1 TRX = 1,000,000 sun)
      fullHost: "https://api.trongrid.io", // Mainnet endpoint for Tron blockchain
      network_id: "1", // Network ID for Tron Mainnet
    },

    /**
     * Shasta Testnet Configuration for Testing and Development.
     * @type {object}
     */
    shasta: {
      privateKey: process.env.PRIVATE_KEY_SHASTA, // Private key for signing transactions on Shasta testnet
      userFeePercentage: 50, // 50% of energy cost covered by contract owner
      feeLimit: 1000 * 1e6, // Maximum fee for transactions in `sun`
      fullHost: "https://api.shasta.trongrid.io", // Endpoint for Shasta testnet
      network_id: "2", // Network ID for Shasta Testnet
    },

    /**
     * Nile Testnet Configuration for Testing.
     * @type {object}
     */
    nile: {
      privateKey: process.env.PRIVATE_KEY_NILE, // Private key for signing transactions on Nile testnet
      userFeePercentage: 100, // 100% of energy cost covered by contract owner
      feeLimit: 1000 * 1e6, // Maximum fee for transactions in `sun`
      fullHost: "https://nile.trongrid.io", // Endpoint for Nile testnet
      network_id: "3", // Network ID for Nile Testnet
    },

    /**
     * Local Development Configuration.
     * Typically used with a local TronBox/TronQuickNode or `tre` docker image.
     * @type {object}
     */
    development: {
      privateKey:
        "0000000000000000000000000000000000000000000000000000000000000001", // Default private key for development
      userFeePercentage: 0, // 0% energy cost covered by contract owner
      feeLimit: 1000 * 1e6, // Maximum fee for transactions in `sun`
      fullHost: "http://127.0.0.1:" + port, // Local node endpoint (default `port` is 9090)
      network_id: "9", // Network ID for local development
    },
  },

  /**
   * Solidity Compiler Configuration.
   * Defines the compiler version and optimization settings.
   *
   * Attributes:
   * - `version`: The version of the Solidity compiler to be used.
   * - `optimizer`: (Optional) Optimization settings for Solidity compilation. Can improve contract performance.
   * - `evmVersion`: (Optional) Specifies the EVM version to compile for.
   *
   * Example:
   * ```json
   * {
   *   optimizer: {
   *     enabled: true,
   *     runs: 200
   *   },
   *   evmVersion: "istanbul"
   * }
   * ```
   */
  compilers: {
    solc: {
      version: "0.8.20", // Solidity compiler version
      // Optional optimization settings
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // evmVersion: 'istanbul' // Target EVM version
    },
  },
};
