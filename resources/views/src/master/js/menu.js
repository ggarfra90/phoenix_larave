/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    
});

function fn_getMenu(data){
    var ulhijoInicio="";
    var ulhijoFinal="";
    var liPadre="";
    var liHijo="";
//    < ul class = "nav nav-children" >
//        < li >
//            < a href = "pages-signup.html" >Sign Up
//            < /a>
//        < /li>
    $.each(data,function(index,value){
        if(value["mpadre"]){
            liPadre+="<li class='nav-active'>"+
                       '<a href="'+value["url"]+'">'+
                       '<span>'+value["descripcion"]+'</span></a>';
               if(value["mhijo"]){
                   ulhijoInicio='< ul class = "nav nav-children" >';
                     liHijo+='< li >'+
                             '< a href = "pages-signup.html" >Sign Up'+
                            '< /a>';
               }
        }
        liPadre+="</li>";
    });
   
}