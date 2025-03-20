import axios from "axios";
import { AudioLines, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import "../../index.css";

const V1 = () => {
  const [walletsData, setWalletsData] = useState([
    {
      wallet: "LACE",
      address:
        "addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw",
      balance: `\u20B3 0.00`,
    },
    {
      wallet: "ETERNL",
      address:
        "addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6",
      balance: `\u20B3 0.00`,
    },
    {
      wallet: "VESPR",
      address:
        "addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc",
      balance: `\u20B3 0.00`,
    },
    {
      wallet: "TYHPON",
      address:
        "addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n",
      balance: `\u20B3 0.00`,
    },
    {
      wallet: "YOROI NIGHTLY",
      address:
        "addr_test1qzfgfqw3adkg93ld6th5ndgq0fzp8fm3vgpzngrkxfytv6257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putes0m7h97",
      balance: `\u20B3 0.00`,
    },
    {
      wallet: "GERO BETA",
      address:
        "addr_test1qppl2kcdqmzwt3yzdcndfuhg9acx5zgfde76882magqyvxs428mpyg0ce8pn72s9gx7hhmzn3n0hetcr863qd2d4j44sdkf9zt",
      balance: `\u20B3 0.00`,
    },
  ]);
  const [balanceData, setBalanceData] = useState("");
  const [walletArray, setWalletArray] = useState([]);

  const fetchAssets = async () => {
    try {
      let empty_push = [];
      let empty_string = "";
      let empty_string_br_tag = "";
      let promises = [];

      // Create a copy of the walletsData to update
      const updatedWalletsData = [...walletsData];

      // Create array of promises for all API calls
      promises = updatedWalletsData.map(async (item, index) => {
        const balanceOptions = {
          method: "GET",
          url: `https://cardano-preprod.blockfrost.io/api/v0/addresses/${item.address}`,
          headers: { Project_id: "preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3" },
        };

        return axios
          .request(balanceOptions)
          .then(({ data }) => {
            const balance = (data.amount[0].quantity / 1000000).toFixed(2);

            // Update the wallet in our copied array
            updatedWalletsData[index] = {
              ...item,
              // balance: `\u20B3\uffa0${balance}`,
              balance: `\u20B3${balance}`,
            };

            empty_push.push(`${item.wallet}:${balance}`);
            empty_string += `\n${item.wallet}: \u20B3${balance}`;
            empty_string_br_tag += `**${item.wallet}**: \u20B3${balance} `;

            return { wallet: item.wallet, balance };
          })
          .catch((error) => {
            console.error(`Error fetching balance for ${item.wallet}:`, error);
            return { wallet: item.wallet, error: error.message };
          });
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Update state with the new wallet data
      setWalletsData(updatedWalletsData);
      setBalanceData(empty_string_br_tag);
      setWalletArray(empty_push);

      console.log("Updated wallet data:", updatedWalletsData);
      console.log(empty_string);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };
  const fetchBalances = async () => {
    try {
      let empty_push = [];
      let empty_string = "";
      let empty_string_br_tag = "";
      let promises = [];

      // Create a copy of the walletsData to update
      const updatedWalletsData = [...walletsData];

      // Create array of promises for all API calls
      promises = updatedWalletsData.map(async (item, index) => {
        const balanceOptions = {
          method: "GET",
          url: `https://cardano-preprod.blockfrost.io/api/v0/addresses/${item.address}`,
          headers: { Project_id: "preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3" },
        };

        return axios
          .request(balanceOptions)
          .then(({ data }) => {
            const balance = (data.amount[0].quantity / 1000000).toFixed(2);

            // Update the wallet in our copied array
            updatedWalletsData[index] = {
              ...item,
              // balance: `\u20B3\uffa0${balance}`,
              balance: `\u20B3${balance}`,
            };

            empty_push.push(`${item.wallet}:${balance}`);
            empty_string += `\n${item.wallet}: \u20B3${balance}`;
            empty_string_br_tag += `**${item.wallet}**: \u20B3${balance} `;

            return { wallet: item.wallet, balance };
          })
          .catch((error) => {
            console.error(`Error fetching balance for ${item.wallet}:`, error);
            return { wallet: item.wallet, error: error.message };
          });
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Update state with the new wallet data
      setWalletsData(updatedWalletsData);
      setBalanceData(empty_string_br_tag);
      setWalletArray(empty_push);

      console.log("Updated wallet data:", updatedWalletsData);
      console.log(empty_string);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  // Call fetchBalances when component mounts
  // useEffect(() => {
  //   fetchBalances();
  // }, []);
  let accent = "rose";
  accent = "amber";
  accent = "rose";
  accent = "blue";
  accent = "green";

  const [mode, setMode] = useState("light");

  const modeFuntion = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <div>
      {mode === "light" ? (
        <div className="h-[100vh] bg-slate-50 text-gray-900">
          <header className="body-font bg-gray-100 text-gray-900">
            <div className="flex flex-wrap items-center justify-between p-5">
              <a href="/" className="flex items-center text-gray-900">
                <img
                  className="w-8"
                  src="/cardanologo.svg"
                  alt="cardano-logo"
                />
                <h1 className="ml-3 text-lg">Cardano wallets bird-eye view</h1>
              </a>
              <div className="flex gap-3">
                {" "}
                <button
                  onClick={fetchBalances}
                  className={`inline-flex items-center gap-1 px-5 py-2 text-sm font-medium bg-${accent}-600 text-${accent}-50 hover:bg-${accent}-800/90 rounded-full transition-all duration-400`}>
                  <AudioLines strokeWidth={3} size={14} />
                  Fetch
                </button>
                <button onClick={modeFuntion}>
                  <Sun strokeWidth={2.5} size={18} />
                </button>
              </div>
            </div>
          </header>

          {walletsData.map((item) => (
            <section
              key={item.wallet}
              className="body-font text-gray-600 transition-all duration-500">
              <div className="mx-auto flex flex-col px-4 pt-2">
                <div className="h-full overflow-hidden rounded-lg border-1 border-gray-300">
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text mt-1 text-xs font-semibold tracking-wider text-${accent}-600`}>
                        {item.wallet}
                      </p>

                      <span
                        className={`mono text text-lg font-medium text-${accent}-950`}>
                        {item.balance}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-1 pt-1 text-base"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          String(item.address),
                          console.log(
                            `${item.wallet} address copied to clipboard\n${item.address}`
                          )
                        )
                      }>
                      <svg
                        className="mt-0.5 inline-flex w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor">
                        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                      </svg>
                      <p className="mono text-xs">{item.address}</p>
                    </button>
                  </div>
                </div>
                {/* <hr className='text-gray-400/40' /> */}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="h-[100vh] bg-slate-950 text-gray-600">
          <header className="body-font bg-gray-900 text-gray-400">
            <div className="flex flex-wrap items-center justify-between p-5">
              <a href="/" className="flex items-center text-gray-300">
                <img
                  className="w-8"
                  src="/cardanologo.svg"
                  alt="cardano-logo"
                />
                <h1 className="ml-3 text-lg">Cardano wallets bird-eye view</h1>
              </a>

              <div className="flex gap-3">
                <button
                  onClick={fetchBalances}
                  className={`inline-flex items-center gap-1 px-5 py-2 text-sm font-medium bg-${accent}-400 text-${accent}-900 hover:bg-${accent}-300/90 rounded-full transition-all duration-400`}>
                  <AudioLines strokeWidth={3} size={14} />
                  Fetch
                </button>
                <button onClick={modeFuntion}>
                  <Moon strokeWidth={2} size={18} />
                </button>
              </div>
            </div>
          </header>

          {walletsData.map((item) => (
            <section
              key={item.wallet}
              className="body-font text-gray-500 transition-all duration-500">
              <div className="mx-auto flex flex-col px-4 pt-2">
                <div className="h-full overflow-hidden rounded-lg border-1 border-gray-800">
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text mt-1 text-xs font-semibold tracking-wider text-${accent}-500`}>
                        {item.wallet}
                      </p>

                      <span
                        className={`mono text text-lg font-medium text-${accent}-100`}>
                        {item.balance}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-1 pt-1 text-base"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          String(item.address),
                          console.log(
                            `${item.wallet} address copied to clipboard\n${item.address}`
                          )
                        )
                      }>
                      <svg
                        className="mt-0.5 inline-flex w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor">
                        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                      </svg>
                      <p className="mono text-xs">{item.address}</p>
                    </button>
                  </div>
                </div>
                {/* <hr className='text-gray-400/40' /> */}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default V1;

// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import parse from 'html-react-parser';

// function App() {
//     const [walletArray, setWalletArray] = useState([]);
//     const [balanceData, setBalanceData] = useState('');
//     const walletsData = [
//         {
//             wallet: 'LACE',
//             address: 'addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw',
//             balance: `\u20B3 0.00`,
//         },
//         {
//             wallet: 'ETERNL',
//             address: 'addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6',
//             balance: `\u20B3 0.00`,
//         },
//         {
//             wallet: 'VESPR',
//             address: 'addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc',
//             balance: `\u20B3 0.00`,
//         },
//         {
//             wallet: 'TYHPON',
//             address: 'addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n',
//             balance: `\u20B3 0.00`,
//         },
//         {
//             wallet: 'YOROI NIGHTLY',
//             // address: 'addr_test1qr2g7zp8feyvzusx8erdqls8gt4kramk9mpregcyq7dvmw257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putesq04v29',
//             address: 'addr_test1qzfgfqw3adkg93ld6th5ndgq0fzp8fm3vgpzngrkxfytv6257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putes0m7h97',
//             balance: `\u20B3 0.00`,
//         },
//         {
//             wallet: 'GERO BETA',
//             address: 'addr_test1qppl2kcdqmzwt3yzdcndfuhg9acx5zgfde76882magqyvxs428mpyg0ce8pn72s9gx7hhmzn3n0hetcr863qd2d4j44sdkf9zt',
//             balance: `\u20B3 0.00`,
//         },
//     ];

//     const docsFetchBalance = async () => {
//         // console.log("inside fetch");
//         let empty_push = [];
//         let empty_string = new String();
//         let empty_string_br_tag = new String();
//         let promises = [];

//         // Create array of promises for all API calls
//         walletsData.forEach((item) => {
//             const balanceOptions = {
//                 method: 'GET',
//                 url: `https://cardano-preprod.blockfrost.io/api/v0/addresses/${item.address}`,
//                 headers: { Project_id: 'preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3' },
//             };

//             const promise = axios
//                 .request(balanceOptions)
//                 .then(({ data }) => {
//                     let balance = (data.amount[0].quantity / 1000000).toFixed(2);
// item.balance=`\u20B3${balance}`;
//                     empty_push.push(`${item.wallet}:${balance}`);
//                     empty_string += `\n${item.wallet}: \u20B3${balance}`;
//                     empty_string_br_tag += `<b>${item.wallet}</b>: \u20B3${balance}<br>`;

//                     return { wallet: item.wallet, balance };
//                 })
//                 .catch((error) => {
//                     console.error(`Error fetching balance for ${item.wallet}:`, error);
//                     return { wallet: item.wallet, error: error.message };
//                 });

//             promises.push(promise);
//         });

//         // Wait for all promises to resolve
//         await Promise.all(promises);

//         // Now all requests are complete
//         setBalanceData(empty_string_br_tag);
//         console.log(empty_string); // Print the complete string
//         setWalletArray(empty_push);
//     };

//     return (

//             <div className="bg-slate-950 text-gray-600">
//                 <button onClick={docsFetchBalance} className=" fixed top-2 left-2 inline-flex items-center gap-1 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">
//                 Fetch<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="currentColor" className=' w-4 h-4'>
//                         <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
//                     </svg>
//                 </button>
//                 {/* <CardanoWalletTracker/> */}
//                 <span>{parse(balanceData)}</span>
//                 {walletsData.map((item) => (
//                     <section key={item.wallet} className="text-gray-400   body-font">
//                         <div className="container px-5 mx-auto">
//                             <div className="flex flex-wrap -m-4">
//                                 <div className="p-4">
//                                     <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
//                                         <div className="p-6">
//                                             <h2 className="tracking-widest text-xs tex- title-font font-medium text-gray-500 mb-1">{item.wallet}</h2>
//                                             <h1 className="title-font text-lg font-medium text-white mb-3">{item.balance}</h1>
//                                             <p className="leading-relaxed mb-3">{item.address}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 ))}
//                 <br />
//                 <button className="" onClick={docsFetchBalance}>
//                     Fetch
//                 </button>
//             </div>
//     );
// }

// export default App;

// claude here
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const WalletComponent = () => {
//   const [walletsData, setWalletsData] = useState([
//     {
//       wallet: 'LACE',
//       address: 'addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw',
//       balance: `\u20B3 0.00`,
//     },
//     {
//       wallet: 'ETERNL',
//       address: 'addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6',
//       balance: `\u20B3 0.00`,
//     },
//     {
//       wallet: 'VESPR',
//       address: 'addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc',
//       balance: `\u20B3 0.00`,
//     },
//     {
//       wallet: 'TYHPON',
//       address: 'addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n',
//       balance: `\u20B3 0.00`,
//     },
//     {
//       wallet: 'YOROI NIGHTLY',
//       address: 'addr_test1qzfgfqw3adkg93ld6th5ndgq0fzp8fm3vgpzngrkxfytv6257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putes0m7h97',
//       balance: `\u20B3 0.00`,
//     },
//     {
//       wallet: 'GERO BETA',
//       address: 'addr_test1qppl2kcdqmzwt3yzdcndfuhg9acx5zgfde76882magqyvxs428mpyg0ce8pn72s9gx7hhmzn3n0hetcr863qd2d4j44sdkf9zt',
//       balance: `\u20B3 0.00`,
//     },
//   ]);
//   const [balanceData, setBalanceData] = useState('');
//   const [walletArray, setWalletArray] = useState([]);

//   const fetchBalances = async () => {
//     try {
//       let empty_push = [];
//       let empty_string = '';
//       let empty_string_br_tag = '';
//       let promises = [];

//       // Create a copy of the walletsData to update
//       const updatedWalletsData = [...walletsData];

//       // Create array of promises for all API calls
//       promises = updatedWalletsData.map((item, index) => {
//         const balanceOptions = {
//           method: 'GET',
//           url: `https://cardano-preprod.blockfrost.io/api/v0/addresses/${item.address}`,
//           headers: { Project_id: 'preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3' },
//         };

//         return axios
//           .request(balanceOptions)
//           .then(({ data }) => {
//             const balance = (data.amount[0].quantity / 1000000).toFixed(2);

//             // Update the wallet in our copied array
//             updatedWalletsData[index] = {
//               ...item,
//               balance: `\u20B3 ${balance}`
//             };

//             empty_push.push(`${item.wallet}:${balance}`);
//             empty_string += `\n${item.wallet}: \u20B3${balance}`;
//             empty_string_br_tag += `**${item.wallet}**: \u20B3${balance} `;

//             return { wallet: item.wallet, balance };
//           })
//           .catch((error) => {
//             console.error(`Error fetching balance for ${item.wallet}:`, error);
//             return { wallet: item.wallet, error: error.message };
//           });
//       });

//       // Wait for all promises to resolve
//       await Promise.all(promises);

//       // Update state with the new wallet data
//       setWalletsData(updatedWalletsData);
//       setBalanceData(empty_string_br_tag);
//       setWalletArray(empty_push);

//       console.log("Updated wallet data:", updatedWalletsData);
//       console.log(empty_string);
//     } catch (error) {
//       console.error("Error fetching balances:", error);
//     }
//   };

//   // Call fetchBalances when component mounts
//   useEffect(() => {
//     fetchBalances();
//   }, []);

//   return (
//     <div>
//       <h2>Wallet Balances</h2>
//       <div>
//         {walletsData.map((wallet) => (
//           <div key={wallet.wallet}>
//             <strong>{wallet.wallet}:</strong> {wallet.balance}
//           </div>
//         ))}
//       </div>
//       <button onClick={fetchBalances}>Refresh Balances</button>
//     </div>
//   );
// };

// export default WalletComponent;
