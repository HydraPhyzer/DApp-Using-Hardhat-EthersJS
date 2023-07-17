import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Getter from "./Artifacts/Contracts/Getter.sol/Getter.json";

const App = () => {
  let [MyContract, setMyContract] = useState(null);
  let [Provider, setProvider] = useState(null);
  let [Message, setMessage] = useState(null);
  let [Text, setText] = useState("");
  let [AllMessage, setAllMessage] = useState(null);
  let [Reload, setReload] = useState(false);

  useEffect(() => {
    const LoadProvider = () => {
      let ContractAdress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
      const URL = "http://localhost:8545";
      const Provider = new ethers.providers.JsonRpcProvider(URL);
      const Conc = new ethers.Contract(ContractAdress, Getter.abi, Provider);
      setMyContract(Conc);
      setProvider(Provider);
    };
    LoadProvider();
  }, [])
  
  useEffect(() => {
    let GetMessage = async () => {
      setMessage(await MyContract.GetMessage());
      setAllMessage(await MyContract.GetArray());
    };
    MyContract && GetMessage();
  }, [MyContract, Reload]);

  let ChangeMessage = async () => {
    if (Text) {
      const Signer = await MyContract.connect(Provider.getSigner());
      await Signer.SetMessage(Text);
      setReload(!Reload);
      setText("");
    } else {
      alert("Please Type Something");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        flexDirection:"column",
      }}
    >
      <p style={{padding:20,color:"white",backgroundColor:"black",padding:10,margin:20}}>{MyContract && `Contrac Adress : ${MyContract.address}`}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid white",
          padding: 20,
          margin: 20,
          color: "white",
        }}
      >
        <h3>"{Message && Message}"</h3>

        <div style={{ display: "flex", gap: 20 }}>
          <input
            style={{ borderRadius: 3, border: "none", padding: 5 }}
            type="text"
            name=""
            id=""
            onChange={(E) => {
              setText(E.target.value);
            }}
            value={Text}
          />
          <button
            style={{
              padding: 10,
              border: "none",
              borderRadius: 3,
              fontWeight: 20,
            }}
            onClick={ChangeMessage}
          >
            Click
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid white",
          padding: 20,
          margin: 20,
          color: "white",
        }}
      >
        <p style={{ marginBottom: 5 }}>Showing Previous Messages</p>
        {AllMessage &&
          AllMessage.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
      </div>
    </div>
  );
};

export default App;
