"use client";

import { useEffect, useRef, useState } from "react";
import { CountDown } from "../components/Countdown";
import { MainLogo } from "../components/MainLogo";
import localFont from "next/font/local";
import { ProgressBar } from "../components/ProgressBar";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ethers } from "ethers";
import { Web3 } from "web3";
import Moralis from "moralis";

const myFont = localFont({ src: "../pages/LuloCleanOne.otf" });
const myFontBold = localFont({ src: "../pages/LuloCleanOneBold.otf" });
const myTitleFont = localFont({ src: "../pages/SF-Pro-Display-Bold.otf" });

function MyApp() {
  const [total, setTotal] = useState(50000);
  const [current, setCurrent] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<any>(null);

  const fetchExchangeRate = async () => {
    try {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        chain: "0x1",
        include: "percent_change",
        exchange: "uniswapv3",
        address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      });

      setExchangeRate(response.result.usdPriceFormatted);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        //private RPC endpoint
        fetchExchangeRate();
        const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_KEY);

        const a = await web3.eth.getBalance(
          "0xdB4c5AC133Af1594e27aB2Cedc6B0c7de2E53d32"
        );

        const balanceInEther = ethers.utils.formatEther(a);

        // Convert Ether to dollars (assuming 1 ETH = $2000)

        const balanceInUsd = parseFloat(balanceInEther) * exchangeRate;
        setCurrent(balanceInUsd);
        // console.log(`Current balance in USD: $${balanceInUsd}`);
      } catch (err) {
        // console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (current >= 0.8 * total) {
      // If current reaches 80% of total, increase total by 30%
      setTotal(total + 0.3 * total);
    }
  }, [current, total]); // useEffect will run whenever current or total changes

  // console.log(contract);
  const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div className=" flex flex-col items-center h-screen justify-center">
        <div className={myFontBold.className}>
          <MainLogo />
        </div>
        <div className={myFont.className}>
          <div className="flex justify-center flex-col gap-4">
            <CountDown />
          </div>
        </div>
        <div className={myTitleFont.className}>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center bg-white py-4 px-3 mt-8 rounded-lg">
              <div className={myTitleFont.className}>
                <h1 className="text-sm md:text-2xl text-wrap text-black tracking-[0.10em]">
                  0xdB4c5AC133Af1594e27aB2Cedc6B0c7de2E53d32
                </h1>
              </div>
            </div>
            <div className={myTitleFont.className}>
              <div className="flex flex-row justify-center items-center gap-2">
                <h1 className="text-md mt-4 text-wrap ">
                  Only send ETH to the presale address.
                </h1>
                <div className={myTitleFont.className}>
                  <p className="underline mt-4 text-wrap text-md">
                    Learn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <ProgressBar total={total} current={current} />
            <div>
              <p className="mt-5 text-center">
                ETH RAISED (IN USD): ${numberWithCommas(current)}/$
                {numberWithCommas(total)}
              </p>
            </div>
          </div>
          <div className="flex justify-center align-center pt-8 gap-6">
            <div>
              <a
                href="https://google.com"
                className="text-white"
                target="_blank"
              >
                <FaXTwitter style={{ fontSize: "50px", cursor: "pointer" }} />
              </a>
            </div>
            <div>
              <a
                href="https://google.com"
                className="text-white"
                target="_blank"
              >
                <FaTelegramPlane
                  style={{ fontSize: "50px", cursor: "pointer" }}
                />
              </a>
            </div>
            <div>
              <a
                href="https://google.com"
                target="_blank"
                className="text-white"
              >
                <FaDiscord style={{ fontSize: "50px", cursor: "pointer" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
