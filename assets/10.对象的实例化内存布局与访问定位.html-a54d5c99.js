const e=JSON.parse('{"key":"v-7bc3aea2","path":"/Java/jvm/part1/10.%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%8C%96%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80%E4%B8%8E%E8%AE%BF%E9%97%AE%E5%AE%9A%E4%BD%8D.html","title":"对象的实例化","lang":"zh-CN","frontmatter":{"order":10,"title":"对象的实例化","category":["JVM"],"tag":["JVM上篇"],"description":"[TOC] 第10章_对象的实例化 大厂面试题 美团 1. 对象在JVM中是怎么存储的？ 2. 对象头信息里面有哪些东西？ 蚂蚁金服 二面：java对象头里有什么? 创建对象的方式 new：最常见的方式、单例类中调用getInstance的静态类方法、XXXFactory的静态方法; Class的newInstance方法：反射的方式，在JDK9里面被...","head":[["meta",{"property":"og:url","content":"https://zhiyu1998.github.io/Computer-Science-Learn-Notes/computer-science/Java/jvm/part1/10.%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%8C%96%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80%E4%B8%8E%E8%AE%BF%E9%97%AE%E5%AE%9A%E4%BD%8D.html"}],["meta",{"property":"og:site_name","content":"CSLN"}],["meta",{"property":"og:title","content":"对象的实例化"}],["meta",{"property":"og:description","content":"[TOC] 第10章_对象的实例化 大厂面试题 美团 1. 对象在JVM中是怎么存储的？ 2. 对象头信息里面有哪些东西？ 蚂蚁金服 二面：java对象头里有什么? 创建对象的方式 new：最常见的方式、单例类中调用getInstance的静态类方法、XXXFactory的静态方法; Class的newInstance方法：反射的方式，在JDK9里面被..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://zhiyu1998.github.io/Computer-Science-Learn-Notes/computer-science/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-02T07:02:59.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"对象的实例化"}],["meta",{"property":"article:author","content":"zhiyu1998"}],["meta",{"property":"article:tag","content":"JVM上篇"}],["meta",{"property":"article:modified_time","content":"2023-07-02T07:02:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"对象的实例化\\",\\"image\\":[\\"https://zhiyu1998.github.io/Computer-Science-Learn-Notes/computer-science/\\"],\\"dateModified\\":\\"2023-07-02T07:02:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"zhiyu1998\\",\\"url\\":\\"https://github.com/zhiyu1998\\"}]}"]]},"headers":[{"level":2,"title":"大厂面试题","slug":"大厂面试题","link":"#大厂面试题","children":[]},{"level":2,"title":"创建对象的方式","slug":"创建对象的方式","link":"#创建对象的方式","children":[]},{"level":2,"title":"创建对象的步骤","slug":"创建对象的步骤","link":"#创建对象的步骤","children":[{"level":3,"title":"判断对象对应的类是否加载、链接、初始化","slug":"判断对象对应的类是否加载、链接、初始化","link":"#判断对象对应的类是否加载、链接、初始化","children":[]},{"level":3,"title":"为对象分配内存","slug":"为对象分配内存","link":"#为对象分配内存","children":[]},{"level":3,"title":"处理并发安全问题","slug":"处理并发安全问题","link":"#处理并发安全问题","children":[]},{"level":3,"title":"初始化分配到的空间","slug":"初始化分配到的空间","link":"#初始化分配到的空间","children":[]},{"level":3,"title":"设置对象的对象头","slug":"设置对象的对象头","link":"#设置对象的对象头","children":[]},{"level":3,"title":"执行init方法进行初始化","slug":"执行init方法进行初始化","link":"#执行init方法进行初始化","children":[]}]},{"level":2,"title":"对象头","slug":"对象头","link":"#对象头","children":[]},{"level":2,"title":"实例数据","slug":"实例数据","link":"#实例数据","children":[]},{"level":2,"title":"对齐填充","slug":"对齐填充","link":"#对齐填充","children":[]},{"level":2,"title":"内存布局总结","slug":"内存布局总结","link":"#内存布局总结","children":[]},{"level":2,"title":"句柄访问","slug":"句柄访问","link":"#句柄访问","children":[]},{"level":2,"title":"直接指针(HotSpot采用)","slug":"直接指针-hotspot采用","link":"#直接指针-hotspot采用","children":[]}],"git":{"createdTime":1680621124000,"updatedTime":1688281379000,"contributors":[{"name":"RrOrange","email":"542716863@qq.com","commits":2}]},"readingTime":{"minutes":7.19,"words":2157},"filePathRelative":"Java/jvm/part1/10.对象的实例化内存布局与访问定位.md","localizedDate":"2023年4月4日","autoDesc":true,"excerpt":""}');export{e as data};
