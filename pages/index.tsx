import Head from "next/head";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

import { NearContext } from "../components/NearProvider";
import { Header } from "../components/Header";
import { WalletForm } from "../components/WalletForm";
import { Transaction } from "../components/Transaction";
import { Footer } from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    loading: isNearConnecting,
    createDevAccount,
    deleteAccount,
    checkAccount,
  } = useContext(NearContext);

  const handleSubmit = useCallback(handleSubmitCallback, [
    createDevAccount,
    deleteAccount,
    checkAccount,
  ]);

  useEffect(handleAutoFocus, [loading, isNearConnecting]);

  return (
    <>
      <Head>
        <title>NEAR printer for testnet</title>
        <meta name="description" content="NEAR printer for testnet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <Content>
          <WalletForm
            ref={inputRef}
            loading={loading || isNearConnecting}
            onSubmit={handleSubmit}
          />
        </Content>
      </Main>
      <Footer />
      <ToastContainer newestOnTop closeOnClick={false} theme="colored" />
    </>
  );

  function handleAutoFocus() {
    if (!loading && !isNearConnecting) {
      inputRef.current?.focus();
    }
  }

  async function handleSubmitCallback(walletId: string) {
    setLoading(true);

    const toastLoadingId = toast.loading("Topping up the balance...", {
      position: "bottom-center",
    });

    try {
      await checkAccount(walletId);

      const randomNumber = Math.floor(
        Math.random() * (99999999999999 - 10000000000000) + 10000000000000,
      );
      const accountId = `dev-${Date.now()}-${randomNumber}.testnet`;
      await createDevAccount(accountId);
      toast.info(
        <>
          Dev account with id <b>{accountId}</b> is created
        </>,
        {
          position: "bottom-center",
        },
      );

      const transactionId = await deleteAccount(accountId, walletId);
      toast.info(
        <>
          Dev account (<b>{accountId}</b>) is deleted
        </>,
        {
          position: "bottom-center",
        },
      );

      toast.success(
        <>
          Added <b>200 NEAR</b> to{" "}
          <Transaction
            href={`${process.env.EXPLORER_TX_ID_URL}/${transactionId}`}
          >
            {walletId}
          </Transaction>
        </>,
        {
          position: "bottom-center",
          autoClose: 20000,
        },
      );
    } catch (error: any) {
      toast.error(error.toString(), {
        position: "bottom-center",
        autoClose: 20000,
      });
    } finally {
      setLoading(false);
      toast.dismiss(toastLoadingId);
    }
  }
}

const Main = styled.main`
  padding: 20px 16px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Content = styled.div`
  max-width: 960px;
  width: 100%;
`;
