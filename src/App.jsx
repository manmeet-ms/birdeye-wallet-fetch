import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AudioLines,
  Check,
  Cross,
  CrossIcon,
  FileLock,
  KeyIcon,
  KeyRound,
  Lock,
  Moon,
  PartyPopperIcon,
  SquareAsterisk,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import "./index.css";
import { Link } from "react-router-dom";

function App() {
  let totalBalances = new Number();
  const accent = "emerald";
  const [walletsData, setWalletsData] = useState([
    {
      wallet: "Lace",
      passphrase: "DUMMY",
      spendingpassword: "mP/8(8$j+~4T[~Fv,}y@g/w0",
      address:
        "addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw",
      balance: `\u20B30.00`,
      image: "/wallet-logo/lace.png",
      size: "mr-2 w-4 h-4",
    },
    {
      wallet: "NuFi",
      passphrase: "DUMMY",
      spendingpassword: "X+m4LF*EdGOlUbXIW;@A](XZ",
      address:
        "addr_test1qq2yu9j65tsal4gnkg7mxh7x8wy0rzm7xfw5a88qqpy7esust23vyztmtflnsvqljzmlnf9ltsknlzemzjwplfwq88js4rq8s5",
      balance: `\u20B30.00`,
      image: "/wallet-logo/nufi.svg",
      size: "mr-2 w-3 h-3",
    },
    {
      wallet: "Eternl",
      passphrase: "DUMMY",
      spendingpassword: "mE2g:vCPwSJkW7`A>QtH4T",
      address:
        "addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6",
      balance: `\u20B30.00`,
      image: "/wallet-logo/eternl.png",
      size: "mr-2 w-3 h-3",
    },
    {
      wallet: "Typhon",
      passphrase: "DUMMY",
      spendingpassword: "mE2g:vCPwSJkW7`A>QtH4T",
      address:
        "addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n",
      balance: `\u20B30.00`,
      image: "/wallet-logo/typhon.png",
      size: "mr-2 w-4 h-4",
    },

    {
      wallet: "Vespr",
      passphrase: "DUMMY",
      spendingpassword: "X+m4LF*EdGOlUbXIW;@A](XZ",
      address:
        "addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc",
      balance: `\u20B30.00`,
      image: "/wallet-logo/vespr.png",
      size: "mr-2 w-4 h-4",
    },
    {
      wallet: "Gero Beta",
      passphrase:
        "DUMMY west video candy dream follow half track meadow dog begin page machine shove feel strategy surface meadow aunt require network animal loan arm",
      spendingpassword: "m!s$X(0;>7,`6|?1v~I2N",
      address:
        "addr_test1qppl2kcdqmzwt3yzdcndfuhg9acx5zgfde76882magqyvxs428mpyg0ce8pn72s9gx7hhmzn3n0hetcr863qd2d4j44sdkf9zt",
      balance: `\u20B30.00`,
      image: "/wallet-logo/gero.png",
      size: "mr-2 w-4 h-4",
    },

    {
      wallet: "Yoroi Nightly",
      passphrase: "passphrase",
      spendingpassword: "mG>RvCV?F732.ub/aPM&;~Q",
      address:
        "addr_test1qr2g7zp8feyvzusx8erdqls8gt4kramk9mpregcyq7dvmw257hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putesq04v29",
      balance: `\u20B30.00`,
      image: "/wallet-logo/yoroi.png",
      size: "mr-2 w-3 h-3",
    },
  ]);
  const [walletArray, setWalletArray] = useState([]);

  const fetchBalances = async () => {
    try {
      let empty_push = [];
      let appended_balances_string = "";
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
            const balance = (data.amount[0].quantity / 1000000).toFixed(4);

            // Update the wallet in our copied array
            updatedWalletsData[index] = {
              ...item,
              // balance: `\u20B3\uffa0${balance}`,
              balance: `\u20B3${balance}`,
            };

            empty_push.push(`${item.wallet}:${balance}`);
            appended_balances_string += `\n${item.wallet}: \u20B3${balance}`;
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
      setWalletArray(empty_push);

      // console.log("Updated wallet data:", updatedWalletsData);
      console.log(appended_balances_string);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  // Call fetchBalances when component mounts
  // useEffect(() => {
  //   fetchBalances();
  // }, []);
   
    walletsData.map(
      (wltdata) => (totalBalances += Number(wltdata.balance.slice(1, -1)))
    );
  
  const [mode, setMode] = useState("dark");
  const modeFuntion = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [toastContent, setToastContent] = useState(false);

  const showToast = (params) => {
    setIsVisible(true);
    setToastContent(params);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <>
    
    <div className="bg-gray-950 text-gray-600" >
      <div className="">
        {isVisible ? (
          <div
            className={`fixed right-12 bottom-6 left-12 mx-auto inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-gray-400/10 bg-gray-800 px-4 py-2 font-medium text-gray-400 shadow-md`}>
            <Check
              className="inline rounded-full bg-green-500 p-0.5 text-gray-800"
              size={14}
              strokeWidth={5}
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-200">
                {toastContent} copied
              </span>
            </div>
          </div>
        ) : null}

        <header className="bg-gray-800 bg-gray-800/40 text-gray-400">
          <div className="flex flex-wrap items-center justify-between p-4">
            <a href="/" className="flex items-center text-gray-300">
              <img className="w-8" src="/cardanologo.svg" alt="cardano-logo" />
              <h1 className="ml-3 text-m">Birdeye Wallets</h1>
            </a>

            <div className="flex gap-1">
              <span
                className={`inline-flex items-center gap-1 rounded-full border border-gray-300/5 bg-gray-400/5 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-300/90`}>
                <Wallet strokeWidth={3} size={14} />{" "}
                {String(totalBalances.toFixed(0)).toLocaleString()}
              </span>
              <button
                onClick={fetchBalances}
                className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-${accent}-400 text-${accent}-900 hover:bg-${accent}-300/90 rounded-full`}>
                <AudioLines strokeWidth={3} size={14} />
                Fetch
              </button>

              {/* <button onClick={modeFuntion}>
                  <Moon strokeWidth={2} size={18} />
                </button> */}
            </div>
          </div>
        </header>

        {walletsData.map((item) => (
          <section key={item.wallet} className="text-gray-500">
            <div className="mx-auto flex flex-col px-4 pt-2">
              <div className="h-full overflow-hidden rounded-lg border-1 border-gray-700/50 bg-gray-800/40 tracking-wide text-gray-500">
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          className={`${item.size}`}
                          // className={`${item.size} grayscale brightness-500 opacity-40`}
                          alt="wallet-logo"
                        />
                      ) : null}
                      <p
                        className={`text-sm font-semibold tracking-wider text-${accent}-500`}>
                        {item.wallet.toUpperCase()}
                      </p>
                      <div className="ml-2">
                        <span
                          className={`mono-type text-lg font-medium tracking-tight tracking-wider opacity-90 text-${accent}-100`}>
                          {/* {item.balance} <hr /> */}

                          {item.balance.slice(0, 8)}
                          {/* <span
                        className={`mono-type text-lg font-medium tracking-tight tracking-wider opacity-20 text-${accent}-100`}>
                        {item.balance.slice(-2)}
                      </span> */}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium opacity-20">
                        #{walletsData.indexOf(item) + 1}
                      </span>

                      <button
                        className="rounded-md bg-gray-400/0 p-1 text-gray-400 transition-colors duration-300 ease-in hover:bg-gray-400/30 hover:text-gray-300/80"
                        onClick={() =>
                          // alert("Skeptic: Will take from Obsidian for now")
                          console.warn("Skeptic", "Will take from local fn.")
                        }>
                        <FileLock strokeWidth={2.25} size={16} />
                      </button>

                      <button
                        className="rounded-md bg-gray-400/0 p-1 text-gray-400 transition-colors duration-300 ease-in hover:bg-gray-400/30 hover:text-gray-300/80"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            String(item.spendingpassword),
                            console.log(
                              `${item.wallet} spending password copied to clipboard.`
                            ),
                            showToast(`${item.wallet} spending password `)
                          )
                        }>
                        <KeyRound strokeWidth={2.25} size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-1 pt-1 text-base"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        String(item.address),
                        console.log(
                          `${item.wallet} address copied to clipboard\n${item.address}`
                        ),
                        showToast(`${item.wallet} address `)
                      )
                    }>
                    <svg
                      className="mt-0.5 inline-flex w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="currentColor">
                      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                    </svg>
                    <p className="mono-type text-xs">
                      {item.address.slice(0, 32)}...
                      {item.address.slice(72, -1)}
                    </p>
                    {/* <p className="mono-type text-xs">{item.address}</p> */}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}

        <footer className="p-4 text-sm">
          Last updated {Date().toLocaleString()}
          <Link to="/changelog">
            {" "}
            <span className="font-medium text-gray-400 hover:underline">
              Changelog
            </span>{" "}
          </Link>
        </footer>
      </div>
    </div>

    </>
  );
}

export default App;
