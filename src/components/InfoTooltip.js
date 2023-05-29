import { Component } from 'react';

class InfoTooltip extends Component {

  handleClick = (e) => {
    const index = Number(e.target.value);
    const updatedList = this.props.infoList;
    updatedList.splice(index, 1);
    this.props.setInfoList(updatedList);
  }

  render() {
    return (
      this.props.infoList.map((item, index) => (
        <button key={index} className={`info__button ${item && "info__button_opened"}`} onClick={this.handleClick} value={index}>{item}</button>
      ))
    )
  }
}

export default InfoTooltip;