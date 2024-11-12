import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import SliderSelect from "./components/SliderSelect";
import TenureSelect from "./components/TenureSelect";
import { useState, useEffect } from "react";

function App() {
  const [homeValue, setHomeValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [term, setTerm] = useState(5);
  const [provider, setProvider] = useState("TD"); 
  const [interestRate, setInterestRate] = useState(5); 

  const loanAmount = homeValue - downPayment;

  const providerRates = {
  TD: 5.0,
  BMO: 5.2,
  RBC: 5.4,
  ScotiaBank: 5.6,
  CIBC: 5.8
};

const handleProviderChange = (newProvider) => {
  setProvider(newProvider); 
  setInterestRate(providerRates[newProvider]); 
};

  const calculateMonthlyPayment = (loanAmount, interestRate, term) => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return monthlyPayment.toFixed(2); 
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, term);

  return (
    <div className="App">
      <Navbar />
      <Container sx={{ marginTop: 4, width: "50%" }}>
        <SliderSelect
          homeValue={homeValue}
          downPayment={downPayment}
          setHomeValue={setHomeValue}
          setDownPayment={setDownPayment}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          handleProviderChange={handleProviderChange} 
        />
        <TenureSelect term={term} setTerm={setTerm} />
        <Result loanAmount={loanAmount} monthlyPayment={monthlyPayment} />
      </Container>
    </div>
  );
}

export default App;




