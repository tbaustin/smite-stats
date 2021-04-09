import type { NextApiRequest, NextApiResponse } from 'next'

import { createSession } from '../../utils/smite-api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const axiosResponse = await createSession()

  res.status(200).json(axiosResponse.data)
}
