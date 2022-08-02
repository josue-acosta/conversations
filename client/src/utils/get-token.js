const keys = require('./dev');
const identity = keys.identity || process.env.REACT_APP_IDENTITY
const serviceSid = keys.serviceSid || process.env.REACT_APP_SERVICE_SID
const twilioAccountSid = keys.twilioAccountSid || process.env.REACT_APP_TWILIO_ACCOUNT_SID
const twilioApiKey = keys.twilioApiKey || process.env.REACT_APP_TWILIO_API_KEY
const twilioApiSecret = keys.twilioApiSecret || process.env.REACT_APP_TWILIO_API_SECRET

const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

module.exports = {
    getToken: () => {
        try {
            // Create a "grant" which enables a client to use Chat as a given user,
            // on a given device
            const chatGrant = new ChatGrant({
                serviceSid: serviceSid,
            });

            // Create an access token which we will sign and return to the client,
            // containing the grant we just created
            const token = new AccessToken(
                twilioAccountSid,
                twilioApiKey,
                twilioApiSecret,
                {
                    identity: identity
                }
            );

            // Add "grant" information to the token
            token.addGrant(chatGrant);
            return token.toJwt()
        } catch (error) {
            console.log(error)
        }
    }
};