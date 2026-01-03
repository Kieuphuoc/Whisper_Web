// types.ts

// Định nghĩa trạng thái riêng để dễ quản lý và mở rộng sau này
export type FriendStatus = "online" | "offline" | "recording";

export interface Friend {
  id: string | number;
  name: string;
  avatar: string;
  status: FriendStatus;
  lastTrack?: string; // Tên bài hát/audio đang nghe hoặc vừa thu âm
  timeAgo?: string;   // Ví dụ: "2m ago", "Just now"
  emotion?: string;   // Dùng cho EmotionBadge (nếu có), ví dụ: "happy", "sad"
}

export interface FriendBoxProps {
  friends: Friend[];
  // Optional: Thêm callback nếu bạn muốn xử lý sự kiện click vào bạn bè
  onFriendClick?: (friend: Friend) => void;
}