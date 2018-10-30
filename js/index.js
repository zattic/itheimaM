window.onload=function(){
    search();
}
function search(){
    var searchBox=document.querySelector('.hm_header_box');
    var bannerBox=document.querySelector('.hm_banner');
    var h=bannerBox.offsetHeight;
    window.onscroll=function(){
        var top=document.body.scrollTop;
        var opacity=0;
        if(top<h){
            opacity=top/h*0.85
        }else{
            opacity=0.85;
        }
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}
// 轮播图
function banner(){
    // 1.自动地滚动起来 （定时器，过渡）
    // 2.点随之滚动起来  （改变当前点元素的样式）
    // 3.图片滚动 （touch 事件）
    // 4.当不超过一定的滑动距离的时候吸附回去，定位回去（一定的距离1/3屏幕宽度 过渡）
    // 5.当超过了一定距离的时候滚动到上一张或下一张（一定的距离1/3屏幕宽度 过渡）
    //获取到dom对象
    //banner
    var banner=document.querySelector('.hm_banner');
    //屏幕的宽度
    var w=banner.offsetWidth;
    //图片盒子
    var imageBox=banner.querySelector('ul:first-child');
    //只支持有效的css选择器
    //点盒子
    var pointBox=banner.querySelector('ul:last-child');
    //所有的点
    var pointBox=banner.querySelector('li');
    //添加过渡
    var addTransition=function(){
        imageBox.style.webkitTransition="all .2s";
        imageBox.style.transition="all .2s";
    };
    //删除过渡
    var addTransition=function(){
        imageBox.style.webkitTransition='none';
        imageBox.style.transition="none";
    };
    //改变位子
    var setTranslateX=function(translateX){
        imageBox.style.webkitTransform="translateX("+translateX+"px)";
        imageBox.style.transform="translateX("+translateX+"px)";
    };
    //1.自动地滚动起来（定时器，过渡）
    var index=1;
    var timer =setInterval(function(){
        //箱子滚动
        index ++;
        //定位：用过渡来做定位的，这样才有动画
        //加过渡
        addTransition();
        //改变位子
        setTranslateX(-index*w);
    },4000);
    //绑定一个过渡结束事件
    itcast.transitionEnd(imageBox,function(){
        console.log('transitionEnd');
        if(index>=9){
            index=1;
            //做定位
            //加过渡
            removeTransition();
            //改变位子
            setTranslateX(-index*w);
        }else if(index <=0){
           index=8;
           //加过渡
           removeTransition();
           //改变位子
           setTranslateX(-index*w);
        }
        //index 1~8 索引范围
        //point 0~7
        setPoint();
    })
    //2.点随之滚动起来（改变当前点元素的样式）
    var setPoint = function(){
        //把所有点的样式清除
        for(var i=0; i<points.length;i++){
            points[i].className="";
        }
        points[index-1].className="now";
    }
    //3.图片滑动（touch事件）
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;

    imageBox.addEventListener('touchstart',function(e){
        //清除定时器
        clearInterval(timer);
        startX=e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
         isMove=true;
         moveX=e.touches[0].clientX;
         distanceX=moveX-startX;
         //算出当前图片盒子需要的定位位子
         console.log(distanceX);
         //将要去做定位
         var currX=-index*w+distanceX;
          //删除过渡
          removeTransition();
          //改变位子
          setTranslateX(currX);
    });
    imageBox.addEventListener('touchend',function(e){
        //当超过一定距离的时候
        if(isMove&&(Math.abs(distanceX)>w/3)){
            if(distanceX>0){
                index--;
            }else{
                index++;
            }
            addTransition();
            setTranslateX(-index*w);
        }
        else{
            addTransition();
            setTranslateX(-index*w);
        }
        //重置
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            addTransition();
            setTranslateX(-index*w);
        },4000);
    });
















}