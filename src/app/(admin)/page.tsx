import { getServerSession } from "next-auth"

import { authOptions } from "@/libs/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="">
      <p>Session: {JSON.stringify(session)}</p>
      <p>User session</p>

    </div>
  )
}
