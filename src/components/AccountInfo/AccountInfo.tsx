import React from "react";

interface AccountInfoProps {
  account: string | undefined;
  balance: string | undefined;
  connectWallet: () => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  balance,
  connectWallet,
}) => {
  return (
    <>
      <div className="is-flex is-align-items-center">
        <span>
          <strong className="mr-2">Account:</strong>{" "}
        </span>
        {account ? (
          <span>{account}</span>
        ) : (
          <button className="button is-small" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="balance-view is-size-2 my-4">
        Current Balance: <strong>{balance}</strong> ETH
      </div>
    </>
  );
};

export default AccountInfo;

