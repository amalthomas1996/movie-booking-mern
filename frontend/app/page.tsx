import Image from "next/image";
import LandingPage from "./pages/landing-page/page";
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
