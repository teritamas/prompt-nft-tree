import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // apiKey: "API_KEY",
  authDomain: "prompt-tree.firebaseapp.com",
  databaseURL: "https://prompt-tree.firebaseio.com",
  projectId: "prompt-tree",
  storageBucket: "prompt-tree.appspot.com",
  messagingSenderId: "",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export function getNft(tokenId: string) {
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
export function addNft(tokenId: number, sourceTokenId: number) {
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
 * tokenIdのインクリメント
 */
export function incrementTokenId() {
  const configCol = collection(db, "config");
  getDocs(configCol)
    .then((config) => {
      const id = config.docs.filter((doc) => doc.id === "develop").map((x) => x.get("tokenId"));
      const document = config.docs.filter((doc) => doc.id === "develop")[0].ref;
      updateDoc(document, {
        tokenId: Number(id) + 1,
      }).then((_) => console.log("Complete"));
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fileUpload(data: Blob, tokenId: number) {
  const storageRef = ref(storage, "files/" + tokenId.toString() + ".jpeg");
  uploadBytes(storageRef, data).then((snapshot) => {
    console.log("blobのfileをアップロード完了", snapshot);
  });
}
