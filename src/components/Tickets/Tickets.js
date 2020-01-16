import React,{Component} from 'react';
import './Tickets.scss'


class Tickets extends Component {

    render() {
        const {list} = this.props
        const listOfItems = list.length ? list.map(item => {
            if (item.hide) {
                return null;
            }

            return (
                <li className="tickets-item" key={item.price}>
                    <div className="tickets-item-main-info">
                        <h4 className="tickets-price">{item.price.toString().slice(0, 2)} {item.price.toString().slice(2, 5)} Р</h4>
                        <div className="tickets-block-logo">
                            <img src='/img/S7 Logo.png' alt="" className="tickets-log0"/>
                        </div>
                    </div>
                    {
                        item.segments.map(el => {
                            return (
                                <div>
                                    <ul className="ticket-to-list">
                                        <li className="ticket-to-item" key={el.id}>
                                            <div className="ticket-to-item-about">
                                                <p className="ticket-to-item-about-first">{el.origin}-{el.destination}</p>
                                                <p className="ticket-to-item-about-second">10:45-08:00</p>
                                            </div>
                                        </li>
                                        <li className="ticket-to-item">
                                            <div className="ticket-to-item-about">
                                                <p className="ticket-to-item-about-first">В пути</p>
                                                <p className="ticket-to-item-about-second">{(el.duration/60).toFixed(0)}ч {el.duration%60}м</p>
                                            </div>
                                        </li>
                                        <li className="ticket-to-item">
                                            <div className="ticket-to-item-about">
                                                <p className="ticket-to-item-about-first">{el.stops.length} пересадка</p>
                                                <div className="ticket-to-item-about-second">
                                                {
                                                    el.stops.map(element => {
                                                        return (
                                                            <p className="ticket-to-item-about-second-page">{element}</p>
                                                        )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </li>
            )
        }) : null

        return (
            <main className="tickets-block">
                <ul className="tickets-list">
                    {listOfItems}
                </ul>
            </main>
        )
    }

}


export default Tickets;


