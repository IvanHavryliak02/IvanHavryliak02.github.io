export default { 
            weatherCodes: {
                    precised: {
                        0: 'sun.svg',
                        1: 'part-cloud.svg',
                        3: 'cloud.svg',
                        11: 'fog.svg',
                        17: 'lightning.svg',
                        19: 'tornado.svg',
                        51: 'drizzle.svg',
                        62: 'rain-cloud.svg',
                        72: 'snow.svg',
                        95: 'storm.svg',
                        101: 'hot.svg',
                    },
                    general: {
                        0: 'sun.svg',
                        20: 'cloud.svg',
                        30: 'haze.svg',
                        40: 'fog.svg',
                        50: 'drizzle.svg',
                        60: 'rain-cloud.svg',
                        70: 'snow.svg',
                        80: 'storm.svg',
                        90: 'storm.svg'
                    }
                },
            whatsImage: function(code, temp){
                let primeRes;
                if(code === 0 && temp > 28){
                    primeRes = 'hot.svg';
                }else if(this.weatherCodes.precised[code]){
                    primeRes = this.weatherCodes.precised[code]
                }else{
                    primeRes = this.weatherCodes.general[Math.floor(code/10)*10]
                }
                return primeRes;
            }
        }