import { createEffect, createSignal } from "solid-js";

export default function Counter() {
  // default
  // const [count, setCount] = createSignal(0);

  // // 追踪count变化
  // createEffect(() => {
  //   console.log('count: ' + count());
  // })
  
  // const increment = () => {
  //   setCount(count() + 1);
  // };

  // solid-labels
  let count = $signal(0)
  $effect(() => console.log(count))
  const increment = () => {
    count++
  }

  // default
  // return <button onClick={increment}>count is {count}</button>;

  // solid-labels
  return <button onClick={increment}>count is {count}</button>;
}
