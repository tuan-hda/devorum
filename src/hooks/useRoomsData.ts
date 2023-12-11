import { listRoomsService } from '@/services/chatService'
import { getCommunityService } from '@/services/communityService'
import { Room } from '@/types/chat.type'
import { Community } from '@/types/community.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

const useRoomsData = () => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWR<Room[], AxiosError>('listRoomsData', () =>
    listRoomsService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useRoomsData
