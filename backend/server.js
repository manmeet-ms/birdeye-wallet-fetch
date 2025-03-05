import express from 'express';
import cors from 'cors';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; // using import syntax
/*
express
cors
@blockfrost/blockfrost-js
*/
const app = express();

const port = 3000;

app.use(cors());


 
const API = new BlockFrostAPI({
    projectId: 'preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3', // see: https://blockfrost.io
});

const lace_addr = {
    name: 'LACE',
    wallet_address: 'addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw',
};
const eternl_addr = {
    name: 'ETERNL',
    wallet_address: 'addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6',
};
const vespr_addr = {
    name: 'VESPR',
    wallet_address: 'addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc',
};
const tyhpon_addr = {
    name: 'TYHPON',
    wallet_address: 'addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n',
};
const yoroi_addr = {
    name: 'YOROI',
    wallet_address: 'addr_test1qrt3vdtc8n3uvhrd34a40y2eg584slkyttehuntnum48s8257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putesyxzl8e',
};
const gero_addr = {
    name: 'GERO',
    wallet_address: 'addr_test1qppl2kcdqmzwt3yzdcndfuhg9acx5zgfde76882magqyvxs428mpyg0ce8pn72s9gx7hhmzn3n0hetcr863qd2d4j44sdkf9zt',
};

const wallets = [lace_addr, eternl_addr, vespr_addr, gero_addr, tyhpon_addr];

try {
    const emptyarray_of_wallet_balances=[]
    console.log('fetching wallets amounts');
    wallets.map(async (item) => {
        const address = await API.addresses(item.wallet_address);
        let current_balance = `${item.name} ${address.amount[0].quantity/1000000}` 
        let current_balance_as_json = {
            wallet_name:item.name,
wallet_balance:address.amount[0].quantity/1000000
            }
         
        emptyarray_of_wallet_balances.push(current_balance_as_json)
        console.log(current_balance);
        app.get('/', (req, res) => {
            res.send(emptyarray_of_wallet_balances);
        });
        
        return true;
    });
    // const address = await API.addresses('addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6');
    // console.log('Wallet amount', address.amount[0].quantity);
    // app.send(address.amount[0].quantity);
} catch (error) {
    console.error(error);
} finally {
    console.log('success');
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
    /*
    
    try {
        const latestBlock = await API.blocksLatest();
        const networkInfo = await API.network();
        const latestEpoch = await API.epochsLatest();
        const health = await API.health();
        const pools = await API.pools({ page: 1, count: 10, order: 'asc' });

        const address = await API.addresses('addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6');
        
        
        // console.log('pools', pools);
        console.log('address', address);
        console.log('networkInfo', networkInfo);
        // console.log('latestEpoch', latestEpoch);
        // console.log('latestBlock', latestBlock);
        // console.log('health', health);
    } catch (err) {
        console.log('error', err);
    }
        */