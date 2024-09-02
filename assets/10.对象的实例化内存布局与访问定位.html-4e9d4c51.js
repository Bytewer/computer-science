import{_ as n,W as a,X as s,$ as e}from"./framework-c8643d23.js";const i="/computer-science/assets/14ed07d46d7505db51728d7a10b32f06-198ae796.webp",l="/computer-science/assets/96d0eac396519f43c0816c5c5fe29502-f36df985.webp",c="/computer-science/assets/image-20220228150130760-4a719be3.webp",t="/computer-science/assets/image-20220228143210637-15630774.webp",p="/computer-science/assets/6d29d2cf7b6fca46a62bab9aaf4aa5e6-5f0a8168.webp",o="/computer-science/assets/c62ff2fccdd6dd52d6b39e56277421a7-1335ebcb.webp",d="/computer-science/assets/271c8c8bfc0e45c138cef64f5ec55fac-a0b99e6b.webp",u="/computer-science/assets/86c5a7ffeeed61e3c084db3b6e8982eb-f450df69.webp",r={},m=e('<p>[TOC]</p><h1 id="对象的实例化" tabindex="-1"><a class="header-anchor" href="#对象的实例化" aria-hidden="true">#</a> 对象的实例化</h1><figure><img src="'+i+`" alt="第10章_对象的实例化" tabindex="0" loading="lazy"><figcaption>第10章_对象的实例化</figcaption></figure><h2 id="大厂面试题" tabindex="-1"><a class="header-anchor" href="#大厂面试题" aria-hidden="true">#</a> 大厂面试题</h2><blockquote><p>美团</p></blockquote><ol><li>对象在<code>JVM</code>中是怎么存储的？</li><li>对象头信息里面有哪些东西？</li></ol><blockquote><p>蚂蚁金服</p></blockquote><p>二面：<code>java</code>对象头里有什么?</p><h2 id="创建对象的方式" tabindex="-1"><a class="header-anchor" href="#创建对象的方式" aria-hidden="true">#</a> 创建对象的方式</h2><ul><li>new：最常见的方式、单例类中调用getInstance的静态类方法、XXXFactory的静态方法</li><li>Class的newInstance方法：反射的方式，在JDK9里面被标记为过时的方法，因为只能调用空参构造器，并且权限必须为 public</li><li>Constructor的newInstance(Xxxx)：反射的方式，可以调用空参或带参的构造器，权限没有要求</li><li>使用clone( )：不调用任何的构造器，要求当前的类需要实现Cloneable接口中的clone( )方法</li><li>使用反序列化：序列化一般用于Socket的网络传输</li><li>第三方库 Objenesis</li></ul><h2 id="创建对象的步骤" tabindex="-1"><a class="header-anchor" href="#创建对象的步骤" aria-hidden="true">#</a> 创建对象的步骤</h2><blockquote><p>从字节码的角度看待对象创建的过程</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObjectTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> object <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main( ) 方法对应的字节码（后面细讲）</p><ul><li>调用 new 指令后后，加载 Object 类</li><li>调用 Object 类的 init( ) 方法</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>         <span class="token number">0</span><span class="token punctuation">:</span> new           <span class="token comment">#2                  // class java/lang/Object</span>
         <span class="token number">3</span><span class="token punctuation">:</span> dup
         <span class="token number">4</span><span class="token punctuation">:</span> invokespecial <span class="token comment">#1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V</span>
         <span class="token number">7</span><span class="token punctuation">:</span> astore_1
         <span class="token number">8</span><span class="token punctuation">:</span> <span class="token keyword">return</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判断对象对应的类是否加载、链接、初始化" tabindex="-1"><a class="header-anchor" href="#判断对象对应的类是否加载、链接、初始化" aria-hidden="true">#</a> 判断对象对应的类是否加载、链接、初始化</h3><ul><li>虚拟机遇到一条new指令，首先去检查这个指令的参数能否在Metaspace的常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已经被加载，解析和初始化。（即判断类元信息是否存在）。</li><li>如果该类没有加载，那么在双亲委派模式下，使用当前类加载器以ClassLoader + 包名 + 类名为key进行查找对应的.class文件，如果没有找到文件，则抛出ClassNotFoundException异常，如果找到，则进行类加载，并生成对应的 Class 类对象。</li></ul><h3 id="为对象分配内存" tabindex="-1"><a class="header-anchor" href="#为对象分配内存" aria-hidden="true">#</a> 为对象分配内存</h3><p>首先计算对象占用空间的大小，接着在堆中划分一块内存给新对象。如果实例成员变量是引用变量，仅分配引用变量空间即可，即4个字节大小</p><p>如果内存规整：采用指针碰撞分配内存</p><ul><li>如果内存是规整的，那么虚拟机将采用的是指针碰撞法（Bump The Point）来为对象分配内存。</li><li>意思是所有用过的内存在一边，空闲的内存放另外一边，中间放着一个指针作为分界点的指示器，分配内存就仅仅是把指针往空闲内存那边挪动一段与对象大小相等的距离罢了。</li><li>如果垃圾收集器选择的是Serial ，ParNew这种基于压缩算法的，虚拟机采用这种分配方式。一般使用带Compact（整理）过程的收集器时，使用指针碰撞。</li><li>标记压缩（整理）算法会整理内存碎片，堆内存一存对象，另一边为空闲区域</li></ul><p>如果内存不规整</p><ul><li>如果内存不是规整的，已使用的内存和未使用的内存相互交错，那么虚拟机将采用的是空闲列表来为对象分配内存。</li><li>意思是虚拟机维护了一个列表，记录上哪些内存块是可用的，再分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的内容。这种分配方式成为了 “空闲列表（Free List）”</li><li>选择哪种分配方式由Java堆是否规整所决定，而Java堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定</li><li>标记清除算法清理过后的堆内存，就会存在很多内存碎片</li></ul><h3 id="处理并发安全问题" tabindex="-1"><a class="header-anchor" href="#处理并发安全问题" aria-hidden="true">#</a> 处理并发安全问题</h3><ul><li>采用CAS+失败重试、区域加锁保证更新的原子性</li><li>每个线程预先分配TLAB — 通过设置 -XX:+/-UseTLAB参数来设置（区域加锁机制）</li><li>在Eden区给每个线程分配一块区域</li></ul><h3 id="初始化分配到的空间" tabindex="-1"><a class="header-anchor" href="#初始化分配到的空间" aria-hidden="true">#</a> 初始化分配到的空间</h3><p>所有属性设置默认值，保证对象实例字段在不赋值时可以直接使用</p><h3 id="设置对象的对象头" tabindex="-1"><a class="header-anchor" href="#设置对象的对象头" aria-hidden="true">#</a> 设置对象的对象头</h3><p>将对象的所属类（即类的元数据信息）、对象的HashCode和对象的GC信息、锁信息等数据存储在对象的对象头中。这个过程的具体设置方式取决于JVM实现。</p><h3 id="执行init方法进行初始化" tabindex="-1"><a class="header-anchor" href="#执行init方法进行初始化" aria-hidden="true">#</a> 执行init方法进行初始化</h3><ul><li>在Java程序的视角看来，初始化才正式开始。初始化成员变量，执行实例化代码块，调用类的构造方法，并把堆内对象的首地址赋值给引用变量</li><li>因此一般来说（由字节码中跟随invokespecial指令所决定），new指令之后会接着就是执行init方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完成创建出来</li></ul><blockquote><p>从字节码角度看待init方法</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测试对象实例化的过程
 *  ① 加载类元信息 - ② 为对象分配内存 - ③ 处理并发问题  - ④ 属性的默认初始化（零值初始化）
 *  - ⑤ 设置对象头的信息 - ⑥ 属性的显式初始化、代码块中初始化、构造器中初始化
 *
 *  给对象的属性赋值的操作：
 *  ① 属性的默认初始化 - ② 显式初始化 / ③ 代码块中初始化 - ④ 构造器中初始化
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">1001</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">Account</span> acct<span class="token punctuation">;</span>

    <span class="token punctuation">{</span>
        name <span class="token operator">=</span> <span class="token string">&quot;匿名客户&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        acct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Account</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>init( ) 方法的字节码指令：</p><ul><li>属性的默认值初始化：<code>id = 1001;</code></li><li>显示初始化/代码块初始化：<code>name = &quot;匿名客户&quot;;</code></li><li>构造器初始化：<code>acct = new Account();</code></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> <span class="token number">0</span> aload_0
 <span class="token number">1</span> invokespecial <span class="token comment">#1 &lt;java/lang/Object.&lt;init&gt;&gt;</span>
 <span class="token number">4</span> aload_0
 <span class="token number">5</span> sipush <span class="token number">1001</span>
 <span class="token number">8</span> putfield <span class="token comment">#2 &lt;cn/sxt/java/Customer.id&gt;</span>
<span class="token number">11</span> aload_0
<span class="token number">12</span> ldc <span class="token comment">#3 &lt;匿名客户&gt;</span>
<span class="token number">14</span> putfield <span class="token comment">#4 &lt;cn/sxt/java/Customer.name&gt;</span>
<span class="token number">17</span> aload_0
<span class="token number">18</span> new <span class="token comment">#5 &lt;cn/sxt/java/Account&gt;</span>
<span class="token number">21</span> dup
<span class="token number">22</span> invokespecial <span class="token comment">#6 &lt;cn/sxt/java/Account.&lt;init&gt;&gt;</span>
<span class="token number">25</span> putfield <span class="token comment">#7 &lt;cn/sxt/java/Customer.acct&gt;</span>
<span class="token number">28</span> <span class="token keyword">return</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="对象的内存布局" tabindex="-1"><a class="header-anchor" href="#对象的内存布局" aria-hidden="true">#</a> 对象的内存布局</h1><figure><img src="`+l+`" alt="image-20201130114656340" tabindex="0" loading="lazy"><figcaption>image-20201130114656340</figcaption></figure><h2 id="对象头" tabindex="-1"><a class="header-anchor" href="#对象头" aria-hidden="true">#</a> 对象头</h2><p>对象头包含两部分：运行时元数据（Mark Word）和类型指针</p><ul><li><p>运行时元数据</p><ul><li>哈希值（HashCode），可以看作是堆中对象的地址</li><li>GC分代年龄（年龄计数器）</li><li>锁状态标志</li><li>线程持有的锁</li><li>偏向线程ID</li><li>偏向时间戳</li></ul></li><li><p>类型指针</p><ul><li>指向类元数据InstanceKlass，确定该对象所属的类型。指向的其实是方法区中存放的类元信息</li></ul></li></ul><p>说明：如果对象是数组，还需要记录数组的长度</p><h2 id="实例数据" tabindex="-1"><a class="header-anchor" href="#实例数据" aria-hidden="true">#</a> 实例数据</h2><ul><li>说明 <ul><li>它是对象真正存储的有效信息，包括程序代码中定义的各种类型的字段（包括从父类继承下来的和本身拥有的字段）</li></ul></li><li>规则 <ul><li>相同宽度的字段总是被分配在一起</li><li>父类中定义的变量会出现在子类之前（父类在子类之前加载）</li><li>如果CompactFields参数为true（默认为true）：子类的窄变量可以插入到父类变量的空隙</li></ul></li></ul><h2 id="对齐填充" tabindex="-1"><a class="header-anchor" href="#对齐填充" aria-hidden="true">#</a> 对齐填充</h2><p>不是必须的，也没特别含义，仅仅起到占位符的作用</p><h2 id="内存布局总结" tabindex="-1"><a class="header-anchor" href="#内存布局总结" aria-hidden="true">#</a> 内存布局总结</h2><blockquote><p>代码示例</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">1001</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">Account</span> acct<span class="token punctuation">;</span>

    <span class="token punctuation">{</span>
        name <span class="token operator">=</span> <span class="token string">&quot;匿名客户&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        acct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Customer</span> cust <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到代码中的局部变量表为</p><figure><img src="`+c+'" alt="image-20220228150130760" tabindex="0" loading="lazy"><figcaption>image-20220228150130760</figcaption></figure><figure><img src="'+t+'" alt="image-20220228143210637" tabindex="0" loading="lazy"><figcaption>image-20220228143210637</figcaption></figure><h1 id="对象的访问定位" tabindex="-1"><a class="header-anchor" href="#对象的访问定位" aria-hidden="true">#</a> 对象的访问定位</h1><blockquote><p>JVM是如何通过栈帧中的对象引用访问到其内部的对象实例呢？</p></blockquote><figure><img src="'+p+'" alt="image-20200709164149920" tabindex="0" loading="lazy"><figcaption>image-20200709164149920</figcaption></figure><figure><img src="'+o+'" alt="第10章_对象访问定位" tabindex="0" loading="lazy"><figcaption>第10章_对象访问定位</figcaption></figure><h2 id="句柄访问" tabindex="-1"><a class="header-anchor" href="#句柄访问" aria-hidden="true">#</a> 句柄访问</h2><ul><li>优点：reference中存储稳定句柄地址，对象被移动（垃圾收集时移动对象很普遍）时只会改变句柄中实例数据指针即可，reference本身不需要被修改</li><li>缺点：在堆空间中开辟了一块空间作为句柄池，句柄池本身也会占用空间；通过两次指针访问才能访问到堆中的对象，效率低</li></ul><figure><img src="'+d+'" alt="第10章_方式1：句柄访问" tabindex="0" loading="lazy"><figcaption>第10章_方式1：句柄访问</figcaption></figure><h2 id="直接指针-hotspot采用" tabindex="-1"><a class="header-anchor" href="#直接指针-hotspot采用" aria-hidden="true">#</a> 直接指针(HotSpot采用)</h2><ul><li>优点：直接指针是局部变量表中的引用，直接指向堆中的实例，在对象实例中有类型指针，指向的是方法区中的对象类型数据</li><li>缺点：对象被移动（垃圾收集时移动对象很普遍）时需要修改 reference 的值</li></ul><figure><img src="'+u+'" alt="第10章_方式2：使用直接指针访问" tabindex="0" loading="lazy"><figcaption>第10章_方式2：使用直接指针访问</figcaption></figure>',63),k=[m];function v(b,h){return a(),s("div",null,k)}const f=n(r,[["render",v],["__file","10.对象的实例化内存布局与访问定位.html.vue"]]);export{f as default};
