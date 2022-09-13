# ChainPM: a Blockchain 3.0 paradigm for digital twins in construction project management
## Introduction
This document contains the main code used by ChainPM, including the WebSocket server, Cached Twin, and the smart contracts used by the blockchain.
## Architecture
![Architecture](https://github.com/jeremyRZ/ChainPM/blob/main/Architecture.png)
### WebSocket
The use of WebSocket is intended to enable a smooth flow between Cached Twin and the application layer. In the WebSocket API, the browser and server only need to complete a single handshake, and a persistent connection can be created directly between the two and data can be transferred in both directions.
### Cached Twin
The Cached Twin sublayer aims to improve the performance of indexing and analytics functions. Indexing and analytics are vital to Blockchain 3.0 in ChainPM. 
### Smart Contract
Smart contracts based on the Hyperledger Fabric development platform are the medium through which the upper layer applications interact with the underlying blockchain platform.
## License
[Apache License 2.0](https://github.com/jeremyRZ/ChainPM/blob/main/LICENSE)
