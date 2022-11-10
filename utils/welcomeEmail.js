const sendEmail = require("../config/mailer");

const welcomeEmail = async (
	req,
	firstname,
	email,
	generatedPassword,
	assignedRole,
) => {
	const html = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>iconnect Email Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8f8f8">
    <table
      id="body"
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        max-width: 800px;
        margin: 0 auto;
        font: 1em Raleway;
        background-color: #ffffff;
      "
    >
      <tr>
        <td style="padding: 0">
          <table
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="border-collapse: collapse"
          >
            <tr>
              <td
                width="100%"
                height="139px"
                align="center"
                style="
                  background: #959a9e
                    no-repeat center/cover;
                "
              >
                <a
                  href="https://uwd.vercel.app/"
                >
                  <div>
                    <img
                      src="https://res.cloudinary.com/freyman/image/upload/v1648067848/UBEC-logo_jbe91k.png"
                      alt="UBEC-LOGO"
                      width="100px"
                      height="100px"
                      style="display: block; object-fit: cover;"
                    />
                  </div>
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 1em 0.5em">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="border-collapse: collapse"
                >
                  <tr>
                    <td style="padding: 0.5em 0">
                      <p style="margin: 0px 0px 0px 30px; font: 2em Roboto; color: #000000dd">
                        Dear ${firstname}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0.5em 3em">
                       <p>You have been added as a staff member to the UBEC WORK FLOW DESK.</p>
                       <p>You have been assigned 
                           <span style="font: 1em Raleway; font-weight: bold;
                              ">${assignedRole}'S</span> role
                       </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="border-collapse: collapse"
                      >
                        <tr>
                          <td align="center" width="100%">
                              <div
                                style="
                                  width: 100%;
                                  color: #000000dd;
                                 
                                  max-width: 200px;
                                  
                                  background-color: #f3f3f3;
                                "
                              >
                              <p>Below is your password:</p>
                              <p style="font: 2em Raleway; font-weight: bolder;  padding: 0.5em; cursor: pointer;
                              ">${generatedPassword}</p>
                              </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 1em 0.5em">
                           <p>
                              Open the link below on your computer or desktop to signin to your Desk
                           </p>
                           <a href="https://uwd.vercel.app/" target="_blank">
                            https://uwd.vercel.app
                           </a>
                           <br />
                           <p> Working to make work easy</p>
                           <p>UBEC WORK FLOW DESK</p>
                           <br />
                           <br />
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 1em 0.5em">
                            <div style="margin-top: 0.3em; font: 1em Raleway">
                             For support and inquiry, contact the IT Admin
                            </div>
                            <div style="margin-top: 0.3em; font: 1em Raleway">
                               <p>
                                 mail: <a href="ubecitadmin@mail.com">ubecitadmin@mail.com</a>
                               </p>
                               <p>
                                 phone: <a>+2348164815637</a>
                               </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

   `;

	await sendEmail(
		"support@ubecdesk.com",
		email,
		"Welcome to UBEC WORK FLOW DESK",
		html,
	);
};

module.exports = welcomeEmail;
