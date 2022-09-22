# SvelteSolid
## 前言

大家好我是爱分享的老前端羊村长，国外最近两年涌现两个新锐框架`Svelte`和`Solid`，大家可能忙工作没太关注，但是它们大有后来居上的意思。来看一下github的star数量感受一下：

![image-20220920225835049](https://tva1.sinaimg.cn/large/e6c9d24ely1h6dgr4aj97j21zo036dg6.jpg)

![image-20220920225923989](https://tva1.sinaimg.cn/large/e6c9d24ely1h6dgrxcp2uj21zu0383yu.jpg)

7月掘金开发者大会上，Vue作者尤雨溪在直播分享中多次提到`SolidJS`和`Svelte`。到底是什么原因让开发者们如此喜爱？又是什么原因让尤大如此关注它们？我们到底要不要花时间研究学习它们？

文本将带大家体验这两款框架的魅力，并发表一些个人看法，欢迎小伙伴们拍砖！

> 对应的学习群已经建立起来，我将陆续发布学习文章和视频，欢迎感兴趣的小伙伴加入：
> 关注公众号“村长学前端”，分别回复“svelte”和“solid”即可。

## 相同的开发范式

应该说最近3年前端最流行的开发范式非React Hooks莫属，React Hooks彻底取代了Class Components，Vue3也从最初的Class风格最终确定为类似的Composition API，今天要讨论的两位主角也不例外均是函数风格。应该说，是`React Hooks`引领创新，启发了众多框架启用新范式，但青出于蓝，相似的同时解决了React Hooks各种问题。

这里出现三位竞争选手：`Vue3`、`Svelte`和`SolidJS`。`Vue3`大家都很熟悉就不过多赘述，这里我们主要体验一下`Svelte`和`SolidJS`如何做组件逻辑表达和逻辑复用。

![image-20220816062855062](https://tva1.sinaimg.cn/large/e6c9d24ely1h587gla0p8j20mq05u3ym.jpg)



### 组件逻辑表达

#### Svelte3

作者`Rich Harris`曾说过`Svelte`的组件编译逻辑是由`React Hooks`启发而来。然而，由于`Svelte` 组件构建在 HTML 之上，所以她看起来更像`Vue`。同时她更加优雅了，我们没有看到诸如`let count = ref(0)`这样的响应式声明，当然也不需要`count.value++`。我们也没看到`template`这样的标签，就好像我们在写HTML页面一般纯粹！

下面我们用`Svelte`编写一个counter案例，`Counter.svelte`：

```html
<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>

```

> 作为一个Vuer，你会为了这些改变学习`Svelte`吗？
> 显然是不够的！我好不容易已经习惯了`ref`和`.value`，现在感觉也没什么大不了的。
> 但是作为一个新人，如果第一眼看到`Svelte`，我一定会爱上她！
> 她真的太优雅了，一见钟情的感觉❤️

#### Solid

尤大这样描述`SolidJS`：***语法与`React`相似，实现与`Composition API`相似。***
我们同样体验一下她的魅力！下面是`Solid`版的Counter案例：

```jsx
// Counter.jsx
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => {
    setCount(count() + 1);
  };
  return <button onClick={() => increment()}>count is {count()}</button>;
}
```

> 作为一个Reacter，你发现了什么变化？
>
> - `useState()`变成了`createSignal()`
>
> - `count`变成了`count()`
>
> 你会为了这些变化学习`SolidJS`吗？显然不会，一个东西换个写法没有什么意义。
> 作为一个新人你会喜欢`SolidJS`吗？可能也不会，这代码看起来不太容易理解，市面上也没有招`Solid`程序员呀，与其这样还不如直接学`React`！

### 暂时排名

看到这里，我根据个人感觉做个暂时的排名

老鸟榜：`Vue3` = `React` > `Svelte3` > `Solid`

> 老鸟：不要跟我说什么`react`、`angular`、`vue`，老夫写代码就用`jQuery`！

菜鸟榜：`Vue3` > `Svelte3` > `React` > `Solid`

> 菜鸟：大哥们哪个框架最简单？国内是不是招Vue的最多？就它了！



### 基于依赖追踪的范式

尤大曾在直播分享中谈到React Hooks存在一些开发体验问题，例如手动添加依赖、条件语句限制、过期闭包等。

不约而同的，各大新锐势力在依赖管理这块各显神通，均通过各种手段做到了依赖的自动收集管理，这让开发体验提升了一个档次。

#### SolidJS

我们现在给Counter添加一个功能：如果count发生变化，控制台打印输出。

可以看到我们不需要手动指定依赖项即可追踪变化。

```jsx
// 导入createEffect
import { createEffect, createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  // createEffect用于创建副作用，Solid帮我们追踪依赖项count
  createEffect(() => {
    console.log('count: ' + count());
  })
  const increment = () => {
    setCount(count() + 1);
  };
  return <button onClick={() => increment()}>count is {count()}</button>;
}
```

> 这里就体现了`SolidJS`和`React`之间的不同点，开发者不再需要操心依赖项：
>
> ```jsx
> // 同样的功能，`React`要指定依赖项
> useEffect(() => {
>   setCount(count + 1);
> }, [count])
> ```
>
> 这就是尤大说的类似`React`语法，实现类似`Vue Composition API`。
> 大家不要小看这些变化，除了心智负担影响开发体验之外，有时还会不小心写出隐藏bug。
>
> 我想这是国外不少Reacter转投Solid的原因之一。

#### Vue3

作为对比，我们拉出Vue给大家看看

```vue
<script setup>
	import { watchEffect, ref } from 'vue'
  
  const count = ref(0)
  watchEffect(() => {
    console.log('count: ' + count.value)
  })
  const increment = () => {
    count.value += 1
  }
</script>
```

> 这里看起来确实和`Solid`非常相似，定义响应式数据，添加副作用函数，只不过`Solid`是读写分离的。
>
> 尤大总结的其他共同点
>
> - 一次调用，符合原生JS直觉
> - 自动追踪依赖，无需手动声明
> - 引用稳定，无需useCallback

#### Svelte3

`Svelte`响应式系统基于编译，因此也不需要做依赖追踪，但是作为用户我们只关心怎么写代码。

下面我们看一下`Svelte`的写法：

```js
let count = 0
// 副作用写在'$:'后面
$: console.log(count)
const increment = () => {
  count += 1
}
```

> 依然是最简洁的那一个，一个`$`就解决问题！
> 我对`Svelte`的喜爱又增加了~



### 暂时排名

看到这里，我的排名发生了一些变化：Svelte和Vue在菜鸟榜平起平坐！

老鸟榜：`Vue3` = `React` > `Svelte3` > `Solid`

> 老鸟：不要跟我说什么react、angular、vue，老夫写代码就用jQuery！

菜鸟榜：`Vue3` = `Svelte3`  > `Solid` > `React`

> 菜鸟：woc太NB了，就选`Svelte`了！



## 基于编译的响应式系统

![image-20220816085151228](https://tva1.sinaimg.cn/large/e6c9d24ely1h58bl9w7twj20qk07a74h.jpg)

为了能够尽可能提升开发体验，大家纷纷祭出大招，开始在编译阶段做文章，比如各种基于编译的响应式方案：`Svelte`、`Vue Reactivity Transform`、`solid labels`



### Svelte

轮子哥Harris在Svelte上充分利用编译期能力，例如下面代码，一个简单`$`符号就可以生成副作用代码

```js
let count = 0
// 编译器发现`$:`，就会把后面代码作为count的副作用
$: console.log(count)
const increment = () => {
  count += 1
}
```

> 这个看起来确实很NB，作为新手我不需要学习响应式机制和相关API，非常简洁。

但是，简洁是有代价的，关于这点尤大层发出大招棒打`Svelte`，我们来看看他说的有没有道理：

- Svelte组件内才能使用`$:`语法，组件外需要另一套不同的API
- `$:`只能在顶层作用域内使用，不可在函数内用



#### Svelte Stores API

这个`stores API`就是前面尤大提到的“Svelte组件内才能用`$:`语法”槽点中提到的另一套不同API，我们来体验一下。

比如我们将count提到JS中去做状态共享给不同组件，使用`Svelte`我需要这样做：

```js
import { writable } from 'svelte/store';
// 使用writeable()创建一个可写的count
export const count = writable(0);
```

`Vue`中的话我会这样做：

```js
import { ref } from 'vue'
export function useCount() {
  // 使用ref()创建一个响应式count
  const count = ref(0)
  return { count }
}
```

这里Vue实现保持了组件内编写的一致性，确实很好。不过作为槽点喷`Svelte`我觉得没道理，`Svelte`只是把学习一个API的时间推后了一点，我不学习`Composition API`不是也写不出这个`Vue`代码嘛。另外如果需要全局状态管理，我还是要学一个`Vuex`语法，并不能让我少学点。



#### 响应式限制

另一个槽点是：`$:`只能在顶层作用域内使用，不可在函数内用。

我想尤大想要的是能够将这个逻辑提取到函数内，这样可以复用这段逻辑。

比如利用`Composition API`，我们可以：

```js
function useCount() {
  const count = ref(0)
  watchEffect(() => {
    console.log(`the count is ${count.value}`);
    alert(`the count is ${count.value}`);
  })
  return {count}
}
```

但是我们不能像下面这样：

```js
function useCount() {
	$: {
    console.log(`the count is ${count}`);
    alert(`the count is ${count}`);
  }
}
```

或者：

```js
$: useCount()
function useCount() {
  console.log(`the count is ${count}`);
  alert(`the count is ${count}`);
}
```

这个限制性问题其实还是上面的`Stores API`问题，我们利用`Stores API`就可以完成提取，只是我们失去了`$:`这种一致性写法。

```js
export function useCount() {
	const count = writable(0);
	count.subscribe(value => {
		console.log(`the count is ${count}`);
  	alert(`the count is ${count}`);
	});
	return {count}
}
```



### Vue Reactivity Transform

Vue3中引入`Ref`之后，`.value`的心智负担也一直被人诟病，尤大也想出了很多解决方案。实验性质的新特性`Vue Reactivity Transform`就是其中之一。我们可以像下面这样写代码：

```js
let count = $ref(0) // 使用$ref声明一个响应式对象
watchEffect(() => console.log(count)) // 使用时可以不需要.value
count++ // 使用时可以不需要.value
```

> 相关文档: https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
>
> 这被小右称为更普适方案，没有以上`Svelte`中的限制。使用起来确实不错~看起来大家还是蛮支持这个方案的，期待转正！
>
> ![image-20220901112721202](https://tva1.sinaimg.cn/large/e6c9d24ely1h5qy01novcj20ft014jra.jpg)



### Solid-labels

前面我们看到`solid`中使用类react hooks风格API，个人认为有以下问题：

- 这组API不符合原生JS直觉，比如我感觉count是个值，不应该作为函数调用，修改时也希望直接赋值。

- 另外总是需要导入solid提供的utilities

```js
import { createEffect, createSignal } from "solid-js"
// ...
createEffect(() => {
  // 使用时需要加上括号：count()
  console.log('count: ' + count());
})
// 修改时需要调用setXX方法
setCount(count() + 1);
```

那使用`solid-labels`会怎样呢？下面看一下之前的Counter例子使用`solid-labels`实现：

```js
// $signal()创建响应式数据
let count = $signal(0)
// $effect()添加副作用，直接调用count
$effect(() => console.log(count))
// 直接修改count
count++
```

> 利用插件同样实现了更加简洁、更符合JS直觉的语法，还不用导入solid的工具方法，赞！
>
> 项目地址：https://github.com/LXSMNSYC/solid-labels



### 暂时排名

可以说，大家都在利用编译或转译的方式简化API，提升开发体验，而且都非常的简洁、优雅，同时各有特点：

- `Vue Reactivity Transform`和`Solid-labels`这样的属于上下文无关的统一模型。优势是重构和优化，代价是初期的上手成本。
- `Svelte`属于上下文受限模型，优势是上手成本低，不需要了解响应式的实现机制。

这一局我感觉没有胜出者，都很优秀。因此，我的排名没有变化！

老鸟榜：`Vue3` = `React` > `Svelte3` > `Solid`

> 老鸟：不要跟我说什么react、angular、vue，老夫写代码就用jQuery！

菜鸟榜：`Vue3` = `Svelte3`  > `Solid` > `React`

> 菜鸟：woc太NB了，我也不知道该选啥！



## 基于编译的运行时优化

同样，利用编译期能力，大家都可以做到极致的优化，达到最佳的性能表现！

但是这里Svelte和Solid就和Vue3走上了完全不同的道路，我们称之为**无虚拟DOM**。什么意思哪？也就是它们均放弃了React开启的流行了10年之久的虚拟DOM方案，并且在性能表现上更是达到了登峰造极的地步！

下面大家跟随村长一起来一睹究竟！

![image-20220816091051278](https://tva1.sinaimg.cn/large/e6c9d24ely1h58c51gwnpj20qk07674g.jpg)

### 不同策略对性能的影响

上面说Svelte和Solid通过放弃虚拟DOM达到了接近原生DOM的优秀性能表现，尤其Solid轻松超过vue3，远超react。连尤大都感慨：Solid性能真是NB!

我们一起来看一下性能统计图，这是我9月21日重新生成的：

![image-20220921002039640](https://tva1.sinaimg.cn/large/e6c9d24ely1h6dj4hlgjaj20oi13yzs7.jpg)

![image-20220921002002618](https://tva1.sinaimg.cn/large/e6c9d24ely1h6dj3udpqgj20oe0k2whl.jpg)

![image-20220921002254242](https://tva1.sinaimg.cn/large/e6c9d24ely1h6dj6t5cgkj20nw0qa78n.jpg)

不是说虚拟DOM会带来性能提升吗？这个确实是面试题八股文的答案，但是其实尤大早就在知乎上回答过这个问题，大家可以去看原文：

[网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/53544875)

那也就是说，利用编译或转译能力，Svelte和Solid最终都生成了直接操作DOM的更新函数，虽说两者实现细节不甚相同，但是最终都做到了鱼和熊掌兼得的效果，即提升开发效率，又保证性能表现。

针对这一点，尤大又祭出新活，就是所谓的`Vapor`模式，也就是说用户未来在使用Vue3时可以指定某个组件使用DOM方式编译结果，从而提升性能表现。关于这点，我觉得尤大纯属被带节奏，增加了使用复杂性不说，大部分场景下收益并不明显，两个新锐在这里飙车，那是想标新立异，吸引用户注意力，现代Web开发中的瓶颈从来都不是性能而是开发效率和可维护性。

所以虽说数据上看起来不错，但我并不认为这是什么很大的亮点，因此咱们排名依然不变！

老鸟榜：`Vue3` = `React` > `Svelte3` > `Solid`

> 老鸟：不要跟我说什么react、angular、vue，老夫写代码就用jQuery！

菜鸟榜：`Vue3` = `Svelte3`  > `Solid` > `React`

> 菜鸟：woc太NB了，我也不知道该选啥！

### 不同策略对生成代码量的影响

最后，我们再探讨一下三个框架在最终生成代码量上的表现。下面图片来自尤大直播中原图：

![image-20220816091139928](https://tva1.sinaimg.cn/large/e6c9d24ely1h58c5vwyybj20km0aw3yr.jpg)

可见，Svelte和Solid由于不需要虚拟DOM相关的运行时代码，在起步阶段和Vue比有一QQ差距；但在15个组件这个关键节点之后，我们发现Svelte打包体积开始快速攀升，而Solid和Vue增长非常平缓，可以说并驾齐驱。

这里我可以说，如果你特别在意执行速度和打包体积，比如一些移动端的h5页面，那看起来Solid是你的不二之选。

那Svelte呢？考虑到优秀的开发体验和整体性能，只要不是规模很大的项目应该都能胜任。

这里很抱歉我没有去打个包给大家看看结果，那主要是因为我觉得我们业务代码多那么几k，少那么几k，在现在这个网络条件下根本无足轻重！

## 总结

到了激动人心的总结时刻，在我心中到底这俩框架值得花时间学习吗？

值得！

存在必有道理，Svelte和Solid在国外那么受欢迎不是没有原因的，能在内卷的前端框架市场杀出一条血路，占据一席之地，相信必有适合它们的应用场景和优点。

我们学习新东西从来也不是只看它表面的一点变化，而是深入底层去看本质，去学习牛人们独特巧妙的解决方法，从而最终提升思维能力！



## 学习群

对应的学习群已经建立起来，我将陆续发布学习文章和视频，欢迎感兴趣的小伙伴加入：
关注公众号“村长学前端”，分别回复“svelte”和“solid”即可。
