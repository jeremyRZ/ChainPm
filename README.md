# ChainPM: a Blockchain 3.0 paradigm for digital twins in construction project management
## Introduction
This repository contains the code for [A blockchain 3.0 paradigm for digital twins in construction project management](https://doi.org/10.1016/j.autcon.2022.104645). The paper proposes ChainPM as a Blockchain 3.0 paradigm. ChainPM extends Blockchain 2.0 with innovative indexing, query, and analysis function sets for key CPM data. Experimental results from a pilot study of a modular construction project showed that the information synchronization could be increased by 100 to 500 times, and query and analytical functions worked equally well without network connections. ChainPM contributes to a novel trend of Blockchain 3.0 paradigms for CPM digital twins, emphasizing indexing key CPM data, combinatorial query, digital authorship, and fast response without downgrading the ‘single source of truth.’ For practitioners, ChainPM addresses key barriers of Internet reliance and information delay to CPM digital twins.

## Architecture
![Architecture](https://github.com/jeremyRZ/ChainPM/blob/main/Architecture.png)
### WebSocket
The use of WebSocket is intended to enable a smooth flow between Cached Twin and the application layer. In the WebSocket API, the browser and server only need to complete a single handshake, and a persistent connection can be created directly between the two and data can be transferred in both directions.
### Cached Twin
The Cached Twin sublayer aims to improve the performance of indexing and analytics functions. Indexing and analytics are vital to Blockchain 3.0 in ChainPM. 
### Smart Contract
Smart contracts based on the Hyperledger Fabric development platform are the medium through which the upper layer applications interact with the underlying blockchain platform.
## Citation
Please consider citing our work if you found this code or our paper beneficial to your research.
```
@article{ZHAO2023104645,
    title = {A blockchain 3.0 paradigm for digital twins in construction project management},
    author = {Rui Zhao and Zhe Chen and Fan Xue},
    journal = {Automation in Construction},
    volume = {145},
    pages = {104645},
    year = {2023},
    issn = {0926-5805},
    doi = {https://doi.org/10.1016/j.autcon.2022.104645},
    url = {https://www.sciencedirect.com/science/article/pii/S0926580522005155}
}
```
## License
[Apache License 2.0](https://github.com/jeremyRZ/ChainPM/blob/main/LICENSE)
