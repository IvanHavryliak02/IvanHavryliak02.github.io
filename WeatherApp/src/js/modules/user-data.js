
export default {
            month: '',
            date: '',
            weekday: '',
            hour: '',
            theme: '',
            scale: '',
            getUserData: function (){
                const date = new Date();
                this.date = date.getDate();
                this.month = date.getMonth();
                this.weekday = date.getDay();
                this.hour = date.getHours();
                this.theme = this.hour >= 18 || this.hour <= 6 ? 'dark' : 'light';
                this.wievportWidth = window.innerWidth;
                this.wievportHeight = window.innerHeight;
                const scaleX = window.innerWidth / 1920;
                const scaleY = window.innerHeight / 1080;
                this.scale = Math.round(Math.min(scaleX, scaleY)*100)/100
            },
            findWeekday: function(i = 'none'){
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                if(i === 'none'){
                    return days[this.weekday]
                }else{
                    return days[i];
                } 
            }
        }