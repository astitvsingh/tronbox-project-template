// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Migrations
 * @dev The `Migrations` contract handles tracking and managing deployment steps
 * for smart contracts on the blockchain. It ensures that the deployment process
 * can be easily tracked and resumed if necessary, which is particularly useful 
 * in multi-stage deployments.
 */
contract Migrations {
    /**
     * @notice The address of the contract owner.
     * @dev By default, `owner` is set to the address deploying the contract (`msg.sender`).
     */
    address public owner = msg.sender;

    /**
     * @notice The last completed migration step.
     * @dev This variable stores the latest step of migration completed successfully.
     * It is used to track deployment stages and ensure that each step is completed once.
     */
    uint256 public last_completed_migration;

    /**
     * @notice Restricts function access to only the contract owner.
     * @dev This modifier ensures that certain functions can only be called by the `owner`.
     * If the caller is not the `owner`, the function will revert with an error message.
     */
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    /**
     * @notice Sets the last completed migration step.
     * @dev This function updates the `last_completed_migration` to mark progress in the deployment.
     * It can only be called by the contract `owner`, as enforced by the `restricted` modifier.
     * @param completed The migration step that has just been completed.
     */
    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }
}
