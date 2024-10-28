// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {IUniSwapV2Router02} from "./Interfaces.sol";

contract PublicSale is Pausable, AccessControl {
    IUniSwapV2Router02 router;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant EXECUTER_ROLE = keccak256("EXECUTER_ROLE");

    // 00 horas del 28 de octubre del 2024 GMT
    uint256 constant startDate = 1730073600;

    // Maximo price NFT
    uint256 constant MAX_PRICE_NFT = 90_000 * 10 ** 18;

    event PurchaseNftWithId(address account, uint256 id);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function purchaseWithTokens(uint256 _id) public {
        emit PurchaseNftWithId(msg.sender, _id);
    }

    function purchaseWithUSDC(uint256 _id, uint256 _amountIn) external {
        // 1. El comprador llame a USDC y le de allowance al public sale
        //      uint256 precioUSDC = 10000 * 10 ** 6; _amountIn
        //      usdc.connect(comprador).approve(publicSaleAddress, precioUSDC)

        // 2. El public Sale ya tiene el allowance de usar los USDC del comprador
        // usdc.transferFrom(compradorAddress, address(this), _amountIn);
        // dentro de transferFrom, msg.sender sería el PubliSale

        // 3. El public sale tiene en poseción los USDC

        // 4. El public sale ahora puede dar allowance al router
        // usdc.approve(routerAddress, _amountIn);

        // 5. El public sale ahora puede dar llamar al router swapTokensForExactTokens (usdc => BBTKNS)
        // uint256[] memory responses = router.swapTokensForExactTokens(...)
        // uint256 finalPriceUSDC = responses[0]; // el USDC cobrado por el router
        // uint256 vuelto = _amountIn - finalPriceUSDC;

        // 6. darle vuelto al comprador
        // usdc.transfer(compradorAddress, vuelto);

        // transfiere _amountIn de USDC a este contrato
        // llama a swapTokensForExactTokens: valor de retorno de este metodo es cuanto gastaste del token input
        // transfiere el excedente de USDC a msg.sender

        emit PurchaseNftWithId(msg.sender, _id);
    }

    function purchaseWithEtherAndId(uint256 _id) public payable {
        emit PurchaseNftWithId(msg.sender, _id);
    }

    function depositEthForARandomNft() public payable {}

    receive() external payable {
        depositEthForARandomNft();
    }

    ////////////////////////////////////////////////////////////////////////
    /////////                    Helper Methods                    /////////
    ////////////////////////////////////////////////////////////////////////

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
}
