1.  webSocket (communication protocol) => HTTP (APIs) / SMTP / FTP

2.  HTTP 	=> CLIENT Requesting to server , and SERVER Responsing a/c to request
3.  webSocket   => Between CLIENT n SERVER Realtime connection  .,  ex = get notification by (pusher.js) 

 * every socket has their RoomID
 * socket we understand as user  => means every user has userID / RoomID
 
4. socket.io  => emit => I'm triggering an event  => sending   -  thisEvent (data)
		 on    => handler / listerner	   => receiving - thisEvent (data)

io    	=> for entire circuit   =>  io.emit(event1, "hi");  => jitne bhi socket hai, sabhi ke pass ("hi") pahuch jayega
socket  => individual users  	=>  socket.on / socket.emit 

broadcast.emit => jo socket hai usko chodke baki pe ja raha msg

         			client  => 
						1.   socket.on(event1, (m)=>{
							console.log(m);  // hi	
						      });
					
						2.   socket.emit(btn , 4);

				server  =>    
						1. io.emit(event1, "hi");
						
						2. socket.on(btn, (n)=>{
						    });

						3. socket.broadcast.emit(...);


5. personal chat ( socketA --> socketC ) ==> To  => to trigger event for particular room   => socket.to(roomId).emit(...)
						
					==> join   => to join people in Room		   => socket.join(roomName)
