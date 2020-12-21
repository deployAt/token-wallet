const MarsToken = artifacts.require('MarsToken')
const JupiterToken = artifacts.require('JupiterToken')
const ArtNFT = artifacts.require('ArtNFT')
const GameNFT = artifacts.require('GameNFT')

module.exports = async function (deployer, _network, addresses) {
  const [user0, user1, _] = addresses
  deployer.deploy(MarsToken)
  deployer.deploy(JupiterToken)

  await deployer.deploy(ArtNFT)
  const artNFT = await ArtNFT.deployed()
  await artNFT.mint(user0, 'Mona Lisa')

  await deployer.deploy(GameNFT)
  const gameNFT = await GameNFT.deployed()
  await gameNFT.mint(user0, 'Helm of Chaos')
  await gameNFT.mint(user0, 'Sword of Hellfire')

  await gameNFT.mint(user1, 'Charm of Mana')
  await gameNFT.mint(user1, 'Ring of Life')

  // console.log('uri', await artNFT.tokenURI(1))
  // console.log('balance', await artNFT.balanceOf(user0))
}
