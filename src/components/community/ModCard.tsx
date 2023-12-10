'use client'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { Avatar, Button, Card, CardBody, Chip } from '@nextui-org/react'
import React from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  isOwner?: boolean
  username: string
  data: User
  onDelete: () => void
}

const ModCard = ({ isOwner, username, data, onDelete }: Props) => {
  const user = useUserStore((state) => state.user)
  return (
    <div className="group relative">
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <Avatar size="lg" src={data.avatar || '/gray.png'} />
            <div>
              {isOwner && (
                <Chip size="sm" className="mr-2" color="primary">
                  Owner
                </Chip>
              )}
              {user?.username === username && (
                <Chip size="sm" color="success">
                  You
                </Chip>
              )}
              <p className="font-light">{data.username}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      {!isOwner && (
        <Button
          onClick={onDelete}
          isIconOnly
          size="sm"
          radius="full"
          className="absolute -right-2 -top-2 opacity-0 transition duration-300 group-hover:opacity-80"
        >
          <IoClose />
        </Button>
      )}
    </div>
  )
}

export default ModCard