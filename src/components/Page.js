import { Component } from 'react';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedPage: false,
    };
  }

  handleSelectedPageClick = (e) => {
    this.props.setSelectedPage(Number(e.target.value));
    this.props.setIsLoading(false);
    this.props.onPage(e.target.value, this.props.perPage);
    if (Number(e.target.value) === 1) {
      this.props.setDisabledPrevButton(true);
      this.props.setDisabledNextButton(false);
    } else if (Number(e.target.value) === this.props.pages) {
      this.props.setDisabledNextButton(true);
      this.props.setDisabledPrevButton(false);
    } else {
      this.props.setDisabledPrevButton(false);
      this.props.setDisabledNextButton(false);
    }
  }

  render() {
    return (
      <button className={`table__button-page ${this.props.selectedPage === this.props.id && "table__button-page_active"}`} onClick={this.handleSelectedPageClick} value={this.props.id}>{this.props.id}</button>
    )
  }
}

export default Page;