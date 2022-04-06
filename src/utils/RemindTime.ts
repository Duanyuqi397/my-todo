export const RemindTime = (startTime: any,endTime: any) => {
        //剩余时间
        let until = new Date(endTime).getTime();
        let now = new Date(startTime).getTime();
        
        let days = (until - now)/1000/3600/24; 
         
        let day = Math.floor(days);
        let hours = (days - day)*24;
        let hour = Math.floor(hours);
        let minutes = (hours - hour)*60;
        let minute = Math.floor(minutes);
        let seconds = (minutes - minute)*60;
        let second = Math.floor(seconds);
        let back = '剩余时间：'+day+'天'+hour+'小时'+minute+'分钟'+second+'秒';
        return back;
}