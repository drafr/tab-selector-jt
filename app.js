class Tab extends React.Component {
  render() {
    const {selected, onClick, title} = this.props;
    let className = selected ? 'tabs__tab tabs__tab--selected' : 'tabs__tab';
    return <li className={className} onClick = {onClick}>{title}</li>
  }
}

class TabsBar extends React.Component {
  render() {
    const listItems = tabsData.map(({title}, index) => (
      <Tab 
        key={index}
        title={title} 
        onClick={() => this.props.onSelect(index)}
        selected={index === this.props.selected}
      />
    ));
    return (
      <ul className='tabs__tab-bar'>
        {listItems}
      </ul>
    );
  }
}

class TabsContent extends React.Component {
  render() {
    const formattedText = 
      tabsData[this.props.selected].text.split('\n').map((para, i) => 
        <p key={i}>{para}</p>
      );
    return (
      <div className='tabs__content'>
        {formattedText}
      </div>
    );
  }
}

class Tabs extends React.Component {
  render() {
    const {selected, onSelect} = this.props;
    return (
      <div className='tabs'>
        <TabsBar selected={selected} onSelect={onSelect} />
        <TabsContent selected={selected} />
      </div>
    );
  }
}

class Spinner extends React.Component {
  render() {
    return (
      <div className='spinner'>
        <img src='spinner.svg' />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    let selectedTab = window.localStorage.getItem('selectedTab');
    
    this.state = {
      selected: Number(selectedTab),
      isLoading: true
    }
    
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);    
    
    this.handleSelect = (position) => {
      window.localStorage.setItem('selectedTab', position);
      this.setState({
        selected: position
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Переключалка табов</h1>
        {this.state.isLoading ? 
          <Spinner /> :
          <Tabs selected={this.state.selected} onSelect={this.handleSelect}/>
        }
      </React.Fragment>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);