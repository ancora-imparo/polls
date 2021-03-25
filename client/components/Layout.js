import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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

export const SubmitButton = withStyles(() => ({
  root: {
    color: 'white',
    margin: '5px',
    fontSize: '100%',
    backgroundColor: '#339911',
    '&:hover': {
      backgroundColor: 'primary',
    },
  },
}))(Button);

export default Layout;
