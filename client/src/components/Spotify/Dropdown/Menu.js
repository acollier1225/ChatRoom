import React, { Component } from 'react';
import './Menu.css'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listeOpen: false,
            headerTitle: this.props.title
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.title !== prevProps.title) {
            this.setState({
                listOpen: false,
                headerTitle: this.props.title
            })
        }
    }

    handleClickOutside(){
        this.setState({
          listOpen: false
        })
    }

    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    
    render() { 
        const{list} = this.props
        const{listOpen, headerTitle} = this.state
        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                </div>
                {listOpen && <ul className="dd-list">
                {list.map((item) => (
                    item.label !== this.state.headerTitle ? <li className="dd-list-item" key={item.id} 
                    onClick={() => this.props.toggleItem(item.key)}>{item.label}</li> : null
                    ))}
                </ul>}
            </div>
        )
    }
}
 
export default Menu;