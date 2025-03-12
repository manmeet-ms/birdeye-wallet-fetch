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

const wallets = [
    {
        wallet: 'LACE',
        address: 'addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw',
    },
    {
        wallet: 'ETERNL',
        address: 'addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6',
    },
    {
        wallet: 'VESPR',
        address: 'addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc',
    },
    {
        wallet: 'TYHPON',
        address: 'addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n',
    },
   
    {
        wallet: 'GERO',
        address: 'addr_test1qzfgfqw3adkg93ld6th5ndgq0fzp8fm3vgpzngrkxfytv6257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putes0m7h97',
    },
];

try {
    const emptyarray_of_wallet_balances = [];
    let curent_bal_as_string = new String();
    let counter=1

    wallets.map(async (item) => {
        const address = await API.addresses(item.address);
        let current_balance = `${counter}. ${item.wallet}: \u20B3${address.amount[0].quantity / 1000000}`;
        curent_bal_as_string += `\n${current_balance}`;
        console.log(curent_bal_as_string);
        counter+=1
        
        let current_balance_as_json = {
            wallet: item.wallet,
            balance: address.amount[0].quantity / 1000000,
        };
        
        emptyarray_of_wallet_balances.push(current_balance_as_json);
        // console.log(current_balance); //mapping logs
        app.get('/', (req, res) => {
            // res.send(emptyarray_of_wallet_balances);
            res.send(curent_bal_as_string);
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
