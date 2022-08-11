import React, { useEffect } from "react";
import { useState } from "react";
import lottery from "../../lottery";



const Project = () => {
    const[address, setaddress ] = useState(null)

    useEffect(() => {
    const managerAddress = async() => {
        const res = await lottery.methods.manager().call()
        setaddress(res)
    }
       managerAddress()
    },[])

    return(
        <div>
            <h1>Lottery Contract</h1>
            <p>This Contract is managed by: {address}</p>
        </div>
    )
}

export default Project