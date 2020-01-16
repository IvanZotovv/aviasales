import React from "react";
import './CheckboxBlock.scss'

export const CheckboxBlock = (props) => {
    const handleChange = (value) => props.chageVal(value)

    return (
        <aside className="transplant">
            <h6 className="transplant-header">
                Количество пересадок
            </h6>
            <ul className="transplant-list">
                <li className="transplant-item">
                    <input 
                        type="checkbox" 
                        value={'all'}
                        onChange={handleChange}
                    />
                    Все
                </li>
                <li className="transplant-item">
                    <input 
                        type="checkbox" 
                        value={0}
                        onChange={handleChange}
                    />
                    Без пересадок
                </li>
                <li className="transplant-item">
                    <input 
                        type="checkbox" 
                        value={1}
                        onChange={handleChange}
                    />
                    1 пересадка
                </li>
                <li className="transplant-item">
                    <input 
                        type="checkbox"  
                        value={2}
                        onChange={handleChange}
                    />
                    2 пересадки
                </li>
                <li className="transplant-item">
                    <input 
                        type="checkbox"  
                        value={3}
                        onChange={handleChange}
                    />
                    3 пересадки
                </li>
            </ul>
        </aside>
    )
}

