$(document).ready(function() {

  /*global io*/
  var socket = io();

  socket.on('user', data => {
    console.log(data);
    $('#num-users').text(`${data.currentUsers} users online`);
    const message = data.connected
        ? `${data.name} has joined the chat`
        : `${data.name} has left the chat`;
    $('#messages').append('<li><b>' + message + '</b></li>');
  });

  socket.on('chat message', data => {
    console.log(data);
    $('#messages')
        .append('<li><b>' + data.name + ':</b> ' + data.message + '</li>');
  });

  // Form submittion with new message in field with id 'm'
  $('form').submit(() => {
    var messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });

});
