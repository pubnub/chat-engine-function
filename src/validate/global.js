import rejectionResponse from '../responses/rejection';

export default (globalChannel) => {

  // The following RegExp rejects matches of illegal globalChannel string names.
  // A globalChannel CANNOT match private channel patterns used by ChatEngine client.
  /*
      globalChannel + #chat#public.*                  --->    '[\w-]*#chat#public'
      globalChannel + #chat#private.*                 --->    '[\w-]*#chat#private'
      globalChannel + #user# + MYUUID + #read.*       --->    '[\w-]*.*#user#[\w-]*#read'
      globalChannel + #user# + MYUUID + #write.*      --->    '[\w-]*.*#user#[\w-]*#write'
      globalChannel + # + MYUUID + #rooms             --->    '[\w-]*.*#[\w-]*#rooms'
      globalChannel + # + MYUUID + #rooms-pnpres      --->    '[\w-]*.*#[\w-]*#rooms-pnpres'
      globalChannel + # + MYUUID + #system            --->    '[\w-]*.*#[\w-]*#system'
      globalChannel + # + MYUUID + #system-pnpres     --->    '[\w-]*.*#[\w-]*#system-pnpres'
      globalChannel + # + MYUUID + #custom            --->    '[\w-]*.*#[\w-]*#custom'
      globalChannel + # + MYUUID + #custom-pnpres     --->    '[\w-]*.*#[\w-]*#custom-pnpres'
  */
  const re = new RegExp('[\w-]*#chat#public|[\w-]*#chat#private|[\w-]*.*#user#[\w-]*.*#read|[\w-]*.*#user#[\w-]*.*#write|[\w-]*.*#[\w-]*.*#rooms|[\w-]*.*#[\w-]*.*#rooms-pnpres|[\w-]*.*#[\w-]*.*#system|[\w-]*.*#[\w-]*.*#system-pnpres|[\w-]*.*#[\w-]*.*#custom|[\w-]*.*#[\w-]*.*#custom-pnpres');

  if(re.exec(globalChannel)) {
    return rejectionResponse(401, 'Bad global channel');
  }

  return Promise.resolve();

}
