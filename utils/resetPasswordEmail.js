const sendEmail = require("../config/mailer");

const resetPasswordEmail = async (req, firstname, email, newPassword) => {
	const html = `
     <h2>Password Reset Request</h2><br /><br /><br />
      <strong>Hello ${firstname}</strong>
      <br/>
      <br/>
      Here is your new password:
      <br/>
      <br/>
       <strong>${newPassword}</strong>
       <br/>
       <br/>
          Incase you did not initiate the reset process kindly contact your IT administrator. 
      <br/>
      <br/>
       Working to make work easy.
      <br/>
       <srong>UBEC WORKFLOW DESK</strong>
      <br/>
      contact: support@ubecdesk.com
   `;

	 await sendEmail("support@ubecdesk.com", email, "UBEC PASSWORD RESET", html);
};

module.exports = resetPasswordEmail;
