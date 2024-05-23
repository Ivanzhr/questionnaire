'use strict'

class Note {

    #arr = [
        { title: 'Мої реакції на конфлікти  значно гостріші, аніж повинні бути.', num: 0 },
        { title: 'Коли я знаходжуся в конфліктній ситуації, я переживаю відчуття, які нагадують мені про те, як я себе почував (-ла) у минулих конфліктах.', num: 0 },
        { title: 'У конфліктній ситуації я помічаю, що фокусую увагу на тому, що говорить або робить інший.', num: 0 },
        { title: 'Я помічаю, що використовую гучні вирази для опису мого конфлікту з іншими, такі як “завжди” або “ніколи”', num: 0 },
        { title: 'В інших я помічаю позитивні якості, яких не знаходжу у собі.', num: 0 },
        { title: 'В інших я помічаю негативні риси, які мені важко прийняти у собі.', num: 0 },
        { title: 'Мені важко визнавати помилку. Замість цього я одразу звертаю увагу на щось, що зробив або сказав хтось інший, покладаючи на нього вину за помилку.', num: 0 },
        { title: 'Я відключаюся, коли хтось говорить мені щось, чого я не хочу чути.', num: 0 },
        { title: 'Коли я знаю, що не подобаюсь комусь, я уникаю таких людей, тікаю від них як від чуми.', num: 0 },
        { title: 'Я помічаю, що виголошую моральні судження про характер або поведінку людей, які мені не подобаються. ', num: 0 }
    ]
    constructor(question, answer, next, line, overlay) {
        this.question = document.querySelector(question);
        this.answer = document.querySelectorAll(answer);
        this.next = document.querySelector(next);
        this.line = document.querySelectorAll(line);
        this.overlay = document.querySelector(overlay);
        this.total = [];

    }

    create() {
        let str = this.#arr[0].title;
        this.question.append(str);
    }

    update(index) {
        this.question.textContent = this.#arr[index].title;
    }

    updateNextText(index) {
        let str = `${index + 1}/${this.#arr.length}`;
        document.querySelector('.page p').innerHTML = str;
    }

    toTotal() {
        this.line.forEach(elem => {
            if (elem.classList.contains('active')) {
                this.total.push(elem.getAttribute('data'));
            }
        });
        console.log(this.total);
    }

    closeOverlay(e) {
        let wrap = document.querySelector('.overlay');
        if(e.target.matches('.btn')) {
            wrap.style.display = 'none'
        };

        if(e.target.matches('.overlay')) {
            wrap.style.display = 'none'
        }
        
    }

    changePosition() {
        let btn = document.querySelector('.active_btn');
        this.line.forEach(elem => {
            if (elem.classList.contains('active')) {
               let d =  elem.getAttribute('data');

               if(d === '1') {
                btn.style.left = '0%';
               } else if(d === '2'){
                btn.style.left = '25%';
               } else if (d === '3') {
                btn.style.left = '50%';
               }
                else if (d === '4') {
                btn.style.left = '75%';
               }
            }
        });
    }


    init() {
        this.create();
        let currentIndex = 0;
        this.next.addEventListener('click', () => {
            currentIndex++;
            this.toTotal();
            if (currentIndex < this.#arr.length) {
                this.update(currentIndex);
                 this.updateNextText(currentIndex);
                 this.line.forEach(item => {
                    item.classList.remove('active');
                });
             this.next.style.display = 'none'
            } else {
                currentIndex = 0;
                 this.update(currentIndex);
                 this.updateNextText(currentIndex);
                 const sum = this.total.reduce((acc, curr) => acc + parseInt(curr), 0);
                 this.overlay.style.removeProperty('display');
                 let img = this.overlay.querySelector('img');
                 let h = this.overlay.querySelector('h4');
                 if (sum >= 10 && sum <= 20) {
                    h.textContent = 'Низький рівень проекції'; 
                    h.setAttribute('style', 'color: red');
                    img.setAttribute('src', 'img/red.png');
                } else if (sum >= 21 && sum <= 30) {
                    h.textContent = 'Середній рівень проекції'; 
                    h.setAttribute('style', 'color: yellow');
                    img.setAttribute('src', 'img/yellow.png');
                } else {
                    h.textContent = 'Високий рівень проекції';
                    h.setAttribute('style', 'color: green');
                    img.setAttribute('src', 'img/green.png');
                }
             }
        });
         this.updateNextText(currentIndex);

         this.line.forEach(elem => {
            elem.addEventListener('click', (e) => {
                this.line.forEach(item => {
                    item.classList.remove('active'); 
                });
                e.target.classList.add('active');
                this.next.style.removeProperty('display');
                this.changePosition();
            });
        });

        document.body.addEventListener('click', this.closeOverlay.bind(this));

        

    }

    }


    


   
       
