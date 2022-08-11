import React, { useEffect } from "react";
import { useState } from "react";
import lottery from "../../lottery";
import web3 from "../../web3";


const Project = () => {
    const [address, setaddress] = useState('')
    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState('')
    const [value, setValue] = useState('')
    const [message, setMessage] = useState('')
    const [winner, setWinner] = useState('')
    const [messageMsg, setMessageMsg] = useState('')

    useEffect(() => {
        const details = async () => {
            const managersAddress = await lottery.methods.manager().call()
            const playersCount = await lottery.methods.getPlayers().call()
            const getBalance = await web3.eth.getBalance(lottery.options.address)
            setaddress(managersAddress)
            setPlayers(playersCount)
            setBalance(getBalance)
        }
        details()
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const accounts = await web3.eth.getAccounts()

        setMessage('Transaction processing, please wait...')

        await lottery.methods.addPlayer().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
        })

        setMessage('You have been entered!')
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts()

        setMessage('Transaction processing, please wait...')

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        const pickWinner = await lottery.methods.lastWinner().call()
        setWinner(pickWinner)

        setMessageMsg('has won!!')
        setMessage('A Winner has been picked')
    }

    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>
                This Contract is managed by: {address}.
                There are currently {players.length} people entered, competing to
                win {web3.utils.fromWei(balance, 'ether')} ether!!
            </p>
            <hr />
            <form onSubmit={handleSubmit}>
                <h4>Want to try your luck?</h4>
                <div>
                    <label>Amount of ether to enter</label>
                    <input
                        onChange={handleChange}
                        value={value}
                    />
                </div>
                <button>Enter</button>
            </form>
            <hr />
            <h4>Time to pick a winner?</h4>
            <button onClick={handleClick}>Pick Winner!</button>
            <h5>{winner} {messageMsg}</h5>
            <hr />
            <h1>{message}</h1>
        </div>
    )
}

export default Project