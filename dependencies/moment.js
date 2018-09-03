var moment=require('moment');

function m(date)
{  
    var x=date;
    //var x="2018-09-04 01:25:00.693";
    //var x="2018-09-01";
    //console.log(new Date());
    var startDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var endDate = moment(x).format("YYYY-MM-DD HH:mm:ss");
    var diffSec = moment(endDate).diff(startDate, 'seconds');
    console.log(diffSec);
    return diffSec;
}
module.exports=m;