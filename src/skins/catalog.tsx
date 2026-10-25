import { lazy, type ComponentType } from "react";
import type { SkinProps } from "../AppSkins";
const system = () => import("./SystemSkins");
const messaging = () => import("./MessagingSkins");
const social = () => import("./SocialSkins");
const media = () => import("./MediaSkins");
const commerce = () => import("./CommerceSkins");
function skin<T>(load: () => Promise<T>, name: keyof T) {
  return lazy(async () => ({
    default: (await load())[name] as ComponentType<SkinProps>,
  }));
}
const mymy = () => import("../vendor/mymy/Apps");
export const catalogSkins = {
  kakao: skin(mymy, "MymyKakao"),
  instagram: skin(mymy, "MymyInstagram"),
  phone: skin(system, "PhoneSkin"),
  contacts: skin(system, "ContactsSkin"),
  photos: skin(system, "PhotosSkin"),
  camera: skin(system, "CameraSkin"),
  safari: skin(system, "SafariSkin"),
  notes: skin(system, "NotesSkin"),
  calendar: skin(system, "CalendarSkin"),
  mail: skin(system, "MailSkin"),
  clock: skin(system, "ClockSkin"),
  reminders: skin(system, "RemindersSkin"),
  files: skin(system, "FilesSkin"),
  music: skin(system, "MusicSkin"),
  maps: skin(system, "MapsSkin"),
  weather: skin(system, "WeatherSkin"),
  wallet: skin(system, "WalletSkin"),
  health: skin(system, "HealthSkin"),
  find: skin(system, "FindSkin"),
  messages: skin(messaging, "MessagesSkin"),
  telegram: skin(messaging, "TelegramSkin"),
  discord: skin(messaging, "DiscordSkin"),
  line: skin(() => import("./LineInteractiveSkin"), "LineInteractiveSkin"),
  messenger: skin(messaging, "MessengerSkin"),
  twitter: skin(mymy, "MymyX"),
  threads: skin(() => import("./ThreadsReference"), "ThreadsReference"),
  facebook: skin(social, "FacebookSkin"),
  pinterest: skin(social, "PinterestSkin"),
  snapchat: skin(social, "SnapchatSkin"),
  spotify: skin(media, "SpotifySkin"),
  netease: skin(media, "NeteaseSkin"),
  youtube: skin(media, "YouTubeSkin"),
  bilibili: skin(media, "BilibiliSkin"),
  tiktok: skin(media, "TikTokSkin"),
  netflix: skin(media, "NetflixSkin"),
  grab: skin(() => import("./GrabSkin"), "GrabSkin"),
};
