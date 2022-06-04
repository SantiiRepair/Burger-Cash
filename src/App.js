import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--all-buttons);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 200px;
  outline: 4px solid;
  outline-color: black;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButtonRe = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--all-buttons);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 200px;
  font-size: 20px;
  margin-top: 10px;
  outline: 4px solid;
  outline-color: black;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButtonClaim = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--all-buttons);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 200px;
  font-size: 20px;
  cursor: pointer;
  outline: 4px solid;
  outline-color: black;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledLogos = styled.img`
  width: 200px;
  cursor: pointer;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0);
  border-radius: 0%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);
  
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    setLoading(true)
    setTimeout(() => {
    setLoading(false)
    }, 5000)
  },[])

if (loading) {

  return (
    <Circularalgoo path="/home" onCLick={()=> loading}/>
  )}

function OpenTelegram() {
  window.open('https://t.me/burguercash', '_blank');
}

function OpenTwitter() {
  window.open('https://twitter.com/burguercash', '_blank');
}

function OpenContract() {
  window.open('https://bscscan.com/', '_blank');
}

function OpenWhitePaper() {
  window.open('https://burguercash.com/whitepaper', '_blank');
}

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/banner.png" : null}
      >
       <s.ContainerLogos>
         <StyledLogos onClick={OpenTelegram} style={{width: 30}} alt={"Telegram"} src={"/config/images/telegram.svg"}/>
         <s.SpacerSmall />
         <StyledLogos onClick={OpenTwitter} style={{width: 30}} alt={"Twitter"} src={"/config/images/twitter.svg"}/>
         <s.SpacerSmall />
         <StyledLogos onClick={OpenContract} style={{width: 30}} alt={"BscScan"} src={"/config/images/bscscan.svg"}/>
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
         <StyledButton style={{padding: 10, width: 120}}
           onClick={(e) => {
           e.preventDefault();
           dispatch(connect());
           getData();
         }}>
          CONNECT
         </StyledButton>
       </s.ContainerLogos>
        <StyledLogo style={{width: 180}} alt={"Logo"} src={"/config/images/burguer.png"}/>
        <s.TextTitle
        style={{
         textAlign: "center",
         fontFamily: "rockwell",
         fontStyle: "oblique",
         fontSize: 46,
         fontWeight: "bold",
         color: "var(--accent-text)",
         }}
         >
          BURGUER CASH
         </s.TextTitle>
         <s.SpacerMedium />
         <s.TextDescription
           style={{
             textAlign: "center",
             color: "var(--primary-text)",
             fontSize: 20,
           }}
         >
          The BNB Reward Pool with the 11% daily return and lowest dev fee.
         </s.TextDescription>
        <ResponsiveWrapper flex={5} style={{ padding: 24 }} test>
          <s.SpacerMedium />
          <s.ContainerRow flex={1} jc={"center"} ai={"center"}>
          <s.ContainerBurguer
            flex={0.2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              borderRadius: 24,
              padding: 24,
              border: "4px solid var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          ><s.SpacerSmall />
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
           CONTRACT:  {CONFIG.CONTRACT_OWNABLE}
            </s.TextTitle>
            <span></span>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--accent-text)",
                marginTop: 10,
              }}
            >
           WALLET:  {CONFIG.WALLET_FUNDING}
            </s.TextTitle>
            <span></span>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--accent-text)",
                marginTop: 10,
              }}
            >
            YOUR BURGUERS:  {CONFIG.MAX_SUPPLY}
             </s.TextTitle>

             <s.SpacerSmall />
             {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
               <>
                 <s.TextTitle
                   style={{ textAlign: "center", color: "var(--accent-text)" }}
                 >
                   The sale has ended.
                 </s.TextTitle>
                 <s.TextDescription
                   style={{ textAlign: "center", color: "var(--accent-text)" }}
                 >
                   You can still find {CONFIG.NFT_NAME} on
                 </s.TextDescription>
                 <s.SpacerSmall />

               </>
             ) : (
               <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >

                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="1 BNB"
                />
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >

                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                  >
                    CONNECT
                    </StyledButton>

                     {blockchain.errorMsg !== "" ? (
                       <>
                         <s.SpacerSmall />
                         <s.TextDescription
                           style={{
                             textAlign: "center",
                             color: "var(--accent-text)",
                           }}
                         >
                           {blockchain.errorMsg}
                         </s.TextDescription>
                       </>
                     ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "WAIT PLEASE" : "GET BURGUERS"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--accent-text)",
                marginTop: 30,
              }}
            >
            YOUR REWARDS:  {CONFIG.REWARDS_CLAIM} {CONFIG.NETWORK.SYMBOL}
             </s.TextTitle>
             <StyledButtonRe
           >
               RE-BURGUER
             </StyledButtonRe>
             <s.SpacerSmall />
             <StyledButtonClaim
           >
               EAT NOW
             </StyledButtonClaim>
            <s.SpacerMedium />
          </s.ContainerBurguer>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
      <s.ContainerFacts flex={0.2} jc={"center"} ai={"center"} style={{
      backgroundColor: "var(--accent)",
      padding: 24,
      borderRadius: 24,
      border: "4px solid var(--secondary)",
      boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
    }}>
      <s.TextTitle
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "var(--accent-text)",
          marginTop: 0,
        }}
      >
      NUTRITION FACTS
      </s.TextTitle>
        <s.SpacerLarge />
        <StyledImg style={{ width: 150 }}
        alt={"Mr Burguer"} src={"/config/images/smallburguer.svg"} />
        <s.SpacerLarge />
         <s.SpacerSmall />
         <s.TextDescription
           style={{
             textAlign: "center",
             color: "var(--primary-text)",
             fontSize: 20,
           }}
         >
           Daily Return: {CONFIG.DAILY_RETURN}
         </s.TextDescription>
          <s.SpacerSmall />
         <s.TextDescription
           style={{
             textAlign: "center",
             color: "var(--primary-text)",
             fontSize: 20,
           }}
         >
           APR: {CONFIG.APR}
         </s.TextDescription>
          <s.SpacerSmall />
         <s.TextDescription
           style={{
             textAlign: "center",
             color: "var(--primary-text)",
             fontSize: 20,
           }}
         >
           Dev Fee: {CONFIG.DEV_FEE}
         </s.TextDescription>
        </s.ContainerFacts>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
        <s.ContainerInfo flex={0.2} jc={"center"} ai={"center"} style={{
          backgroundColor: "var(--accent)",
          padding: 24,
          borderRadius: 24,
          border: "4px solid var(--secondary)",
          boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
        }}
      ><s.TextTitle
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "var(--accent-text)",
          marginTop: 0,
        }}
      >
      WEBSITE INFORMATION
      </s.TextTitle>
    <s.SpacerLarge />
      <StyledButton onClick={OpenWhitePaper}
    >
      WHITEPAPER
      </StyledButton>
    <s.SpacerSmall />
      <StyledButton
    >
      AUDIT
      </StyledButton>
    <s.SpacerSmall />
      <StyledButton
    >
      NEW ECOSYSTEM
      </StyledButton>
    <s.SpacerSmall />
      </s.ContainerInfo>
  </s.ContainerRow>
        </ResponsiveWrapper>
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
