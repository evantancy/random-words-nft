pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "base64-sol/base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;

    struct Words {
        string first;
        string second;
        string third;
    }

    mapping(uint256 => Words) private tokenIdToWords;

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

    constructor() ERC721("Random Words", "RW") {}

    function mint() public {
        uint256 tokenId = tokenCounter.current();

        tokenIdToWords[tokenId] = _createRandomWords(tokenId);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, getTokenURI(tokenId));

        tokenCounter.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );
        emit NewMint(msg.sender, tokenId);
    }

    function _createRandomWords(uint256 _tokenId)
        private
        view
        returns (Words memory)
    {
        uint256 pseudoRandom = uint256(
            keccak256(abi.encodePacked(_tokenId, msg.sender, block.timestamp))
        );

        string memory first = firstWords[
            (pseudoRandom >> 1) % firstWords.length
        ];
        string memory second = secondWords[
            (pseudoRandom >> 2) % secondWords.length
        ];
        string memory third = thirdWords[
            (pseudoRandom >> 3) % thirdWords.length
        ];

        return Words(first, second, third);
    }

    function createSvg(Words memory _words)
        public
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
                    "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
                    '<rect width="100%" height="100%" fill="black" />',
                    '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
                    _words.first,
                    " ",
                    _words.second,
                    " ",
                    _words.third,
                    "</text></svg>"
                )
            );
    }

    /// @dev View metadata for a specific token
    /// @param _tokenId of token you wish to view metadata
    /// @return base64 encoded string
    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        Words memory words = tokenIdToWords[_tokenId];

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
                                    Base64.encode(bytes(createSvg(words))),
                                    '"}'
                                )
                            )
                        )
                    )
                )
            );
    }
}
