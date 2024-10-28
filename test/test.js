var { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
var { expect } = require("chai");
var { ethers } = require("hardhat");
var { time } = require("@nomicfoundation/hardhat-network-helpers");

const { getRole, deploySC, deploySCNoUp, ex, pEth } = require("../utils");

const whitelistWallets = require("../wallets/walletList");

const { getRootFromMT, getProofs } = require("../utils/merkleTree");

// 00 horas del 28 de octubre del 2024 GMT
var startDate = 1730073600;
var MINTER_ROLE = getRole("MINTER_ROLE");

describe("Testing Airdrop", function () {
  async function deployFixture() {
    const [owner, alice] = await ethers.getSigners();
    var relAddAmoy = "0x2Af0ee023D513Eb263F37d4B206fd6D5fA8B50fD";

    var name = "Cuyes NFT Collection";
    var symbol = "CUYNFT";
    var nftContract = await deploySC("CuyCollectionNft", [name, symbol]);

    // set up
    var root = getRootFromMT();

    await ex(nftContract, "grantRole", [MINTER_ROLE, relAddAmoy], "GR");
    await ex(nftContract, "updateRoot", [root], "UR");

    return { nftContract, owner, alice };
  }

  describe("Account minting", () => {
    var walletSigners;
    before(async () => {
      // 1 ether en hexadecimal
      var ONE_ETHER = `0x${ethers.parseEther("1").toString(16)}`;

      // Crea un array de billeteras con balance
      var getWalletsPromises = whitelistWallets
        .slice(0, 10)
        .map(async ({ address, privateKey }) => {
          await network.provider.send("hardhat_setBalance", [
            address,
            ONE_ETHER,
          ]);
          return new ethers.Wallet(privateKey, ethers.provider);
        });

      // Esperar a que terminen los requests
      walletSigners = await Promise.all(getWalletsPromises);
    });

    it("Reclmar NFTs desde wallet list", async () => {
      const { nftContract, owner, alice } = await loadFixture(deployFixture);

      var bal = await ethers.provider.getBalance(walletSigners[0].address);
      console.log(bal);
      return;
      for (var [i, wallet] of walletSigners.entries()) {
        // obtener pruebas
        // var proofs;

        // acuñar los nfts
        // nftContract.connect(wallet).safeMintWhiteList(...)

        // verificar que es dueño
        // var owner = nftContract.ownerOf(id)
        // expect(owner) to be equal to wallet.address
        var proofs = getProofs(i + 1000, wallet.address);
        await nftContract
          .connect(wallet)
          .safeMintWhiteList(wallet.address, i + 1000, proofs);
        var ownerNFT = await nftContract.ownerOf(i + 1000);
        expect(ownerNFT).to.be.equal(wallet.address);
      }
    });
  });
});
