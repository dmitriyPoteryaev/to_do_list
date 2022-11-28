
export function CompareDate(DateTask) {
    
    let cur_time = new Date;
    let hours = PlusZero(cur_time.getHours());
    let minutes = PlusZero(cur_time.getMinutes())
    let year = PlusZero(cur_time.getFullYear());
    let month = PlusZero(cur_time.getMonth() + 1);
    let data =  PlusZero(cur_time.getDate());

    function PlusZero(time) {
        return time < 10 ? `0${time}` : time

    }

 

    
 return new Date(DateTask.split('').filter((elem,i)=>elem!==' '||i===11).join(''))>new Date(`${year}.${month}.${data} ${hours}:${minutes}`)


  
  }
  