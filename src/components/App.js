import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isCustomCursor: false };
  }

  render() {
    return (
      <div className="body">
        <div className="page">
          <Header />
          <Routes>
            <Route path="/" element={<Main />}/>
            {/* <Route path="register" element={<Register />}/> */}
            {/* <Route path="login" element={<Login />}/> */}
          </Routes>
          <Footer />
        </div>
        {/* <EditDataPopup />
        <AddDataPopup />
        <InfoTooltip /> */}
      </div>
    );
  }
}

export default App;
