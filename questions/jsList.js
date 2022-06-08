let jsList = [
    {
        question:`
        1.数据类型有哪些(共8个)?
        `,
        answer:`
        Boolean,Null,Undefined,Number,Bigint,String,Symbol,Object
        `
    },
    {
        question:`
        2.什么是作用域?作用域链的作用?
        `,
        answer:`
        作用域:变量或者函数的执行范围<br/>作用域链:使用一个变量时,先从当前作用域寻找,如果找到了直接使用;如果没找到去外层作用域寻找,如果还没找到
        继续去外层作用域寻找,直到找到全局作用域,还没找到的话变量undefined
        `
    },
    {
        question:`
        3.基本数据类型和引用数据类型的存储方式?
        `,
        answer:`
        基本数据类型(值类型):存储在栈<br/>
        引用数据类型:变量名存储在栈中,值存储在堆中
        `
    },
    {
        question:`
        4.怎么实现继承?
        `,
        answer:`
        ES6之前:使用call方法借用构造函数继承属性,使用原型继承方法<br/>
        ES6:使用extends关键字继承
        `
    },
    {
        question:`
        5.闭包是什么?作用?
        `,
        answer:`
        闭包形成的条件:1.函数嵌套2.内部函数可以获取外部函数的数据 内部函数我们称为闭包<br/>
        作用:延长变量的生命周期 缓存数据<br/>
        缺点:内存(变量)不释放 如何解决:给闭包设置为null
        `
    },
    {
        question:`
        6.深拷贝和浅拷贝是什么?怎么实现深和浅拷贝?
        `,
        answer:`
        拷贝是指新建一个对象复制原来对象的属性和值,浅拷贝:修改新对象的属性原来对象的属性也会变化;深拷贝:修改新
        对象的属性原来的对象属性不会变化<br/>
        <br/>
        实现浅拷贝的方法:<br/>
        1.Object.assign()<br/>
        2.es6使用扩展运算符...对象浅拷贝{...person}<br/>
        3.数组浅拷贝方法:concat<br/>
        <br/>
        实现深拷贝的方法:<br/>
        1.for循环递归可以实现深拷贝<br/>
        2.使用JSON.parse()和JSON.stringify()实现深拷贝<br/>
        3.使用第三方库loadash可以实现深拷贝<br/>
        `
    },
    {
        question:`
        7.promise是什么?promise作用?await async是什么?作用呢?
        `,
        answer:`
        promise是异步编程的一种解决方案,在js中,异步编程主要有三种方式:
        异步回调函数,promise,async/await,在es6之前js异步编程用的是异步的回调函数,回调函数实现异步存在一个问题,当嵌套过多时会产生 "回调地狱",
        代码非常难读懂,为了解决"回调地狱"问题,es6推出了promise,promise使用链式编程(链式调用)彻底解决了回调函数嵌套过深的问题,
        但是promise代码仍然不够直观,多次异步操作不能够像同步代码那样垂直，顺序书写。
        第二次以及多次的异步操作需要放到then后的回调函数内进行操作,为了解决这个问题,js异步编程的终极解决方案async/await在es7版本诞生了,
        它使用垂直同步书写代码的方式,实现了异步的功能,代码直观易懂!(背下来,js面试究极重点!)<br/>
        async foo(){<br/>
        let a = await foo1();<br/>
        let b = await foo2();<br/>
        let c = await foo3();<br/>
        } 
        `
    },
    {
        question:`
        8.说说事件循环机制(event loop)?
        `,
        answer:`
        js引擎是单线程的,同一时间只能执行一个任务,同步任务在主线程中进行,
        异步任务放到任务队列中,所有同步任务执行完才会去读取执行异步任务队列中的任务.
        异步任务又分为宏任务和微任务,微任务的优先级高于宏任务,
        常见的宏任务有dom事件回调函数,ajax回调函数,定时器回调函数,
        常见的微任务主要是promise中then的成功和失败回调.(背下来,js面试究极重点!)
        `
    },
    {
        question:`
        9.原型的作用?说说原型链?
        `,
        answer:`
        原型本质就是一个对象,构造函数有一个属性prototype指向原型对象,
        构造函数的实例对象都有一个属性__proto__也指向原型对象,
        因为所有实例的原型相同,所以可以利用原型对象让实例 共享属性和方法.<br>
        <br>
        原型链:每个对象都有__proto__属性，当我们访问一个对象的属性或方法时，如果对象本身有这个属性则直接使用，如果这个对象内部不存在这个属性或方法，那么他就会去原型对象__proto__里找这个属性，这个原型对象__proto__又会有自己的原型对象__proto__，于是就这样 一直找下去,直到找到Object.property.__proto__,如果还没找到返回null 
        `
    },
    
    {
        question:`
        10.开发项目时,你们是如何从后端(服务端)获取数据的?
        `,
        answer:`
        使用http协议,主要使用了get和post请求方式从服务端获取数据.
        `
    },
    {
        question:`
        11.get请求和post请求有什么区别?
        `,
        answer:`
        1.get请求可以缓存,post不可以;<br/>
        2.get请求的url有长度限制,post没有.
        `
    },
    {
        question:`
        12.从服务端(后端)获取的数据是什么格式的?
        `,
        answer:`
        JSON(遇到问请求数据的格式这一块一定是JSON)
        `
    },
    {
        question:`
        13.你们发送get和post请求是使用什么库实现的?有做二次封装吗?
        `,
        answer:`
        我们使用axios去发送请求.对axios有做封装,
        主要是利用js的异步解决方案async/await结合promise去封装axios的请求,
        获取到请求数据后,根据后端给的状态码去判断接口是否请求成功,
        比如说,前端和后端协商好状态码状态,1表示成功,0表示失败,
        那么当状态码是1时我们就去执行成功的操作,状态码是0时,就将后端给的错误信息用弹窗弹出来给用户提示.
        `
    },
    {
        question:`
        14.ajax是什么?
        `,
        answer:`
        ajax是一种网页局部刷新的技术.请求数据的时候如果不用ajax会刷新整个页面,
        用户体验比较差,而使用ajax则可以实现页面的局部刷新,提升了用户体验.
        `
    },
    
    {
        question:`
        15.箭头函数和普通函数的区别?
        `,
        answer:`
        1.this指向不同 普通函数this指向直接调用它们的对象;箭头函数
        本身没有this,它的this和外层作用域的this指向相同<br />
        2.箭头函数都是匿名函数,普通函数可匿名可具名<br />
        3.箭头函数不能用于构造函数
        `
    },
    {
        question:`
        16.this指向问题?
        `,
        answer:`
        一般的函数中:<br/>
        this指向那个直接调用它的对象<br/>
          1.构造函数中this指向实例对象<br/>
          2.原型对象方法中this指向实例对象<br/>
          3.回调函数中this指向window<br/>
          4.普通的函数中this指向window<br/>
        <br/>
        箭头函数中:<br/>
        箭头函数本身没有this,它的this和外层作用域的this指向相同
        `
    },
    {
        question:`
        17.数组常用方法有哪些?
        `,
        answer:`
        push:在数组末尾添加一个元素<br/>
        pop:删除数组最后一个元素<br/>
        unshift:在数组头部添加一个元素<br/>
        shift:删除数组头部的第一个元素<br/>
        splice:可以用来删除指定位置的元素
        `
    },
    {
        question:`
        18.es6有哪些新的功能?
        `,
        answer:`
        let const 变量结构赋值 模板字符串 扩展运算符
        promise class 箭头函数
        `
    },
    {
        question:`
        19.let const var的区别?
        `,
        answer:`
        let和var的区别:<br/>
          1.let不存在变量提升<br/>
          2.let不允许重复定义<br/>
          3.let定义的变量只能在块级作用域中使用<br/>
          <br/>
        let和const的异同:<br/>
          const和let很多特性一样,不存在变量提升,不允许重复定义,
          定义的变量只能在块级作用域中使用<br/>
          但是const定义的是只读的常量,一般不允许改变.
        `
    },
    {
        question:`
        20.set和map的区别?
        `,
        answer:`
        set类似数组但是它没有重复的元素<br/>
        map类似对象但是它的键不局限于字符串,可以用各种
        类型的值(包括对象)做key
        `
    },
    {
        question:`
         21.什么是跨域,如何解决跨域问题?
        `,
        answer:`
        一个域名请求另一个域名的资源时,协议,域名,端口任何一个
        不同都会形成跨域,跨域的原因是浏览器的同源策略<br>
        <br>
        解决跨域的方法:<br/>
        1.jsonp,原理是script标签不受同源策略限制<br/>
        2.服务端使用cors<br/>
        3. 在前端的工程化项目(webpack)中,
        我们可以通过配置devserver的proxy来解决跨域访问的问题。
        他的原理是在本地开启一个服务器向数据服务器发送请求，
        因为服务器和服务器之间是没有跨域<br/>
        4.但是因为webpack的devserver只在开发环境下有效，
        当项目发布上线之后仍然会有跨域问题，为了解决项目上线的跨域问题，
        我们配置服务器的反向代理（Apache读作阿帕奇）来实现跨域请求
        `
    },
    {
        question:`
        22.从输入一个 URL 地址到浏览器完成渲染的整个过程?
        `,
        answer:`
        1.输入url首先会进行dns域名解析<br/>
        2.建立tcp连接,发起tcp三次握手<br/>
        3.发送http请求<br/>
        4.服务器处理请求,并返回响应结果<br/>
        5.关闭tcp连接<br/>
        6.浏览器解析并渲染页面
        `
    },
    {
        question:`
        23.sessionStorage，localStorage以及cookies区别?
        `,
        answer:`
        sessionStorage会话存储,浏览器关闭,存储的数据就会消失<br/>
        localStorage本地存储,数据永久保存在本地,关闭浏览器也不会消失<br/>
        cookies:如果不设置过期时间,浏览器关闭,数据就会消失;如果设置了
        过期时间,数据会在过期后才会消失
        `
    },
    
    {
        question:`
         24.图片懒加载的作用，怎样实现图片懒加载?
        `,
        answer:`
        懒加载的作用:减少http请求数,提高用户体验<br/>
        实现原理:img元素的src属性使用一个小的图片占位,当图片滑动到可视区域,
        将src修改为需要显示的图片
        `
    },
    
    
    {
        question:`
         25.判断数据类型的方法?
        `,
        answer:`
        1.typeof<br/>
        可以判断js的基本数据类型,无法判断对象的具体类型<br>
        <br/>
        2.constructor<br/>
        返回所有js变量的构造函数(除null,undefined类型)<br/>
        <br/>
        3.Object.prototype.toString.call<br/>
        可以判断具体的对象类型,但是无法判断自定义对象类型<br/>
        <br>
        4.instanceof<br>
        判断构造函数的 prototype 属性是否出现在某个实例对象的原型链上,
        能判断对象具体类型,也可以用于自定义对象类型的判断
        `
    },
    {
        question:`

        `,
        answer:`

        `
    },
    {
        question:`

        `,
        answer:`

        `
    },
    {
        question:`

        `,
        answer:`

        `
    },
    {
        question:`

        `,
        answer:`

        `
    },
    {
        question:`

        `,
        answer:`

        `
    },
]