import Image from "next/image";
import LandingPage from "./landing-page/page";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
