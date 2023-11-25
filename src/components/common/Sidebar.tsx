'use client'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { Listbox, ListboxItem } from '@nextui-org/react'
import Link from 'next/link'
import { QuicksortOverview } from '@/types/user.type'

type ListItem = {
  name: string
  path: string
}

type Props = {
  list: ListItem[]
  overviewData?: QuicksortOverview
}

const Sidebar = ({ list, overviewData }: Props) => {
  const pathname = usePathname()

  return (
    <div className="col-span-3 h-fit rounded-xl bg-dark-2">
      <Listbox aria-label="Actions" className="" variant="flat">
        {list.map((item) => (
          <ListboxItem
            as={Link}
            href={item.path}
            key={item.name}
            className={classNames(pathname.endsWith(item.path) && 'bg-dark-1', 'h-12 px-4 text-base')}
          >
            <p
              className={classNames(
                pathname.endsWith(item.path) ? 'font-medium' : 'font-normal',
                'flex items-center justify-between text-base',
              )}
            >
              <span>{item.name}</span>
              {overviewData && <span>{overviewData[item.name.toLowerCase() as keyof QuicksortOverview] ?? 0}</span>}
            </p>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}

export default Sidebar
