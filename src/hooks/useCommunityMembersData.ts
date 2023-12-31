import { getCommunityMembersService, getCommunityService } from '@/services/communityService'
import { Community, JoinedUser } from '@/types/community.type'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useCommunityMembersData = (community: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<JoinedUser[], AxiosError>(
    ['getCommunityMembersData', community],
    ([, communityKey]) => getCommunityMembersService(communityKey as string).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useCommunityMembersData
