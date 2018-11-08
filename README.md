# CrowdFunding
A Crowd Funding Distributed Application

# About
The following Repository contains code and tests for crowdfunding Dapp implemented for the course Distributing Trust and BlockChain under Dr. Sujit Gujar at IIIT Hyderabad

# Team Members

- Arghya Bhattacharya
- Tanu Rathi
- Sarat Adusumilli

# Instllation

## Setting up Environment:
    ```npm install -g truffle```
    ```npm install -g ethereumjs-testrpc```

## Running the Contract
    ```testrpc``` (in new terminal tab)
    ```truffle compile```
    ```truffle migrate```

## Running the front end which is in React.Js
    ```cd appui```
    ```npm start```
    

## Idea of the Platform

- There is a contract which is deployed initially and serves as the Escrow
- Each Item has it's own contract which stores the money and on reaching target sends it to the owner of the item