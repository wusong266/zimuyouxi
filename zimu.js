class Code{
    constructor(){
        this.char = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],
                     ['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],
                     ['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],
                     ['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],
                     ['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],
                     ['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png'],
                     ['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],
                     ['V','img/V.png'],['W','img/W.png'],['X','img/X.png'],
                     ['Y','img/Y.png'],['Z','img/Z.png']];
        this.length = 5;
        this.current = [];
        this.position = [];
        this.scores = document.querySelector(".score>span");
        this.score = 0;
        this.guanqia = 10;
        this.time;
        this.shengming = document.querySelector(".shengming>span");
        this.shengmingzhi = 10;
    }
    start(){
        this.getChars(this.length);
        this.drop();
        this.keys();
    }
    getChars(length){
        for(let i = 0;i < length;i++){
            this.getChar();
        }
    }
    checkExist(zhi){
        return this.current.some(element => element.innerText == zhi);
    }
    checkPosition(pos){
        return this.position.some(element => Math.abs(element-pos) <= 50);
    }
    getChar(){
        let num = Math.floor(Math.random()*this.char.length);
        //this.char[num];
        do {
            num = Math.floor(Math.random()*this.char.length);
        }while(this.checkExist(this.char[num][0]));

        let divs = document.createElement('div');
        let tops = Math.floor(Math.random()*100);
        let lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);

        do{
            lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        }while(this.checkPosition(lefts));

        divs.style.cssText = `width:70px;
                              height:auto;
                              text-align:center;                             
                              line-height:77px;
                              font-size:0;
                              position:absolute;
                              top:${tops}px;
                              left:${lefts}px;
                              background-image:url('${this.char[num][1]}');
                              background-size: 100%;`
        console.log(divs.style.backgroundImage);
        divs.innerText = this.char[num][0];
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
        //console.log(this.position,lefts);
    }
    drop(){
        let _this = this;
        _this.time = setInterval(function () {
            for(let i = 0;i < _this.current.length;i++){
                let tops = _this.current[i].offsetTop + 10;
                _this.current[i].style.top = tops + 'px';
                if(tops >= 500){
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i,1);
                    _this.position.splice(i,1);
                    _this.getChar();
                    _this.shengming.innerText = --_this.shengmingzhi;
                    if(_this.shengmingzhi == 0){
                        let flag = confirm("您已死亡！是否重新开始...");
                        if(flag){
                            _this.restart();
                        }else{
                            alert(`您已死亡！得分为${_this.scores.innerText}`);
                            clearInterval(_this.time);
                        }
                    }
                }
            }
        },100)
    }
    keys(){
        let _this = this;       //保存外部的this，指向上面保存的code
        document.onkeydown = function (e) {     //加一个键盘事件，同时创建一个事件对象，用于纪录摁下的键
            //let code = e.key.toUpperCase();       //保存摁下的键同时大写它
            for(let i = 0;i < _this.current.length;i++){    //遍历保存下来的下坠元素,current保存的是div
                if(String.fromCharCode(e.keyCode) == _this.current[i].innerText){       //判断摁下的键(转换成字符串‘对应的字母’)是否等于下坠的某个元素
                    //console.log(e.keyCode)
                    //console.log(String.fromCharCode(e.keyCode));
                    document.body.removeChild(_this.current[i]);        //移除掉下坠元素，某个对应的div
                    //console.log(_this.current[i]);
                    _this.current.splice(i,1);      //删掉数组里保存下来的那个元素
                    _this.position.splice(i,1);
                    _this.getChar();        //再重新下坠一次
                    _this.scores.innerText = ++_this.score;
                    if(_this.score == _this.guanqia){
                        let result = confirm('是否进入下一关卡');
                        if (result){
                            _this.next();
                        }else{
                            clearInterval(_this.time);
                            alert(`游戏结束!得分为${_this.scores.innerText}`);
                        }
                    }
                }
            }
        }
    }
    next(){
        clearInterval(this.time);
        this.current.forEach((element) => {
            document.body.removeChild(element);     //视图删掉(页面中的元素)
        });
        this.current = [];
        this.position = [];
        this.length++;
        this.guanqia += 10;
        this.getChars(this.length);
        this.drop();
        console.log(this.guanqia);
    }
    restart(){
        clearInterval(this.time);
        this.current.forEach(element => {
            document.body.removeChild(element);
        });
        this.current = [];
        this.position = [];
        this.scores.innerText = this.score = 0;
        this.shengming.innerText = this.shengmingzhi = 10;

        this.length = 5;
        this.getChars(this.length);
        this.drop();
    }
}
