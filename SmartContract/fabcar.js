/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const records = [
            {
		"TransactionData": "Paint touch-up and Final QC Inspection|S|OK",
            },
                        {
		"TransactionData": "Paint touch-up and Final QC Inspection|S|OK|[http://147.8.133.247:6969/1623380249488fig1.png]|https://www.google.com",
            },
        ];

         for (let i = 0; i < records.length; i++) {
             records[i].docType = 'Inspection';
             await ctx.stub.putState('Tx_' + i, Buffer.from(JSON.stringify(records[i])));
             console.info('Added <--> ', records[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, TranNum) {
        const recordAsBytes = await ctx.stub.getState(TranNum); // get the car from chaincode state
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${TranNum} does not exist`);
        }
        console.log(recordAsBytes.toString());
        return recordAsBytes.toString();
    }


    async addRecord(ctx,TranNum,TransactionData) {
        console.info('============= START : Create Record ===========');
        const record = {
            TransactionData
        };
        await ctx.stub.putState(TranNum, Buffer.from(JSON.stringify(record)));
        console.info('============= END : Create Record ===========');
        let txID =  ctx.stub.getTxID();
        record.TranID = txID;
        return ctx.stub.getTxID();
    }

    async queryAllRecords(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}

module.exports = FabCar;
