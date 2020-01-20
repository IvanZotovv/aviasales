import React,{Component} from 'react';
import './App.scss';
import 'font-awesome/css/font-awesome.min.css';
import {CheckboxBlock} from "./components/AsideBlock/CheckboxBlock";
import Tickets from "./components/Tickets/Tickets";
import { connect } from 'react-redux'
import {filterTransplant, filterFastAndChip} from './action/actionCreators'

const URL_TICKETS = 'https://front-test.beta.aviasales.ru/search';
const FOUND_TICKETS = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

const getFirstTenTickets = ({tickets}) =>
    tickets.splice(0, 10).map(elem => ({...elem, id: Math.floor(Math.random() * 1000)}))

const getAllTicketsFromServer = async (url) => (
    fetch(url).then(response => response.json())
        .then(({searchId}) => searchId)
        .catch(err => console.log(err))
);

const getFoundTickets = ({url, id}) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}${id}`)
            .then(response => response.json())
            .then(data => resolve(getFirstTenTickets(data)))
            .catch(err => {
                reject(err);
            });
    })
}



class App extends Component {

    state = {
        searchId: '',
        isChecked: [],
        isOpen: false,
        isOpenSecond: false
    }

    async componentDidMount(): void {
        const searchId = await getAllTicketsFromServer(URL_TICKETS);
        this.setState({searchId});
    }

    componentDidUpdate(prevProps, prevState): void {
        const {searchId} = this.state;

        const isNewSearchIdTickets = searchId.length && prevState.searchId !== searchId && !this.props.list.length;

        const propsForSearchCurrentTickets = {
            url: FOUND_TICKETS,
            id: searchId
        }

        if(isNewSearchIdTickets) {
            getFoundTickets(propsForSearchCurrentTickets).then(data => {
                this.props.addItemsToState(data)
            })
                .catch(err => console.log(err))
        }
    }


    chooseEvent = (event) => {
        const val = event.target.value
        const {list} = this.props
        this.props.fastAndChipFilter(val, list)
        if(val === 'lower'){
            this.setState({isOpen: !this.state.isOpen})
        } else {
            this.setState({isOpenSecond: !this.state.isOpenSecond})
        }
    }


    changeValue = (e) => {
        const val = e.target.value
        const {list} = this.props
        
        const isCheckedVal = e.target.checked
        
        if(isCheckedVal){
            this.setState(state => {
                const addItem =  [...state.isChecked.concat(val)]
                this.props.filteringByTransplant(addItem, list)
                return { isChecked: addItem};
            })
        } else {
            this.setState(state => {
                const removeItem = [...state.isChecked.filter(i => !i.includes(val))]
                this.props.filteringByTransplant(removeItem, list)
                return { isChecked: removeItem};
            })            
        }

    }

    render() {
        const {isOpen, isOpenSecond} = this.state;
        return (
            <div className="container">
                <div className="logo">
                    <img className="logo-image" src='/img/logo.png' alt=""/>
                </div>
                <div className="main-block">
                    <CheckboxBlock
                        chageVal={this.changeValue}
                    />
                    <section className="ticket">
                        <div className="buttons-block">
                            <button
                                onClick={this.chooseEvent}
                                value='lower'
                                className={isOpen ? "buttons-block-cheap" : "buttons-block-fast"}
                                >самый дешевый</button>
                            <button
                                onClick={this.chooseEvent}
                                value='faster'
                                className={isOpenSecond ? "buttons-block-cheap-second" : "buttons-block-fast"}
                                >самый быстрый</button>
                        </div>
                        <Tickets list={this.props.list} />
                    </section>
                    <div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemsToState: (item) => dispatch({type: 'ADD_ITEMS', payload:item}),
        fastAndChipFilter: (type, item) => dispatch(filterFastAndChip(type, item)),
        filteringByTransplant: (isChecked, list) => dispatch(filterTransplant(isChecked, list))

        // filteringByTransplant: (isChecked) => dispatch({
        //     type: 'SET_FILTER', 
        //     payload: isChecked,
        //     // isChecked: isChecked
        // })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
