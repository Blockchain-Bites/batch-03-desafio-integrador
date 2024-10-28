require("dotenv").config();

const {
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
} = require("../utils");

const { getRootFromMT } = require("../utils/merkleTree");

var MINTER_ROLE = getRole("MINTER_ROLE");
var BURNER_ROLE = getRole("BURNER_ROLE");

// Publicar NFT en Amoy
async function deployAmoy() {
  var relAddMumbai; // relayer amoy
  var name = "Chose a name";
  var symbol = "Chose a symbol";

  // utiliza deploySC
  // utiliza printAddress
  // utiliza ex
  // utiliza ex
  // utiliza verify

  await verify(implAdd, "CUYNFT");
}

// Publicar UDSC, Public Sale y Bbites Token en Sepolia
async function deploySepolia() {
  var relAddSepolia; // relayer sepolia

  // var psC Contrato
  // deploySC;
  // var bbitesToken Contrato
  // deploySC;
  // var usdc Contrato
  // deploySC;

  // var impPS = await printAddress("PublicSale", await psC.getAddress());
  // var impBT = await printAddress("BBitesToken", await bbitesToken.getAddress());

  // set up
  // script para verificacion del contrato
}

deployAmoy()
  // deploySepolia()
  //
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
