const jwt = require('jsonwebtoken');
const zod = require('zod');

const jwtPassword = "secret"

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// a function to generate a json web token
function signJwt(username,password){
  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);
  if(!usernameResponse.success || !passwordResponse.success){
    return null;
  }
  console.log(usernameResponse);
  console.log(passwordResponse);

  const signature = jwt.sign({
    username
  },jwtPassword);


  return signature;
}

// function to decode a json web token
function decodeJwt(token){
    if(!token) return false;
    const decoded = jwt.decode(token);
    if(decoded) return true;
    return false;
}

// function to verify a json webtoken
function verifyJwt(token){
    try{
        jwt.verify(token,jwtPassword);
        return true;
    }
    catch(e){

    }
    return false;
}
