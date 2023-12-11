export type Room = {
  _id: string
  createdAt: string
  updatedAt: string
  participants: [string]
  lastMessage?: Message
}

export type Message = {
  from: string
  body: string
  likes: [string]
  replyTo?: string
  room: string
  createdBy: string
  language?: string
  mediaUrl?: string
}
