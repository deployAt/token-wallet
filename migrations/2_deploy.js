const StarToken = artifacts.require('StarToken')
const GameNFT = artifacts.require('GameNFT')

module.exports = async function (deployer) {
  deployer.deploy(StarToken)
  deployer.deploy(GameNFT)
}
