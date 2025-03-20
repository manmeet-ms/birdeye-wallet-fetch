import React from 'react'
import axios from 'axios';

const CardanoWalletAssets  = async () => {


    const options = {
      method: 'GET',
      url: 'https://cardano-preprod.blockfrost.io/api/v0/assets',
      headers: {Project_id: 'preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3'}
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    return (

    <div>CardanoWalletAssets </div>
  )
}

export default CardanoWalletAssets 