import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

import useNear from "../hooks/useNear";
import queryAccountById from "../api/queryAccountById";
import { generateAccountId } from "../utils";

import Header from "../components/Header";
import WalletForm from "../components/WalletForm";
import Transaction from "../components/Transaction";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    loading: isNearConnecting,
    createDevAccount,
    deleteAccount,
  } = useNear();

  const handleSubmit = useCallback(handleSubmitCallback, [
    createDevAccount,
    deleteAccount,
  ]);

  useEffect(handleAutoFocus, [loading, isNearConnecting]);

  return (
    <>
      <Head>
        <title>NEAR printer (testnet)</title>
        <meta name="description" content="NEAR printer (testnet)" />
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
      position: toast.POSITION.BOTTOM_CENTER,
    });

    try {
      await queryAccountById(walletId);

      const accountId = await createDevAccount(generateAccountId());
      toast.info(
        <>
          Dev account with id <b>{accountId}</b> is created
        </>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );

      const transactionId = await deleteAccount(accountId, walletId);
      toast.info(
        <>
          Dev account (<b>{accountId}</b>) is deleted
        </>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );

      toast.success(
        <>
          Added <b>200 NEAR</b> to{" "}
          <Transaction
            href={`https://explorer.testnet.near.org/transactions/${transactionId}`}
          >
            {walletId}
          </Transaction>
        </>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 20000,
        }
      );
    } catch (error: any) {
      toast.error(error.toString(), {
        position: toast.POSITION.BOTTOM_CENTER,
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
`;

const Content = styled.div`
  max-width: 960px;
  width: 100%;
`;
