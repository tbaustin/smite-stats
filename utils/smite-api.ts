import md5 from "md5"
import { format } from "date-fns"
import axios from "axios"

import { smiteAPIUrl } from '../config'

const devId = process.env.NEXT_PUBLIC_SMITE_DEV_ID
const timeStamp = format(Date.now(), "yyyyMMddHHmmss")
const authKey = process.env.NEXT_PUBLIC_SMITE_AUTH_KEY

const getMD5Hash = (method) => {
  const hashString = `${devId}${method}${authKey}${timeStamp}`

  return md5(hashString)
}

export const createSession = async () => {
  const signature = getMD5Hash("createsession")

  try {
    const res = await axios({
      method: "GET",
      url: `${smiteAPIUrl}/createsessionJSON/${devId}/${signature}/${timeStamp}`
    })

    return res
  } catch (e) {
    throw new Error(e)
  }  
}