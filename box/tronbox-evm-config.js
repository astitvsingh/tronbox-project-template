/**
 * TronBox EVM Configuration for EVM-Compatible Networks.
 * Provides settings for deploying contracts on networks that are compatible with the Ethereum Virtual Machine (EVM).
 *
 * Attributes:
 * - `privateKey`: The private key for signing transactions on the specific network (use environment variables).
 * - `fullHost`: The HTTP endpoint for the RPC node of the EVM-compatible blockchain.
 * - `network_id`: The ID of the EVM-compatible network.
 *
 * Usage: To use any EVM-compatible network, set the corresponding private key and use the `--evm` flag:
 * ```bash
 * source .env && tronbox migrate --network <network> --evm
 * ```
 */
module.exports = {
  networks: {
    /**
     * BTTC Mainnet Configuration (BitTorrent Chain).
     * @type {object}
     */
    bttc: {
      privateKey: process.env.PRIVATE_KEY_BTTC, // Private key for signing transactions on BTTC mainnet
      /**
       * Create a .env file (it must be gitignored) containing:
       *
       *   export PRIVATE_KEY_BTTC=<your-bttc-private-key>
       */
      fullHost: "https://rpc.bt.io", // RPC endpoint for BTTC mainnet
      // gas: 8500000, // (Optional) Gas limit for each transaction
      // gasPrice: '500000000000000', // (Optional) Gas price in wei (500,000 gwei)
      network_id: "1", // Network ID for BTTC Mainnet
    },

    /**
     * Donau Testnet Configuration for BTTC.
     * @type {object}
     */
    donau: {
      privateKey: process.env.PRIVATE_KEY_DONAU, // Private key for signing transactions on Donau testnet
      fullHost: "https://pre-rpc.bt.io", // RPC endpoint for Donau testnet
      network_id: "2", // Network ID for Donau Testnet
    },

    /**
     * Local Development Configuration for EVM-Compatible Chains.
     * Typically used with local nodes or ganache.
     * @type {object}
     */
    development: {
      privateKey: process.env.PRIVATE_KEY_DEV, // Private key for signing transactions on local node
      fullHost: "http://127.0.0.1:8545", // Local EVM-compatible node endpoint
      network_id: "9", // Network ID for local development
    },
  },

  /**
   * Solidity Compiler Configuration for EVM-Compatible Chains.
   * Defines the compiler version and optimization settings for EVM-compatible blockchains.
   *
   * Attributes:
   * - `version`: The version of the Solidity compiler to be used.
   * - `settings.optimizer`: (Optional) Controls whether optimization is enabled during compilation.
   * - `settings.evmVersion`: (Optional) Specifies the EVM version to target for compilation.
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
      version: "0.8.7", // Solidity compiler version for EVM compatibility
      settings: {
        // Optional optimization settings
        // optimizer: {
        //   enabled: true,
        //   runs: 200
        // },
        // evmVersion: 'istanbul' // Target EVM version
      },
    },
  },
};
