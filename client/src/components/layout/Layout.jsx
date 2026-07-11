import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="container page">
        {children}
      </main>
    </>
  );
}