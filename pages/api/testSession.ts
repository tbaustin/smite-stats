import type { NextApiRequest, NextApiResponse } from 'next'

import { testSession } from '../../utils/server/smite-api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { session } = req.body

  const axiosResponse = await testSession(session)

  res.status(200).json(axiosResponse.data)
}
