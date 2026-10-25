import { useState } from "react";
import { Bike, CheckCircle2, MapPin, ShoppingBag, Utensils } from "lucide-react";
import { useSkinState } from "../skinState";
import { Empty, Header, Media, SearchBox, Tabs, type Props } from "./shared";

export function GrabSkin(p: Props) {
  const [tab,setTab] = useState("首页");
  const [query,setQuery] = useState("");
  const [status,setStatus] = useSkinState<string[]>(p,"grab-demo-status",[]);
  const items=p.items.filter(i=>(i.title+i.body+i.sender).toLowerCase().includes(query.toLowerCase()));
  const rideDone=status.includes("ride");
  const foodDone=status.includes("food");
  return <div className="catalog-skin grab-ui">
    <Header p={p}/>
    <div className="grab-welcome"><small>Good evening, {p.owner || "mo✨"}</small><h2>{tab==="出行"?"去哪里？":tab==="外卖"?"今天吃点什么？":tab==="订单"?"你的行程与订单": "随时随地，轻松出发。"}</h2>
      <label className="grab-location"><MapPin size={17}/><span>当前位置（虚构演示）</span></label>
    </div>
    <div className="grab-services">
      <button onClick={()=>setTab("出行")}><span><Bike size={25}/></span><strong>叫车</strong><small>Ride</small></button>
      <button onClick={()=>setTab("外卖")}><span><Utensils size={25}/></span><strong>美食外卖</strong><small>Food</small></button>
      <button onClick={()=>setTab("订单")}><span><ShoppingBag size={25}/></span><strong>我的订单</strong><small>Orders</small></button>
    </div>
    {tab==="出行" ? <div className="grab-panel"><h3>模拟叫车</h3><p>上车点：家附近</p><p>目的地：市中心</p><p className="grab-muted">此为离线演示，不会请求真实车辆。</p><button className="grab-action" onClick={()=>setStatus(rideDone?status.filter(x=>x!=="ride"):[...status,"ride"])}>{rideDone?<><CheckCircle2 size={17}/>已取消模拟行程</>:"确认模拟叫车"}</button>{rideDone&&<p className="grab-success">行程已创建（演示），可在订单中查看。</p>}</div>
    :tab==="外卖" ? <div className="catalog-scroll grab-orders">{items.filter(i=>i.kind==="order"||i.folder!=="出行").map(i=><button key={i.id} className="grab-food" onClick={()=>p.onItem(i)}><Media item={i}/><span><strong>{i.title}</strong><p>{i.body}</p><small>示例商家 · 虚构订单</small></span></button>)}<button className="grab-action" onClick={()=>setStatus(foodDone?status.filter(x=>x!=="food"):[...status,"food"])}>{foodDone?"已加入示例订单":"创建示例外卖订单"}</button>{foodDone&&<p className="grab-success">已添加到本地演示订单。</p>}</div>
    :tab==="订单" ? <div className="catalog-scroll grab-orders"><h3>本地演示订单</h3><p>{rideDone?"🚗 模拟行程：已创建":"暂无已创建行程"}</p><p>{foodDone?"🍜 示例外卖：已添加":"暂无已添加外卖"}</p><p className="grab-muted">所有状态仅保存在此作品的交互进度中，不会触发真实付款或配送。</p></div>
    : <div className="catalog-scroll grab-orders"><h3>为你准备的演示内容</h3><SearchBox value={query} set={setQuery} placeholder="搜索行程或订单"/>{items.map(i=><button className="grab-record" key={i.id} onClick={()=>p.onItem(i)}><strong>{i.title}</strong><p>{i.body}</p><small>{i.time}</small></button>)}<Empty items={items}/></div>}
    <Tabs tabs={["首页","出行","外卖","订单"]} value={tab} set={setTab} icons={[<MapPin/>,<Bike/>,<Utensils/>,<ShoppingBag/>]}/>
  </div>;
}
