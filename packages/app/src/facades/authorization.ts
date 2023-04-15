import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const litNodeClient = new LitJsSdk.LitNodeClient({});

const chain = "ethereum";
const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: chain,
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "0", // 0.000001 ETH
    },
  },
];

export function connect() {
  return litNodeClient.connect();
}
connect();

export async function encrypt(message: string) {
  if (!litNodeClient) {
    await connect();
  }

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);

  const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });

  return {
    encryptedString,
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
  };
}

export async function decrypt(encryptedStringBlob: Blob, encryptedSymmetricKey: string) {
  if (!litNodeClient) {
    await connect();
  }

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  const symmetricKey = await litNodeClient.getEncryptionKey({
    accessControlConditions,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  });

  const decryptedString = await LitJsSdk.decryptString(encryptedStringBlob, symmetricKey);

  return { decryptedString };
}
