const Layout = (props) => {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>{`
        body {
          font-size: 25px;
          background-color: aliceblue;
          font-family: sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;
