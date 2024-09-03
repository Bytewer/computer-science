const l=JSON.parse('{"key":"v-7030cf46","path":"/rust/basic.html","title":"Rust读书笔记-基础篇","lang":"zh-CN","frontmatter":{"order":1,"title":"Rust读书笔记-基础篇","category":["rust"],"description":"rest 感谢Rust语言圣经(Rust Course) (https://course.rs/about-book.html)，正如书中所说在学习 Rust 的同时你会收获很多语言之外的知识，因此 Rust 在入门阶段比很多编程语言要更难，但是一旦入门，你将收获一个全新的自己，成为一个更加优秀的程序员。 要学好 Rust，你需要深入理解内存、堆栈、引...","head":[["meta",{"property":"og:url","content":"https://bytewer.github.io/computer-science/computer-science/rust/basic.html"}],["meta",{"property":"og:site_name","content":"CSLN"}],["meta",{"property":"og:title","content":"Rust读书笔记-基础篇"}],["meta",{"property":"og:description","content":"rest 感谢Rust语言圣经(Rust Course) (https://course.rs/about-book.html)，正如书中所说在学习 Rust 的同时你会收获很多语言之外的知识，因此 Rust 在入门阶段比很多编程语言要更难，但是一旦入门，你将收获一个全新的自己，成为一个更加优秀的程序员。 要学好 Rust，你需要深入理解内存、堆栈、引..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-14T14:04:07.000Z"}],["meta",{"property":"article:author","content":"zhiyu1998"}],["meta",{"property":"article:modified_time","content":"2023-05-14T14:04:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Rust读书笔记-基础篇\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-14T14:04:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"zhiyu1998\\",\\"url\\":\\"https://github.com/zhiyu1998\\"}]}"]]},"headers":[{"level":2,"title":"🥳 安装rust","slug":"🥳-安装rust","link":"#🥳-安装rust","children":[{"level":3,"title":"Mac","slug":"mac","link":"#mac","children":[]},{"level":3,"title":"Win","slug":"win","link":"#win","children":[]},{"level":3,"title":"😎推荐 在线练习","slug":"😎推荐-在线练习","link":"#😎推荐-在线练习","children":[]}]},{"level":2,"title":"1.1 🤪 Hello Rust","slug":"_1-1-🤪-hello-rust","link":"#_1-1-🤪-hello-rust","children":[]},{"level":2,"title":"1.2 👀 变量","slug":"_1-2-👀-变量","link":"#_1-2-👀-变量","children":[{"level":3,"title":"😉常规定义","slug":"😉常规定义","link":"#😉常规定义","children":[]},{"level":3,"title":"⛔不要警告我","slug":"⛔不要警告我","link":"#⛔不要警告我","children":[]},{"level":3,"title":"变量的解构","slug":"变量的解构","link":"#变量的解构","children":[]},{"level":3,"title":"解构式赋值","slug":"解构式赋值","link":"#解构式赋值","children":[]},{"level":3,"title":"变量遮蔽","slug":"变量遮蔽","link":"#变量遮蔽","children":[]}]},{"level":2,"title":"1.3 🚗 所有权 & 🚌 借用","slug":"_1-3-🚗-所有权-🚌-借用","link":"#_1-3-🚗-所有权-🚌-借用","children":[{"level":3,"title":"1.3.1🚗 所有权","slug":"_1-3-1🚗-所有权","link":"#_1-3-1🚗-所有权","children":[]},{"level":3,"title":"1.3.2 🚌 借用","slug":"_1-3-2-🚌-借用","link":"#_1-3-2-🚌-借用","children":[]}]},{"level":2,"title":"1.4 🗛 字符串","slug":"_1-4-🗛-字符串","link":"#_1-4-🗛-字符串","children":[{"level":3,"title":"切片(slice)","slug":"切片-slice","link":"#切片-slice","children":[]},{"level":3,"title":"字符串字面量是切片","slug":"字符串字面量是切片","link":"#字符串字面量是切片","children":[]},{"level":3,"title":"字符串类型","slug":"字符串类型","link":"#字符串类型","children":[]},{"level":3,"title":"String 与 &str 的转换","slug":"string-与-str-的转换","link":"#string-与-str-的转换","children":[]},{"level":3,"title":"字符串索引","slug":"字符串索引","link":"#字符串索引","children":[]},{"level":3,"title":"字符串的一些常用API","slug":"字符串的一些常用api","link":"#字符串的一些常用api","children":[]},{"level":3,"title":"操作 UTF-8 字符串","slug":"操作-utf-8-字符串","link":"#操作-utf-8-字符串","children":[]},{"level":3,"title":"字符串深度剖析","slug":"字符串深度剖析","link":"#字符串深度剖析","children":[]}]},{"level":2,"title":"1.5 🥥 元组","slug":"_1-5-🥥-元组","link":"#_1-5-🥥-元组","children":[]},{"level":2,"title":"1.6 🧇 结构体","slug":"_1-6-🧇-结构体","link":"#_1-6-🧇-结构体","children":[{"level":3,"title":"一般定义","slug":"一般定义","link":"#一般定义","children":[]},{"level":3,"title":"结构体的内存排列","slug":"结构体的内存排列","link":"#结构体的内存排列","children":[]},{"level":3,"title":"元组结构体(Tuple Struct)","slug":"元组结构体-tuple-struct","link":"#元组结构体-tuple-struct","children":[]},{"level":3,"title":"单元结构体(Unit-like Struct)","slug":"单元结构体-unit-like-struct","link":"#单元结构体-unit-like-struct","children":[]},{"level":3,"title":"结构体数据的所有权","slug":"结构体数据的所有权","link":"#结构体数据的所有权","children":[]},{"level":3,"title":"使用 #[derive(Debug)] 来打印结构体的信息","slug":"使用-derive-debug-来打印结构体的信息","link":"#使用-derive-debug-来打印结构体的信息","children":[]}]},{"level":2,"title":"1.7 枚举","slug":"_1-7-枚举","link":"#_1-7-枚举","children":[]},{"level":2,"title":"1.8 🔢 数组","slug":"_1-8-🔢-数组","link":"#_1-8-🔢-数组","children":[]},{"level":2,"title":"1.9 ⭕流程控制","slug":"_1-9-⭕流程控制","link":"#_1-9-⭕流程控制","children":[{"level":3,"title":"for循环","slug":"for循环","link":"#for循环","children":[]},{"level":3,"title":"loop","slug":"loop","link":"#loop","children":[]}]},{"level":2,"title":"1.10 💁‍♂️ 模式匹配","slug":"_1-10-💁‍♂️-模式匹配","link":"#_1-10-💁‍♂️-模式匹配","children":[{"level":3,"title":"使用 match 表达式赋值","slug":"使用-match-表达式赋值","link":"#使用-match-表达式赋值","children":[]},{"level":3,"title":"_ 通配符","slug":"通配符","link":"#通配符","children":[]},{"level":3,"title":"let if 进行匹配","slug":"let-if-进行匹配","link":"#let-if-进行匹配","children":[]},{"level":3,"title":"matches!宏","slug":"matches-宏","link":"#matches-宏","children":[]},{"level":3,"title":"变量覆盖","slug":"变量覆盖","link":"#变量覆盖","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]}]},{"level":2,"title":"1.11 👨‍🔧 方法","slug":"_1-11-👨‍🔧-方法","link":"#_1-11-👨‍🔧-方法","children":[{"level":3,"title":"self、&self 和 &mut self","slug":"self、-self-和-mut-self","link":"#self、-self-和-mut-self","children":[]},{"level":3,"title":"关联函数","slug":"关联函数","link":"#关联函数","children":[]},{"level":3,"title":"多个 impl 定义","slug":"多个-impl-定义","link":"#多个-impl-定义","children":[]},{"level":3,"title":"为枚举实现方法","slug":"为枚举实现方法","link":"#为枚举实现方法","children":[]}]},{"level":2,"title":"1.121 🦜 泛型","slug":"_1-121-🦜-泛型","link":"#_1-121-🦜-泛型","children":[{"level":3,"title":"结构体中使用泛型","slug":"结构体中使用泛型","link":"#结构体中使用泛型","children":[]},{"level":3,"title":"枚举中使用泛型","slug":"枚举中使用泛型","link":"#枚举中使用泛型","children":[]},{"level":3,"title":"方法中使用泛型","slug":"方法中使用泛型","link":"#方法中使用泛型","children":[]},{"level":3,"title":"为具体的泛型类型实现方法","slug":"为具体的泛型类型实现方法","link":"#为具体的泛型类型实现方法","children":[]},{"level":3,"title":"const 泛型（Rust 1.51 版本引入的重要特性）","slug":"const-泛型-rust-1-51-版本引入的重要特性","link":"#const-泛型-rust-1-51-版本引入的重要特性","children":[]},{"level":3,"title":"泛型的效率 （单态化）","slug":"泛型的效率-单态化","link":"#泛型的效率-单态化","children":[]}]},{"level":2,"title":"1.122 🥒 特征 Trait","slug":"_1-122-🥒-特征-trait","link":"#_1-122-🥒-特征-trait","children":[{"level":3,"title":"孤儿规则（Orphan Rule）","slug":"孤儿规则-orphan-rule","link":"#孤儿规则-orphan-rule","children":[]},{"level":3,"title":"默认方法","slug":"默认方法","link":"#默认方法","children":[]},{"level":3,"title":"使用特征作为函数参数","slug":"使用特征作为函数参数","link":"#使用特征作为函数参数","children":[]},{"level":3,"title":"特征约束(trait bound)","slug":"特征约束-trait-bound","link":"#特征约束-trait-bound","children":[]},{"level":3,"title":"多重约束","slug":"多重约束","link":"#多重约束","children":[]},{"level":3,"title":"where约束","slug":"where约束","link":"#where约束","children":[]},{"level":3,"title":"使用特征约束有条件地实现方法或特征","slug":"使用特征约束有条件地实现方法或特征","link":"#使用特征约束有条件地实现方法或特征","children":[]},{"level":3,"title":"函数返回中的 impl Trait","slug":"函数返回中的-impl-trait","link":"#函数返回中的-impl-trait","children":[]},{"level":3,"title":"修复上一节中的 largest 函数","slug":"修复上一节中的-largest-函数","link":"#修复上一节中的-largest-函数","children":[]},{"level":3,"title":"通过 derive 派生特征","slug":"通过-derive-派生特征","link":"#通过-derive-派生特征","children":[]},{"level":3,"title":"调用方法需要引入特征","slug":"调用方法需要引入特征","link":"#调用方法需要引入特征","children":[]},{"level":3,"title":"✨ 特征对象","slug":"✨-特征对象","link":"#✨-特征对象","children":[]},{"level":3,"title":"特征对象的动态分发","slug":"特征对象的动态分发","link":"#特征对象的动态分发","children":[]},{"level":3,"title":"Self 与 self","slug":"self-与-self","link":"#self-与-self","children":[]},{"level":3,"title":"特征对象的限制","slug":"特征对象的限制","link":"#特征对象的限制","children":[]},{"level":3,"title":"关联类型","slug":"关联类型","link":"#关联类型","children":[]},{"level":3,"title":"默认泛型类型参数","slug":"默认泛型类型参数","link":"#默认泛型类型参数","children":[]},{"level":3,"title":"调用同名的方法","slug":"调用同名的方法","link":"#调用同名的方法","children":[]},{"level":3,"title":"特征定义中的特征约束","slug":"特征定义中的特征约束","link":"#特征定义中的特征约束","children":[]},{"level":3,"title":"在外部类型上实现外部特征 (newtype)","slug":"在外部类型上实现外部特征-newtype","link":"#在外部类型上实现外部特征-newtype","children":[]}]},{"level":2,"title":"1.13 👨‍👩‍👧‍👦 集合","slug":"_1-13-👨‍👩‍👧‍👦-集合","link":"#_1-13-👨‍👩‍👧‍👦-集合","children":[{"level":3,"title":"动态数组 Vector","slug":"动态数组-vector","link":"#动态数组-vector","children":[]},{"level":3,"title":"KV 存储 HashMap","slug":"kv-存储-hashmap","link":"#kv-存储-hashmap","children":[]}]},{"level":2,"title":"1.14 💱 生命周期","slug":"_1-14-💱-生命周期","link":"#_1-14-💱-生命周期","children":[{"level":3,"title":"悬垂指针和生命周期","slug":"悬垂指针和生命周期","link":"#悬垂指针和生命周期","children":[]},{"level":3,"title":"借用检查","slug":"借用检查","link":"#借用检查","children":[]},{"level":3,"title":"函数中的生命周期","slug":"函数中的生命周期","link":"#函数中的生命周期","children":[]},{"level":3,"title":"生命周期标注语法","slug":"生命周期标注语法","link":"#生命周期标注语法","children":[]},{"level":3,"title":"结构体中的生命周期","slug":"结构体中的生命周期","link":"#结构体中的生命周期","children":[]},{"level":3,"title":"生命周期消除","slug":"生命周期消除","link":"#生命周期消除","children":[]},{"level":3,"title":"方法中的生命周期","slug":"方法中的生命周期","link":"#方法中的生命周期","children":[]},{"level":3,"title":"静态生命周期","slug":"静态生命周期","link":"#静态生命周期","children":[]},{"level":3,"title":"一个复杂例子: 泛型、特征约束","slug":"一个复杂例子-泛型、特征约束","link":"#一个复杂例子-泛型、特征约束","children":[]}]},{"level":2,"title":"1.15 ❌ 返回值和错误类型","slug":"_1-15-❌-返回值和错误类型","link":"#_1-15-❌-返回值和错误类型","children":[]},{"level":2,"title":"1.16 👜 包和模块","slug":"_1-16-👜-包和模块","link":"#_1-16-👜-包和模块","children":[]}],"git":{"createdTime":1683454233000,"updatedTime":1684073047000,"contributors":[{"name":"RrOrange","email":"542716863@qq.com","commits":2}]},"readingTime":{"minutes":142.34,"words":42702},"filePathRelative":"rust/basic.md","localizedDate":"2023年5月7日","autoDesc":true,"excerpt":""}');export{l as data};
