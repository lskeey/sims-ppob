import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container max-w-5xl mx-auto px-8 py-8">
        {children}
      </div>
    </>
  )
}

export default MainLayout