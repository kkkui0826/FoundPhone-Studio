import { useState } from "react";
import {
  Home,
  Send,
  Plus,
  Heart,
  User,
  Search,
  Menu,
  MoreHorizontal,
  ArrowLeft,
  Repeat2,
  Bookmark,
  SquarePen,
  SlidersHorizontal,
  BellOff,
  ChevronRight,
  X,
  Smile,
  Globe,
  Mic,
  Delete,
  ArrowUp,
  CornerDownLeft,
  Pin,
} from "lucide-react";
import type { SkinProps } from "../AppSkins";
import { Avatar, Media } from "./shared";
import { makeItem, type Item } from "../schema";
import { useSkinState } from "../skinState";
import "./threads-reference.css";
export function ThreadsReference(p: SkinProps) {
  const [tab, setTab] = useSkinState<string>(p, "threads-tab", "首页"),
    [liked, setLiked] = useSkinState<string[]>(p, "threads-liked", []),
    [saved, setSaved] = useSkinState<string[]>(p, "threads-saved", []),
    [posts, setPosts] = useSkinState<string[]>(p, "threads-posts", []),
    [replies, setReplies] = useSkinState<string[]>(p, "threads-replies", []);
  const [draft, setDraft] = useState(""),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("全部"),
    [side, setSide] = useState(false),
    [compose, setCompose] = useState(false),
    [keyboard, setKeyboard] = useState(false),
    [shift, setShift] = useState(false),
    [numbers, setNumbers] = useState(false),
    [options, setOptions] = useState(false),
    [selected, setSelected] = useState<Item | null>(null);
  const local: Item[] = [];
  // Keep the configured demo profile/posts visible even if an older saved runtime
  // filters those records out before they reach this skin.
  const username = "OMMUJJ";
  const bio = "mo的秘密空间";

  // Seed the supplied OMMUJJ timeline in reverse chronological order:
  // newest posts appear first, while timestamps preserve the story's sequence.
  const configuredPosts = [
    makeItem({
      id: "threads-post-20261023-6",
      title: "晚安✨",
      body: "晚安✨",
      sender: username,
      kind: "post",
      time: "2026-10-23 23:31",
    }),
    makeItem({
      id: "threads-post-20261023-5",
      title: "差一点被dada发现mo在偷偷玩手机没有碎觉了😪好吧！mo要去找dada一起碎觉～",
      body: "差一点被dada发现mo在偷偷玩手机没有碎觉了😪好吧！mo要去找dada一起碎觉～",
      sender: username,
      kind: "post",
      time: "2026-10-23 23:30",
    }),
    makeItem({
      id: "threads-post-20261023-4",
      title: "我特别特别爱我的daddy和dada💙💛",
      body: "我特别特别爱我的daddy和dada💙💛",
      sender: username,
      kind: "post",
      time: "2026-10-23 23:15",
    }),
    makeItem({
      id: "threads-post-20261023-3",
      title: "其实mo刚刚还想嗦🥺mo爱daddy和dada❤️",
      body: "其实mo刚刚还想嗦🥺mo爱daddy和dada❤️",
      sender: username,
      kind: "post",
      time: "2026-10-23 23:00",
    }),
    makeItem({
      id: "threads-post-20261023-2",
      title: "嘿嘿daddy和dada被mo吓了一跳！mo很泥害吧！但是mo太紧脏了感觉有一点点没发挥好🥺dada嗦没关系，mo是全天下最棒的小孩，是我们家最尼害的人，可数为什么dada和daddy一直在笑呀？还让mo嗦安德莱🤟好吧！全家最尼害的人会满足Juju和P‘Jirun的愿望的🥰",
      body: "嘿嘿daddy和dada被mo吓了一跳！mo很泥害吧！但是mo太紧脏了感觉有一点点没发挥好🥺dada嗦没关系，mo是全天下最棒的小孩，是我们家最尼害的人，可数为什么dada和daddy一直在笑呀？还让mo嗦安德莱🤟好吧！全家最尼害的人会满足Juju和P‘Jirun的愿望的🥰",
      sender: username,
      kind: "post",
      time: "2026-10-23 22:50",
    }),
    makeItem({
      id: "threads-post-20261023-1",
      title: "啊啊啊啊好紧脏！！",
      body: "啊啊啊啊好紧脏！！",
      sender: username,
      kind: "post",
      time: "2026-10-23 22:40",
    }),
    makeItem({
      id: "threads-post-20261012-1",
      title: "上幼儿园的时候大家嗦mo的声音很可爱！mo很开心！mo要更噜力，一定能学会生日歌的，mo要唱给daddy听🥰",
      body: "上幼儿园的时候大家嗦mo的声音很可爱！mo很开心！mo要更噜力，一定能学会生日歌的，mo要唱给daddy听🥰",
      sender: username,
      kind: "post",
      time: "2026-10-12 18:00",
    }),
    makeItem({
      id: "threads-post-20261010-2",
      title: "其实mo知道daddy和dada很想听到mo的声音，mo练习了好久，daddy和dada会喜欢mo的声音嘛🥺",
      body: "其实mo知道daddy和dada很想听到mo的声音，mo练习了好久，daddy和dada会喜欢mo的声音嘛🥺",
      sender: username,
      kind: "post",
      time: "2026-10-10 20:00",
    }),
    makeItem({
      id: "threads-post-20261010-1",
      title: "哇啊啊啊啊mo这次写得一个字都米有错！mo好棒😎🤟",
      body: "哇啊啊啊啊mo这次写得一个字都米有错！mo好棒😎🤟",
      sender: username,
      kind: "post",
      time: "2026-10-10 19:00",
    }),
    makeItem({
      id: "threads-post-20261003-1",
      title: "mo想给daddydada写信，写错了好多张纸，P'cream说mo可以用那些纸折成纸飞机送给大家，现在大家都收到mo的礼物了！",
      body: "mo想给daddydada写信，写错了好多张纸，P'cream说mo可以用那些纸折成纸飞机送给大家，现在大家都收到mo的礼物了！",
      sender: username,
      kind: "post",
      time: "2026-10-03 18:00",
    }),
    makeItem({
      id: "threads-post-20260930-2",
      title: "daddy给mo买的手机，因为mo想和daddydada打电哇，dada还帮mo注册了line，说mo如果打不通电哇就可以在这上面给他们发消息，mo早就学会了！还知道threads怎么用，偷偷来这玩不告诉dadda噢🍥",
      body: "daddy给mo买的手机，因为mo想和daddydada打电哇，dada还帮mo注册了line，说mo如果打不通电哇就可以在这上面给他们发消息，mo早就学会了！还知道threads怎么用，偷偷来这玩不告诉dadda噢🍥",
      sender: username,
      kind: "post",
      time: "2026-09-30 18:10",
    }),
    makeItem({
      id: "threads-post-20260930-1",
      title: "mo来了了了了（没告诉dadda窝偷偷来的！）",
      body: "mo来了了了了（没告诉dadda窝偷偷来的！）",
      sender: username,
      kind: "post",
      time: "2026-09-30 18:00",
    }),
  ];
  const existingPosts = p.items.filter((i) => i.id.startsWith("threads-post-"));
  const feed = [
      ...local,
      ...configuredPosts.map(
        (fallback) => existingPosts.find((i) => i.id === fallback.id) ?? fallback,
      ),
    ],
    messages = p.items.filter((i) => i.folder === "私信"),
    activities = p.items.filter((i) => i.meta.activityType);
  const toggle = (id: string, items: string[], set: (v: string[]) => void) =>
    set(items.includes(id) ? items.filter((v) => v !== id) : [...items, id]);
  const open = (i: Item) => {
    if (i.password || p.creator) {
      p.onItem(i);
      return;
    }
    if (i.meta.local !== "true") p.onRead(i.id);
    setSelected(i);
  };
  const card = (i: Item) => (
    <article className="tr-post" key={i.id}>
      <button className="tr-avatar" onClick={() => setTab("个人主页")}>
        <Avatar name={i.sender} src={i.avatar || "/avatars/ommujj.jpg"} />
        <span>+</span>
      </button>
      <div className="tr-post-content">
        <div className="tr-byline">
          <b>{i.sender}</b>
          <span>{i.time}</span>
          <button
            aria-label="帖子选项"
            onClick={() => {
              setSelected(i);
              setOptions(true);
            }}
          >
            <MoreHorizontal />
          </button>
        </div>
        <button className="tr-body" onClick={() => open(i)}>
          {i.body}
          {i.media && <Media item={i} />}
        </button>
        <div className="tr-actions">
          <button
            aria-label={"喜欢" + i.title}
            aria-pressed={liked.includes(i.id)}
            onClick={() => toggle(i.id, liked, setLiked)}
          >
            <Heart
              fill={liked.includes(i.id) ? "#ff3060" : "none"}
              color={liked.includes(i.id) ? "#ff3060" : "currentColor"}
            />
            {i.likes + (liked.includes(i.id) ? 1 : 0) || ""}
          </button>
          <button aria-label={"回复" + i.title} onClick={() => open(i)}>
            <MessageCircleIcon />
            {i.comments.length || ""}
          </button>
          <button
            aria-label={"转发" + i.title}
            onClick={() => toggle(i.id, saved, setSaved)}
          >
            <Repeat2 />
          </button>
          <button
            aria-label={"分享" + i.title}
            onClick={() => {
              setDraft(i.body);
              setCompose(true);
            }}
          >
            <Send />
          </button>
        </div>
      </div>
    </article>
  );
  return (
    <div className="threads-reference">
      <div className="tr-scroll">
        {selected ? (
          <>
            <header className="tr-head">
              <button
                aria-label="返回Threads列表"
                onClick={() => setSelected(null)}
              >
                <ArrowLeft />
              </button>
              <b>串文</b>
              <MoreHorizontal />
            </header>
            {card(selected)}
            <div className="tr-comments">
              {[
                ...selected.comments,
                ...replies
                  .filter((v) => v.startsWith(selected.id + "\t"))
                  .map((v) => v.split("\t").slice(1).join("\t")),
              ].map((c, n) => (
                <p key={n}>{c}</p>
              ))}
            </div>
            <form
              className="tr-reply"
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) {
                  setReplies([...replies, selected.id + "\t" + draft.trim()]);
                  setDraft("");
                }
              }}
            >
              <input
                aria-label="Threads回复"
                placeholder="回复串文"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button>发送</button>
            </form>
          </>
        ) : (
          <>
            <header
              className={
                "tr-head " + (tab === "首页" ? "tr-home-head" : "tr-large-head")
              }
            >
              {tab === "首页" ? (
                <>
                  <button
                    aria-label="打开Threads菜单"
                    onClick={() => setSide(true)}
                  >
                    <Menu />
                  </button>
                  <svg
                    className="tr-logo"
                    width="29"
                    height="36"
                    viewBox="0 0 64 64"
                    aria-label="Threads"
                  >
                    <path
                      d="M48 17C42 5 17 8 14 25c-5 23 26 32 36 17 9-15-9-25-23-17-11 8 7 17 13 8 5-8 0-16-10-14M49 29c6 20-16 31-29 17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <button
                    aria-label="搜索Threads"
                    onClick={() => setTab("搜索")}
                  >
                    <Search />
                  </button>
                </>
              ) : (
                <>
                  <h1>
                    {tab === "消息"
                      ? "消息"
                      : tab === "动态"
                        ? "动态"
                        : tab === "个人主页"
                          ? username
                          : tab}
                  </h1>
                  {(tab === "消息" || tab === "动态") && <BellOff />}
                  <button
                    aria-label="新建串文"
                    onClick={() => setCompose(true)}
                  >
                    <SquarePen />
                  </button>
                </>
              )}
            </header>
            {(tab === "消息" || tab === "搜索") && (
              <label className="tr-search">
                <Search size={18} />
                <input
                  aria-label="搜索Threads内容"
                  placeholder="搜索"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            )}
            {(tab === "消息" || tab === "动态") && (
              <nav className="tr-filters">
                {(tab === "消息"
                  ? ["筛选", "收件箱", "陌生消息"]
                  : ["全部", "关注", "对话", "提及", "你关注的人"]
                ).map((t) => (
                  <button
                    key={t}
                    className={filter === t ? "selected" : ""}
                    onClick={() => setFilter(t)}
                  >
                    {t === "筛选" ? <SlidersHorizontal size={19} /> : t}
                  </button>
                ))}
              </nav>
            )}
            {tab === "首页" &&
              feed
                .filter((i) =>
                  filter === "收藏"
                    ? saved.includes(i.id)
                    : filter === "已关注"
                      ? i.meta.following === "true"
                      : filter === "限时帖"
                        ? i.meta.story === "true"
                        : true,
                )
                .map(card)}
            {tab === "搜索" &&
              feed.filter((i) => (i.body + i.sender).includes(query)).map(card)}
            {tab === "消息" &&
              messages
                .filter(
                  (i) =>
                    (i.body + i.sender).includes(query) &&
                    (filter !== "陌生消息" || i.meta.request === "true"),
                )
                .map((i) => (
                  <button
                    className="tr-message"
                    key={i.id}
                    onClick={() => open(i)}
                  >
                    <Avatar name={i.sender} src={i.avatar || "/avatars/ommujj.jpg"} />
                    <span>
                      <b>{i.sender}</b>
                      <small>
                        {i.body} · {i.time.slice(-5)}
                      </small>
                    </span>
                    {i.favorite && <Pin size={16} />}
                  </button>
                ))}
            {tab === "动态" && (
              <>
                <h3 className="tr-section">过去 7 天</h3>
                {activities
                  .filter((i) =>
                    filter === "关注"
                      ? i.meta.activityType === "follow"
                      : filter === "对话"
                        ? i.meta.activityType === "reply"
                        : filter === "提及"
                          ? i.meta.activityType === "mention"
                          : true,
                  )
                  .map((i) => (
                    <div className="tr-activity" key={i.id}>
                      <Avatar name={i.sender} src={i.avatar || "/avatars/ommujj.jpg"} />
                      <div>
                        <b>{i.sender}</b>
                        <small>{i.time.slice(-5)}</small>
                        <p>{i.body}</p>
                        <div className="tr-actions">
                          <Heart />
                          <Send />
                        </div>
                      </div>
                    </div>
                  ))}
                {!activities.length && <p className="tr-empty">暂无动态</p>}
              </>
            )}
            {tab === "个人主页" && (
              <>
                <div className="tr-profile">
                  <Avatar name={username} src="/avatars/ommujj.jpg" />
                  <p>{username}</p>
                  <small>{bio}</small>
                </div>
                {feed
                  .filter(
                    (i) => i.sender === username || i.meta.local === "true",
                  )
                  .map(card)}
              </>
            )}
            {((tab === "消息" && !messages.length) ||
              (tab === "首页" && !feed.length)) && (
              <p className="tr-empty">暂无内容</p>
            )}
          </>
        )}
      </div>
      <nav className="tr-bottom">
        {[Home, Send, Plus, Heart, User].map((Icon, n) => (
          <button
            key={n}
            aria-label={
              [
                "Threads首页",
                "Threads消息",
                "新建串文",
                "Threads动态",
                "Threads个人主页",
              ][n]
            }
            className={
              tab === ["首页", "消息", "", "动态", "个人主页"][n]
                ? "selected"
                : ""
            }
            onClick={() => {
              setSelected(null);
              if (n === 2) {
                setCompose(true);
                setKeyboard(true);
              } else setTab(["首页", "消息", "", "动态", "个人主页"][n]);
            }}
          >
            <Icon
              fill={
                (n === 0 && tab === "首页") || (n === 3 && tab === "动态")
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        ))}
      </nav>
      {side && (
        <div className="tr-side-cover" onClick={() => setSide(false)}>
          <aside className="tr-side" onClick={(e) => e.stopPropagation()}>
            <header>
              <b>动态</b>
              <button
                aria-label="关闭Threads菜单"
                onClick={() => setSide(false)}
              >
                <X />
              </button>
            </header>
            <div className="tr-side-tools">
              <button
                onClick={() => {
                  setTab("首页");
                  setSide(false);
                }}
              >
                <Heart />
              </button>
              <button
                onClick={() => {
                  setFilter("收藏");
                  setSide(false);
                }}
              >
                <Bookmark />
              </button>
            </div>
            <div className="tr-side-list">
              {["为你推荐", "已关注", "限时帖"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setFilter(t);
                    setSide(false);
                  }}
                >
                  {t}
                  <ChevronRight />
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
      {compose && (
        <section className="tr-compose">
          <header>
            <button
              onClick={() => {
                setCompose(false);
                setKeyboard(false);
              }}
            >
              取消
            </button>
            <b>新建串文</b>
            <button aria-label="串文选项" onClick={() => setOptions(!options)}>
              <MoreHorizontal />
            </button>
          </header>
          <div className="tr-compose-content">
            <Avatar name={username} />
            <div>
              <b>{username}</b>
              <span className="tr-muted"> › 社群或话题</span>
              <textarea
                aria-label="串文内容"
                placeholder="有什么新鲜事吗？"
                value={draft}
                inputMode="none"
                onFocus={() => setKeyboard(true)}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={2000}
              />
              <p className="tr-muted">添加到串文</p>
            </div>
          </div>
          <div className="tr-compose-actions">
            <button onClick={() => setOptions(!options)}>
              <SlidersHorizontal size={21} />
              帖子选项
            </button>
            <button
              disabled={!draft.trim()}
              onClick={() => {
                setPosts([draft.trim(), ...posts]);
                setDraft("");
                setCompose(false);
                setKeyboard(false);
                setTab("首页");
              }}
            >
              发布
            </button>
          </div>
          {keyboard && (
            <div className="tr-keyboard">
              <div className="tr-candidates">
                {["我", "你", "好", "他", "不", "这", "这个", "对"].map((k) => (
                  <button
                    key={k}
                    onClick={() =>
                      setDraft(draft + (shift ? k.toUpperCase() : k))
                    }
                  >
                    {k}
                  </button>
                ))}
                <button
                  aria-label="收起串文键盘"
                  onClick={() => setKeyboard(false)}
                >
                  ⌄
                </button>
              </div>
              {(numbers
                ? ["1234567890", "-/:;()&@", ".,?!"]
                : ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
              ).map((row, n) => (
                <div className="tr-key-row" key={n}>
                  {n === 2 && (
                    <button
                      aria-label="大写"
                      aria-pressed={shift}
                      onClick={() => setShift(!shift)}
                    >
                      <ArrowUp />
                    </button>
                  )}
                  {[...row].map((k) => (
                    <button key={k} onClick={() => setDraft(draft + k)}>
                      {k}
                    </button>
                  ))}
                  {n === 2 && (
                    <button
                      aria-label="删除串文字符"
                      onClick={() => setDraft(draft.slice(0, -1))}
                    >
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
              <div className="tr-key-row">
                <button onClick={() => setNumbers(!numbers)}>
                  {numbers ? "ABC" : "123"}
                </button>
                <button>
                  <Smile />
                </button>
                <button
                  className="space"
                  aria-label="空格"
                  onClick={() => setDraft(draft + " ")}
                >
                  {" "}
                </button>
                <button
                  aria-label="换行"
                  onClick={() => setDraft(draft + "\n")}
                >
                  <CornerDownLeft />
                </button>
              </div>
              <footer>
                <Globe />
                <Mic />
              </footer>
            </div>
          )}
        </section>
      )}
      {options && (
        <div className="tr-options">
          <b>帖子选项</b>
          <p>所有人可以回复</p>
          <button onClick={() => setOptions(false)}>完成</button>
        </div>
      )}
    </div>
  );
}
function MessageCircleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 12a8 8 0 0 1-8 8H4l2-4a8 8 0 1 1 14-4z" />
    </svg>
  );
}
