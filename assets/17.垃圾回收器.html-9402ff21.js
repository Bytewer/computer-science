const e=JSON.parse('{"key":"v-83c701fa","path":"/Java/jvm/part1/17.%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8.html","title":"垃圾回收器","lang":"zh-CN","frontmatter":{"order":17,"title":"垃圾回收器","category":["JVM"],"tag":["JVM上篇"],"description":"[TOC] 垃圾收集器没有在规范中进行过多的规定，可以由不同的厂商、不同版本的 JVM 来实现。; 由于 JDK 的版本处于高速迭代过程中，因此 Java 发展至今已经衍生了众多的 GC 版本。; 从不同角度分析垃圾收集器，可以将 GC 分为不同的类型。; Java 不同版本新特性 - 语法层面：Lambda 表达式、switch、自动拆箱装箱、enu...","head":[["meta",{"property":"og:url","content":"https://bytewer.github.io/computer-science/computer-science/Java/jvm/part1/17.%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"CSLN"}],["meta",{"property":"og:title","content":"垃圾回收器"}],["meta",{"property":"og:description","content":"[TOC] 垃圾收集器没有在规范中进行过多的规定，可以由不同的厂商、不同版本的 JVM 来实现。; 由于 JDK 的版本处于高速迭代过程中，因此 Java 发展至今已经衍生了众多的 GC 版本。; 从不同角度分析垃圾收集器，可以将 GC 分为不同的类型。; Java 不同版本新特性 - 语法层面：Lambda 表达式、switch、自动拆箱装箱、enu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://bytewer.github.io/computer-science/computer-science/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-02T07:04:16.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"垃圾回收器"}],["meta",{"property":"article:author","content":"zhiyu1998"}],["meta",{"property":"article:tag","content":"JVM上篇"}],["meta",{"property":"article:modified_time","content":"2023-07-02T07:04:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"垃圾回收器\\",\\"image\\":[\\"https://bytewer.github.io/computer-science/computer-science/\\"],\\"dateModified\\":\\"2023-07-02T07:04:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"zhiyu1998\\",\\"url\\":\\"https://github.com/zhiyu1998\\"}]}"]]},"headers":[{"level":2,"title":"垃圾收集器分类","slug":"垃圾收集器分类","link":"#垃圾收集器分类","children":[{"level":3,"title":"按线程数分","slug":"按线程数分","link":"#按线程数分","children":[]},{"level":3,"title":"按工作模式分","slug":"按工作模式分","link":"#按工作模式分","children":[]},{"level":3,"title":"按碎片处理方式分","slug":"按碎片处理方式分","link":"#按碎片处理方式分","children":[]},{"level":3,"title":"按工作的内存区间分","slug":"按工作的内存区间分","link":"#按工作的内存区间分","children":[]}]},{"level":2,"title":"评估 GC 的性能指标","slug":"评估-gc-的性能指标","link":"#评估-gc-的性能指标","children":[{"level":3,"title":"评估 GC 的性能指标：吞吐量（Throughput）","slug":"评估-gc-的性能指标-吞吐量-throughput","link":"#评估-gc-的性能指标-吞吐量-throughput","children":[]},{"level":3,"title":"评估 GC 的性能指标：暂停时间（pause time）","slug":"评估-gc-的性能指标-暂停时间-pause-time","link":"#评估-gc-的性能指标-暂停时间-pause-time","children":[]},{"level":3,"title":"吞吐量 vs 暂停时间","slug":"吞吐量-vs-暂停时间","link":"#吞吐量-vs-暂停时间","children":[]},{"level":3,"title":"垃圾回收器发展史","slug":"垃圾回收器发展史","link":"#垃圾回收器发展史","children":[]},{"level":3,"title":"7 款经典的垃圾收集器","slug":"_7-款经典的垃圾收集器","link":"#_7-款经典的垃圾收集器","children":[]},{"level":3,"title":"7 款经典收集器与垃圾分代之间的关系","slug":"_7-款经典收集器与垃圾分代之间的关系","link":"#_7-款经典收集器与垃圾分代之间的关系","children":[]},{"level":3,"title":"垃圾收集器的组合关系","slug":"垃圾收集器的组合关系","link":"#垃圾收集器的组合关系","children":[]},{"level":3,"title":"如何查看默认垃圾收集器","slug":"如何查看默认垃圾收集器","link":"#如何查看默认垃圾收集器","children":[]}]},{"level":2,"title":"CMS 收集器可以设置的参数","slug":"cms-收集器可以设置的参数","link":"#cms-收集器可以设置的参数","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]},{"level":2,"title":"JDK 后续版本中 CMS 的变化","slug":"jdk-后续版本中-cms-的变化","link":"#jdk-后续版本中-cms-的变化","children":[]},{"level":2,"title":"G1 特点","slug":"g1-特点","link":"#g1-特点","children":[]},{"level":2,"title":"G1 参数设置","slug":"g1-参数设置","link":"#g1-参数设置","children":[]},{"level":2,"title":"G1 常见操作步骤","slug":"g1-常见操作步骤","link":"#g1-常见操作步骤","children":[]},{"level":2,"title":"G1 使用场景","slug":"g1-使用场景","link":"#g1-使用场景","children":[]},{"level":2,"title":"分区 Region：化整为零","slug":"分区-region-化整为零","link":"#分区-region-化整为零","children":[]},{"level":2,"title":"G1 垃圾回收器的回收过程","slug":"g1-垃圾回收器的回收过程","link":"#g1-垃圾回收器的回收过程","children":[{"level":3,"title":"Remembered Set（记忆集）","slug":"remembered-set-记忆集","link":"#remembered-set-记忆集","children":[]},{"level":3,"title":"G1 回收过程一：年轻代 GC","slug":"g1-回收过程一-年轻代-gc","link":"#g1-回收过程一-年轻代-gc","children":[]},{"level":3,"title":"G1 回收过程二：并发标记过程（主要针对老年代）","slug":"g1-回收过程二-并发标记过程-主要针对老年代","link":"#g1-回收过程二-并发标记过程-主要针对老年代","children":[]},{"level":3,"title":"G1 回收过程三：混合回收","slug":"g1-回收过程三-混合回收","link":"#g1-回收过程三-混合回收","children":[]},{"level":3,"title":"G1 回收可选的过程四：Full GC","slug":"g1-回收可选的过程四-full-gc","link":"#g1-回收可选的过程四-full-gc","children":[]},{"level":3,"title":"G1 回收的优化建议","slug":"g1-回收的优化建议","link":"#g1-回收的优化建议","children":[]}]},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明","children":[{"level":3,"title":"verbose:gc","slug":"verbose-gc","link":"#verbose-gc","children":[]},{"level":3,"title":"PrintGCDetails","slug":"printgcdetails","link":"#printgcdetails","children":[]},{"level":3,"title":"PrintGCTimeStamps","slug":"printgctimestamps","link":"#printgctimestamps","children":[]},{"level":3,"title":"PrintGCDateStamps","slug":"printgcdatestamps","link":"#printgcdatestamps","children":[]}]},{"level":2,"title":"补充说明","slug":"补充说明","link":"#补充说明","children":[{"level":3,"title":"Minor GC日志","slug":"minor-gc日志","link":"#minor-gc日志","children":[]},{"level":3,"title":"Full GC日志","slug":"full-gc日志","link":"#full-gc日志","children":[]},{"level":3,"title":"代码说明","slug":"代码说明","link":"#代码说明","children":[]}]},{"level":2,"title":"日志分析工具","slug":"日志分析工具","link":"#日志分析工具","children":[]},{"level":2,"title":"Open JDK 12 的 Shenandoash GC","slug":"open-jdk-12-的-shenandoash-gc","link":"#open-jdk-12-的-shenandoash-gc","children":[]},{"level":2,"title":"令人震惊、革命性的 ZGC","slug":"令人震惊、革命性的-zgc","link":"#令人震惊、革命性的-zgc","children":[]},{"level":2,"title":"AliGC","slug":"aligc","link":"#aligc","children":[]}],"git":{"createdTime":1688281456000,"updatedTime":1688281456000,"contributors":[{"name":"RrOrange","email":"542716863@qq.com","commits":1}]},"readingTime":{"minutes":54.16,"words":16247},"filePathRelative":"Java/jvm/part1/17.垃圾回收器.md","localizedDate":"2023年7月2日","autoDesc":true,"excerpt":""}');export{e as data};
