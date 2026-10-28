import { useState } from "react";
import { Bike, MapPin, ShoppingBag, Utensils } from "lucide-react";
import { Empty, Header, Media, SearchBox, Tabs, type Props } from "./shared";

export function GrabSkin(p: Props) {
  const [tab, setTab] = useState("首页");
  const [query, setQuery] = useState("");
  const items = p.items.filter((i) =>
    (i.title + i.body + i.sender).toLowerCase().includes(query.toLowerCase()),
  );
  const foodOrders = p.items.filter(
    (i) => i.kind === "order" && i.meta?.service === "food",
  );
  const filteredFoodOrders = foodOrders.filter((i) =>
    (i.title + i.body + i.sender).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="catalog-skin grab-ui">
      <Header p={p} />
      <div className="grab-welcome">
        <small>Good evening, {p.owner || "mo✨"}</small>
        <h2>
          {tab === "出行"
            ? "出行服务"
            : tab === "外卖"
              ? "今天吃点什么？"
              : tab === "订单"
                ? "我的订单"
                : "随时随地，轻松出发。"}
        </h2>
        <label className="grab-location">
          <MapPin size={17} />
          <span>当前位置（虚构演示）</span>
        </label>
      </div>
      <div className="grab-services">
        <button onClick={() => setTab("出行")}>
          <span><Bike size={25} /></span>
          <strong>叫车</strong>
          <small>Ride</small>
        </button>
        <button onClick={() => setTab("外卖")}>
          <span><Utensils size={25} /></span>
          <strong>美食外卖</strong>
          <small>Food</small>
        </button>
        <button onClick={() => setTab("订单")}>
          <span><ShoppingBag size={25} /></span>
          <strong>我的订单</strong>
          <small>Orders</small>
        </button>
      </div>
      {tab === "出行" ? (
        <div className="grab-panel">
          <h3>出行</h3>
          <p>当前没有出行订单。</p>
          <p className="grab-muted">叫车演示内容已移除。</p>
        </div>
      ) : tab === "外卖" ? (
        <div className="catalog-scroll grab-orders">
          <h3>外卖订单</h3>
          <SearchBox value={query} set={setQuery} placeholder="搜索餐厅或订单" />
          {filteredFoodOrders.map((i) => (
            <button key={i.id} className="grab-food" onClick={() => p.onItem(i)}>
              <Media item={i} />
              <span>
                <strong>{i.title}</strong>
                <p>{i.body}</p>
                <small>{i.time || "示例订单"}</small>
              </span>
            </button>
          ))}
          <Empty items={filteredFoodOrders} />
        </div>
      ) : tab === "订单" ? (
        <div className="catalog-scroll grab-orders">
          <h3>我的订单</h3>
          <SearchBox value={query} set={setQuery} placeholder="搜索餐厅或订单" />
          {filteredFoodOrders.map((i) => (
            <button key={i.id} className="grab-food" onClick={() => p.onItem(i)}>
              <Media item={i} />
              <span>
                <strong>{i.title}</strong>
                <p>{i.body}</p>
                <small>{i.time || "示例订单"}</small>
              </span>
            </button>
          ))}
          <Empty items={filteredFoodOrders} />
          <p className="grab-muted">
            以上为作品中配置的外卖订单记录；不会触发真实付款或配送。
          </p>
        </div>
      ) : (
        <div className="catalog-scroll grab-orders">
          <h3>为你准备的内容</h3>
          <SearchBox value={query} set={setQuery} placeholder="搜索行程或订单" />
          {items.map((i) => (
            <button className="grab-record" key={i.id} onClick={() => p.onItem(i)}>
              <strong>{i.title}</strong>
              <p>{i.body}</p>
              <small>{i.time}</small>
            </button>
          ))}
          <Empty items={items} />
        </div>
      )}
      <Tabs
        tabs={["首页", "出行", "外卖", "订单"]}
        value={tab}
        set={setTab}
        icons={[<MapPin />, <Bike />, <Utensils />, <ShoppingBag />]}
      />
    </div>
  );
}
