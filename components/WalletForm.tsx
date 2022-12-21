import React, {
  useState,
  useCallback,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import styled from "styled-components";

import Link from "./Link";
import Submit from "./Submit";

const MANUAL_BALANCE_TOP_UP_GUIDE_URL = "https://stackoverflow.com/a/71869002";

interface Props {
  onSubmit(walletId: string): void;
  loading?: boolean;
}

const WalletInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { onSubmit, loading },
  ref
) => {
  const [walletId, setWalletId] = useState("");

  const handleSubmit = useCallback(handleSubmitCallback, [onSubmit, walletId]);
  const handleChange = useCallback(handleChangeCallback, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="addressInput">Enter wallet:</Label>
      <Input
        name="addressInput"
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
          href={MANUAL_BALANCE_TOP_UP_GUIDE_URL}
        >
          How to do it manually? ↗
        </Link>
        <StyledLink
          title="GitHub repository link"
          href="https://github.com/dwnste/near-printer"
        >
          GitHub ↗
        </StyledLink>
      </Actions>
    </Form>
  );

  function handleSubmitCallback(e?: any) {
    e.preventDefault();
    onSubmit(walletId);
  }

  function handleChangeCallback({ target: { value } }: any) {
    setWalletId(value);
  }
};

const Form = styled.form``;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-right: 16px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    padding-right: 0;
  }
`;

const Label = styled.label`
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 48px;
`;

const Input = styled.input.attrs({
  placeholder: "a1234...c9101d",
})`
  padding: 10px;
  width: 100%;
  font-size: 36px;
  font-family: sans-serif;
  border: none;
  outline: none;
  background-color: hsla(0, 0%, 100%, 0.1);

  &:focus {
    box-shadow: inset 60px 0 120px #222, inset -60px 0 120px #333;
  }
`;

const StyledLink = styled(Link)`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

export default forwardRef(WalletInput);
