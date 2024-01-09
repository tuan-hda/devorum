import { Tag } from '@/types/post.type'
import { CloseCircleOutlined, CloseSquareOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface IProps {
  tag: string
  editing?: boolean
}

function TagButton({ tag, editing = false }: IProps) {
  return (
    <div
      className={classNames(
        'flex w-fit flex-row items-center gap-1 rounded-full bg-gray-4/10 px-[8px] py-1',
        editing && 'border',
      )}
    >
      <p className="whitespace-nowrap text-sm font-light text-dark-8 invert">{tag}</p>
      {editing && <CloseCircleOutlined className="cursor-pointer text-dark-8 invert" style={{ fontSize: 14 }} />}
    </div>
  )
}

export default TagButton
