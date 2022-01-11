import loader from "../../svg/Eclipse-1s-200px.svg"
import React from "react";

const TablePreloader = () => {
    return <tr>
        <td>
            <img src={loader} alt="" />
        </td>
    </tr>
}

export default TablePreloader;