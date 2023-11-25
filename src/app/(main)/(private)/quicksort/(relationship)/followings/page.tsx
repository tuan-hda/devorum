'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { getCurrentFollowInformationService } from '@/services/userService'
import { Spinner } from '@nextui-org/react'
import UserCard from '@/components/relationship/UserCard'

const Following = () => {
  const { data, error, isLoading } = useSWR('/relationship/follow', getCurrentFollowInformationService)
  const followings = data?.data.followings

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (error) {
    console.log(error)
  }

  if (error || !followings || followings.data.length === 0)
    return (
      <div className="m-auto flex flex-col items-center gap-4">
        <Image
          alt="empty_state"
          src="/empty_state.svg"
          className="h-[160px] w-[160px] object-contain"
          width={160}
          height={160}
        />
        Hey we think you should start following someone!
      </div>
    )

  return (
    <div className="auto-grid h-fit w-full gap-4 p-4">
      {followings.data.map((following) => (
        <UserCard user={following.to} key={following._id} />
      ))}
    </div>
  )
}

export default Following
