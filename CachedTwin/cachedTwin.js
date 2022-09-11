const express = require('express');
// 用于处理post请求的消息体
const bodyParser = require('body-parser');
const app = express();
const Records = require('./sqlite').Records;

// 使用body-parser,支持编码为json的请求体
app.use(bodyParser.json());
// 支持编码为表单的消息体
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '.',  'connection-org1.json');

const port = process.env.PORT || 3002
// 获取记录列表
app.get('/records', (req, res, next) => {
    Records.all((err, records) => {
        if (err) return next(err);
        res.send(records)
    })
    
});
// 根据id获取某一份记录
app.get('/recordsById/:id', (req, res, next) => {
    Records.findById(req.params.id, (err, records) => {
        if (err) return next(err);
        res.send(records)
    })
});
// 根据Date获取某一份记录
app.get('/recordsByDate/:Date',  (req, res, next) => {
    Records.findByDate(req.params.Date, (err, records) => {
        if (err) return next(err);
        res.send(records)
    })
});
// 根据UserID获取某一份记录
app.get('/recordsByUserID/:userID',(req, res, next) => {
    Records.findByUserID(req.params.userID, (err, records) => {
        if (err) return next(err);
        res.send(records)
    })
});
// 根据UUID获取某一份记录
app.get('/recordsByUUID/:UUID', async function (req, res, next) {
    Records.findByUUID(req.params.UUID, (err, records) => {
        if (err) return next(err);
        res.send(records)
    })
});
// 根据TaskID获取某一份记录
app.get('/recordsByTaskID/:taskID', async function (req, res, next) {
    Records.findByTaskID(req.params.taskID, (err, records) => {
        if (err) return next(err);
        res.send(records)
    })
});
// // 删除一份记录
// app.delete('/records/:id', (req, res, next) => {
//     Records.delete(req.params.id, (err, article) => {
//         if (err) return next(err);
//         res.send("删除成功")
//     })
// });

// 添加一份记录 使用消息体解析
// var cache = {};
// var middware = (req,res,next)=>{
//     const key = req.url;
//     if(cache[key]) {
//         res.send('from cache');
//     } else {
//         res.sendResponse = res.send;
//         res.send = (body)=>{
//             cache[key] = body;
//             res.sendResponse(body);
//         }
//         next();
//     }
// }

app.post('/records', async function (req, res, next) {
    let TranID = '';

    try {
        let id = 0;
        Records.create({
            "tranID":TranID,
            "UUID": req.body.UUID ? req.body.UUID : '',
            "userID": req.body.userID ? req.body.userID : '',
            "taskID": req.body.taskID ? req.body.taskID : '',
            "ipAddr": req.body.ipAddr ? req.body.ipAddr : '',
            "channal": req.body.channal ? req.body.channal : '',
            "Date": req.body.Date ? req.body.Date : ''
            }, (err, data) => {
                if (err) return next(err);
                Records.findLatest((err, records) => {
                    //res.send("The next transaction block is Tx_" ,records+1)
                    if (err) return next(err);
                    id = records["last_insert_rowid()"]+1
                    console.log("id is ",id)
                    res.status(200).json("Add success. The next transaction block is Tx_"+ id)
                })
        });

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');

        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.

        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')

        const result = await contract.submitTransaction('addRecord',id, req.body.TransactionData);
        TranID = result.toString();
        console.log(`Transaction has been evaluated, TranID is: ${result.toString()}`);
        // res.send('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();
        console.log("id is ",id)
        Records.updateTranID({
            "id":id-1,
            "tranID": TranID
            }, (err, data) => {
                if (err) return next(err);
        });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.post('/addrecords', async function (req, res, next) {
    let TranID = '';

    try {
        let id = 0;
        Records.create({
            "tranID":TranID,
            "UUID": req.body.UUID ? req.body.UUID : '',
            "userID": req.body.userID ? req.body.userID : '',
            "taskID": req.body.taskID ? req.body.taskID : '',
            "ipAddr": req.body.ipAddr ? req.body.ipAddr : '',
            "channal": req.body.channal ? req.body.channal : '',
            "Date": req.body.Date ? req.body.Date : ''
            }, (err, data) => {
                if (err) return next(err);
                Records.findLatest((err, records) => {
                    //res.send("The next transaction block is Tx_" ,records+1)
                    if (err) return next(err);
                    id = records["last_insert_rowid()"]+1
                    console.log("id is ",id)
                    res.status(200).json("Add success. The next transaction block is Tx_"+ id)
                })
        });

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})


// 更新一份记录数据
app.put('/records/:id', (req, res, next) => {
    Records.update({
        "id":req.params.id,
        "TranNum": req.body.TranNum ? req.body.TranNum : '',
        "TranID": req.body.TranID ? req.body.TranID : '',
        "UUID": req.body.UUID ? req.body.UUID : '',
        "UserID": req.body.UserID ? req.body.UserID : '',
        "TaskID": req.body.TaskID ? req.body.TaskID : '',
        "InspectionValue": req.body.InspectionValue ? req.body.InspectionValue : '',
        "Result": req.body.Result ? req.body.Result : '',
        "Date": req.body.Date ? req.body.Date : ''
    }, (err, data) => {
        if(err) return next(err);
        res.send('Update success')
    });
})


app.listen(port, () => {
    console.log(`server success localhost:${port}`)
})
