$('#user-send').on('click', userSendEmail)
$('#user-send').on('click', mailToAdmin)

function mailToAdmin()
      {
        $('#user-send').addClass('disabled');
        sendMessage(
          {
            'To': 'infoastoryuntold@gmail.com',
            'Subject': 'Kund mail från ' + $('#user-name').val() + ' ' +$('#user-email').val()
          },
          'Kundens namn: ' + $('#user-name') + ' Kundens mail: ' + $('user-email'),
          composeTidy
        );
        return false;
      }

function userSendEmail()
      {
          
        $('#user-send').addClass('disabled');
        sendMessage(
          {
            'To': $('#user-email').val(),
            'Subject': 'Din bokning'
          },
          'Ny bokning av ' + $('#user-name').val() + ' som har epost: ' + $('#user-email').val(),
          composeTidy
        );
        return false;
      } 
 function composeTidy()
      {
        $('#send-to').val('infoastoryuntold@gmail.com');
        $('#user-name').val('');
        $('#user-email').val('');
          
      }

function sendMessage(headers_obj, message, callback)
      {
        var email = '';
        for(var header in headers_obj)
          email += header += ": "+headers_obj[header]+"\r\n";
        email += "\r\n" + message;
        var sendRequest = gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
          }
        });
        return sendRequest.execute(callback);
      }




///////////////



 /*function sendEmail()
      {
        $('#send-button').addClass('disabled');
        sendMessage(
          {
            'To': $('#compose-to').val(),
            'Subject': $('#compose-subject').val()
          },
          $('#compose-message').val(),
          composeTidy
        );
        return false;
      }
      function composeTidy()
      {
        $('#compose-modal').modal('hide');
        $('#compose-to').val('');
        $('#compose-subject').val('');
        $('#compose-message').val('');
        $('#send-button').removeClass('disabled');
      }

function sendMessage(headers_obj, message, callback)
      {
        var email = '';
        for(var header in headers_obj)
          email += header += ": "+headers_obj[header]+"\r\n";
        email += "\r\n" + message;
        var sendRequest = gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
          }
        });
        return sendRequest.execute(callback);
      }*/