import React, { useState } from "react";
import { ethers } from "ethers";

const WalletManager = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);

  const generateMnemonic = () => {
    const newMnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setMnemonic(newMnemonic);
    setWallets([]);
  };

  const addWallet = () => {
    if (mnemonic) {
      const path = `m/44'/60'/0'/0/${wallets.length}`;
      const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, path);
      setWallets([...wallets, wallet]);
    }
  };

  return (
    <div>
      <h2>Web Wallet</h2>
      <button onClick={generateMnemonic}>Generate Mnemonic</button>
      {mnemonic && (
        <div>
          <p>
            <strong>Mnemonic:</strong> {mnemonic}
          </p>
          <button onClick={addWallet}>Add Wallet</button>
          <ul>
            {wallets.map((wallet, index) => (
              <li key={index}>
                Wallet {index + 1}: Public Key - {wallet.address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WalletManager;
