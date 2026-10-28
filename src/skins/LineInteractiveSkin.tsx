import { useEffect, useState } from "react";
import { ArrowLeft, CheckCheck, CirclePlus, Heart, MessageCircle, Mic, Send, Users } from "lucide-react";
import { useSkinState } from "../skinState";
import type { Item } from "../schema";
import { Avatar, Empty, Header, Media, SearchBox, Tabs, type Props } from "./shared";

function lineDateKey(time: string | undefined) {
  const match = time?.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
  if (match) return match[0];
  return new Date().toLocaleDateString("sv-SE");
}

function lineDateLabel(dateKey: string) {
  const date = new Date(dateKey + "T12:00:00");
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString("zh-CN", {
    year: "numeric", month: "long", day: "numeric", weekday: "long"
  });
}

const storyTime = (minute: string) => "2026-10-28 " + minute;
function storyMessage(
  id: string,
  body: string,
  sender: string,
  minute: string,
  outgoing = false,
  kind: Item["kind"] = "text",
  media = "",
): Item {
  return {
    id, title: "dada🐱", body, sender, time: storyTime(minute), avatar: "",
    kind, media, richText: "", meta: {}, hidden: false, unlock: "", password: "",
    folder: "", favorite: false, outgoing, read: true, likes: 0, comments: [],
  };
}

const unlockMessage = storyMessage(
  "line-dada-unlock-20261028-01",
  "突击检查，mo在干什么呢？",
  "dada🐱",
  "14:23",
);

export function LineInteractiveSkin(p: Props) {
  const [activeTab, setActiveTab] = useState("聊天");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [sent, setSent] = useSkinState<string[]>(p, "line-sent-messages", []);
  const [liked, setLiked] = useSkinState<string[]>(p, "line-liked-messages", []);
  const [storyStage, setStoryStage] = useSkinState<number>(p, "line-dada-story-stage", 0);
  const local = sent.flatMap(raw => { try { return [JSON.parse(raw) as Item]; } catch { return []; } });
  const all = [...p.items, ...local].filter(i => (i.title+i.body+i.sender).toLowerCase().includes(search.toLowerCase()));
  const pinnedThreads = ["一家三口dada最truy（3）", "daddy juju", "dada🐱"];
  const threads = [...new Set([...pinnedThreads, ...all.map(i => i.title)])].filter(name => name.toLowerCase().includes(search.toLowerCase()));
  const isDadaThread = p.thread === "dada🐱";
  const storyMessages = isDadaThread
    ? [unlockMessage, ...local.filter(i => i.title === "dada🐱" && i.id.startsWith("line-dada-story-"))]
    : [];
  const current = [...all.filter(i => i.title === p.thread), ...storyMessages]
    .filter((i, index, list) => list.findIndex(x => x.id === i.id) === index)
    .sort((a, b) => {
      const aTime = Date.parse(a.time || "");
      const bTime = Date.parse(b.time || "");
      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
      if (Number.isNaN(aTime)) return 1;
      if (Number.isNaN(bTime)) return -1;
      if (aTime !== bTime) return aTime - bTime;
      // Keep Dada's opening message before Mo's quick-reply bubble when both
      // share the same displayed minute.
      if (a.id === "line-dada-unlock-20261028-01") return -1;
      if (b.id === "line-dada-unlock-20261028-01") return 1;
      return 0;
    });

  useEffect(() => {
    if (!isDadaThread || storyStage !== 1) return;
    const timer = window.setTimeout(() => {
      const additions = [
        storyMessage("line-dada-story-02", "mo在看daddy和dada度蜜月", "mo✨", "14:25", true),
        storyMessage("line-dada-story-03", "oiiiii真是受不了啦究竟是度蜜月还是在工作啦😆", "mo✨", "14:26", true),
        storyMessage("line-dada-story-04", "视频", "mo✨", "14:27", true, "video", "/photos/dada-honeymoon-video.mp4"),
      ];
      setSent(previous => {
        const existing = new Set(previous.map(raw => { try { return (JSON.parse(raw) as Item).id; } catch { return ""; } }));
        return [...previous, ...additions.filter(item => !existing.has(item.id)).map(item => JSON.stringify(item))];
      });
      setStoryStage(2);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [isDadaThread, storyStage]);

  const send = () => {
    if (!isDadaThread || storyStage !== 0) return;
    const item = storyMessage("line-dada-story-01", "😬😬", p.owner || "mo✨", "14:24", true);
    setSent(previous => [...previous, JSON.stringify(item)]);
    setDraft("");
    setReplyOpen(false);
    setStoryStage(1);
  };

  const advanceStory = () => {
    const next = storyStage + 1;
    const messages: Record<number, Item> = {
      3: storyMessage("line-dada-story-05", "😳😳", "dada🐱", "14:28"),
      4: storyMessage("line-dada-story-06", "Mo怎么会知道", "dada🐱", "14:29"),
      5: storyMessage("line-dada-story-07", "这是mo的秘密🤫现场有mo的人脉", "mo✨", "14:30", true),
      6: storyMessage("line-dada-story-08", "哎呀后面的叔叔都被震惊了啦！看起来完全不想分开呀两个人🫣", "mo✨", "14:31", true),
      7: storyMessage("line-dada-story-09", "今天的Dada也超suay诶🥰黄色超级适合Daddy和Dada～", "mo✨", "14:32", true),
    };
    const item = messages[next];
    if (item) setSent(previous => {
      const exists = previous.some(raw => { try { return (JSON.parse(raw) as Item).id === item.id; } catch { return false; } });
      return exists ? previous : [...previous, JSON.stringify(item)];
    });
    setStoryStage(next);
  };

  const sendFreeMessage = () => {
    const body = draft.trim();
    if (!body || !p.thread) return;
    const item: Item = {
      id: "line-local-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,7),
      title: p.thread, body, sender: p.owner || "mo✨", time: "刚刚",
      avatar: "", kind: "text", media: "", richText: "", meta: {}, hidden: false,
      unlock: "", password: "", folder: "", favorite: false, outgoing: true,
      read: true, likes: 0, comments: []
    };
    setSent([...sent, JSON.stringify(item)]);
    setDraft("");
  };

  return <div className="catalog-skin line-ui line-interactive">
    <Header p={{...p,onBack:()=>p.thread?p.onThread(""):p.onBack()}}>
      {!p.thread && <button aria-label="新增会话" onClick={()=>setActiveTab("好友")}><CirclePlus size={20}/></button>}
    </Header>
    {p.thread ? <>
      <div className="line-peer-bar"><button aria-label="返回聊天列表" onClick={()=>p.onThread("")}><ArrowLeft size={18}/></button><Avatar name={p.thread}/><strong>{p.thread}</strong><span>在线 · 模拟</span></div>
      <div className="catalog-bubbles line-bubbles">
        {current.map((i, index) => {
          const dateKey = lineDateKey(i.time);
          const previousDateKey = index > 0 ? lineDateKey(current[index - 1].time) : "";
          const outgoing = i.outgoing || i.sender === (p.owner || "mo✨");
          return <div key={i.id}>
            {dateKey !== previousDateKey && <div className="bubble-date">{lineDateLabel(dateKey)}</div>}
            <div className={outgoing ? "catalog-message outgoing" : "catalog-message"}>
              {!outgoing && <div className="line-sender-name">{i.sender}</div>}
              <button onClick={()=>{if(isDadaThread && storyStage>=2 && storyStage<7){advanceStory();}else{setLiked(liked.includes(i.id)?liked.filter(id=>id!==i.id):[...liked,i.id]);}}}>
                {i.meta?.messageType === "voice" && <span className="line-voice-transcript"><Mic size={15}/></span>}
                {i.kind === "video" && i.media ? <Media item={i} className="line-video-message" /> : i.body}
                <small>{i.time?.slice(-5) || "刚刚"} {outgoing && <CheckCheck size={10}/>}</small>
                {liked.includes(i.id) && <span className="line-reaction"><Heart size={12} fill="currentColor"/> 已喜欢</span>}
              </button>
            </div>
          </div>;
        })}
        {!current.length && <Empty items={current} label="还没有消息，发送第一条吧。"/>}
      </div>
      {isDadaThread && storyStage >= 2 && storyStage < 7 && (
        <button className="line-story-continue" onClick={advanceStory}>点击屏幕继续</button>
      )}
      {isDadaThread && storyStage === 7 && (
        <div className="line-story-finished">对话已更新</div>
      )}
      <form className="catalog-composer line-live-composer" onSubmit={e=>{e.preventDefault();if (isDadaThread && storyStage===0) { send(); } else { sendFreeMessage(); }}}>
        <input
          aria-label="输入 LINE 消息"
          value={draft}
          onChange={e=>setDraft(e.target.value)}
          onFocus={()=>{if(isDadaThread && storyStage===0) setReplyOpen(true);}}
          onClick={()=>{if(isDadaThread && storyStage===0) setReplyOpen(true);}}
          placeholder={isDadaThread && storyStage===0 ? "点击选择回复…" : "输入消息…"}
          readOnly={isDadaThread && storyStage===0}
        />
        <button type="submit" aria-label="发送消息" disabled={isDadaThread && storyStage===0 ? !replyOpen : !draft.trim()}><Send size={18}/></button>
      </form>
      {isDadaThread && storyStage===0 && replyOpen && (
        <div className="line-quick-replies">
          <button onClick={send}>😬😬</button>
        </div>
      )}
    </> : <>
      <div className="catalog-scroll">
        <h1>{activeTab==="聊天"?"聊天":"好友"}</h1>
        <SearchBox value={search} set={setSearch} placeholder="搜索好友或聊天"/>
        {activeTab==="聊天" ? threads.map(name=>{
          const threadItems=all.filter(i=>i.title===name);
          const last=threadItems.at(-1);
          return <button className="catalog-chat" key={name} onClick={()=>{p.onThread(name);p.onRead(name);}}>
            <Avatar name={name}/><span><strong>{name}</strong><p>{name==="dada🐱" && storyStage===0 ? unlockMessage.body : last?.body || "还没有消息"}</p></span><time>{name==="dada🐱" && storyStage===0 ? "14:23" : last?.time ? last.time.slice(-5) : ""}</time>
          </button>;
        }) : [...new Set(all.map(i=>i.sender).filter(name=>name && name!==(p.owner||"mo✨")))].map(name=>{
          const first=all.find(i=>i.sender===name)!;
          return <button className="catalog-chat" key={name} onClick={()=>p.onThread(first.title)}><Avatar name={name}/><span><strong>{name}</strong><p>点击打开聊天</p></span><MessageCircle size={17}/></button>;
        })}
      </div>
      <Tabs tabs={["聊天","好友"]} value={activeTab} set={setActiveTab} icons={[<MessageCircle/>,<Users/>]}/>
    </>}
  </div>;
}
