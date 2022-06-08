let cssList = [
    {
        question:`
        1.清除浮动的方式?
        `,
        answer:`
        清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题<br>
        清除浮动主要有3种方式:<br/>
          1.空元素法:给谁清除浮动,就在其后额外添加一个空白标签,
          并设置clear:both即可<br/>
          优点:通俗易懂，书写方便<br/>
          缺点:添加许多无意义的标签，结构化比较差<br/>
          <br/>
          2.父级添加overflow方法:原理是通过触发BFC的方式,实现清除浮动效果<br>
          优点:简单、代码少、浏览器支持好<br/>
          缺点:内容增多时候容易造成不会自动换行导致内容被隐藏掉，
          无法显示需要溢出的元素。不能和position配合使用，
          因为超出的尺寸的会被隐藏<br/>
          <br/>
          3.使用after伪元素清除浮动：:after方式为空元素的升级版，
          好处是不用单独加标签了
        `
    },
    {
        question:`
        2.标准盒模型和怪异盒模型的区别?
        `,
        answer:`
        在标准盒模型下,width和height是内容区域即content的width和height<br/>
        怪异盒模型显而易见的区别就是,width和height除了content区域外，
        还包含padding和border<br/>
        设置标准盒: boxsizing:content-box<br/>
        设置怪异盒: boxsizing:border-box
        `
    },
    {
        question:`
        3.css居中的实现方式?
        `,
        answer:`
        1.绝对定位+transform实现水平垂直居中<br/>
        2.margin:auto实现水平居中<br/>
        3.绝对定位+margin:auto实现水平垂直居中<br/>
        4.text-align+line-height实现文字水平垂直居中<br/>
        5.flex布局中使用justify-content:center和
        align-items:center实现水平垂直居中<br/>
        6.grid布局中使用place-items:center实现水平垂直居中<br/>
        `
    },
    {
        question:`
        4.em,rem,px,rpx的区别?
        `,
        answer:`
        em大小是相对于父元素的font-size得到的,1em大小就等于父元素的font-size<br/>
        rem大小是相对于html元素的font-size得到的,1rem大小就等于html元素的font-size<br/>
        px是固定单位,任意尺寸的屏幕下,大小都一样<br/>
        rpx是小程序的响应式单位,可以根据屏幕宽度进行自适应
        `
    },
    {
        question:`
        5.flex布局有哪些常用属性?
        `,
        answer:`
        display:flex 开启flex布局;<br/>
        justify-content 设置子元素在主轴方向的对齐方式<br/>
        align-items 设置子元素在侧轴方向的对齐方式<br/>
        flex-direction 设置flex布局方向<br />
        flex-group 设置子元素如何分配容器的剩余空间
        `
    },
    {
        question:`
        6.css选择器的优先级?
        `,
        answer:`
        行内样式>id选择器>类选择器=伪类选择器=属性选择器>标签
        >通配符>继承
        `
    },
]