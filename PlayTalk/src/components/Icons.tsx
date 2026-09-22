import React from "react";
import Svg, {
  Path,
  Circle,
} from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
}

const HomeIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      fill={color}
    />
  </Svg>
);

const HomeOutlineIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={color}
      strokeWidth={1.8}
      fill="none"
    />
  </Svg>
);

const ChatIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4 4H20C21.1 4 22 4.9 22 6V15C22 16.1 21.1 17 20 17H7L3 21V6C3 4.9 3.9 4 4 4Z"
      fill={color}
    />
  </Svg>
);

const ChatOutlineIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4 4H20C21.1 4 22 4.9 22 6V15C22 16.1 21.1 17 20 17H7L3 21V6C3 4.9 3.9 4 4 4Z"
      stroke={color}
      strokeWidth={1.8}
      fill="none"
    />
  </Svg>
);

const UsersIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="9"
      cy="7"
      r="3.5"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M3 19C3 15.134 5.686 12 9 12C12.314 12 15 15.134 15 19"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />

    <Path
      d="M16 11C17.933 11 19.5 9.433 19.5 7.5C19.5 5.567 17.933 4 16 4"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />

    <Path
      d="M21 19C21 16.239 18.985 14 16.5 14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const ProfileIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="8"
      r="3.5"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const SearchIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="11"
      cy="11"
      r="7"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M16.5 16.5L21 21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const BellIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M18 8C18 5.79086 15.3137 4 12 4C8.68629 4 6 5.79086 6 8C6 13 4 15 4 15H20C20 15 18 13 18 8Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />

    <Path
      d="M10 15C10 15.5523 10.4477 17 12 17C13.5523 17 14 15.5523 14 15"
      stroke={color}
      strokeWidth={1.8}
    />
  </Svg>
);

const PlayIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M8 5L19 12L8 19V5Z"
      fill={color}
    />
  </Svg>
);

const PlusIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 4V20M4 12H20"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const BackIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShareIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="18"
      cy="5"
      r="2.5"
      stroke={color}
      strokeWidth={1.8}
    />
    <Circle
      cx="6"
      cy="12"
      r="2.5"
      stroke={color}
      strokeWidth={1.8}
    />
    <Circle
      cx="18"
      cy="19"
      r="2.5"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17"
      stroke={color}
      strokeWidth={1.8}
    />
  </Svg>
);

const SaveIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M5 3H19V21L12 17L5 21V3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </Svg>
);

const SavedIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M5 3H19V21L12 17L5 21V3Z"
      fill={color}
    />
  </Svg>
);

const DownloadIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 3V15M12 15L8 11M12 15L16 11"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Path
      d="M5 19H19"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const CheckIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M5 12L10 17L19 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const XIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const SendIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AttachIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80944 14.7185 1.38778 15.78 1.38778C16.8415 1.38778 17.8594 2.30944 18.61 2.56C19.3606 3.31056 19.7822 4.32855 19.7822 5.39C19.7822 6.45145 19.3606 7.46944 18.61 8.22L9.41 17.41C9.03472 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4643 6.20472 14.9553 6.58 14.58L15.07 6.1"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoreIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="5" r="1.5" fill={color} />
    <Circle cx="12" cy="12" r="1.5" fill={color} />
    <Circle cx="12" cy="19" r="1.5" fill={color} />
  </Svg>
);

const YouTubeIcon = ({
  size = 24,
}: {
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"
      fill="#E03131"
    />
  </Svg>
);

const LinkIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6459 14.9923C14.3603 15.0435 15.0769 14.9404 15.7482 14.6898C16.4194 14.4392 17.0302 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Path
      d="M14 11C13.5705 10.4259 13.0226 9.95087 12.3934 9.60706C11.7643 9.26326 11.0685 9.05891 10.3541 9.00769C9.63966 8.95647 8.92314 9.05963 8.25185 9.31021C7.58056 9.56079 6.96982 9.95291 6.46 10.46L3.46 13.46C2.54918 14.403 2.04519 15.6661 2.05659 16.977C2.06798 18.288 2.59383 19.5421 3.52087 20.4691C4.44791 21.3962 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="12"
      r="9"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M12 7V12L15 14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const EyeIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
      stroke={color}
      strokeWidth={1.8}
    />

    <Circle
      cx="12"
      cy="12"
      r="3"
      stroke={color}
      strokeWidth={1.8}
    />
  </Svg>
);

const PlaylistIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M3 7H21M3 12H15M3 17H15M18 15V21M15 18H21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const PersonPlusIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle
      cx="9"
      cy="7"
      r="3.5"
      stroke={color}
      strokeWidth={1.8}
    />

    <Path
      d="M3 19C3 15.134 5.686 12 9 12C10.5 12 11.9 12.6 13 13.6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />

    <Path
      d="M18 14V20M15 17H21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const PlusIconSolid = ({
  size = 24,
  color = "#FFFFFF",
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M12 5V19"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <Path
      d="M5 12H19"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

const WifiOffIcon = ({
  size = 24,
  color = "#000",
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M1 1L23 23M16.72 11.06C17.7581 11.6879 18.6919 12.4671 19.49 13.37M5 12.55C6.28 11.07 7.97 10 9.91 9.46M10.71 5.05C13.0044 4.69271 15.3489 5.09226 17.41 6.19M2.52 9.88C3.66 8.75 5 7.83 6.48 7.18"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />

    <Circle
      cx="12"
      cy="20"
      r="1"
      fill={color}
    />
  </Svg>
);

export {
  HomeIcon,
  HomeOutlineIcon,
  ChatIcon,
  ChatOutlineIcon,
  UsersIcon,
  ProfileIcon,
  SearchIcon,
  BellIcon,
  PlayIcon,
  PlusIcon,
  BackIcon,
  ShareIcon,
  SaveIcon,
  SavedIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
  SendIcon,
  AttachIcon,
  MoreIcon,
  YouTubeIcon,
  LinkIcon,
  ClockIcon,
  EyeIcon,
  PlaylistIcon,
  PersonPlusIcon,
  WifiOffIcon,
};