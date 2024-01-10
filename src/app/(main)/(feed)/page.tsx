'use client'
import { AppButton, HorizontalNav, PostItem, Divider } from '@/components'
import { TabProps } from '@/components/common/Tab/TabButton'
import useFixMissingScroll from '@/hooks/useFixMissingScroll'
import useInfiniteScrollData from '@/hooks/useInfiniteScrollData'
import usePostsData from '@/hooks/usePostsData'
import useRecommendedPostsData from '@/hooks/useRecommendedPostsData'
import { usePostStore } from '@/store/usePostStore'
import { useUserStore } from '@/store/useUserStore'
import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons'
import { Button, Spinner, Tab, Tabs } from '@nextui-org/react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const tabs: TabProps[] = [
  {
    key: 'new',
    icon: <ClockCircleOutlined />,
    label: 'New',
  },
  {
    key: 'top',
    icon: <ArrowUpOutlined rotate={45} className="text-[14px]" />,
    label: 'Top',
  },
  {
    key: 'hot',
    icon: <FireOutlined />,
    label: 'Hot',
  },
  { key: 'closed', icon: <CheckCircleOutlined />, label: 'Closed' },
]

export default function Page() {
  const { posts, setPosts, initSelected } = usePostStore()
  const { data, isLoading, mutate } = useRecommendedPostsData()
  const [selectedTab, setSelectedTab] = useState<string | number>(tabs[0].key)
  const { user } = useUserStore()
  const router = useRouter()
  const [domLoaded, setDomLoaded] = useState(false)

  const filteredPosts = useMemo(() => {
    if (!data) return []
    console.log('filtered user:', user)
    if (user) {
      return data.posts.filter((item) => !user.blocks.find((block) => block === item.user.username))
    } else {
      return data.posts
    }
  }, [data, user])

  useEffect(() => {
    setDomLoaded(true)
    mutate()
  }, [mutate])

  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts)
    }
  }, [data])

  const { hasMore, limitData, releaseData } = useInfiniteScrollData(data?.posts || [], '')
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useFixMissingScroll({
    hasMoreItems: hasMore,
    fetchMoreItems: releaseData,
    element: element,
  })

  if (!domLoaded) return null

  const onSelectionChange = (key: string | number) => {
    setSelectedTab(key)
    // switch (key) {
    //   case 'top':
    //     setCurrentPosts(posts.slice(0, 1))
    //     break
    //   case 'hot':
    //     setCurrentPosts(posts.slice(1.3))
    //     break
    //   case 'closed':
    //     setCurrentPosts(posts.slice(2, 6))
    //     break
    //   case 'new':
    //   default:
    //     setCurrentPosts(posts)
    //     break
    // }
  }

  const handlePostClick = () => {
    if (user) {
      initSelected(user)
      router.push('new/post')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="pl-32 pt-2 text-base">
      <title>Devorum</title>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <main className="relative mt-2 grid h-full grid-cols-12 flex-col items-center justify-between gap-5 px-10">
          <p className="text-gray-bg">main</p>
        </main>
      </Head>
      <div className="flex h-full flex-col" ref={(node) => setElement(node)}>
        {/* Question */}
        {/* <div className="mb-2 flex flex-row justify-center">
          <p className="flex-1 text-3xl font-normal text-gray-bg">Top Questions</p>
          <Button color="primary" onClick={handlePostClick}>
            Post
          </Button>
        </div> */}
        {/* <Tabs
          aria-label="Options"
          className="-ml-3 mb-6"
          variant="underlined"
          selectedKey={selectedTab || tabs[0].key}
          onSelectionChange={(key) => onSelectionChange(key)}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              }
            />
          ))}
        </Tabs> */}
        {user ? (
          <>
            <InfiniteScroll
              dataLength={data?.posts.length || 0} //This is important field to render the next data
              next={releaseData}
              hasMore={hasMore}
              loader={<Spinner className="w-full" />}
            >
              {limitData.map((item, idx) => (
                <Fragment key={item._id}>
                  <PostItem {...item} key={item._id} />
                  {idx !== posts.length - 1 && <div className="mb-10 border-t border-t-gray-4/20" />}
                </Fragment>
              ))}
              {/* {notifications.map((noti, i) => (
                  <Fragment key={i}>
                    <Notification data={noti} />
                    {i !== notifications.length - 1 && <Divider />}
                  </Fragment>
                ))} */}
            </InfiniteScroll>
          </>
        ) : (
          <>
            {posts.map((item, idx) => (
              <Fragment key={item._id}>
                <PostItem {...item} key={item._id} />
                {idx !== posts.length - 1 && <div className="mb-10 border-t border-t-gray-4/20" />}
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
