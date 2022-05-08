
declare var $:any;

export function showNotification (from, align,type,message,icon){
    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: icon,
        message: message
    },{
        type: type,
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}