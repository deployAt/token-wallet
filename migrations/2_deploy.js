const StarToken = artifacts.require('StarToken')
const PlanetToken = artifacts.require('PlanetToken')
const GameNFT = artifacts.require('GameNFT')

module.exports = async function (deployer) {
  deployer.deploy(StarToken)
  deployer.deploy(PlanetToken)
  deployer.deploy(GameNFT)
}
