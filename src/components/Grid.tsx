import React from 'react';
import  "../styles/Grid.css"


function  cell_generate(count: number){
    let list = []
    while (count >0){
        count --
        list.push(
            <div>
                <div className='grid_cell'>
                    <div className="cell_image-title">
                    <img src="https://ton.org/download/ton_symbol.png" alt="" className='coin_img'/>
                    <div className="coin_title">Ton coin</div>
                    </div>
                    <div className="cell_base_cation">Support Campaign</div>
                    <div className="cell_advance_cation">Support Campaign Plus</div>
                    <div className="cell_base_price">$40 $20 / month</div>
                    <div className="cell_advance_price">$40 $20 / month</div>
                    <div className="cell_base_limit">Only 1 node left!</div>
                    <div className="cell_advance_limit">No limits</div>
            </div>
            </div>)

}
return list}




const Grid = () => {

    return (
        <div className="grid">
            <div className="grid_header">Full Nodes</div>
            {cell_generate(10)}
        </div>
    );
};

export default Grid;