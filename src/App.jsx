import { useState } from "react";
import SurpriseReveal from "./components/SurpriseReveal";
import BirthdayCard from "./components/BirthdayCard";
import "./index.css";

export default function App() {
  const [revealed, setRevealed] = useState(false);

  return revealed
    ? <BirthdayCard />
    : <SurpriseReveal onReveal={() => setRevealed(true)} />;
}
