import React, {
  useState,
  useCallback,
  forwardRef,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import styled from "styled-components";

import { Link } from "./Link";
import { Submit } from "./Submit";

interface Props {
  onSubmit(walletId: string): void;
  loading?: boolean;
}

export const WalletForm = forwardRef<HTMLInputElement, Props>(
  function WalletForm({ onSubmit, loading }, ref) {
    const [walletId, setWalletId] = useState("");
    const handleSubmit = useCallback(handleSubmitCallback, [
      onSubmit,
      walletId,
    ]);
    const handleChange = useCallback(handleChangeCallback, []);

    return (
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="addressInput">Enter wallet:</Label>
        <Input
          id="addressInput"
          ref={ref}
          onChange={handleChange}
          disabled={loading}
        />
        <Actions>
          <Submit loading={loading} onClick={handleSubmit}>
            Print 200Ⓝ
          </Submit>
          <Link
            title="Link to the guide on manual balance top up"
            href={process.env.MANUAL_BALANCE_TOP_UP_GUIDE_URL}
          >
            Using NEAR CLI ↗
          </Link>
        </Actions>
      </Form>
    );

    function handleSubmitCallback(e: SyntheticEvent) {
      e.preventDefault();
      onSubmit(walletId);
    }

    function handleChangeCallback({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) {
      setWalletId(value);
    }
  },
);

const Form = styled.form``;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  line-height: 48px;
`;

const Input = styled.input.attrs({
  placeholder: "a1234...c9101d",
  autoCapitalize: "none",
  autoCorrect: "off",
})`
  padding: 10px;
  width: 100%;
  font-size: 28px;
  border: none;
  outline: none;
  background-color: hsla(0, 0%, 100%, 0.1);

  &:focus {
    box-shadow:
      inset 60px 0 120px #222,
      inset -60px 0 120px #333;
  }
`;
