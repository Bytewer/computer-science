---
order: 1
title: Rust读书笔记-基础篇
category:
  - rust
---
# Rust读书笔记-基础篇
![rest](https://hub.yzuu.cf/sunface/rust-course/blob/main/assets/banner.jpg?raw=true)

感谢[Rust语言圣经(Rust Course)](https://course.rs/about-book.html)，正如书中所说在学习 Rust 的同时你会收获很多语言之外的知识，因此 Rust 在入门阶段比很多编程语言要更难，但是一旦入门，你将收获一个全新的自己，成为一个更加优秀的程序员。
> 要学好 Rust，你需要深入理解内存、堆栈、引用、变量作用域等这些其它高级语言往往不会深入接触的内容。另外，Rust 会通过语法、编译器和 clippy 这些静态检查工具半帮助半强迫的让你成为更优秀的程序员，写出更好的代码。同时，当你掌握 Rust 后，就会自发性的想要去做一些更偏底层的开发，这些都可以帮助你更加了解操作系统、网络、性能优化等底层知识，也会间接或者直接的接触到各种算法和数据结构的实现。

🔥其他推荐：
- [通过例子学 Rust](https://rustwiki.org/zh-CN/rust-by-example/)
- [Rust 程序设计语言](https://www.rustwiki.org.cn/zh-CN/book/)
- [Rust 官方文档中文教程](https://www.rustwiki.org.cn/)
- [API查询](https://www.rustwiki.org.cn/zh-CN/std/)
- [Rust语言中文社区](https://rustcc.cn/)


##  🥳 安装rust
安装日期：2023-05-03
* [字节代理](https://rsproxy.cn/)


### Mac
```sh
brew install rust

cargo -V
```

### Win
过程有点麻烦还要装VS，就直接在Mac上敲了

> https://rustup.rs/

### 😎推荐 在线练习
[点击进入PlayGround](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021)
[Windows的备用方案](https://lightly.teamcode.com/rust/) 无需下载Rust开发环境，可直接在线编写代码，不是打广告，感觉还挺方便的

##  1.1 🤪 Hello Rust
1. 这是最简单的写法：
```rust
fn main() {
    println!("Hello, world!");
}
```

2. 稍微进阶一点需要了解一点知识：
- `.iter()`  Rust 的集合类型不能直接进行循环，需要变成迭代器（这里是通过 .iter() 方法），才能用于迭代循环
- `"{}"` 输出占位符，类似于其它语言惯用的 %s、%d 
- `&`  println! 宏需要一个引用作为参数，因为 Rust 的字符串类型是一个包含多个字节的 UTF-8 编码的向量，而不是一个简单的字符数组。因此，打印一个字符串需要将它的引用传递给 println! 宏。这样做是为了避免将整个字符串复制到堆栈上，而是使用指向原始数据的引用来进行处理。这种方式可以避免性能上的问题，并且与 Java 中的字符串处理方式有所不同。
- `println!` 在 Rust 中，这是 宏 操作符，你目前可以认为宏是一种特殊类型函数
	- `println!` 是一个 Rust 标准库提供的宏，用于在控制台输出文本。在这里 "!" 表示宏定义的开始，然后后面的内容是宏参数。
```rust
fn greet_world() {
    let southern_germany = "Grüß Gott!";
    let chinese = "世界，你好";
    let english = "World, hello";
    let regions = [southern_germany, chinese, english];
    for region in regions.iter() {
        println!("{}", &region);
    }
}
fn main() {
	
}
```

3. 再稍微进阶一点（这个例子也来自Rust圣经，但是我感觉这个例子有点劝退），需要了解下面的知识才能理解：
* `let` 在 Rust 中，常量和变量的定义是通过 let 关键字来进行的，后面会说变量如何定义
* `lines`、`enumerate`等都可以通过其他语言直观理解
* 可能遇到问题的是这个`if let Ok(length) = fields[1].parse::<f32>()`
	* `parse` 方法的作用类似于 Java 中的 parseInt 方法，都是将一个字符串解析为数字
	* `fields[1].parse::<f32>()` 将第二个元素解析为一个 f32 类型的浮点数，如果解析成功，返回一个 `Result<f32, ParseFloatError>` 类型的 Ok 枚举值，否则返回一个 Err(ParseFloatError) 类型的错误值。

**parse**
其中，self 是一个字符串类型的引用，F 是要解析成的数据类型。parse 方法返回一个 Result<F, ParseError> 类型的枚举值，如果解析成功，返回一个 Ok(F) 枚举值，其中包含解析得到的数据；如果解析失败，返回一个 Err(ParseError) 枚举值，其中包含解析失败的原因。
```rust
pub fn parse<F>(&self) -> Result<F, ParseError>
    where F: FromStr
```

示例代码：
```rust
fn main() {
   let penguin_data = "\
   common name,length (cm)
   Little penguin,33
   Yellow-eyed penguin,65
   Fiordland penguin,60
   Invalid,data
   ";

   let records = penguin_data.lines();

   for (i, record) in records.enumerate() {
     if i == 0 || record.trim().len() == 0 {
       continue;
     }

     // 声明一个 fields 变量，类型是 Vec
     // Vec 是 vector 的缩写，是一个可伸缩的集合类型，可以认为是一个动态数组
     // <_>表示 Vec 中的元素类型由编译器自行推断，在很多场景下，都会帮我们省却不少功夫
     let fields: Vec<_> = record
       .split(',')
       .map(|field| field.trim())
       .collect();
     if cfg!(debug_assertions) {
         // 输出到标准错误输出
       eprintln!("debug: {:?} -> {:?}",
              record, fields);
     }

     let name = fields[0];
     // 1. 尝试把 fields[1] 的值转换为 f32 类型的浮点数，如果成功，则把 f32 值赋给 length 变量
     //
     // 2. if let 是一个匹配表达式，用来从=右边的结果中，匹配出 length 的值：
     //   1）当=右边的表达式执行成功，则会返回一个 Ok(f32) 的类型，若失败，则会返回一个 Err(e) 类型，if let 的作用就是仅匹配 Ok 也就是成功的情况，如果是错误，就直接忽略
     //   2）同时 if let 还会做一次解构匹配，通过 Ok(length) 去匹配右边的 Ok(f32)，最终把相应的 f32 值赋给 length
     //
     // 3. 当然你也可以忽略成功的情况，用 if let Err(e) = fields[1].parse::<f32>() {...}匹配出错误，然后打印出来，但是没啥卵用
     if let Ok(length) = fields[1].parse::<f32>() {
         // 输出到标准输出
         println!("{}, {}cm", name, length);
     }
   }
 }
```

## 1.2 👀 变量

### 😉常规定义
写一个变量，只是用let定义
```rust
fn main() {
    let x = 6;
    println!("The value of x is: {}", x);
    x = 1008611; // 这里是错误的
    println!("The value of x is: {}", x);
}
// 错误：cannot assign twice to immutable variable `x`
```
如果要让它成为变量，需要加入`mut`
```rust
fn main() {
    let mut x = 6;
    println!("The value of x is: {}", x);
    x = 1008611; // 这里是错误的
    println!("The value of x is: {}", x);
}
```
在rust中常量使用`const`来定义：
> const MAX_POINTS: u32 = 100_000;

可能会有疑问，rust为什么既然常量用const定义，变量要用let定义为什么要加入mut？
> 1. 使用 let 声明的变量是可变的，而使用 const 声明的常量是不可变的。这意味着，使用 let 声明的变量可以在程序中修改它们的值，而使用 const 声明的常量一旦被定义，就不能再修改它们的值。在 Rust 中，为了提高代码的可靠性和安全性，推荐尽可能使用常量而不是变量
> 2. 类型注解：使用 let 声明变量时，通常不需要显式指定变量的类型，因为 Rust 编译器可以根据变量的值推断出变量的类型。而使用 const 声明常量时，必须显式指定常量的类型，因为 Rust 编译器不能根据常量的值推断出常量的类型。例如：let x = 10;    const Y: i32 = 20;
> 3. 声明位置：使用 let 声明变量时，可以在任何作用域内进行声明，包括函数内部和全局作用域。而使用 const 声明常量时，只能在全局作用域中进行声明。这是因为在 Rust 中，常量的值必须在编译时就确定下来，而变量的值可以在运行时确定。

### ⛔不要警告我
如果你创建了一个变量却不在任何地方使用它，Rust 通常会给你一个警告。所以可以使用下划线`_`表示`Rust 不要警告未使用的变量`
```rust
fn main() {
    let mut x = 6;
}
// warning: unused variable: `x`
```
✔️正确写法，我不禁感叹，这也TTMD安全了：
```rust
fn main() {
    let mut _x = 6;
}
```
在一次实验中我未使用`mut`，都可以提示了`warning: variable does not need to be mutable`
```rust
fn main() {
    let (a, mut b): (bool, bool) = (true, false);
    println!("a = {:?}, b = {:?}", a, b);
}
```

### 变量的解构
这里可能有疑问的点是`{:?}`，为什么不直接使用`{}`
> {:?} 占位符会使用 Debug trait 来格式化输出变量的值。Debug trait 是 Rust 中的一个特殊 trait，用于定义格式化输出调试信息的方法。许多内置类型和标准库中的类型都实现了 Debug trait，因此你可以在使用 {:?} 占位符时直接输出这些类型的值。{:?} 占位符输出的值通常包含了更多的信息，例如类型信息、结构体字段名等，这些信息对于调试代码非常有用。但是，由于输出的信息可能比较冗长，因此在正式的输出中可能需要使用其他的占位符。

还有一个函数`assert_eq`：断言两个表达式彼此相等。如果比较结果不相等，assert_eq! 宏会触发一个 panic，导致程序终止。
> assert_eq! 宏是 Rust 中的一个非常常用的工具，可以帮助开发者快速定位代码中的错误，并提高代码的可靠性。

```rust
macro_rules! assert_eq {
    ($left : expr, $right : expr $(,) ?) => { ... };
    ($left : expr, $right : expr, $($arg : tt) +) => { ... };
}
```
例子：
```rust
let a = 3;
let b = 1 + 2;
assert_eq!(a, b);

assert_eq!(a, b, "we are testing addition with {} and {}", a, b);
```

有了上面的知识就可以学习这段示例了，非常类似JavaScript的语法：
```rust
fn main() {
    let (a, mut b): (bool, bool) = (true, false);
    println!("a = {:?}, b = {:?}", a, b);
    b = true;
    assert_eq!(a, b);
}
```

### 解构式赋值
在 Rust 1.59 版本后，我们可以在赋值语句的左式中使用元组、切片和结构体模式了。
* 这里的 `..` 表示一个范围，即匹配数组中的第一个元素 c，和最后一个元素之前的所有元素 d
* 将` Struct { e: 5 }` 解构为变量 e。这里使用了结构体解构语法，`{ e, .. }` 表示只解构结构体中的字段 e，而其他字段都不关心。
```rust
fn main() {
    let (a, b, c, d);
    (a, b) = (1, 2);
    // println!("a {:?}, b {:?}, c {:?}, d {:?}, e {:?}", a, b, c, d, e);
    println!("a {:?}, b {:?}", a, b);
    [c, .., d, _] = [1, 2, 3, 4, 5];
    println!("a {:?}, b {:?}, c {:?}, d {:?}", a, b, c, d);
    // 最后输入：a 1, b 2
	// a 1, b 2, c 1, d 4
}
```

### 变量遮蔽
Rust 允许声明相同的变量名，在后面声明的变量会遮蔽掉前面声明的
> 这和 mut 变量的使用是不同的，第二个 let 生成了完全不同的新变量，两个变量只是恰好拥有同样的名称，涉及一次内存对象的再分配 ，而 mut 声明的变量，可以修改同一个内存地址上的值，并不会发生内存对象的再分配，性能要更好。变量遮蔽的用处在于，如果你在某个作用域内无需再使用之前的变量（在被遮蔽后，无法再访问到之前的同名变量），就可以重复的使用变量名字，而不用绞尽脑汁去想更多的名字。

这个就有点像Python了，在深度学习或者其他领域，变量又多又懒得起名字，直接就使用上一个覆盖：
```rust
fn main() {
    let spaces = "   ";
    // usize数值类型
    let spaces = spaces.len();
    println!("{}", spaces);
    // 3
}
```

但是如果不使用变量遮蔽，下面的情况就是错误的：
```rust
// error[E0308]: mismatched types
let mut spaces = "   ";
spaces = spaces.len();
```


## 1.3 🚗 所有权 & 🚌 借用
这部分我也是第一次接触，和之前学过的Java虚拟机完全不一样，所以这章核心的内容要是我再添油加醋那么可能会带偏。本章内容十分重要，借用作者的一句话是`由于所有权是一个新概念，因此读者需要花费一些时间来掌握它，一旦掌握，海阔天空任你飞跃`。所以我[搬运](https://course.rs/basic/ownership/ownership.html)而来这块的内容，方便后面直接看。

本章的所有内容都来自：[Rust语言圣经(Rust Course)](https://course.rs/basic/ownership/ownership.html)。这章作者写的鬼斧神工，出神入化，我只能这样说了。

### 1.3.1🚗 所有权
所有的程序都必须和计算机内存打交道，如何从内存中申请空间来存放程序的运行内容，如何在不需要的时候释放这些空间，成了重中之重，也是所有编程语言设计的难点之一。在计算机语言不断演变过程中，出现了三种流派：

垃圾回收机制(GC)，在程序运行时不断寻找不再使用的内存，典型代表：Java、Go
手动管理内存的分配和释放, 在程序中，通过函数调用的方式来申请和释放内存，典型代表：C++
通过所有权来管理内存，编译器在编译时会根据一系列规则进行检查
其中 Rust 选择了第三种，最妙的是，这种检查只发生在编译期，因此对于程序运行期，不会有任何性能上的损失。

#### 一段不安全的代码
先来看看一段来自 C 语言的糟糕代码：

```c
int* foo() {
    int a;          // 变量a的作用域开始
    a = 100;
    char *c = "xyz";   // 变量c的作用域开始
    return &a;
}                   // 变量a和c的作用域结束
```
这段代码虽然可以编译通过，但是其实非常糟糕，变量 a 和 c 都是局部变量，函数结束后将局部变量 a 的地址返回，但局部变量 a 存在栈中，在离开作用域后，a 所申请的栈上内存都会被系统回收，从而造成了 悬空指针(Dangling Pointer) 的问题。这是一个非常典型的内存安全问题，虽然编译可以通过，但是运行的时候会出现错误, 很多编程语言都存在。

再来看变量 c，c 的值是常量字符串，存储于常量区，可能这个函数我们只调用了一次，也可能我们不再会使用这个字符串，但 "xyz" 只有当整个程序结束后系统才能回收这片内存。

所以内存安全问题，一直都是程序员非常头疼的问题，好在, 在 Rust 中这些问题即将成为历史，因为 Rust 在编译的时候就可以帮助我们发现内存不安全的问题，那 Rust 如何做到这一点呢？

#### 预热知识: 栈(Stack)与堆(Heap)
栈和堆是编程语言最核心的数据结构，但是在很多语言中，你并不需要深入了解栈与堆。 但对于 Rust 这样的系统编程语言，值是位于栈上还是堆上非常重要, 因为这会影响程序的行为和性能。

栈和堆的核心目标就是为程序在运行时提供可供使用的内存空间。

**栈**
栈按照顺序存储值并以相反顺序取出值，这也被称作后进先出。想象一下一叠盘子：当增加更多盘子时，把它们放在盘子堆的顶部，当需要盘子时，再从顶部拿走。不能从中间也不能从底部增加或拿走盘子！

增加数据叫做进栈，移出数据则叫做出栈。

因为上述的实现方式，栈中的所有数据都必须占用已知且固定大小的内存空间，假设数据大小是未知的，那么在取出数据时，你将无法取到你想要的数据。

**堆**
与栈不同，对于大小未知或者可能变化的数据，我们需要将它存储在堆上。

当向堆上放入数据时，需要请求一定大小的内存空间。操作系统在堆的某处找到一块足够大的空位，把它标记为已使用，并返回一个表示该位置地址的指针, 该过程被称为在堆上分配内存，有时简称为 “分配”(allocating)。

接着，该指针会被推入栈中，因为指针的大小是已知且固定的，在后续使用过程中，你将通过栈中的指针，来获取数据在堆上的实际内存位置，进而访问该数据。

由上可知，堆是一种缺乏组织的数据结构。想象一下去餐馆就座吃饭: 进入餐馆，告知服务员有几个人，然后服务员找到一个够大的空桌子（堆上分配的内存空间）并领你们过去。如果有人来迟了，他们也可以通过桌号（栈上的指针）来找到你们坐在哪。

**性能区别**
写入方面：入栈比在堆上分配内存要快，因为入栈时操作系统无需分配新的空间，只需要将新数据放入栈顶即可。相比之下，在堆上分配内存则需要更多的工作，这是因为操作系统必须首先找到一块足够存放数据的内存空间，接着做一些记录为下一次分配做准备。

读取方面：得益于 CPU 高速缓存，使得处理器可以减少对内存的访问，高速缓存和内存的访问速度差异在 10 倍以上！栈数据往往可以直接存储在 CPU 高速缓存中，而堆数据只能存储在内存中。访问堆上的数据比访问栈上的数据慢，因为必须先访问栈再通过栈上的指针来访问内存。

因此，处理器处理分配在栈上数据会比在堆上的数据更加高效。

**所有权与堆栈**
当你的代码调用一个函数时，传递给函数的参数（包括可能指向堆上数据的指针和函数的局部变量）依次被压入栈中，当函数调用结束时，这些值将被从栈中按照相反的顺序依次移除。

因为堆上的数据缺乏组织，因此跟踪这些数据何时分配和释放是非常重要的，否则堆上的数据将产生内存泄漏 —— 这些数据将永远无法被回收。这就是 Rust 所有权系统为我们提供的强大保障。

对于其他很多编程语言，你确实无需理解堆栈的原理，但是在 Rust 中，明白堆栈的原理，对于我们理解所有权的工作原理会有很大的帮助。

#### 所有权原则
理解了堆栈，接下来看一下关于所有权的规则，首先请谨记以下规则：
> 1. Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
> 2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
> 3. 当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)

##### 变量作用域
作用域是一个变量在程序中有效的范围, 假如有这样一个变量：

```rust
let s = "hello";
```
变量 s 绑定到了一个字符串字面值，该字符串字面值是硬编码到程序代码中的。s 变量从声明的点开始直到当前作用域的结束都是有效的：
```rust
{                      // s 在这里无效，它尚未声明
    let s = "hello";   // 从此处起，s 是有效的

    // 使用 s
}                      // 此作用域已结束，s不再有效
```
简而言之，s 从创建伊始就开始有效，然后有效期持续到它离开作用域为止，可以看出，**就作用域来说，Rust 语言跟其他编程语言没有区别**。

##### 简单介绍 String 类型
> 这里我大致介绍下大纲：
> - 了解字符串的硬编码
> - 了解动态字符串，例如用户输入进去的情况应该如何创建？

之前提到过，本章会用 String 作为例子，因此这里会进行一下简单的介绍，具体的 String 学习请参见 String 类型。

我们已经见过字符串字面值 `let s ="hello"`，s 是被硬编码进程序里的字符串值（类型为 &str ）。字符串字面值是很方便的，但是它并不适用于所有场景。原因有二：

字符串字面值是不可变的，因为被硬编码到程序代码中
并非所有字符串的值都能在编写代码时得知
例如，字符串是需要程序运行时，通过用户动态输入然后存储在内存中的，这种情况，字符串字面值就完全无用武之地。 为此，Rust 为我们提供动态字符串类型: String, 该类型被分配到堆上，因此可以动态伸缩，也就能存储在编译时大小未知的文本。

可以使用下面的方法基于字符串字面量来创建 String 类型：

```rust
let s = String::from("hello");
```
`::` 是一种调用操作符，这里表示调用 String 中的 from 方法，因为 String 存储在堆上是动态的，你可以这样修改它：
```rust
let mut s = String::from("hello");

s.push_str(", world!"); // push_str() 在字符串后追加字面值

println!("{}", s); // 将打印 `hello, world!`
```
言归正传，了解 String 内容后，一起来看看关于所有权的交互。

#### 变量绑定背后的数据交互

##### 转移所有权
先来看一段代码：

```rust
let x = 5;
let y = x;
```
代码背后的逻辑很简单, 将 5 绑定到变量 x；接着拷贝 x 的值赋给 y，最终 x 和 y 都等于 5，因为整数是 Rust 基本数据类型，是固定大小的简单值，因此这两个值都是通过自动拷贝的方式来赋值的，都被存在栈中，完全无需在堆上分配内存。

可能有同学会有疑问：这种拷贝不消耗性能吗？实际上，这种栈上的数据足够简单，而且拷贝非常非常快，只需要复制一个整数大小（i32，4 个字节）的内存即可，因此在这种情况下，拷贝的速度远比在堆上创建内存来得快的多。实际上，上一章我们讲到的 Rust 基本类型都是通过自动拷贝的方式来赋值的，就像上面代码一样。

然后再来看一段代码：

```rust
let s1 = String::from("hello");
let s2 = s1;
```
此时，可能某个大聪明(善意昵称)已经想到了：嗯，把 s1 的内容拷贝一份赋值给 s2，实际上，并不是这样。之前也提到了，对于基本类型（存储在栈上），Rust 会自动拷贝，但是 String 不是基本类型，而且是存储在堆上的，因此不能自动拷贝。

实际上， String 类型是一个复杂类型，由存储在栈中的堆指针、字符串长度、字符串容量共同组成，其中堆指针是最重要的，它指向了真实存储字符串内容的堆内存，至于长度和容量，如果你有 Go 语言的经验，这里就很好理解：容量是堆内存分配空间的大小，长度是目前已经使用的大小。

总之 String 类型指向了一个堆上的空间，这里存储着它的真实数据, 下面对上面代码中的 let s2 = s1 分成两种情况讨论：
1. 拷贝 String 和存储在堆上的字节数组 如果该语句是拷贝所有数据(深拷贝)，那么无论是 String 本身还是底层的堆上数据，都会被全部拷贝，这对于性能而言会造成非常大的影响
2. 只拷贝 String 本身 这样的拷贝非常快，因为在 64 位机器上就拷贝了 8字节的指针、8字节的长度、8字节的容量，总计 24 字节，但是带来了新的问题，还记得我们之前提到的所有权规则吧？其中有一条就是：一个值只允许有一个所有者，而现在这个值（堆上的真实字符串数据）有了两个所有者：s1 和 s2。

好吧，就假定一个值可以拥有两个所有者，会发生什么呢？

当变量离开作用域后，Rust 会自动调用 drop 函数并清理变量的堆内存。不过由于两个 String 变量指向了同一位置。这就有了一个问题：当 s1 和 s2 离开作用域，它们都会尝试释放相同的内存。这是一个叫做 二次释放（double free） 的错误，也是之前提到过的内存安全性 BUG 之一。两次释放（相同）内存会导致内存污染，它可能会导致潜在的安全漏洞。

因此，Rust 这样解决问题：当 s1 赋予 s2 后，Rust 认为 s1 不再有效，因此也无需在 s1 离开作用域后 drop 任何东西，这就是把所有权从 s1 转移给了 s2，s1 在被赋予 s2 后就马上失效了。

再来看看，在所有权转移后再来使用旧的所有者，会发生什么：

```rust
let s1 = String::from("hello");
let s2 = s1;

println!("{}, world!", s1);
```
由于 Rust 禁止你使用无效的引用，你会看到以下的错误：
```
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:5:28
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 | 
5 |     println!("{}, world!", s1);
  |                            ^^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)
```

> 这里我再进一步解释一下：代码会报错，因为在 Rust 中，变量绑定具有所有权 (ownership)。当你将 s1 绑定到新的变量 s2 时，所有权会转移，而 s1 不再有效。这是 Rust 的一个关键特性，它有助于避免内存不安全。错误发生在 println! 行，因为你试图使用已经失效的变量 s1。

🌅另外这段代码可以解决：`1. 克隆 2. 引用`
1. 克隆(clone)：
```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("{}, world!", s1);
// 这会创建一个新的 `String` 实例，其内容与 `s1` 相同，并将其绑定到 `s2`。这样，`s1` 和 `s2` 都可以在后续代码中使用。
```
2. 引用 (references)：
```rust
let s1 = String::from("hello");
let s2 = &s1;

println!("{}, world!", s1);
// 在这个例子中，我们使用了一个对 `s1` 的引用并将其赋值给 `s2`。这样 `s1` 仍然拥有所有权，而 `s2` 只是借用 (borrow)。注意，当使用引用时，可能需要考虑生命周期 (lifetimes) 和可变性 (mutability)。
```

现在再回头看看之前的规则，相信大家已经有了更深刻的理解：
> 1. Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
> 2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
> 3. 当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)

如果你在其他语言中听说过术语 浅拷贝(shallow copy) 和 深拷贝(deep copy)，那么拷贝指针、长度和容量而不拷贝数据听起来就像浅拷贝，但是又因为 Rust 同时使第一个变量 s1 无效了，因此这个操作被称为 移动(move)，而不是浅拷贝。上面的例子可以解读为 s1 被移动到了 s2 中。那么具体发生了什么，用一张图简单说明：
![](https://pic1.zhimg.com/80/v2-3ec77951de6a17584b5eb4a3838b4b61_1440w.jpg)
这样就解决了我们之前的问题，s1 不再指向任何数据，只有 s2 是有效的，当 s2 离开作用域，它就会释放内存。 相信此刻，你应该明白了，为什么 Rust 称呼 let a = b 为变量绑定了吧？

再来看一段代码:
```rust
fn main() {
    let x: &str = "hello, world";
    let y = x;
    println!("{},{}",x,y);
}
```
这段代码，大家觉得会否报错？如果参考之前的 String 所有权转移的例子，那这段代码也应该报错才是，但是实际上呢？

这段代码和之前的 String 有一个本质上的区别：在 String 的例子中 s1 持有了通过String::from("hello") 创建的值的所有权，而这个例子中，x 只是引用了存储在二进制中的字符串 "hello, world"，并没有持有所有权。

因此 let y = x 中，仅仅是对该引用进行了拷贝，此时 y 和 x 都引用了同一个字符串。如果还不理解也没关系，当学习了下一章节 "引用与借用" 后，大家自然而言就会理解。

##### 克隆(深拷贝)
首先，Rust 永远也不会自动创建数据的 “深拷贝”。因此，任何自动的复制都不是深拷贝，可以被认为对运行时性能影响较小。

如果我们确实需要深度复制 String 中堆上的数据，而不仅仅是栈上的数据，可以使用一个叫做 clone 的方法。
```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
```

这段代码能够正常运行，因此说明 s2 确实完整的复制了 s1 的数据。

如果代码性能无关紧要，例如初始化程序时，或者在某段时间只会执行一次时，你可以使用 clone 来简化编程。但是对于执行较为频繁的代码(热点路径)，使用 clone 会极大的降低程序性能，需要小心使用！

##### 拷贝(浅拷贝)
浅拷贝只发生在栈上，因此性能很高，在日常编程中，浅拷贝无处不在。

再回到之前看过的例子:
```rust
let x = 5;
let y = x;

println!("x = {}, y = {}", x, y);
```

但这段代码似乎与我们刚刚学到的内容相矛盾：没有调用 clone，不过依然实现了类似深拷贝的效果 —— 没有报所有权的错误。

原因是像整型这样的基本类型在编译时是已知大小的，会被存储在栈上，所以拷贝其实际的值是快速的。这意味着没有理由在创建变量 y 后使 x 无效（x、y 都仍然有效）。换句话说，这里没有深浅拷贝的区别，因此这里调用 clone 并不会与通常的浅拷贝有什么不同，我们可以不用管它（可以理解成在栈上做了深拷贝）。

Rust 有一个叫做 Copy 的特征，可以用在类似整型这样在栈中存储的类型。如果一个类型拥有 Copy 特征，一个旧的变量在被赋值给其他变量后仍然可用。

那么什么类型是可 Copy 的呢？可以查看给定类型的文档来确认，不过作为一个通用的规则： 任何基本类型的组合可以 Copy ，不需要分配内存或某种形式资源的类型是可以 Copy 的。如下是一些 Copy 的类型：

- 所有整数类型，比如 u32
- 布尔类型，bool，它的值是 true 和 false
- 所有浮点数类型，比如 f64
- 字符类型，char
- 元组，当且仅当其包含的类型也都是 Copy 的时候。比如，(i32, i32) 是 Copy 的，但 (i32, String) 就不是
- 不可变引用 &T ，例如转移所有权中的最后一个例子，但是注意: 可变引用 &mut T 是不可以 Copy的

#### 函数传值与返回
将值传递给函数，一样会发生 移动 或者 复制，就跟 let 语句一样，下面的代码展示了所有权、作用域的规则：
```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里 ...
                                    // ... 所以到这里不再有效

    let x = 5;                      // x 进入作用域

    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，所以在后面可继续使用 x

} // 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。不会有特殊操作
```
你可以尝试在 takes_ownership 之后，再使用 s，看看如何报错？例如添加一行 println!("在move进函数后继续使用s: {}",s);。
```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里 ...
                                    // ... 所以到这里不再有效
    let y = s;
    println!(y); // 这里进行实验
// ====================================
%%error: format argument must be a string literal
 --> src/main.rs:7:14
  |
7 |     println!(y);
  |              ^
  |
help: you might be missing a string literal to format with
  |
7 |     println!("{}", y);
  |              +++++

error: could not compile `Demo` due to previous erro%%r
```

同样的，函数返回值也有所有权，例如:

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership 将返回值
                                        // 移给 s1

    let s2 = String::from("hello");     // s2 进入作用域

    let s3 = takes_and_gives_back(s2);  // s2 被移动到
                                        // takes_and_gives_back 中,
                                        // 它也将返回值移给 s3
} // 这里, s3 移出作用域并被丢弃。s2 也移出作用域，但已被移走，
  // 所以什么也不会发生。s1 移出作用域并被丢弃

fn gives_ownership() -> String {             // gives_ownership 将返回值移动给
                                             // 调用它的函数

    let some_string = String::from("hello"); // some_string 进入作用域.

    some_string                              // 返回 some_string 并移出给调用的函数
}

// takes_and_gives_back 将传入字符串并返回该值
fn takes_and_gives_back(a_string: String) -> String { // a_string 进入作用域

    a_string  // 返回 a_string 并移出给调用的函数
}
```
所有权很强大，避免了内存的不安全性，但是也带来了一个新麻烦： 总是把一个值传来传去来使用它。 传入一个函数，很可能还要从该函数传出去，结果就是语言表达变得非常啰嗦，幸运的是，Rust 提供了新功能解决这个问题。

### 1.3.2 🚌 借用
上节中提到，如果仅仅支持通过转移所有权的方式获取一个值，那会让程序变得复杂。 Rust 能否像其它编程语言一样，使用某个变量的指针或者引用呢？答案是可以。

**Rust 通过 借用(Borrowing) 这个概念来达成上述的目的，获取变量的引用，称之为借用(borrowing)**。正如现实生活中，如果一个人拥有某样东西，你可以从他那里借来，当使用完毕后，也必须要物归原主。

#### 引用与解引用
常规引用是一个指针类型，指向了对象存储的内存地址。在下面代码中，我们创建一个 i32 值的引用 y，然后使用解引用运算符来解出 y 所使用的值:
```rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```
变量 x 存放了一个 i32 值 5。y 是 x 的一个引用。可以断言 x 等于 5。然而，如果希望对 y 的值做出断言，必须使用 *y 来解出引用所指向的值（也就是解引用）。一旦解引用了 y，就可以访问 y 所指向的整型值并可以与 5 做比较。

相反如果尝试编写 assert_eq!(5, y);，则会得到如下编译错误：
```
error[E0277]: can't compare `{integer}` with `&{integer}`
 --> src/main.rs:6:5
  |
6 |     assert_eq!(5, y);
  |     ^^^^^^^^^^^^^^^^ no implementation for `{integer} == &{integer}` // 无法比较整数类型和引用类型
  |
  = help: the trait `PartialEq<&{integer}>` is not implemented for `{integer}`
  = help: the following other types implement trait `PartialEq<Rhs>`:
```

#### 不可变引用
下面的代码，我们用 s1 的引用作为参数传递给 calculate_length 函数，而不是把 s1 的所有权转移给该函数：

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```
能注意到两点：

1. 无需像上章一样：先通过函数参数传入所有权，然后再通过函数返回来传出所有权，代码更加简洁
2. calculate_length 的参数 s 类型从 String 变为 &String
这里，& 符号即是引用，它们允许你使用值，但是不获取所有权，如图所示： 
![](https://pic1.zhimg.com/80/v2-fc68ea4a1fe2e3fe4c5bb523a0a8247c_1440w.jpg)
通过 &s1 语法，我们创建了一个指向 s1 的引用，但是并不拥有它。因为并不拥有这个值，当引用离开作用域后，其指向的值也不会被丢弃。

同理，函数 calculate_length 使用 & 来表明参数 s 的类型是一个引用：

```rust
fn calculate_length(s: &String) -> usize { // s 是对 String 的引用
    s.len()
} // 这里，s 离开了作用域。但因为它并不拥有引用值的所有权，
  // 所以什么也不会发生
```
很不幸，妹子你没抱到，哦口误，你修改错了：

```
error[E0596]: cannot borrow `*some_string` as mutable, as it is behind a `&` reference
 --> src/main.rs:8:5
  |
7 | fn change(some_string: &String) {
  |                        ------- help: consider changing this to be a mutable reference: `&mut String`
						   ------- 帮助：考虑将该参数类型修改为可变的引用: `&mut String`
8 |     some_string.push_str(", world");
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `some_string` is a `&` reference, so the data it refers to cannot be borrowed as mutable\
										`some_string`是一个`&`类型的引用，因此它指向的数据无法进行修改

For more information about this error, try `rustc --explain E0596`.
error: could not compile `Demo` due to previous error
```

正如变量默认不可变一样，引用指向的值默认也是不可变的，没事，来一起看看如何解决这个问题。

#### 可变引用
只需要一个小调整，即可修复上面代码的错误：
```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

首先，声明 s 是可变类型，其次创建一个可变的引用 &mut s 和接受可变引用参数 some_string: &mut String 的函数。

##### 可变引用同时只能存在一个
不过可变引用并不是随心所欲、想用就用的，它有一个很大的限制： 同一作用域，特定数据只能有一个可变引用：
```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);
```
以上代码会报错：
```
	error[E0499]: cannot borrow `s` as mutable more than once at a time 同一时间无法对 `s` 进行两次可变借用
 --> src/main.rs:5:10
  |
4 | let r1 = &mut s;
  |          ------ first mutable borrow occurs here 首个可变引用在这里借用
5 | let r2 = &mut s;
  |          ^^^^^^ second mutable borrow occurs here 第二个可变引用在这里借用
6 | 
7 | println!("{}, {}", r1, r2);
  |                    -- first borrow later used here 第一个借用在这里使用

For more information about this error, try `rustc --explain E0499`.
error: could not compile `Demo` due to previous error
```
这段代码出错的原因在于，第一个可变借用 r1 必须要持续到最后一次使用的位置 println!，在 r1 创建和最后一次使用之间，我们又尝试创建第二个可变借用 r2。

对于新手来说，这个特性绝对是一大拦路虎，也是新人们谈之色变的编译器 borrow checker 特性之一，不过各行各业都一样，限制往往是出于安全的考虑，Rust 也一样。

这种限制的好处就是使 Rust 在编译期就避免数据竞争，数据竞争可由以下行为造成：
- 两个或更多的指针同时访问同一数据
- 至少有一个指针被用来写入数据
- 没有同步数据访问的机制

数据竞争会导致未定义行为，这种行为很可能超出我们的预期，难以在运行时追踪，并且难以诊断和修复。而 Rust 避免了这种情况的发生，因为它甚至不会编译存在数据竞争的代码！

很多时候，大括号可以帮我们解决一些编译不通过的问题，通过手动限制变量的作用域：

```rust
let mut s = String::from("hello");

{
    let r1 = &mut s;

} // r1 在这里离开了作用域，所以我们完全可以创建一个新的引用

let r2 = &mut s;
```

##### 可变引用与不可变引用不能同时存在
下面的代码会导致一个错误：

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // 没问题
    let r2 = &s; // 没问题
    let r3 = &mut s; // 大问题

    println!("{}, {}, and {}", r1, r2, r3);
}
```

错误如下：
```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:14
  |
4 |     let r1 = &s; // 没问题
  |              -- immutable borrow occurs here
5 |     let r2 = &s; // 没问题
6 |     let r3 = &mut s; // 大问题
  |              ^^^^^^ mutable borrow occurs here
7 | 
8 |     println!("{}, {}, and {}", r1, r2, r3);
  |                                -- immutable borrow later used here

For more information about this error, try `rustc --explain E0502`.
error: could not compile `Demo` due to previous error
```
其实这个也很好理解，正在借用不可变引用的用户，肯定不希望他借用的东西，被另外一个人莫名其妙改变了。多个不可变借用被允许是因为没有人会去试图修改数据，每个人都只读这一份数据而不做修改，因此不用担心数据被污染。
> 注意，引用的作用域 s 从创建开始，一直持续到它最后一次使用的地方，这个跟变量的作用域有所不同，变量的作用域从创建持续到某一个花括号 }

Rust 的编译器一直在优化，早期的时候，引用的作用域跟变量作用域是一致的，这对日常使用带来了很大的困扰，你必须非常小心的去安排可变、不可变变量的借用，免得无法通过编译，例如以下代码：

```rust
fn main() {
   let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    // 新编译器中，r1,r2作用域在这里结束

    let r3 = &mut s;
    println!("{}", r3);
} // 老编译器中，r1、r2、r3作用域在这里结束
  // 新编译器中，r3作用域在这里结束
```
在老版本的编译器中（Rust 1.31 前），将会报错，因为 r1 和 r2 的作用域在花括号 } 处结束，那么 r3 的借用就会触发 无法同时借用可变和不可变的规则。

但是在新的编译器中，该代码将顺利通过，因为 引用作用域的结束位置从花括号变成最后一次使用的位置，因此 r1 借用和 r2 借用在 println! 后，就结束了，此时 r3 可以顺利借用到可变引用。

##### NLL
对于这种编译器优化行为，Rust 专门起了一个名字 —— Non-Lexical Lifetimes(NLL)，专门用于找到某个引用在作用域(})结束前就不再被使用的代码位置。

虽然这种借用错误有的时候会让我们很郁闷，但是你只要想想这是 Rust 提前帮你发现了潜在的 BUG，其实就开心了，虽然减慢了开发速度，但是从长期来看，大幅减少了后续开发和运维成本。

##### 悬垂引用(Dangling References)
悬垂引用也叫做悬垂指针，意思为指针指向某个值后，这个值被释放掉了，而指针仍然存在，其指向的内存可能不存在任何值或已被其它变量重新使用。在 Rust 中编译器可以确保引用永远也不会变成悬垂状态：当你获取数据的引用后，编译器可以确保数据不会在引用结束前被释放，要想释放数据，必须先停止其引用的使用。

让我们尝试创建一个悬垂引用，Rust 会抛出一个编译时错误：
```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");

    &s
}
```
这里是错误：
```
error[E0106]: missing lifetime specifier
 --> src/main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime
  |
5 | fn dangle() -> &'static String {
  |                ~~~~~~~~
```
错误信息引用了一个我们还未介绍的功能：生命周期(lifetimes)。不过，即使你不理解生命周期，也可以通过错误信息知道这段代码错误的关键信息：


this function's return type contains a borrowed value, but there is no value for it to be borrowed from.
该函数返回了一个借用的值，但是已经找不到它所借用值的来源

仔细看看 dangle 代码的每一步到底发生了什么：

```rust
fn dangle() -> &String { // dangle 返回一个字符串的引用

    let s = String::from("hello"); // s 是一个新字符串

    &s // 返回字符串 s 的引用
} // 这里 s 离开作用域并被丢弃。其内存被释放。
  // 危险！
```
因为 s 是在 dangle 函数内创建的，当 dangle 的代码执行完毕后，s 将被释放，但是此时我们又尝试去返回它的引用。这意味着这个引用会指向一个无效的 String，这可不对！

其中一个很好的解决方法是直接返回 String：
```rust
fn no_dangle() -> String {
    let s = String::from("hello");

    s
}
```
这样就没有任何错误了，最终 String 的 所有权被转移给外面的调用者。

#### 借用规则总结
总的来说，借用规则如下：
- 同一时刻，你只能拥有要么一个可变引用, 要么任意多个不可变引用
- 引用必须总是有效的

至此，我终于搬完了，累死了！

## 1.4 🗛 字符串

先试试这段代码的结果是怎样的？
```rust
fn main() {
  let my_name = "Pascal";
  greet(my_name);
}

fn greet(name: String) {
  println!("Hello, {}!", name);
}
```



这段代码会报错，因为在调用 greet 函数时，my_name 只是一个字符串切片（&str），而不是一个 String 类型。在 Rust 中，&str 和 String 是两种不同的字符串类型，String 是可变的，而 &str 是不可变的。

为了解决这个问题，您可以将 greet 函数的参数类型更改为 &str，如下所示：

```
error[E0308]: mismatched types
 --> src/main.rs:3:9
  |
3 |   greet(my_name);
  |         ^^^^^^^- help: try using a conversion method: `.to_string()` // 尝试使用转换方法：'.to_string（）'
  |         |
  |         expected struct `String`, found `&str` // 当前结构'String'，预期找到'&str'

For more information about this error, try `rustc --explain E0308`.
error: could not compile `Demo` due to previous error
```

解决方案：

```rust
fn main() {
  let my_name = "Pascal";
  greet(my_name);
}

fn greet(name: &str) {
  println!("Hello, {}!", name);
}
```

### 切片(slice)
下面先写一个Go语言和Python语言的切片，方便渐入佳境

Go语言
```go
package main

import "fmt"

func main() {
    // 创建切片
    numbers := []int{1, 2, 3, 4, 5}

    // 输出切片
    fmt.Println("切片 numbers：", numbers)

    // 切片从索引 1 到索引 4
    fmt.Println("numbers[1:4]：", numbers[1:4])

    // 默认下限为0
    fmt.Println("numbers[:3]：", numbers[:3])

    // 默认上限为 len(s)
    fmt.Println("numbers[2:]：", numbers[2:])

    // 创建一个切片，len=0，cap=2
    slice1 := make([]int, 0, 2)
    fmt.Println("slice1：", slice1)

    // 追加元素
    slice1 = append(slice1, 1)
    fmt.Println("slice1：", slice1)

    // 追加多个元素
    slice1 = append(slice1, 2, 3, 4)
    fmt.Println("slice1：", slice1)
}
```

Python：
```python
# 创建列表
numbers = [1, 2, 3, 4, 5]

# 输出列表
print("列表 numbers：", numbers)

# 切片从索引 1 到索引 4
print("numbers[1:4]：", numbers[1:4])

# 默认下限为0
print("numbers[:3]：", numbers[:3])

# 默认上限为 len(s)
print("numbers[2:]：", numbers[2:])

# 创建一个列表
list1 = []

# 追加元素
list1.append(1)
print("list1：", list1)

# 追加多个元素
list1.extend([2, 3, 4])
print("list1：", list1)
```

rust：
![](https://pic1.zhimg.com/80/v2-69da917741b2c610732d8526a9cc86f5_1440w.jpg)

```rust 
fn main() {
  let s = String::from("hello world");

  let hello = &s[0..5];
  let world = &s[6..11];
  println!("{}, {}", hello, world);
  // hello, world
}
```
当然，你可以横切竖切，想怎么切怎么切：
1. 从0开始切
```rust
fn main() {
  let s = String::from("hello world");

  let tmp = &s[..2];
  println!("{:?}", tmp); // he
}
```
2. 从某个位置切到尾巴
```rust
fn main() {
  let s = String::from("hello world");

  let tmp = &s[2..s.len()];
  println!("{:?}", tmp); // llo world
}
```
3. 完整切
```rust
fn main() {
  let s = String::from("hello world");

  let tmp = &s[..];
  println!("{:?}", tmp); // hello world
}
```

⚠️ warning：在对字符串使用切片语法时需要格外小心，切片的索引必须落在字符之间的边界位置，也就是 UTF-8 字符的边界，例如中文在 UTF-8 中占用三个字节，下面的代码就会崩溃：

```rust
fn main() {
  let s = "中国人";
  let a = &s[0..2];
  println!("{}",a);
}
```

```
thread 'main' panicked at 'byte index 2 is not a char boundary; it is inside '中' (bytes 0..3) of `中国人`', library/core/src/str/mod.rs:127:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

主线程在字节索引2处，这不是一个char边界；它在'中国人"， Library/core/src/str/mod.rs:127：5的'中'（字节0…3）中
注意：使用'RUST_BACKTRACE=1'环境变量运行以显示回溯
```

因为我们只取 s 字符串的前两个字节，但是本例中每个汉字占用三个字节，因此没有落在边界处，也就是连 中 字都取不完整，此时程序会直接崩溃退出，如果改成 &s[0..3]，则可以正常通过编译。 

```
fn main() {
  let s = "中国人";
  let a = &s[0..3];
  println!("{}",a);
}
```

字符串切片的类型标识是 `&str`
在这里其实有点混乱，`String`和`&str`有什么区别呢？
> - String是一个拥有所有权的可变字符串类型。这意味着它可以动态地增加或缩小字符串的长度，因为它在堆上分配内存，并且可以自动地调整大小以适应更改。
> - &str是一个不可变的字符串切片类型，它是一个指向字符串数据的引用。这意味着它不能动态地改变字符串的长度，因为它只是字符串数据的引用，而不是实际的字符串。因此，&str通常用于不需要修改字符串的情况，例如函数参数，或者在字符串数据不需要拥有所有权时使用。

```rust
fn main() {
    // 创建一个String类型的字符串
    let mut s = String::from("hello");

    // 在字符串末尾添加一个字符
    s.push(' ');

    // 添加一个&str类型的字符串
    s.push_str("world");

    // 使用&操作符将String类型的字符串转换为&str类型的字符串切片
    let slice = &s[..];

    println!("{}", slice);
}
```
在上面的示例中，我们使用String类型的s变量创建一个可变字符串，并在其末尾添加字符和字符串。然后，我们使用&操作符将String类型的字符串转换为&str类型的字符串切片，并将其赋值给slice变量。最后，我们打印slice变量，它包含完整的"hello world"字符串。

有了这个理解就可以来看比较妙的代码了：

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // error!

    println!("the first word is: {}", word);
}
fn first_word(s: &String) -> &str {
    &s[..1]
}
```

我的理解是：
- `let mut s = String::from("hello world");` 这里是String，拥有所有权的可变字符串类型
- `let word = first_word(&s);` 返回一个`&str`，不可变的字符串切片类型
- `s.clear()` 需要一个可变借用，但是现在已经（word）是`&str`，不可变的字符串切片类型
- `println!("the first word is: {}", word);` 需要一个不可变借用，在 s.clear() 处可变借用与不可变借用试图同时生效，因此编译无法通过。

```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:5
  |
4 |     let word = first_word(&s);
  |                           -- immutable borrow occurs here // 不可变的借用发生在这里
5 | 
6 |     s.clear(); // error!
  |     ^^^^^^^^^ mutable borrow occurs here // 可变借用发生在这里
7 | 
8 |     println!("the first word is: {}", word);
  |                                       ---- immutable borrow later used here // 不可变借后来用在这里

For more information about this error, try `rustc --explain E0502`.
error: could not compile `Demo` due to previous error
```

> 注：在Rust中，可以使用&操作符将String类型的字符串转换为&str类型的字符串切片。这种转换并不涉及内存分配或复制，因为&str只是一个指向String类型字符串的不可变引用。但需要注意的是，&str引用的字符串必须在String变量的生命周期内，否则会导致悬垂引用错误。

### 字符串字面量是切片
之前提到过字符串字面量,但是没有提到它的类型：

```rust
let s = "Hello, world!";
```

实际上，s 的类型是 &str，因此你也可以这样声明：

```rust
let s: &str = "Hello, world!";
```

该切片指向了程序可执行文件中的某个点，**这也是为什么字符串字面量是不可变的，因为 &str 是一个不可变引用**。

### 字符串类型
- str 类型是硬编码进可执行文件，也无法被修改
- String 则是一个可增长、可改变且具有所有权的 UTF-8 编码字符串，当 Rust 用户提到字符串时，往往指的就是 String 类型和 &str 字符串切片类型，这两个类型都是 UTF-8 编码。
- &str 字符串切片

### String 与 &str 的转换
 
 &str 类型生成 String 类型的操作：
```rust
String::from("hello,world")
"hello,world".to_string()
```

 String 类型转为 &str 类型 -- 引用：
 
```rust
fn main() {
    let s = String::from("hello,world!"); // String
    say_hello(&s); // 这里开始转换成&str
    say_hello(&s[..]);
    say_hello(s.as_str());
}

fn say_hello(s: &str) {
    println!("{}",s);
}
```

### 字符串索引
在Rust中下面的代码如果使用`a[0]`则无法访问，这是为什么呢？作为一名Java程序员，感觉很蛋疼
```rust
fn main() {
    let a = "123";
    println!("{}", a[0]); // error
    println!("{}", &a[..2]); // running!
}
```
报错内容如下：
```rust
error[E0277]: the type `str` cannot be indexed by `{integer}`
 --> src/main.rs:3:20
  |
3 |     println!("{}", a[0]); // error
  |                    ^^^^ string indices are ranges of `usize`
  |
  = help: the trait `SliceIndex<str>` is not implemented for `{integer}`
  = note: you can use `.chars().nth()` or `.bytes().nth()`
          for more information, see chapter 8 in The Book: <https://doc.rust-lang.org/book/ch08-02-strings.html#indexing-into-strings>
  = help: the trait `SliceIndex<[T]>` is implemented for `usize`
  = note: required because of the requirements on the impl of `Index<{integer}>` for `str`

For more information about this error, try `rustc --explain E0277`.
error: could not compile `Demo` due to previous error
```

#### 原因分析
1. Rust 字符串底层数据存储格式是` Vec<u8>`，一个字节数组。对于多字节字符，比如汉字，一个字符可能会占用多个字节，因此字符串长度与字节数并不一定相等。

```rust
let s = String::from("中国人");
let bytes = s.as_bytes();
println!("{:?}", bytes); // 输出 [228, 184, 173, 229, 155, 189, 228, 184, 128]
```

2. Rust 提供了不同的字符串展现方式，包括字节串、Unicode 字符串和语言字符串。字节串是底层字节数组的直接展现，Unicode 字符串可以使用 chars() 方法获取，语言字符串可以使用 graphemes() 方法获取。

```rust
let s = String::from("नमस्ते");
let bytes = s.as_bytes(); // 字节串
let chars = s.chars(); // Unicode 字符串
let graphemes = s.graphemes(true); // 语言字符串
println!("{:?}", bytes); // 输出 [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]
println!("{:?}", chars.collect::<Vec<char>>()); // 输出 ['न', 'म', 'स', '्', 'त', 'े']
println!("{:?}", graphemes.collect::<Vec<&str>>()); // 输出 ["न", "म", "स्", "ते"]
```

3. Rust 不允许直接索引字符串，即不能使用类似 `str[index]` 的方式获取字符串中的某个字符。这是因为字符串的字符可能占用多个字节，因此无法保证 O(1) 的性能表现。如果确实需要访问字符串中的某个字符，可以使用迭代器或者字符切片等方式来遍历字符串。

```rust
let s = String::from("Hello, world!");
let third = s.chars().nth(2); // 第三个字符，返回 Option<char>
let slice = &s[0..5]; // 字符切片，包含 s[0] 到 s[4]
println!("{:?}", third); // 输出 Some('l')
println!("{:?}", slice); // 输出 "Hello"
```

### 字符串的一些常用API

#### 追加(push)
首先介绍`push`和`push_str`
> pub fn push_str(&mut self, string: &str)
将给定的字符串切片追加到这个 String 的末尾。

```rust
let mut s = String::from("foo");

s.push_str("bar");

assert_eq!("foobar", s);
```

> pub fn push(&mut self, ch: char)
将给定的 char 追加到该 String 的末尾。


```rust
let mut s = String::from("abc");

s.push('1');
s.push('2');
s.push('3');

assert_eq!("abc123", s);
```

> 注：目前只要知道区别是：push() 方法只能添加单个字符，如果想要添加一个字符串，需要将字符串转换为字符切片再使用 push_str() 方法。

#### 插入(Insert)
> pub fn insert(&mut self, idx: usize, ch: char)
在此 String 的字节位置插入一个字符。这是一个 O(n) 操作，因为它需要复制缓冲区中的每个元素。

```rust
let mut s = String::with_capacity(3);

s.insert(0, 'f');
s.insert(1, 'o');
s.insert(2, 'o');

assert_eq!("foo", s);
```


> pub fn insert_str(&mut self, idx: usize, string: &str)
   在此 String 的字节位置处插入字符串切片。这是一个 O(n) 操作，因为它需要复制缓冲区中的每个元素。

```rust
let mut s = String::from("bar");

s.insert_str(0, "foo");

assert_eq!("foobar", s);
```



#### 替换(Replace)
> pub fn replace<'a, P>(&'a self, from: P, to: &str) -> String
> 用另一个字符串替换模式的所有匹配项。
> replace 创建一个新的 String，并将此字符串切片中的数据复制到其中。 这样做时，它将尝试查找某个模式的匹配项。 如果找到，则将其替换为替换字符串切片。


```rust
let s = "this is old";

assert_eq!("this is new", s.replace("old", "new"));
```
当模式不匹配时：

```rust
let s = "this is old";
assert_eq!(s, s.replace("cookie monster", "little lamb"));
```


> pub fn replacen<'a, P>(&'a self, pat: P, to: &str, count: usize) -> String
> 用另一个字符串替换模式的前 N 个匹配项。
	replacen 创建一个新的 String，并将此字符串切片中的数据复制到其中。 这样做时，它将尝试查找某个模式的匹配项。 如果找到任何内容，则最多 count 次将它们替换为替换字符串切片。


```rust
let s = "foo foo 123 foo";
assert_eq!("new new 123 foo", s.replacen("foo", "new", 2));
assert_eq!("faa fao 123 foo", s.replacen('o', "a", 3));
assert_eq!("foo foo new23 foo", s.replacen(char::is_numeric, "new", 1));
```
不匹配时：

```rust
let s = "this is old";
assert_eq!(s, s.replacen("cookie monster", "little lamb", 10));
```



> pub fn replace_range`<R>`(&mut self, range: R, replace_with: &str) 
>删除字符串中的指定范围，并将其替换为给定的字符串。 给定的字符串不必与范围相同。


```rust
let mut s = String::from("α is alpha, β is beta");
let beta_offset = s.find('β').unwrap_or(s.len());

// 替换范围直到字符串中的 β
s.replace_range(..beta_offset, "Α is capital alpha; ");
assert_eq!(s, "Α is capital alpha; β is beta");
```


#### 删除
> pub fn pop(&mut self) -> Option`<char>`
> 从字符串缓冲区中删除最后一个字符并返回它。
> 如果 String 为空，则返回 None。


```rust
let mut s = String::from("foo");

assert_eq!(s.pop(), Some('o'));
assert_eq!(s.pop(), Some('o'));
assert_eq!(s.pop(), Some('f'));

assert_eq!(s.pop(), None);
```

>pub fn remove(&mut self, idx: usize) -> char
>从该 String 的字节位置删除 char 并将其返回。
>这是 O(n) 操作，因为它需要复制缓冲区中的每个元素。


```rust
let mut s = String::from("foo");

assert_eq!(s.remove(0), 'f');
assert_eq!(s.remove(1), 'o');
assert_eq!(s.remove(0), 'o');
```

> pub fn truncate(&mut self, new_len: usize)
> 将此 String 缩短为指定的长度。
> 如果 new_len 大于字符串的当前长度，则无效。
> 请注意，此方法对字符串的分配容量没有影响


```rust
let mut s = String::from("hello");

s.truncate(2);

assert_eq!("he", s);
```

> pub fn clear(&mut self)
> 截断此 String，删除所有内容。
> 虽然这意味着 String 的长度为零，但它并未触及其容量。


```rust
let mut s = String::from("foo");

s.clear();

assert!(s.is_empty());
assert_eq!(0, s.len());
assert_eq!(3, s.capacity());
```


#### 连接 (Concatenate)

1. 使用 + 或者 += 连接字符串
理论上来说，对于Java程序员，直接上就完事。But

```rust
fn main() {
    let string_append = String::from("hello ");
    let string_rust = String::from("rust");
    println!("{}", string_append + string_rust)
}
```
报错如下：

```
error[E0308]: mismatched types
 --> src/main.rs:4:36
  |
4 |     println!("{}", string_append + string_rust)
  |                                    ^^^^^^^^^^^
  |                                    |
  |                                    expected `&str`, found struct `String`
  |                                    help: consider borrowing here: `&string_rust`

For more information about this error, try `rustc --explain E0308`.
error: could not compile `Demo` due to previous error
```
查看别人写代码是这样：
> let result = string_append + &string_rust;

然后就有这样的疑惑：`为什么我进行字符串连接的时候，第一个String类型的不用引用，第二个以及后面的要引用？`
原因是，在 Rust 中，+ 运算符用于字符串连接，但是它的实现方式与我们熟悉的加法运算符不同。具体来说，+ 运算符会调用 add 方法，该方法的定义如下：
> fn add(self, s: &str) -> String

可以看到，add 方法接收一个 self 参数和一个字符串切片 s 参数。由于 self 参数的类型是 String，而 s 参数的类型是 &str，因此在使用 + 运算符进行字符串连接时，第一个字符串可以是 String 类型，而`第二个及之后的字符串必须是字符串切片类型`。

所以最终代码是

```rust
fn main() {
    let string_append = String::from("hello ");
    let string_rust = String::from("rust");
    let string_world = String::from("world");
    println!("{}", string_append + &string_rust + &string_world);
}
```
总结：String + &str返回一个 String，然后再继续跟一个 &str 进行 + 操作，返回一个 String 类型，不断循环，最终生成一个 s，也是 String 类型。

s1 这个变量通过调用 add() 方法后，所有权被转移到 add() 方法里面， add() 方法调用后就被释放了，同时 s1 也被释放了。再使用 s1 就会发生错误。这里涉及到`所有权转移（Move）`的相关知识。

2. 使用 format! 连接字符串

```rust
fn main() {
    let s1 = "hello";
    let s2 = String::from("rust");
    let s = format!("{} {}!", s1, s2);
    println!("{}", s);
}
```

### 操作 UTF-8 字符串
如果你想要以 Unicode 字符的方式遍历字符串，最好的办法是使用 chars 方法，例如：

```rust
for c in "中国人".chars() {
    println!("{}", c);
}
```

如果要返回字符串的底层字节数组表现形式：

```rust
for b in "中国人".bytes() {
    println!("{}", b);
}
```

想要准确的从 UTF-8 字符串中获取子串是较为复杂的事情，例如想要从 holla中国人नमस्ते 这种变长的字符串中取出某一个子串，使用标准库你是做不到的。 你需要在 crates.io 上搜索 utf8 来寻找想要的功能。

可以考虑尝试下这个库：`utf8_slice`。

### 字符串深度剖析
那么问题来了，为啥 String 可变，而字符串字面值 str 却不可以？

就字符串字面值来说，我们在编译时就知道其内容，最终字面值文本被直接硬编码进可执行文件中，这使得字符串字面值快速且高效，这主要得益于字符串字面值的不可变性。不幸的是，我们不能为了获得这种性能，而把每一个在编译时大小未知的文本都放进内存中（你也做不到！），因为有的字符串是在程序运行得过程中动态生成的。

对于 String 类型，为了支持一个可变、可增长的文本片段，需要在堆上分配一块在编译时未知大小的内存来存放内容，这些都是在程序运行时完成的：

首先向操作系统请求内存来存放 String 对象
在使用完成后，将内存释放，归还给操作系统
其中第一部分由 String::from 完成，它创建了一个全新的 String。

重点来了，到了第二部分，就是百家齐放的环节，在有垃圾回收 GC 的语言中，GC 来负责标记并清除这些不再使用的内存对象，这个过程都是自动完成，无需开发者关心，非常简单好用；但是在无 GC 的语言中，需要开发者手动去释放这些内存对象，就像创建对象需要通过编写代码来完成一样，未能正确释放对象造成的后果简直不可估量。

对于 Rust 而言，安全和性能是写到骨子里的核心特性，如果使用 GC，那么会牺牲性能；如果使用手动管理内存，那么会牺牲安全，这该怎么办？为此，Rust 的开发者想出了一个无比惊艳的办法：变量在离开作用域后，就自动释放其占用的内存：

```rust
{
    let s = String::from("hello"); // 从此处起，s 是有效的

    // 使用 s
}                                  // 此作用域已结束，
                                   // s 不再有效，内存被释放
```
与其它系统编程语言的 free 函数相同，Rust 也提供了一个释放内存的函数： drop，但是不同的是，其它语言要手动调用 free 来释放每一个变量占用的内存，而 Rust 则在变量离开作用域时，自动调用 drop 函数: 上面代码中，Rust 在结尾的 } 处自动调用 drop。

> 其实，在 C++ 中，也有这种概念: Resource Acquisition Is Initialization (RAII)。如果你使用过 RAII 模式的话应该对 Rust 的 drop 函数并不陌生。

这个模式对编写 Rust 代码的方式有着深远的影响，在后面章节我们会进行更深入的介绍。

## 1.5 🥥 元组
不多介绍，直接看示例即可：

```rust
fn main() {
    let s1 = String::from("hello");

    let (s2, len) = calculate_length(s1);

    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() 返回字符串的长度

    (s, length)
}
```

## 1.6 🧇 结构体


### 一般定义
结构体我个人认为，它与Go语言、c/cpp的结构体思想都差不多，那么就先用其他语言渐入佳境

C/C++语言结构体：C/C++语言中的结构体定义使用关键字 struct，并且使用花括号包含成员变量。

```rust
#include <stdio.h>

struct Person {
  char *name;
  int age;
};

int main() {
  struct Person p = {"John", 30};
  printf("Name: %s, Age: %d\n", p.name, p.age);
  return 0;
}
```

Go语言结构体：Go语言中的结构体定义使用关键字 type，并且使用花括号包含成员变量
```go
package main

import "fmt"

type Person struct {
  name string
  age  int
}

func main() {
  p := Person{"John", 30}
  fmt.Printf("Name: %s, Age: %d\n", p.name, p.age)
}
```

Rust结构体：Rust语言中的结构体定义使用关键字 struct，并且使用花括号包含成员变量，但是成员变量的定义使用了冒号和类型注解。

```rust
struct Person {
  name: String,
  age: u32,
}

fn main() {
  let p = Person { name: String::from("John"), age: 30 };
  println!("Name: {}, Age: {}", p.name, p.age);
}
```

### 结构体的内存排列
下面可以手打下下面的代码：

```rust
#[derive(Debug)]
struct File {
  name: String,
  data: Vec<u8>,
}

fn main() {
  let file = File {
    name: String::from("f1.txt"),
    data: Vec::new()
  };

  let file_name = file.name;
  let file_data_len = file.data.len();

  println!("{:?}", file);
   println!("{} is {} bytes long", file_name, file_data_len);
}
```
其实这段代码是错误的，在这段代码中，当你使用 let file_name = file.name; 和 let file_data_len = file.data.len(); 时，你将 file 的 name 和 data 字段的所有权移动到了 file_name 和 file_data_len 变量中。因此，当你尝试打印 file 变量时，它已经失去了 name 和 data 字段的所有权，导致编译错误。正好复习一下所有权

只要加上`&`即可，告诉Rust借我用下，用完还你：

```rust
let file_name = &file.name;
let file_data_len = file.data.len();
```
进入正题，上面定义的 File 结构体在内存中的排列如下图所示：
![](https://pic3.zhimg.com/80/v2-8cc4ed8cd06d60f974d06ca2199b8df5_1440w.png)
从图中可以清晰地看出 File 结构体两个字段 name 和 data 分别拥有底层两个 [u8] 数组的所有权(String 类型的底层也是 [u8] 数组)，通过 ptr 指针指向底层数组的内存地址，这里你可以把 ptr 指针理解为 Rust 中的引用类型。
> 关于 ptr 指针，它是一个指向底层数组内存地址的指针。在 Rust 中，引用类型也是指针类型，因此你可以将 ptr 指针理解为 Rust 中的引用类型。当你使用 & 符号来借用 name 字段时，实际上是创建了一个指向 name 字段底层数组内存地址的引用。这个引用不拥有底层数组的所有权，因此你可以在不移动所有权的情况下访问 name 字段。

该图片也侧面印证了：**把结构体中具有所有权的字段转移出去后，将无法再访问该字段，但是可以正常访问其它的字段。**

很抽象，非常抽象。上面这段话是我搬运了作者的话，但是个人来说不是很理解。经过研究我的理解是：File 结构体的 name 和 data 字段都是拥有底层 [u8] 数组的所有权的。在 Rust 中，String 类型的底层也是 [u8] 数组。因此，name 字段拥有 String 类型的底层 [u8] 数组的所有权，而 data 字段拥有 `Vec<u8>` 类型的底层 [u8] 数组的所有权。
即，在 Rust 中，所有权是一个非常重要的概念。当你将一个拥有所有权的值移动到另一个变量中时，原始变量将失去对该值的所有权。这意味着你不能再访问该值，因为它已经被移动到了其他地方。在这段代码中，当你将 file.name 和 file.data 的所有权移动到 file_name 和 file_data_len 变量中时，file 变量将失去对这些值的所有权。因此，你不能再访问 file.name 和 file.data 字段了。

我不信不能访问，所以我做了下面的实验：

```rust
fn main() {
  let file = File {
    name: String::from("f1.txt"),
    data: Vec::new()
  };

  let file_name = file.name;
  let file_data_len = file.data.len();

  println!("{}", file.name); // error: 转移了所有权
  println!("{}", file.data); // error: 转移了所有权

  println!("{:?}", file);
  println!("{} is {} bytes long", file_name, file_data_len);
}
```
果然报错了：

```
error[E0277]: `Vec<u8>` doesn't implement `std::fmt::Display`
  --> src/main.rs:17:18
   |
17 |   println!("{}", file.data);
   |                  ^^^^^^^^^ `Vec<u8>` cannot be formatted with the default formatter // 无法<u8>使用默认格式化程序格式化“Vec”
   |
   = help: the trait `std::fmt::Display` is not implemented for `Vec<u8>`
   = help：trait `std：：fmt：：Display`未为`Vec `实现<u8> 
   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
   = 注意：在格式化字符串中，您可以使用`{：？}` (or联系我们 for pretty-print）代替
   = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)
   = 注意：此错误源于宏`$crate：：format_args_nl`（在Nightly build中，使用-Z宏回溯运行以获取更多信息）
For more information about this error, try `rustc --explain E0277`.
error: could not compile `Demo` due to previous error
```



### 元组结构体(Tuple Struct)
看示例即可学习
```rust
#![allow(unused)]
fn main() {
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}

```


### 单元结构体(Unit-like Struct)
在Rust中，单元结构体（Unit-like Struct）是一种类似于元组结构体的结构体，但它不包含任何字段。具体来说，单元结构体的定义形式为：struct MyUnitStruct;，它不包含任何字段，也不需要任何语句作为结构体定义的主体。它的主要作用是在某些场景下提供一种空类型，用于表示某个操作或状态的存在或者不存在。

单元结构体的定义形式和普通结构体的定义形式非常类似，它也可以使用impl块来为它定义方法。在使用单元结构体时，通常只需要使用它的类型名即可，因为它不包含任何字段。

单元结构体在Rust中的主要作用是提供一种空类型，用于表示某个操作或状态的存在或者不存在，比如在某些函数中，可能需要传入一个参数，但实际上这个参数并不需要使用，这时可以使用单元结构体作为参数类型，表示这个操作需要传入一个参数，但实际上这个参数是没有用的。
```rust

#![allow(unused)]
fn main() {
	struct AlwaysEqual;
	
	let subject = AlwaysEqual;
	
	// 我们不关心 AlwaysEqual 的字段数据，只关心它的行为，因此将它声明为单元结构体，然后再为它实现某个特征
	impl SomeTrait for AlwaysEqual {
	
	}
}

```


### 结构体数据的所有权
在之前的 User 结构体的定义中，有一处细节：我们使用了自身拥有所有权的 String 类型而不是基于引用的 &str 字符串切片类型。这是一个有意而为之的选择：因为我们想要这个结构体拥有它所有的数据，而不是从其它地方借用数据。
你也可以让 User 结构体从其它对象借用数据，不过这么做，就需要引入生命周期(lifetimes)这个新概念（也是一个复杂的概念），简而言之，生命周期能确保结构体的作用范围要比它所借用的数据的作用范围要小。

总之，如果你想在结构体中使用一个引用，就必须加上生命周期，否则就会报错：

```rust
	struct User {
	    username: &str,
	    email: &str,
	    sign_in_count: u64,
	    active: bool,
	}
	
	fn main() {
	    let user1 = User {
	        email: "someone@example.com",
	        username: "someusername123",
	        active: true,
	        sign_in_count: 1,
	    };
	}

```


```
error[E0106]: missing lifetime specifier
 --> src/main.rs:2:15
  |
2 |     username: &str,
  |               ^ expected named lifetime parameter // 需要一个生命周期
  |
help: consider introducing a named lifetime parameter // 考虑像下面的代码这样引入一个生命周期
  |
1 ~ struct User<'a> {
2 ~     username: &'a str,
  |

error[E0106]: missing lifetime specifier
 --> src/main.rs:3:12
  |
3 |     email: &str,
  |            ^ expected named lifetime parameter
  |
help: consider introducing a named lifetime parameter
  |
1 ~ struct User<'a> {
2 |     username: &str,
3 ~     email: &'a str,
  |

```


### 使用 #[derive(Debug)] 来打印结构体的信息
在前面的代码中我们使用 #[derive(Debug)] 对结构体进行了标记，这样才能使用 println!("{:?}", s); 的方式对其进行打印输出，如果不加，看看会发生什么:

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {}", rect1);
}

```


```
error[E0277]: `Rectangle` doesn't implement `std::fmt::Display`
  --> src/main.rs:12:29
   |
12 |     println!("rect1 is {}", rect1);
   |                             ^^^^^ `Rectangle` cannot be formatted with the default formatter
   |
   = help: the trait `std::fmt::Display` is not implemented for `Rectangle`
   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
   = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)

For more information about this error, try `rustc --explain E0277`.
error: could not compile `Demo` due to previous error
```


#[derive(Debug)]是一个宏，它可以自动生成实现Debug trait的代码。Debug trait是一个用于调试的trait，它允许我们打印出结构体的内容，以便于调试程序。因此，每次打印结构体时，我们需要在结构体上加上#[derive(Debug)]，以便于使用println!宏打印出结构体的内容。
- 定义：`#[derive(Debug)]`
- 打印需要：`{:?}`

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}
```


还有一个简单的输出 debug 信息的方法，那就是使用 dbg! 宏，它会拿走表达式的所有权，然后打印出相应的文件名、行号等 debug 信息，当然还有我们需要的表达式的求值结果。除此之外，它最终还会把表达式值的所有权返回！
> dbg! 输出到标准错误输出 stderr，而 println! 输出到标准输出 stdout。

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
```



## 1.7 枚举
#### 枚举的一般写法

```rust
#[derive(Debug)]
enum Poker {
    Clubs,
    Spade,
    Diamonds,
    Hearts,
}

fn main() {
    let heart = Poker::Hearts;
    let diamonds = Poker::Diamonds;

    println!("{:?}", heart);
    println!("{:?}", diamonds);
}
```

学习到这里我感觉忽略了一个细节，我以为`#[derive(Debug)]`放到程序头就可以让每一个结构体打印，其实不然，可以看下面的程序：

```rust
#[derive(Debug)]
enum Poker {
    Clubs,
    Spade,
    Diamonds,
    Hearts,
}

struct PokerCard {
    suit: Poker,
    value: u8,
}

fn main() {
    let c1 = PokerCard {
       suit: Poker::Clubs,
       value: 1,
   };
   let c2 = PokerCard {
       suit: Poker::Diamonds,
       value: 12,
   };

    println!("{:?}", c1);
    println!("{:?}", c2);
}
```
运行以上程序会报错：

```
error[E0277]: `PokerCard` doesn't implement `Debug`
  --> src/main.rs:24:22
   |
24 |     println!("{:?}", c1);
   |                      ^^ `PokerCard` cannot be formatted using `{:?}`
   |
   = help: the trait `Debug` is not implemented for `PokerCard`
   = note: add `#[derive(Debug)]` to `PokerCard` or manually `impl Debug for PokerCard`
   = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider annotating `PokerCard` with `#[derive(Debug)]`
   |
9  | #[derive(Debug)]
   |

error[E0277]: `PokerCard` doesn't implement `Debug`
  --> src/main.rs:25:22
   |
25 |     println!("{:?}", c2);
   |                      ^^ `PokerCard` cannot be formatted using `{:?}`
   |
   = help: the trait `Debug` is not implemented for `PokerCard`
   = note: add `#[derive(Debug)]` to `PokerCard` or manually `impl Debug for PokerCard`
   = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider annotating `PokerCard` with `#[derive(Debug)]`
   |
9  | #[derive(Debug)]
   |

For more information about this error, try `rustc --explain E0277`.
error: could not compile `Demo` due to 2 previous errors
```
这就是理解上出现了错误，需要给每一个结构体加上`#[derive(Debug)]`才行

```rust
#[derive(Debug)]
enum Poker {
    Clubs,
    Spade,
    Diamonds,
    Hearts,
}

#[derive(Debug)]
struct PokerCard {
    suit: Poker,
    value: u8,
}
```

枚举再进阶一点就是：

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let m1 = Message::Quit;
    let m2 = Message::Move{x:1,y:1};
    let m3 = Message::ChangeColor(255,255,0);
}
```

#### 同一化类型
最后，再用一个实际项目中的简化片段，来结束枚举类型的语法学习。

例如我们有一个 WEB 服务，需要接受用户的长连接，假设连接有两种：TcpStream 和 TlsStream，但是我们希望对这两个连接的处理流程相同，也就是用同一个函数来处理这两个连接，代码如下：

```rust

#![allow(unused)]
fn main() {
fn new (stream: TcpStream) {
  let mut s = stream;
  if tls {
    s = negotiate_tls(stream)
  }

  // websocket是一个WebSocket<TcpStream>或者
  //   WebSocket<native_tls::TlsStream<TcpStream>>类型
  websocket = WebSocket::from_raw_socket(
    stream, ......)
}
}

```

此时，枚举类型就能帮上大忙：
```rust

#![allow(unused)]
fn main() {
enum Websocket {
  Tcp(Websocket<TcpStream>),
  Tls(Websocket<native_tls::TlsStream<TcpStream>>),
}
}

```



#### Option 枚举用于处理空值
Option 枚举包含两个成员，一个成员表示含有值：Some(T), 另一个表示没有值：None，定义如下：

```rust
enum Option<T> {
    Some(T),
    None,
}
```
其中 T 是泛型参数，Some(T)表示该枚举成员的数据类型是 T，换句话说，Some 可以包含任何类型的数据。\

```rust

fn main() {
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);

    println!("{:?}", five);
    println!("{:?}", six);
    println!("{:?}", none);
}

```


## 1.8 🔢 数组
rust的数组基本和JavaScript差不多，直接来一个综合例子：
- [0; 3]比较特殊，是[0, 0, 0]

```rust
fn main() {
  // 编译器自动推导出one的类型
  let one             = [1, 2, 3];
  // 显式类型标注
  let two: [u8; 3]    = [1, 2, 3];
  let blank1          = [0; 3];
  let blank2: [u8; 3] = [0; 3];

  // arrays是一个二维数组，其中每一个元素都是一个数组，元素类型是[u8; 3]
  let arrays: [[u8; 3]; 4]  = [one, two, blank1, blank2];

  // 借用arrays的元素用作循环中
  for a in &arrays {
    print!("{:?}: ", a);
    // 将a变成一个迭代器，用于循环
    // 你也可以直接用for n in a {}来进行循环
    for n in a.iter() {
      print!("\t{} + 10 = {}", n, n+10);
    }

    let mut sum = 0;
    // 0..a.len,是一个 Rust 的语法糖，其实就等于一个数组，元素是从0,1,2一直增加到到a.len-1
    for i in 0..a.len() {
      sum += a[i];
    }
    println!("\t({:?} = {})", a, sum);
  }
}
```
做个总结，数组虽然很简单，但是其实还是存在几个要注意的点：

- 数组类型容易跟数组切片混淆，`[T;n]`描述了一个数组的类型，而[T]描述了切片的类型， 因为切片是运行期的数据结构，它的长度无法在编译期得知，因此不能用`[T;n]`的形式去描述
- `[u8; 3]`和`[u8; 4]`是不同的类型，数组的长度也是类型的一部分
- 在实际开发中，使用最多的是数组切片[T]，我们往往通过引用的方式去使用`&[T]`，因为后者有固定的类型大小
至此，关于数据类型部分，我们已经全部学完了，对于 Rust 学习而言，我们也迈出了坚定的第一步，后面将开始更高级特性的学习。未来如果大家有疑惑需要检索知识，一样可以继续回顾过往的章节，因为本书不仅仅是一门 Rust 的教程，还是一本厚重的 Rust 工具书。

## 1.9 ⭕流程控制
其他都差不多，就这两个比较特殊。

### for循环
1.  for item in collection  转移所有权

2. for item in &collection 或者 for item in collection.iter()  不可变借用

3. for item in &mut collection 或者 for item in collection.iter_mut()  可变借用

### loop

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

## 1.10 💁‍♂️ 模式匹配
先展示一下Java17的Switch，就懂了：

```java
public class Main {
    public static void main(String[] args) {
        enum Color { RED, GREEN, BLUE }
        Color c = Color.RED;
        switch (c) {
            case RED -> System.out.println("RED");
            case GREEN -> System.out.println("GREEN");
            case BLUE -> System.out.println("BLUE");
            default -> System.out.println("UNKNOWN");
        }
    }
}

```
再来看Rust简单的例子：

```rust
fn main() {
    enum Color { Red, Green, Blue }
	let c = Color::Red;
	match c {
		Color::Red => println!("RED"),
		Color::Green => println!("GREEN"),
		Color::Blue => println!("BLUE"),
		_ => println!("UNKNOWN")
	}
}
```

另外还有一些额外的技能

### 使用 match 表达式赋值

```rust
enum IpAddr {
   Ipv4,
   Ipv6
}

fn main() {
    let ip1 = IpAddr::Ipv6;
    let ip_str = match ip1 {
        IpAddr::Ipv4 => "127.0.0.1",
        _ => "::1",
    };

    println!("{}", ip_str);
}

```

同理 Java17也能做到

```java
public class Main {
    enum IpAddr {
        Ipv4,
        Ipv6
    }

    public static void main(String[] args) {
        IpAddr ip1 = IpAddr.Ipv6;
        String ipStr = switch (ip1) {
            case Ipv4 -> "127.0.0.1";
            default -> "::1";
        };

        System.out.println(ipStr);
    }
}
```

### _ 通配符
通过将 _ 其放置于其他分支后，_ 将会匹配所有遗漏的值。() 表示返回单元类型与所有分支返回值的类型相同，所以当匹配到 _ 后，什么也不会发生。
```rust

#![allow(unused)]
fn main() {
let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    5 => println!("five"),
    7 => println!("seven"),
    _ => (),
}
}

```


### let if 进行匹配
当你只要匹配一个条件，且忽略其他条件时就用 if let ，否则都用 match。

```rust

#![allow(unused)]
fn main() {
if let Some(3) = v {
    println!("three");
}
}

```


### matches!宏
它可以将一个表达式跟模式进行匹配，然后返回匹配的结果 true or false。

```rust
#![allow(unused)]
fn main() {
let foo = 'f';
assert!(matches!(foo, 'A'..='Z' | 'a'..='z'));
println!("{}", matches!(foo, 'A'..='Z' | 'a'..='z')); // true

```


### 变量覆盖
无论是 match 还是 if let，他们都可以在模式匹配时覆盖掉老的值，绑定新的值:

```rust
fn main() {
   let age = Some(30);
   println!("在匹配前，age是{:?}",age);
   if let Some(age) = age {
       println!("匹配出来的age是{}",age);
   }

   println!("在匹配后，age是{:?}",age);
}
```

### 小结
本章的内容其实有很多被我删减了，而且有些我看的瞌睡都来了，因为我感觉有些内容Java也有，到时候项目用到再说具体可以看大大总结的：
> https://course.rs/basic/match-pattern/all-patterns.html


## 1.11 👨‍🔧 方法

Rust和其他语言的方法对比：
![](https://pica.zhimg.com/80/v2-0d848e960f3279999eab4b1317f6538e_1440w.png)

rust创建方法：
- `impl` 是实现 `implementation` 的缩写

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}

```
其实看到这里是十分疑惑的，尤其是和fn对比起来，下面我来总结下：
- impl块用于定义在特定类型上的方法。它R往往跟结构体、枚举、特征(Trait)一起使用。
- fn用于定义普通的全局或内部功能。它不依赖于任何特定类型。
- 简单来说，要实现结构体的函数就要使用impl，它这个实现和Go语言十分类似！

Go语言进行对比学习，将person赋予SayHello能力。与 Rust 的 impl 不同的是，Go 中的接收者类型可以是值类型或指针类型。如果接收者类型是值类型，则会将该值的副本传递给方法，而如果接收者类型是指针类型，则会将指向该值的指针传递给方法。这使得我们可以在方法中修改接收者的状态，并将这些更改保持在调用方法之后。

```go
type Person struct {
    Name string
    Age int
}

func (p Person) SayHello() {
    fmt.Printf("Hello, my name is %s and I am %d years old.\n", p.Name, p.Age)
}
```


函数

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

方法。至于这个self具体是什么东西，是否和Python的self一样，我将在下一节介绍。

```rust

struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}
fn main() {
    let p = Point {
        x: 12.0,
        y: 13.0,
    };
    let p2 = Point {
        x: 14.0,
        y: 15.0,
    };
    let ans = p.distance(&p2);
    println!("{}", ans);
}
```


### self、&self 和 &mut self
在一个 impl 块内，Self 指代被实现方法的结构体类型，self 指代此类型的实例，换句话说，self 指代的是结构体实例，这样的写法会让我们的代码简洁很多，而且非常便于理解：我们为哪个结构体实现方法，那么 self 就是指代哪个结构体的实例。
> 从而可以得出 >> 虽然 Rust 和 Python 是不同的编程语言，但它们在某些方面有相似之处。self 关键字在两种语言中都用于表示当前实例，使得我们可以在方法中访问和修改实例的属性和方法。

在Rust中，self是有所有权的概念的
- `self` 表示 结构体 的所有权转移到该方法中，这种形式用的较少
- `&self` 表示该方法对 结构体 的不可变借用
- `&mut self` 表示可变借用
总之，self 的使用就跟函数参数一样，要严格遵守 Rust 的所有权规则。

### 关联函数
参数中不包含 self 即可。在 impl 中且没有 self 的函数被称之为关联函数： 因为它没有 self，不能用 f.read() 的形式调用，因此它是一个函数而不是方法，它又在 impl 中，与结构体紧密关联，因此称为关联函数。

注意观察下面例子中的new

```rust
pub struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    pub fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }
    pub fn width(&self) -> u32 {
        return self.width;
    }
}

fn main() {
    let rect1 = Rectangle::new(30, 50);

    println!("{}", rect1.width());
}

```
> Rust 中有一个约定俗成的规则，使用 new 来作为构造器的名称，出于设计上的考虑，Rust 特地没有用 new 作为关键字。

因为是函数，所以不能用 . 的方式来调用，我们需要用 :: 来调用，例如 let sq = Rectangle::new(3, 3);。这个方法位于结构体的命名空间中：:: 语法用于关联函数和模块创建的命名空间。

### 多个 impl 定义
直接看例子即可

```rust

#![allow(unused)]
fn main() {
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
}

```

### 为枚举实现方法
枚举类型之所以强大，不仅仅在于它好用、可以**同一化类型**，还在于，我们可以像结构体一样，为枚举实现方法：

```rust
#![allow(unused)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        // 在这里定义方法体
    }
}

fn main() {
    let m = Message::Write(String::from("hello"));
    m.call();
}

```

## 1.12 🦜 泛型和特征
### 结构体中使用泛型
先上例子体验一下：
- 使用的时候需要在结构体名字后面加入`<T>`
```rust
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };

    println!("{:?}", integer);
    println!("{:?}", float);
}

```
此时的声明是x, y必须是一样的类型，如果要不一样的声明就要两种不同的泛型：

```rust
#[derive(Debug)]
struct Point<T,U> {
    x: T,
    y: U,
}

fn main() {
    let integer = Point { x: 5, y: 1.1 };
    let float = Point { x: 222, y: 3.0 };

    println!("{:?}", integer);
    println!("{:?}", float);
}
```

### 枚举中使用泛型
提到枚举类型，Option 永远是第一个应该被想起来的

```rust
enum Option<T> {
    Some(T),
    None,
}
```
`Option<T> `是一个拥有泛型 T 的枚举类型，它第一个成员是 Some(T)，存放了一个类型为 T 的值。得益于泛型的引入，我们可以在任何一个需要返回值的函数中，去使用 `Option<T> `枚举类型来做为返回值，用于返回一个任意类型的值 Some(T)，或者没有值 None。

### 方法中使用泛型
- 使用泛型参数前，依然需要提前声明：`impl<T>`

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}


```

### 为具体的泛型类型实现方法
不仅能定义基于 T 的方法，还能针对特定的具体类型，进行方法定义，例如f32：

```rust

#![allow(unused)]
fn main() {
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
}

```

### const 泛型（Rust 1.51 版本引入的重要特性）
@todo 

## 1.13 👨‍👩‍👧‍👦 集合
@todo
## 1.14 💱 生命周期
@todo
## 1.15 ❌ 返回值和错误类型
@todo
## 1.16 👜 包和模块
@todo