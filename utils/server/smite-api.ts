import md5 from "md5"
import axios from "axios"

import { smiteAPIUrl } from '../../config'

const devId = process.env.SMITE_DEV_ID
const authKey = process.env.SMITE_AUTH_KEY
const timeStamp = new Date().toISOString().substr(0, 19).replace(/\D/gm, '')

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

export const testSession = async (session) => {
  const signature = getMD5Hash("testsession")

  try {
    const res = await axios({
      method: "GET",
      url: `${smiteAPIUrl}/testsessionJSON/${devId}/${signature}/${session}/${timeStamp}`
    })

    return res
  } catch (e) {
    throw new Error(e)
  }
}