pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "base64-sol/base64.sol";

contract MyEpicNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";
    uint256 public MAX_SUPPLY = 169;
    uint256 public currentSupply = 0;

    struct Words {
        string first;
        string second;
        string third;
        string bgColor;
    }

    event NewMint(address _address, uint256 _tokenId);

    string[] private firstWords = [
        "Illustrious",
        "Aberrant",
        "Abashed",
        "Elderly",
        "Grubby",
        "Messy",
        "Physical",
        "Mellow",
        "One",
        "Slippery"
    ];

    string[] private secondWords = [
        "Fierce",
        "Steep",
        "Harsh",
        "Macho",
        "Enthusiastic",
        "Quaint",
        "Determined",
        "Colossal",
        "Juicy",
        "Abnormal"
    ];

    string[] private thirdWords = [
        "Economist",
        "Player",
        "Customer",
        "Elephant",
        "Champion",
        "Psychedelic",
        "Woman",
        "Man",
        "Child",
        "Hedgehog"
    ];

    string[] private bgColors = [
        "#D7DFEC",
        "#8CB0EA",
        "#216CE4",
        "#21E42A",
        "#FADBD8",
        "#28B463",
        "#1ABC9C",
        "#5DADE2",
        "#DAF7A6",
        "#FFC300",
        "#2471A3",
        "#FADBD8",
        "#28B463",
        "#1ABC9C",
        "#5DADE2",
        "#DAF7A6",
        "#F1948A",
        "#85C1E9",
        "#C39BD3",
        "#7D3C98",
        "#138D75",
        "#EBEDEF"
    ];

    constructor() ERC721("Random Words", "RW") {}

    function mint(uint256 _quantity) public {
        require(_quantity > 0);
        require(tokenCounter.current() + _quantity + 1 <= MAX_SUPPLY);
        for (uint256 i = 0; i < _quantity; ++i) {
            _safeMint(msg.sender, tokenCounter.current());
            emit NewMint(msg.sender, tokenCounter.current());
            tokenCounter.increment();
            currentSupply += 1;
        }
    }

    function _createRandom(uint256 _tokenId)
        private
        view
        returns (uint256[4] memory)
    {
        uint256 pseudoRandom = uint256(
            keccak256(abi.encodePacked(_tokenId, msg.sender, block.timestamp))
        );
        uint256[4] memory randomIndices;
        randomIndices[0] = pseudoRandom >> 1;
        randomIndices[1] = pseudoRandom >> 2;
        randomIndices[2] = pseudoRandom >> 3;
        randomIndices[3] = pseudoRandom >> 4;

        return randomIndices;
    }

    function getWords(uint256[4] memory _idArray)
        private
        view
        returns (Words memory)
    {
        string memory first = firstWords[_idArray[0] % firstWords.length];
        string memory second = secondWords[_idArray[1] % secondWords.length];
        string memory third = thirdWords[_idArray[2] % thirdWords.length];
        string memory bgColor = bgColors[_idArray[3] % bgColors.length];
        return Words(first, second, third, bgColor);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId));
        uint256[4] memory randIds = _createRandom(_tokenId);
        Words memory words = getWords(randIds);

        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
                "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
                '<rect width="100%" height="100%" fill="',
                words.bgColor,
                '" />',
                '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
                words.first,
                " ",
                words.second,
                " ",
                words.third,
                "</text></svg>"
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    '{"name": "Random Words #',
                                    Strings.toString(_tokenId),
                                    '", "image": "data:image/svg+xml;base64,',
                                    Base64.encode(bytes(svg)),
                                    '"}'
                                )
                            )
                        )
                    )
                )
            );
    }
}
