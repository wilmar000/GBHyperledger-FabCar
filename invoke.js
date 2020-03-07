/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, 'config', 'connection-org1.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('realstate');


        // await contract.submitTransaction('createHouse', 'HOUSE12', '259 Richmond St W, Toronto, ON M5V 3M6', '(416) 368-5600', 'Movie Theater', 'People');
        // console.log('createHouse has been submitted');
        // await contract.submitTransaction('changeHouseOwner', 'HOUSE12', 'Wilmar');
        // console.log('changeHouseOwner has been submitted');
        // await contract.submitTransaction('queryHouse', 'HOUSE12');
        // console.log('queryHouse has been submitted');
        await contract.submitTransaction('queryAllHouses');
        console.log('queryAllHouses has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
