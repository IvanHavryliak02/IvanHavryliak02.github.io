
export default {
            unit: 'cels',
            calculateTemp: function(temp) {
                if(this.unit === 'cels'){
                    return temp;
                }else {
                    return Math.round((temp * 1.8 + 32)*10)/10 
                }
            }
        }