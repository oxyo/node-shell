var i = 0;

 function timedCount() {
     i = i + 1;
     postMessage("Kuku " + i);
     setTimeout("timedCount()",500);
 }

 timedCount(); 