import { Schibsted_Grotesk, Gloock } from "next/font/google";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weights: [400, 700],
});
const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const Home = () => {
  return (
    <div
      className={schibstedGrotesk.className + " text-white"}
      style={{
        fontWeight: schibstedGrotesk.style.fontWeight,
      }}
    >
      Home
    </div>
  );
};

export default Home;
