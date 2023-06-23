import '../stylingFiles/fee.css'
import  { useEffect, useContext, useState } from 'react'
import { Context } from '../context/usercontext/context'
import axios from 'axios'
import { apiDomain } from '../utils/utils'

function Fee() {
    const { user } = useContext(Context)
    const [fee, setFee] = useState([])

    const getData = async () => {
        const res = await axios.get(`${apiDomain}/activity`,{
            headers: { 'Authorization': `${user.token}`}
        })
        setFee(res.data)
    }
    useEffect(() =>{

        getData()
    }, [])

    console.log(fee)
  return (
    <div>
        {
            fee && fee.map((item, index) => {
                return (
                    <>
                        <div key={index}>{ item.RegNo } { item.StudentName }</div> 
                        <div></div>
                    </>
                    
                )
                
              })
        }
      
    </div>
  )
}

export default Fee
