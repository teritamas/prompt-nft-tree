import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getBlob, getDownloadURL } from "firebase/storage";
import { XMLHttpRequest } from "xmlhttprequest";
import type { promptNft } from "../model/promptNft";
import type { User } from "../model/user";

const firebaseConfig = {
  authDomain: "prompt-tree.firebaseapp.com",
  databaseURL: "https://prompt-tree.firebaseio.com",
  projectId: "prompt-tree",
  storageBucket: "prompt-tree.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export function getNft() {
  const nftCol = collection(db, "nft");
  return new Promise((resolve) => {
    getDocs(nftCol)
      .then((nft) => {
        const nftList = nft.docs.map((doc) => doc.data());
        resolve(nftList);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

/**
 * 描画の高速化のため、NFTのリレーションの情報をFireStoreにも保存
 */
export function addNft(tokenId: number, sourceTokenId: number, encryptedSymmetricKey: string) {
  const nftCol = collection(db, "nft");
  const nftDoc: promptNft = {
    tokenId: tokenId,
    sourceTokenId: sourceTokenId,
    encryptedSymmetricKey: encryptedSymmetricKey,
  };

  return new Promise((resolve) => {
    addDoc(nftCol, nftDoc)
      .then((_) => {
        console.log("add nft complete!");
        resolve(_);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

/**
 * 描画の高速化のため、NFTのリレーションの情報をFireStoreにも保存
 */
export function purchasedUser(tokenId: number, sourceTokenId: number) {
  const nftCol = collection(db, "nft");
  const nftDoc = { tokenId: tokenId, sourceTokenId: sourceTokenId };
  return new Promise((_) => {
    addDoc(nftCol, nftDoc)
      .then((_) => console.log("add nft complete!"))
      .catch((error) => {
        console.error(error);
      });
  });
}

/**
 * 描画の高速化のため、FireStoreから最新のTokenIdを取得
 */
export function getLatestTokenId() {
  const configCol = collection(db, "config");

  return new Promise((resolve) => {
    getDocs(configCol)
      .then((config) => {
        const id = config.docs.filter((doc) => doc.id === "develop").map((x) => x.get("tokenId"));
        resolve(id);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

/**
 * アカウントが存在するか確認
 */
export async function createAccount(walletAddress: string) {
  if (!walletAddress) {
    console.log("undefinedなのでスキップします");
    return "";
  }
  const accountCol = collection(db, "account");
  const account = await getDocs(accountCol).then(async (config) => {
    return config.docs.filter((doc) => doc.get("walletAddress") === walletAddress);
  });

  if (account.length === 0) {
    await addDoc(accountCol, {
      walletAddress: walletAddress,
      ownNfts: [],
    });
    console.log("追加しました。");
  } else {
    console.log("すでに存在しています");
  }
}

/**
 * tokenIdのインクリメント
 */
export function incrementTokenId() {
  const configCol = collection(db, "config");

  return new Promise((_) => {
    getDocs(configCol)
      .then(async (config) => {
        console.log("incrementTokenId");
        const id = config.docs.filter((doc) => doc.id === "develop").map((x) => x.get("tokenId"));
        const document = config.docs.filter((doc) => doc.id === "develop")[0].ref;
        await updateDoc(document, {
          tokenId: Number(id) + 1,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export function fileUpload(data: Blob, tokenId: number) {
  const storageRef = ref(storage, "files/" + tokenId.toString() + ".jpeg");
  uploadBytes(storageRef, data).then((snapshot) => {
    console.log("blobのfileをアップロード完了", snapshot);
  });
}

export function downloadImage(tokenId: number) {
  return new Promise((resolve) => {
    getDownloadURL(ref(storage, "files/" + tokenId + ".jpeg"))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (_) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        resolve(url);
      })
      .catch((e) => {
        console.log(e);
        resolve("");
      });
  });
}
