const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreenTokenModuleV", (m) => {
  const deployer = m.getAccount(0);
  const greentoken = m.contract("GreenToken", [deployer]);
  return { greentoken };
});
