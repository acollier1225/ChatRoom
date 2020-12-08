import React from 'react';
import Menu from './Menu';


class Dropdown extends React.Component {
    constructor() {
        super()
        this.state = {
            selected: 'Select Chat',
            options: [
                {
                    id: 0, 
                    label: 'Same Song',
                    value: 'Same Song',
                    key: 'Same Song',
                    selected: false
                },
                {
                    id: 1,
                    label: 'Top Artists',
                    value: 'Top Artists',
                    key: 'Top Artists',
                    selected: false
                },
                {
                    id: 2,
                    label: 'Searched Artists',
                    value: 'Searched Artists',
                    key: 'Searched Artists',
                    selected: false
                }
            ]
        }
    }

    toggleSelected = (key) => {
        this.props.check();
        console.log(key)
        this.setState({
            selected: key
        })
        this.props.chooseRoom(key)
        console.log(this.state)
      }
    

    render() {
        
        return ( 
            <div>
                <Menu title={this.state.selected} list={this.state.options} toggleItem={this.toggleSelected} />
            </div> 
        );
    }
}
 
export default Dropdown;