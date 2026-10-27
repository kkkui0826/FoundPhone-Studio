import { useState } from "react";
import { ArrowLeft, CheckCheck, CirclePlus, Heart, MessageCircle, Send, Users } from "lucide-react";
import { useSkinState } from "../skinState";
import type { Item } from "../schema";
import { Avatar, Empty, Header, SearchBox, Tabs, type Props } from "./shared";

export function LineInteractiveSkin(p: Props) {
  const [activeTab, setActiveTab] = useState("聊天");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useSkinState<string[]>(p, "line-sent-messages", []);
  const [liked, setLiked] = useSkinState<string[]>(p, "line-liked-messages", []);
  const local = sent.flatMap(raw => { try { return [JSON.parse(raw) as Item]; } catch { return []; } });
  const all = [...p.items, ...local].filter(i => (i.title+i.body+i.sender).toLowerCase().includes(search.toLowerCase()));
  const pinnedThreads = ["daddy juju", "dada🐱", "一家三口dada最帅（3）"];
  const threads = [...new Set([...pinnedThreads, ...all.map(i => i.title)])].filter(name => name.toLowerCase().includes(search.toLowerCase()));
  const current = all.filter(i => i.title === p.thread);
  const send = () => {
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
        <div className="bubble-date">今天</div>
        {current.map((i)=><div key={i.id} className={i.outgoing || i.sender === (p.owner || "mo✨") ? "catalog-message outgoing" : "catalog-message"}>
          <button onClick={()=>setLiked(liked.includes(i.id)?liked.filter(id=>id!==i.id):[...liked,i.id])}>
            {i.body}<small>{i.time || "刚刚"} {i.outgoing && <CheckCheck size={10}/>}</small>
            {liked.includes(i.id) && <span className="line-reaction"><Heart size={12} fill="currentColor"/> 已喜欢</span>}
          </button>
        </div>)}
        {!current.length && <Empty items={current} label="还没有消息，发送第一条吧。"/>}
      </div>
      <form className="catalog-composer line-live-composer" onSubmit={e=>{e.preventDefault();send();}}>
        <input aria-label="输入 LINE 消息" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="输入消息…" />
        <button type="submit" aria-label="发送消息" disabled={!draft.trim()}><Send size={18}/></button>
      </form>
    </> : <>
      <div className="catalog-scroll">
        <h1>{activeTab==="聊天"?"聊天":"好友"}</h1>
        <SearchBox value={search} set={setSearch} placeholder="搜索好友或聊天"/>
        {activeTab==="聊天" ? threads.map(name=>{
          const threadItems=all.filter(i=>i.title===name);
          const last=threadItems.at(-1);
          return <button className="catalog-chat" key={name} onClick={()=>{p.onThread(name);p.onRead(name);}}>
            <Avatar name={name}/><span><strong>{name}</strong><p>{last?.body || "还没有消息"}</p></span><time>{last?.time ? last.time.slice(-5) : ""}</time>
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
