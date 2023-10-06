import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { BoxMain } from "@/components/boxes"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <BoxMain>
      <p>Session: {JSON.stringify(session)}</p>
      <p>User session</p>

    </BoxMain>
  )
}
